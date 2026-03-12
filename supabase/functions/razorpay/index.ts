
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.1";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Create a Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Get Razorpay API keys from environment variables
const RAZORPAY_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID") || "";
const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET") || "";

console.log("Razorpay Edge Function Started");
console.log("Environment Check:", {
  keyId: RAZORPAY_KEY_ID ? "✓ Present" : "✗ Missing",
  keySecret: RAZORPAY_KEY_SECRET ? "✓ Present" : "✗ Missing",
  supabaseUrl: supabaseUrl ? "✓ Present" : "✗ Missing",
  supabaseKey: supabaseKey ? "✓ Present" : "✗ Missing"
});

// Helper function to generate a robust order ID
function generateOrderId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `order_${timestamp}_${random}`;
}

// Create Razorpay order using the API
async function createRazorpayOrder(amount: number, currency: string, receipt: string, notes: any) {
  try {
    // Ensure API keys are present
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      console.error("❌ Razorpay API keys not configured");
      throw new Error('Razorpay API keys not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your Supabase secrets.');
    }

    console.log("🔑 Creating Razorpay order with credentials");
    const credentials = btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`);

    const orderData = {
      amount: amount,
      currency: currency,
      receipt: receipt,
      notes: notes,
      payment_capture: 1
    };

    console.log('📝 Order data prepared:', {
      amount: orderData.amount,
      currency: orderData.currency,
      receipt: orderData.receipt
    });

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });

    const responseText = await response.text();
    console.log('🌐 Razorpay API response status:', response.status);

    if (!response.ok) {
      console.error('❌ Razorpay API error:', response.status, responseText);

      // Parse error for better user feedback
      let errorMessage = 'Payment service error';
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.error?.description || errorData.message || errorMessage;
      } catch {
        errorMessage = `HTTP ${response.status}: ${responseText}`;
      }

      throw new Error(`Razorpay API error: ${errorMessage}`);
    }

    const parsedResponse = JSON.parse(responseText);
    console.log('✅ Razorpay order created successfully:', parsedResponse.id);
    return parsedResponse;
  } catch (error) {
    console.error('💥 Error creating Razorpay order:', error);
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("✋ CORS preflight request received");
    return new Response(null, { headers: corsHeaders, status: 200 });
  }

  try {
    console.log("🚀 Razorpay payment order creation started");

    // Parse request body
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (error) {
      console.error("❌ Invalid JSON in request body:", error);
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body", success: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const { amount, currency = "USD", receipt, notes } = requestBody;

    console.log(`🌍 International Order Creation: ${amount} ${currency} (Receipt: ${receipt || 'autogen'})`);

    // Validate amount
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      console.error("❌ Invalid amount:", amount);
      return new Response(
        JSON.stringify({ error: "Valid amount (number) is required", success: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Validate amount is in cents (minimum 100 cents = 1 USD)
    if (amount < 100) {
      console.error("❌ Amount too small:", amount);
      return new Response(
        JSON.stringify({ error: "Amount must be at least 100 cents (1 USD)", success: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    console.log(`💰 Processing order creation for amount: ${amount} ${currency}`);

    let orderId: string;
    let orderData: any;

    // Create real Razorpay order
    try {
      orderData = await createRazorpayOrder(
        amount,
        currency,
        receipt || generateOrderId(),
        notes || {}
      );
      orderId = orderData.id;
      console.log('✅ Razorpay order created successfully:', orderId);
    } catch (razorpayError) {
      console.error('💥 Razorpay order creation failed:', razorpayError);

      const errorMessage = razorpayError instanceof Error ? razorpayError.message : "Unknown Razorpay error";
      return new Response(
        JSON.stringify({
          error: "Payment order creation failed",
          message: errorMessage,
          success: false
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    // Store order details in database for tracking
    try {
      const { error: dbError } = await supabase
        .from('payment_orders')
        .insert({
          order_id: orderId,
          amount: amount,
          currency: currency,
          receipt: receipt || orderId,
          notes: notes || {},
          status: 'created',
          created_at: new Date().toISOString()
        });

      if (dbError) {
        console.error("⚠️ Database storage warning:", dbError);
        // Don't fail the request if database storage fails
      } else {
        console.log("💾 Order stored in database successfully");
      }
    } catch (dbError) {
      console.error("⚠️ Database operation warning:", dbError);
      // Don't fail the request if database storage fails
    }

    const successResponse = {
      order_id: orderId,
      amount: amount,
      currency: currency,
      key_id: RAZORPAY_KEY_ID,
      status: orderData.status || "created",
      success: true
    };

    console.log("🎉 Payment order creation completed successfully");

    return new Response(
      JSON.stringify(successResponse),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );

  } catch (error) {
    console.error("💥 Unexpected error processing request:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

    return new Response(
      JSON.stringify({
        error: "Payment initialization failed",
        message: errorMessage,
        success: false
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
