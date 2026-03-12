
import { useState } from 'react';
import { toast } from "sonner";
import { useSoundEffects } from './useSoundEffects';

// Razorpay types
interface RazorpayOptions {
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

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const useRazorpay = () => {
  const [loading, setLoading] = useState(false);
  const { playLoading, playError, playPurchaseSuccess } = useSoundEffects();

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        console.log('Razorpay already loaded');
        resolve(true);
        return;
      }

      console.log('Loading Razorpay script...');
      playLoading();
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        console.log('Razorpay script loaded successfully');
        resolve(true);
      };
      script.onerror = (error) => {
        console.error('Failed to load Razorpay script:', error);
        playError();
        toast.error("Payment System Error", {
          description: "Unable to load payment system. Please check your internet connection and try again."
        });
        resolve(false);
      };
      script.async = true;
      document.body.appendChild(script);
    });
  };

  const processPayment = async (options: RazorpayOptions): Promise<RazorpayResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        setLoading(true);

        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          throw new Error("Failed to load payment system. Please refresh the page and try again.");
        }

        // Validate required options
        if (!options.key || !options.amount || !options.order_id) {
          throw new Error("Invalid payment configuration. Please try again.");
        }

        const rzp = new window.Razorpay({
          ...options,
          handler: function (response: RazorpayResponse) {
            console.log('Payment successful:', response);
            playPurchaseSuccess();
            setLoading(false);
            resolve(response);
          },
          modal: {
            ondismiss: function () {
              console.log('Payment modal dismissed by user');
              setLoading(false);
              toast.info("Payment Cancelled", {
                description: "Payment was cancelled. You can try again anytime."
              });
              reject(new Error('Payment cancelled by user'));
            },
            escape: true,
            backdrop: false,
            ...options.modal
          },
          retry: {
            enabled: true,
            ...options.retry
          }
        });

        rzp.on('payment.failed', function (response: any) {
          console.error('Payment failed:', response);
          playError();
          setLoading(false);
          const errorCode = response.error?.code || 'UNKNOWN';
          const errorDesc = response.error?.description || "Payment failed. Please try again.";

          toast.error("Payment Failed", {
            description: `${errorDesc} (Error: ${errorCode})`
          });
          reject(new Error(`Payment failed: ${errorDesc}`));
        });

        rzp.on('payment.cancelled', function () {
          console.log('Payment cancelled by user');
          setLoading(false);
          toast.info("Payment Cancelled", {
            description: "Payment was cancelled. You can try again anytime."
          });
          reject(new Error('Payment cancelled by user'));
        });

        console.log('Opening Razorpay checkout with options:', {
          key: options.key,
          amount: options.amount,
          order_id: options.order_id
        });

        rzp.open();
      } catch (error) {
        console.error('Error in processPayment:', error);
        playError();
        setLoading(false);
        reject(error);
      }
    });
  };

  return {
    processPayment,
    loading,
    loadRazorpayScript
  };
};
