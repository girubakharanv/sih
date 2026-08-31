/**
 * UNIVO Core Intelligence Layer: 4-Tier Human Wellbeing Engine
 * 
 * CORE PRINCIPLE:
 * Real-time monitoring of human fatigue, circadian disruption, and shift accumulation.
 * 
 * Produces 4 Definitive Tiers:
 * 1. HEALTHY: Full dispatch suitability, zero restrictions.
 * 2. MONITOR: Approaching daily or weekly thresholds; alerts logged.
 * 3. AT RISK: Excessive fatigue; -8 score dampener applied; rest strongly advised.
 * 4. CRITICAL: 6+ consecutive days or >9.5h shift; mandatory rest shield engaged; excluded from dispatch.
 */

export class WellbeingEngine {
  /**
   * Evaluate worker wellbeing state.
   * @param {Object} workerTelemetry
   * @returns {{ status: 'Healthy' | 'Monitor' | 'At Risk' | 'Critical', score: number, recommendations: string[], triggers: string[], shieldActionRequired: boolean }}
   */
  evaluate(workerTelemetry) {
    const hoursToday = workerTelemetry.hoursToday ?? 5.5;
    const hoursWeek = workerTelemetry.hoursWeek ?? 34.0;
    const consecutiveDays = workerTelemetry.consecutiveDays ?? 4;
    const lateNightTrips = workerTelemetry.lateNightTrips ?? 1;
    const restShieldActive = workerTelemetry.restShieldActive ?? false;

    const triggers = [];
    const recommendations = [];

    // If rest shield is already active
    if (restShieldActive) {
      return {
        status: 'Healthy',
        score: 95,
        recommendations: ['Protected Rest Shield is actively engaged. Priority tier is locked in cryogenic hold.'],
        triggers: ['Voluntary / Protective Rest Shield Active'],
        shieldActionRequired: false
      };
    }

    // Critical Checks (Safety first)
    if (hoursToday >= 9.5 || consecutiveDays >= 6) {
      triggers.push(
        hoursToday >= 9.5
          ? `Extreme Daily Shift: ${hoursToday} hours exceeds 9.5h physiological ceiling.`
          : `Circadian Exhaustion: ${consecutiveDays} consecutive working days without a 24-hour reset.`
      );
      recommendations.push(
        'Engage Mandatory Cooperative Rest Shield for at least 24 hours.',
        'Notify regional Cooperative Welfare Ombudsman for wellness check.'
      );
      return {
        status: 'Critical',
        score: Math.max(30, Math.round(100 - hoursToday * 6 - consecutiveDays * 5)),
        recommendations,
        triggers,
        shieldActionRequired: true
      };
    }

    // At Risk Checks
    if (hoursToday >= 8.0 || consecutiveDays >= 5 || (hoursWeek >= 40.0 && lateNightTrips >= 3)) {
      triggers.push(
        hoursToday >= 8.0
          ? `High Daily Shift: ${hoursToday} hours recorded today.`
          : `Extended Shift Streak: ${consecutiveDays} consecutive days logged.`
      );
      recommendations.push(
        'Conclude current mission and decline optional overtime calls.',
        'A -8 points dispatch dampener is active to prioritize rested peers.'
      );
      return {
        status: 'At Risk',
        score: 68,
        recommendations,
        triggers,
        shieldActionRequired: false
      };
    }

    // Monitor Checks
    if (hoursToday >= 6.0 || hoursWeek >= 36.0 || lateNightTrips >= 2) {
      triggers.push(`Moderate accumulation: ${hoursToday}h today / ${hoursWeek}h week.`);
      recommendations.push('Plan for an evening wind-down. 2 hours of rest recommended before next shift.');
      return {
        status: 'Monitor',
        score: 82,
        recommendations,
        triggers,
        shieldActionRequired: false
      };
    }

    // Healthy Default
    return {
      status: 'Healthy',
      score: 94,
      recommendations: ['Workload balance is optimal. Full dispatch eligibility.'],
      triggers: ['All physiological and circadian indicators in green zone.'],
      shieldActionRequired: false
    };
  }
}

export const wellbeingEngine = new WellbeingEngine();
export default wellbeingEngine;
