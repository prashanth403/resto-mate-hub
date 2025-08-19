// Razorpay payment integration
declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface PaymentOptions {
  amount: number;
  currency: string;
  name: string;
  description: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    bookingId: string;
    guests: string;
    date: string;
    time: string;
  };
  theme: {
    color: string;
  };
}

export const loadRazorpayScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Razorpay script'));
    document.head.appendChild(script);
  });
};

export const createPaymentOrder = async (paymentData: {
  amount: number;
  currency: string;
  receipt: string;
}): Promise<{ id: string }> => {
  // In a real application, this would call your backend API
  // For demo purposes, we'll simulate the order creation
  const response = await fetch('/api/create-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  });

  if (!response.ok) {
    throw new Error('Failed to create payment order');
  }

  return response.json();
};

export const initializePayment = async (options: PaymentOptions): Promise<void> => {
  try {
    await loadRazorpayScript();

    const razorpayOptions = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_YOUR_TEST_KEY', // Replace with your actual key
      amount: options.amount * 100, // Razorpay expects amount in paise
      currency: options.currency,
      name: options.name,
      description: options.description,
      order_id: options.orderId,
      prefill: options.prefill,
      notes: options.notes,
      theme: options.theme,
      handler: function (response: any) {
        console.log('Payment successful:', response);
        // Handle successful payment
        window.dispatchEvent(new CustomEvent('payment-success', { detail: response }));
      },
      modal: {
        ondismiss: function () {
          console.log('Payment modal closed');
          window.dispatchEvent(new CustomEvent('payment-cancelled'));
        }
      }
    };

    const razorpay = new window.Razorpay(razorpayOptions);
    razorpay.open();
  } catch (error) {
    console.error('Payment initialization failed:', error);
    throw error;
  }
};

export const verifyPayment = async (paymentId: string, orderId: string, signature: string): Promise<boolean> => {
  // In a real application, this would call your backend API for signature verification
  const response = await fetch('/api/verify-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      paymentId,
      orderId,
      signature,
    }),
  });

  if (!response.ok) {
    return false;
  }

  const result = await response.json();
  return result.verified;
};
