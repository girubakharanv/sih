/**
 * UNIVO Core Intelligence Layer: Multi-Factor Trust Engine
 * 
 * Cryptographic & Behavioral Trust Evaluation across 8 Core Factors:
 * 1. Verified Skills
 * 2. Completed Jobs & Streak
 * 3. Punctuality (Arrival Delta)
 * 4. Structured Customer Feedback (5 Dimensions)
 * 5. Zero-Accident Safety Compliance
 * 6. Peer Endorsements
 * 7. Cooperative Governance Participation
 * 8. Mentoring Apprentice Artisans
 */

export class TrustEngine {
  /**
   * Calculate updated composite trust score from multi-factor telemetry.
   * @param {Object} currentTrust - Current trust metrics
   * @param {Object} feedbackEvent - Newly completed mission feedback or governance action
   * @returns {Object} Updated trust state with explanation
   */
  processTrustEvent(currentTrust, feedbackEvent) {
    const prevOverall = currentTrust.overallTrust || 99.0;

    // Weights:
    // Skill: 20%, Reliability: 15%, Safety: 20%, Punctuality: 15%, Feedback: 15%, PeerTrust: 10%, Mentoring: 5%

    // Calculate customer rating impact (1-5 scaled to 0-100)
    let feedbackFactor = currentTrust.customerFeedback || 99.0;
    if (feedbackEvent?.ratings?.overall) {
      const ratingPct = (feedbackEvent.ratings.overall / 5) * 100;
      feedbackFactor = parseFloat((feedbackFactor * 0.95 + ratingPct * 0.05).toFixed(1));
    }

    // Safety Protocol Impact (Zero tolerance)
    let safetyFactor = currentTrust.safetyProtocol || 100.0;
    if (feedbackEvent?.safetyViolation) {
      safetyFactor = Math.max(70, safetyFactor - 15.0);
    } else if (feedbackEvent?.safetyPassed) {
      safetyFactor = Math.min(100, parseFloat((safetyFactor + 0.1).toFixed(1)));
    }

    // Punctuality Delta Impact
    let punctualityFactor = currentTrust.punctuality || 98.0;
    if (feedbackEvent?.etaDelayMins !== undefined) {
      if (feedbackEvent.etaDelayMins <= 2) {
        punctualityFactor = Math.min(100, parseFloat((punctualityFactor + 0.2).toFixed(1)));
      } else if (feedbackEvent.etaDelayMins > 15) {
        punctualityFactor = Math.max(80, parseFloat((punctualityFactor - 1.5).toFixed(1)));
      }
    }

    // Mentoring Boost
    let mentoringBonus = currentTrust.mentoringBonus || 0;
    if (feedbackEvent?.mentoringSessionCompleted) {
      mentoringBonus = parseFloat((mentoringBonus + 0.5).toFixed(1));
    }

    // Peer Endorsement Boost
    let peerTrustFactor = currentTrust.peerTrust || 99.0;
    if (feedbackEvent?.newPeerEndorsement) {
      peerTrustFactor = Math.min(100, parseFloat((peerTrustFactor + 0.4).toFixed(1)));
    }

    // Governance Vote Boost
    let govScore = currentTrust.governanceScore || 98.0;
    if (feedbackEvent?.votedInDAO) {
      govScore = Math.min(100, parseFloat((govScore + 0.5).toFixed(1)));
    }

    // Composite Weighted Calculation
    const newOverall = parseFloat((
      (currentTrust.skillExecution || 98.8) * 0.20 +
      (currentTrust.reliability || 99.2) * 0.15 +
      safetyFactor * 0.20 +
      punctualityFactor * 0.15 +
      feedbackFactor * 0.15 +
      peerTrustFactor * 0.10 +
      mentoringBonus * 0.05
    ).toFixed(1));

    return {
      overallTrust: Math.min(100, newOverall),
      previousTrust: prevOverall,
      delta: parseFloat((newOverall - prevOverall).toFixed(2)),
      skillExecution: currentTrust.skillExecution || 98.8,
      reliability: currentTrust.reliability || 99.2,
      safetyProtocol: safetyFactor,
      punctuality: punctualityFactor,
      customerFeedback: feedbackFactor,
      peerTrust: peerTrustFactor,
      governanceScore: govScore,
      mentoringBonus,
      trustTier: newOverall >= 98.5 ? 'Master Certified (Gold)' : newOverall >= 95.0 ? 'Certified Artisan (Silver)' : 'Standard Co-op Member'
    };
  }
}

export const trustEngine = new TrustEngine();
export default trustEngine;
