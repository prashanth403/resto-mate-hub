// Mock API service for testing payment integration
// In a real application, these would be actual API endpoints

export const mockCreateOrder = async (paymentData: {
  amount: number;
  currency: string;
  receipt: string;
}): Promise<{ id: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate a mock order ID
  const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  console.log('Mock order created:', { orderId, ...paymentData });
  
  return { id: orderId };
};

export const mockVerifyPayment = async (paymentId: string, orderId: string, signature: string): Promise<{ verified: boolean }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock verification - in real app, this would verify the signature
  const verified = paymentId && orderId && signature;
  
  console.log('Mock payment verification:', { paymentId, orderId, signature, verified });
  
  return { verified: !!verified };
};

// Mock fetch for payment endpoints
export const setupMockFetch = () => {
  const originalFetch = window.fetch;
  
  window.fetch = async (url: string, options?: RequestInit) => {
    if (url === '/api/create-order') {
      const body = options?.body ? JSON.parse(options.body as string) : {};
      const result = await mockCreateOrder(body);
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (url === '/api/verify-payment') {
      const body = options?.body ? JSON.parse(options.body as string) : {};
      const result = await mockVerifyPayment(body.paymentId, body.orderId, body.signature);
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Fall back to original fetch for other URLs
    return originalFetch(url, options);
  };
};
