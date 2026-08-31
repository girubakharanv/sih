import crypto from 'crypto';

/**
 * UNIVO Cryptographic Hash-Chain Ledger Service
 * 
 * CORE PRINCIPLE:
 * "Create tamper-evident/hash-chain-style ledger records for auditability."
 * "Do not claim blockchain if we are only implementing a hash chain."
 * 
 * Each ledger block links directly to the cryptographic SHA-256 hash
 * of the preceding entry, binding:
 * Hash_i = SHA-256(Hash_{i-1} + Sequence_i + Timestamp_i + GrossAmount_i + SplitPayload_i)
 */

export const GENESIS_HASH = '0000000000000000000000000000000000000000000000000000000000000000';

export class LedgerService {
  constructor(prismaClient) {
    this.prisma = prismaClient;
  }

  /**
   * Compute standard transparent 6-way split for any customer service settlement.
   * Split structure:
   * 1. Worker Share: 82.0% (Direct artisan labor payment)
   * 2. Cooperative Share: 5.0% (Platform overhead & governance)
   * 3. Worker Welfare Fund: 5.0% (Medical emergency & mutual aid reserve)
   * 4. Skill Training Fund: 3.0% (Apprentice labs, specialized courses)
   * 5. Operations & Protocol: 3.0% (Hosting & sensor feeds)
   * 6. Capital Reserve: 2.0% (Catastrophic buffer)
   */
  calculateTransparentSplit(grossAmount) {
    const amount = parseFloat(grossAmount) || 0;
    return {
      grossAmount: amount,
      workerShare: parseFloat((amount * 0.82).toFixed(2)),
      coopShare: parseFloat((amount * 0.05).toFixed(2)),
      welfareShare: parseFloat((amount * 0.05).toFixed(2)),
      trainingShare: parseFloat((amount * 0.03).toFixed(2)),
      operationsShare: parseFloat((amount * 0.03).toFixed(2)),
      capitalReserveShare: parseFloat((amount * 0.02).toFixed(2))
    };
  }

  /**
   * Calculate SHA-256 hash for a ledger record linked to previous hash.
   */
  computeRecordHash({ previousHash, sequenceNumber, timestamp, grossAmount, splitPayload }) {
    const payloadString = [
      previousHash,
      sequenceNumber,
      timestamp,
      grossAmount.toFixed(2),
      JSON.stringify(splitPayload)
    ].join('::');

    return crypto.createHash('sha256').update(payloadString).digest('hex');
  }

  /**
   * Append a new tamper-evident record to the cooperative hash-chain ledger.
   */
  async appendEntry({ jobId = null, cooperativeId = null, entryType, description, grossAmount }) {
    // 1. Fetch latest entry to find sequence and previous hash
    let latestEntry = null;
    if (this.prisma) {
      latestEntry = await this.prisma.ledgerEntry.findFirst({
        orderBy: { sequenceNumber: 'desc' }
      });
    }

    const previousHash = latestEntry ? latestEntry.currentHash : GENESIS_HASH;
    const sequenceNumber = latestEntry ? latestEntry.sequenceNumber + 1 : 1;
    const timestamp = new Date().toISOString();
    const split = this.calculateTransparentSplit(grossAmount);

    const currentHash = this.computeRecordHash({
      previousHash,
      sequenceNumber,
      timestamp,
      grossAmount: split.grossAmount,
      splitPayload: split
    });

    const recordData = {
      sequenceNumber,
      jobId,
      cooperativeId,
      entryType: entryType || 'SERVICE_SETTLEMENT',
      description: description || `Cooperative Settlement #${sequenceNumber}`,
      grossAmount: split.grossAmount,
      currency: 'INR',
      workerShare: split.workerShare,
      coopShare: split.coopShare,
      welfareShare: split.welfareShare,
      trainingShare: split.trainingShare,
      operationsShare: split.operationsShare,
      capitalReserveShare: split.capitalReserveShare,
      previousHash,
      currentHash,
      isTamperEvident: true
    };

    if (this.prisma) {
      return await this.prisma.ledgerEntry.create({ data: recordData });
    }

    return recordData;
  }

  /**
   * Verify the cryptographic integrity of the entire hash chain from Genesis.
   * Detects any altered data, split mutation, or broken links.
   */
  async verifyChainIntegrity() {
    if (!this.prisma) {
      return { isValid: true, verifiedEntriesCount: 0, reason: 'In-memory verification' };
    }

    const entries = await this.prisma.ledgerEntry.findMany({
      orderBy: { sequenceNumber: 'asc' }
    });

    let expectedPrevHash = GENESIS_HASH;

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];

      // Check link to previous hash
      if (entry.previousHash !== expectedPrevHash) {
        return {
          isValid: false,
          compromisedSequence: entry.sequenceNumber,
          reason: `Broken chain link at #${entry.sequenceNumber}: expected ${expectedPrevHash}, found ${entry.previousHash}`
        };
      }

      // Recompute and verify current hash
      const split = {
        grossAmount: entry.grossAmount,
        workerShare: entry.workerShare,
        coopShare: entry.coopShare,
        welfareShare: entry.welfareShare,
        trainingShare: entry.trainingShare,
        operationsShare: entry.operationsShare,
        capitalReserveShare: entry.capitalReserveShare
      };

      const recomputed = this.computeRecordHash({
        previousHash: entry.previousHash,
        sequenceNumber: entry.sequenceNumber,
        timestamp: entry.timestamp.toISOString(),
        grossAmount: entry.grossAmount,
        splitPayload: split
      });

      if (recomputed !== entry.currentHash) {
        return {
          isValid: false,
          compromisedSequence: entry.sequenceNumber,
          reason: `Hash mismatch at sequence #${entry.sequenceNumber}: data has been tampered with.`
        };
      }

      expectedPrevHash = entry.currentHash;
    }

    return {
      isValid: true,
      verifiedEntriesCount: entries.length,
      latestHash: expectedPrevHash,
      reason: 'Cryptographic hash chain is 100% intact and tamper-free from Genesis.'
    };
  }
}

export default LedgerService;
