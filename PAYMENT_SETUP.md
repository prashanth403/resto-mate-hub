# Payment Integration Setup Guide

This guide explains how to set up the Razorpay payment integration for the restaurant booking application.

## Features Added

1. **Indian Currency Support**: All prices are now displayed in Indian Rupees (INR)
2. **Razorpay Integration**: Secure payment processing through Razorpay
3. **Booking Payment Flow**: Complete booking and payment workflow
4. **Demo Payment Mode**: Test payment functionality in development

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Razorpay Configuration
VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_TEST_KEY_ID
VITE_RAZORPAY_KEY_SECRET=YOUR_TEST_KEY_SECRET

# For production, use live keys
# VITE_RAZORPAY_KEY_ID=rzp_live_YOUR_LIVE_KEY_ID
# VITE_RAZORPAY_KEY_SECRET=YOUR_LIVE_KEY_SECRET
```

### 2. Razorpay Account Setup

1. Sign up for a Razorpay account at [razorpay.com](https://razorpay.com)
2. Get your test API keys from the Razorpay Dashboard
3. Replace the placeholder values in your `.env` file

### 3. Backend API Setup

The current implementation includes mock API endpoints for testing. For production, you'll need to create these endpoints:

#### Required Endpoints:

1. **POST /api/create-order**
   - Creates a Razorpay order
   - Returns order ID

2. **POST /api/verify-payment**
   - Verifies payment signature
   - Returns verification status

### 4. Payment Flow

1. User fills booking form
2. System calculates booking amount (₹500 per person + dinner premium + 18% GST)
3. User proceeds to payment
4. Razorpay payment gateway opens
5. Payment is processed
6. Booking is confirmed

## Development Mode

In development mode, the app uses a demo payment form instead of the actual Razorpay gateway. This allows for testing without real payment processing.

## Production Deployment

1. Replace test keys with live keys
2. Implement proper backend API endpoints
3. Set up webhook handling for payment notifications
4. Configure proper error handling and logging

## Currency Features

- **Indian Rupee Formatting**: Uses `Intl.NumberFormat` for proper INR display
- **Exchange Rate**: Approximate USD to INR conversion (83.5:1)
- **Tax Calculation**: 18% GST on booking amounts
- **Dinner Premium**: 20% premium for dinner bookings (6 PM onwards)

## Security Considerations

1. Never expose API keys in client-side code
2. Always verify payment signatures on the backend
3. Use HTTPS in production
4. Implement proper error handling
5. Log all payment attempts

## Testing

1. Use Razorpay test cards for testing
2. Test both success and failure scenarios
3. Verify payment confirmation flow
4. Test booking cancellation

## Files Modified/Created

- `src/lib/currency.ts` - Currency formatting utilities
- `src/lib/razorpay.ts` - Razorpay integration
- `src/lib/mock-api.ts` - Mock API for development
- `src/components/payment/PaymentForm.tsx` - Payment form component
- `src/components/payment/DemoPayment.tsx` - Demo payment component
- `src/pages/Booking.tsx` - Updated booking flow
- `src/pages/Menu.tsx` - Updated with INR prices
- `src/App.tsx` - Added mock API setup

## Support

For issues with the payment integration, check:
1. Razorpay documentation
2. Network connectivity
3. API key configuration
4. Backend endpoint availability
