
// This file now redirects to the secure payment service
export { secureGenerateOrderId as generateOrderId, secureRecordPurchase as recordPurchase } from './securePaymentService';
