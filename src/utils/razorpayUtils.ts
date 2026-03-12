
import { supabase } from "@/integrations/supabase/client";

// Type for Razorpay window
type RazorpayWindow = Window & {
  Razorpay?: any;
};

// Types for Razorpay checkout options
export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
    escape?: boolean;
    backdrop?: boolean;
  };
  retry?: {
    enabled?: boolean;
  };
}

// Type for Razorpay response
export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Function to load Razorpay script
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if Razorpay is already loaded
    if ((window as RazorpayWindow).Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      console.log('Razorpay script loaded successfully');
      resolve(true);
    };
    script.onerror = (error) => {
      console.error('Failed to load Razorpay script:', error);
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Function to generate order ID via Supabase Edge Function
export const generateOrderId = async (amount: number, currency: string = 'USD'): Promise<string> => {
  try {
    console.log('Generating order ID for amount:', amount, 'currency:', currency);

    const { data, error } = await supabase.functions.invoke('razorpay', {
      body: {
        amount: amount,
        currency: currency
      }
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(`Payment initialization failed: ${error.message}`);
    }

    if (!data || !data.order_id) {
      console.error('Invalid response from payment service:', data);
      throw new Error('Invalid response from payment service');
    }

    console.log('Order ID generated successfully:', data.order_id);
    return data.order_id;
  } catch (error) {
    console.error('Error in generateOrderId:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to initialize payment');
  }
};

// Enhanced payment processing with better error handling
export const processPayment = (options: Partial<RazorpayOptions>): Promise<RazorpayResponse> => {
  return new Promise((resolve, reject) => {
    loadRazorpayScript().then((isScriptLoaded) => {
      if (!isScriptLoaded) {
        reject(new Error('Failed to load payment gateway. Please check your internet connection.'));
        return;
      }

      const rzp = new (window as RazorpayWindow).Razorpay({
        ...options,
        handler: function (response: RazorpayResponse) {
          console.log('Payment successful:', response);
          resolve(response);
        },
        modal: {
          ondismiss: function () {
            console.log('Payment modal dismissed by user');
            reject(new Error('Payment cancelled by user'));
          },
          escape: true,
          backdrop: true,
          ...options.modal
        },
        retry: {
          enabled: true,
          ...options.retry
        }
      });

      rzp.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response.error);
        reject(new Error(`Payment failed: ${response.error.description || 'Unknown error'}`));
      });

      rzp.open();
    }).catch(error => {
      console.error('Error in processPayment:', error);
      reject(error);
    });
  });
};
