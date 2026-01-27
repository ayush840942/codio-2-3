
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { validatePlan, validateMetadata } from '@/utils/inputValidation';
import { Plan } from '@/types/subscription';
import { User } from '@supabase/supabase-js';

interface PaymentMetadata {
  type?: string;
  hintAmount?: number;
  [key: string]: any;
}

export const createSecureOrder = async (plan: Plan, metadata: PaymentMetadata = {}) => {
  try {
    console.log('Creating secure order with plan:', plan, 'metadata:', metadata);

    // Validate plan data
    const planValidation = validatePlan(plan);
    if (!planValidation.success) {
      throw new Error(planValidation.error);
    }

    // Validate metadata
    const metadataValidation = validateMetadata(metadata);
    if (!metadataValidation.success) {
      throw new Error(metadataValidation.error);
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        plan_id: plan.id,
        amount: plan.price,
        currency: 'INR',
        status: 'pending',
        metadata: metadata as any
      })
      .select()
      .single();

    if (orderError) {
      console.error('Database error creating order:', orderError);
      throw new Error('Failed to create order');
    }

    console.log('Order created successfully:', order);
    return order;

  } catch (error) {
    console.error('Error in createSecureOrder:', error);
    throw error;
  }
};

export const processSecurePayment = async (orderId: string, paymentId: string) => {
  try {
    console.log('Processing secure payment for order:', orderId, 'payment:', paymentId);

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    // Get the order by primary ID or Razorpay Order ID in metadata
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .or(`id.eq.${orderId},metadata->>razorpay_order_id.eq.${orderId}`)
      .eq('user_id', user.id)
      .single();

    if (orderError || !order) {
      console.error('Order not found or access denied:', { orderId, error: orderError });
      throw new Error('Order not found or access denied');
    }

    // Update order status using the database ID
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        status: 'completed',
        payment_id: paymentId,
        completed_at: new Date().toISOString()
      })
      .eq('id', order.id);

    if (updateError) {
      console.error('Error updating order:', updateError);
      throw new Error('Failed to update order status');
    }

    // Process the purchase based on metadata
    const metadata = order.metadata as PaymentMetadata;

    if (metadata?.type === 'hint-purchase' && metadata.hintAmount) {
      console.log('Processing hint purchase for user:', user.id, 'amount:', metadata.hintAmount);

      // Validate hint amount
      const hintValidation = validateMetadata({ hintAmount: metadata.hintAmount });
      if (!hintValidation.success) {
        throw new Error(hintValidation.error);
      }

      // Add hint points directly to database
      const { data: currentRewards, error: rewardsError } = await supabase
        .from('user_rewards')
        .select('hint_points')
        .eq('user_id', user.id)
        .single();

      if (rewardsError) {
        console.error('Error fetching current rewards:', rewardsError);
        throw new Error('Failed to fetch current rewards');
      }

      const newHintPoints = (currentRewards?.hint_points || 0) + metadata.hintAmount;

      const { error: updateRewardsError } = await supabase
        .from('user_rewards')
        .upsert({
          user_id: user.id,
          hint_points: newHintPoints
        });

      if (updateRewardsError) {
        console.error('Error updating hint points:', updateRewardsError);
        throw new Error('Failed to update hint points');
      }

      console.log('Hint points added successfully:', metadata.hintAmount);
      return metadata.hintAmount;
    }

    // Handle subscription purchases
    if (metadata?.type !== 'hint-purchase') {
      // Calculate end date based on plan
      let durationDays = 30; // Default monthly
      if (order.plan_id.includes('trial')) {
        durationDays = 7;
      } else if (order.plan_id.includes('yearly')) {
        durationDays = 365;
      }

      const startDate = new Date();
      const endDate = new Date(startDate.getTime() + durationDays * 24 * 60 * 60 * 1000);

      // Update user subscription
      const { error: subscriptionError } = await supabase
        .from('user_subscriptions')
        .upsert({
          user_id: user.id,
          plan_id: order.plan_id,
          status: 'active',
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          amount: order.amount
        });

      if (subscriptionError) {
        console.error('Error updating subscription:', subscriptionError);
        throw new Error('Failed to update subscription');
      }

      // Sync plan to profiles table for real-time feature locking
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ plan: order.plan_id })
        .eq('id', user.id);

      if (profileError) {
        console.warn('Error updating profile plan during subscription:', profileError);
        // We don't throw here as the subscription itself was successful
      }
    }

    console.log('Payment processed successfully');
    return order.amount;

  } catch (error) {
    console.error('Error in processSecurePayment:', error);
    throw error;
  }
};

export const verifySecurePayment = async (paymentId: string, orderId: string) => {
  try {
    console.log('Verifying secure payment:', paymentId, 'for order:', orderId);

    // In a real implementation, you would verify with Razorpay
    // For now, we'll simulate successful verification
    return {
      success: true,
      paymentId,
      orderId,
      status: 'captured'
    };

  } catch (error) {
    console.error('Error in verifySecurePayment:', error);
    throw error;
  }
};

// Generate order ID function
export const secureGenerateOrderId = async (amount: number, user: User, metadata?: PaymentMetadata) => {
  try {
    console.log('Generating secure order ID for amount:', amount);

    // Create a temporary plan for the order
    const tempPlan: Plan = {
      id: `temp-${Date.now()}`,
      name: 'Temporary Plan',
      price: Math.floor(amount / 100), // Convert paise to rupees
      period: 'once',
      description: 'Temporary plan for payment',
      features: []
    };

    // Call Razorpay Edge Function to get a real Order ID
    const { data: rzpData, error: rzpError } = await supabase.functions.invoke('razorpay', {
      body: {
        amount,
        currency: 'INR',
        notes: metadata
      }
    });

    if (rzpError || !rzpData?.order_id) {
      console.error('Razorpay order creation failed:', rzpError);
      throw new Error('Could not initialize payment with Razorpay');
    }

    // Create our internal order record with the real Razorpay Order ID in metadata
    const order = await createSecureOrder(tempPlan, {
      ...metadata,
      razorpay_order_id: rzpData.order_id
    });

    // Return the order data in the expected format for Razorpay Checkout
    return {
      order_id: rzpData.order_id,
      key_id: rzpData.key_id || 'rzp_live_S6DtyFyJe7iJXx'
    };

  } catch (error) {
    console.error('Error in secureGenerateOrderId:', error);
    throw error;
  }
};

// Record purchase function
export const secureRecordPurchase = async (
  user: User,
  planId: string,
  amount: number,
  paymentId: string,
  orderId: string,
  hintAmount?: number
) => {
  try {
    console.log('Recording secure purchase:', { planId, amount, paymentId, orderId, hintAmount });

    // Process the payment
    await processSecurePayment(orderId, paymentId);

    // Record the purchase
    const { error: purchaseError } = await supabase
      .from('user_purchases')
      .insert({
        user_id: user.id,
        plan_id: planId,
        amount: amount,
        payment_id: paymentId,
        order_id: orderId,
        hint_amount: hintAmount || 0
      });

    if (purchaseError) {
      console.error('Error recording purchase:', purchaseError);
      throw new Error('Failed to record purchase');
    }

    console.log('Purchase recorded successfully');
    return true;

  } catch (error) {
    console.error('Error in secureRecordPurchase:', error);
    throw error;
  }
};
