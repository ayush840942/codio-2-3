
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { validatePlan, validateMetadata } from '@/utils/inputValidation';
import { Plan } from '@/types/subscription';
import { User } from '@supabase/supabase-js';
import { toDatabaseId } from '@/utils/idMapping';

interface PaymentMetadata {
  type?: string;
  hintAmount?: number;
  [key: string]: any;
}

export const createSecureOrder = async (user: User, plan: Plan, metadata: PaymentMetadata = {}, currency: string = 'USD', amountInSubunits?: number) => {
  try {
    // Determine the final integer amount for the database (subunits, e.g., cents/paise)
    // If amountInSubunits is provided, use it. Otherwise, convert plan.price (major units) to subunits.
    const finalAmountInteger = amountInSubunits !== undefined
      ? Math.round(amountInSubunits)
      : Math.round(plan.price * 100);

    console.log('Creating secure order for user:', user.email, 'plan:', plan.id, 'metadata:', metadata, 'currency:', currency, 'amount:', finalAmountInteger);

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

    if (!user) {
      throw new Error('User not authenticated');
    }

    // Create order in database - Ensure amount is strictly an integer
    const dbUserId = toDatabaseId(user.id);
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: dbUserId,
        plan_id: plan.id,
        amount: finalAmountInteger, // Corrected: Storing as integer subunits 
        currency: currency,
        status: 'pending',
        metadata: metadata as any
      })
      .select()
      .single();

    if (orderError) {
      console.error('Database error creating order:', orderError);
      throw new Error(`Failed to create order: ${orderError.message || 'Database integer mismatch'}`);
    }

    console.log('Order created successfully:', order);
    return order;

  } catch (error) {
    console.error('Error in createSecureOrder:', error);
    throw error;
  }
};

export const processSecurePayment = async (user: User, orderId: string, paymentId: string) => {
  try {
    console.log('Processing secure payment for user:', user.id, 'order:', orderId, 'payment:', paymentId);

    if (!user) {
      throw new Error('User not authenticated');
    }

    // Get the order by primary ID or Razorpay Order ID in metadata
    const dbUserId = toDatabaseId(user.id);
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .or(`id.eq.${orderId},metadata->>razorpay_order_id.eq.${orderId}`)
      .eq('user_id', dbUserId)
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
      const dbUserId = toDatabaseId(user.id);
      const { data: currentRewards, error: rewardsError } = await supabase
        .from('user_rewards')
        .select('hint_points')
        .eq('user_id', dbUserId)
        .single();

      if (rewardsError) {
        console.error('Error fetching current rewards:', rewardsError);
        throw new Error('Failed to fetch current rewards');
      }

      const newHintPoints = (currentRewards?.hint_points || 0) + metadata.hintAmount;

      const { error: updateRewardsError } = await supabase
        .from('user_rewards')
        .upsert({
          user_id: dbUserId,
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
      const dbUserId = toDatabaseId(user.id);
      const { error: subscriptionError } = await supabase
        .from('user_subscriptions')
        .upsert({
          user_id: dbUserId,
          plan_id: order.plan_id,
          status: 'active',
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          amount: order.amount / 100 // Convert subunits back to major units for display/subscription record
        });

      if (subscriptionError) {
        console.error('Error updating subscription:', subscriptionError);
        throw new Error('Failed to update subscription');
      }

      // Sync plan to profiles table for real-time feature locking
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ plan: order.plan_id })
        .eq('id', dbUserId);

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
export const secureGenerateOrderId = async (amount: number, user: User, metadata?: PaymentMetadata, currency: string = 'USD') => {
  try {
    console.log('Generating secure order ID for amount:', amount, 'currency:', currency);

    // Create a temporary plan for the order
    const tempPlan: Plan = {
      id: `temp-${Date.now()}`,
      name: 'Temporary Plan',
      price: amount / 100,
      period: 'once',
      description: 'Temporary plan for payment',
      features: []
    };

    // Call Razorpay Edge Function to get a real Order ID
    const { data: rzpData, error: rzpError } = await supabase.functions.invoke('razorpay', {
      body: {
        amount,
        currency,
        notes: metadata
      }
    });

    if (rzpError || !rzpData?.order_id) {
      console.error('Razorpay order creation failed:', rzpError);
      throw new Error(`Could not initialize payment with Razorpay: ${rzpError?.message || 'Unknown error'}`);
    }

    // Create our internal order record with the real Razorpay Order ID in metadata
    // Pass user and amount directly as subunits
    const order = await createSecureOrder(user, {
      ...tempPlan,
      price: amount / 100
    }, {
      ...metadata,
      razorpay_order_id: rzpData.order_id,
      currency
    }, currency, amount);

    return {
      order_id: rzpData.order_id,
      key_id: rzpData.key_id || 'rzp_live_S6DtyFyJe7iJXx' // Shared Key
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
    console.log('Recording secure purchase for user:', user.id, { planId, amount, paymentId, orderId, hintAmount });

    // Process the payment
    await processSecurePayment(user, orderId, paymentId);

    // Record the purchase
    const dbUserId = toDatabaseId(user.id);
    const { error: purchaseError } = await supabase
      .from('user_purchases')
      .insert({
        user_id: dbUserId,
        plan_id: planId,
        amount: Math.round(amount * 100), // Ensure integer in subunits
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
