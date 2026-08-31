/**
 * UNIVO Payment Gateway Abstraction
 * 
 * CORE PRINCIPLE:
 * "Create payment abstraction. Never hardcode real payment secrets."
 * 
 * Provides unified interface for handling customer service settlements,
 * escrow holds, release to artisan UPI VPAs, and automated refunds without
 * binding to any single proprietary bank or leaking secrets.
 */

export class PaymentGatewayAbstraction {
  constructor(config = {}) {
    this.adapterType = config.adapterType || process.env.PAYMENT_ADAPTER || 'COOP_SANDBOX_ADAPTER';
    this.currency = config.currency || 'INR';
  }

  /**
   * Create Escrow Hold for incoming customer service request.
   */
  async createEscrowHold({ jobId, customerId, amount, paymentMethod = 'UPI' }) {
    // Generates simulated gateway transaction reference
    const gatewayReference = `UNV-TXN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    return {
      success: true,
      status: 'ESCROWED',
      gatewayReference,
      jobId,
      customerId,
      amount: parseFloat(amount),
      currency: this.currency,
      paymentMethod,
      escrowedAt: new Date().toISOString(),
      instructions: paymentMethod === 'UPI' ? 'Prompt customer UPI app for cooperative escrow hold' : 'Card 3D Secure hold completed'
    };
  }

  /**
   * Settle Escrow Hold upon completed mission sign-off.
   * Releases worker share directly to worker's sovereign UPI VPA.
   */
  async settleEscrowToWorker({ gatewayReference, workerUpiVpa, workerShareAmount }) {
    if (!workerUpiVpa) {
      throw new Error('Worker sovereign UPI VPA is required for disbursement.');
    }

    const disbursementTxnId = `DISB-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;

    return {
      success: true,
      status: 'SETTLED',
      originalReference: gatewayReference,
      disbursementTxnId,
      workerUpiVpa,
      amountSettled: parseFloat(workerShareAmount),
      currency: this.currency,
      settledAt: new Date().toISOString(),
      ledgerTrace: 'Instant UPI 2.0 Direct Credit Completed'
    };
  }

  /**
   * Refund Escrow in case of pre-dispatch cancellation.
   */
  async refundEscrow({ gatewayReference, reason }) {
    return {
      success: true,
      status: 'REFUNDED',
      gatewayReference,
      refundReason: reason || 'Customer cancelled prior to artisan departure',
      refundedAt: new Date().toISOString()
    };
  }
}

export const paymentGateway = new PaymentGatewayAbstraction();
export default paymentGateway;
