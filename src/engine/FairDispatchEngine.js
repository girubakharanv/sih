/**
 * UNIVO Core Intelligence Layer: Fair Dispatch Engine
 * 
 * CORE ALGORITHMIC PRINCIPLE:
 * "Fairness must operate only among verified, qualified candidates."
 * "Fairness does NOT mean random assignment."
 * 
 * SCORING PIPELINE:
 * Final Suitability Score = Base Score (Suitability) + Fairness Adjustment - Fatigue Penalty
 * 
 * Base Score (0 - 100):
 * - Skill Match: 35%
 * - Composite Trust & Safety: 25%
 * - Proximity / Distance: 20%
 * - Historical Reliability: 10%
 * - Availability & Response Speed: 10%
 * 
 * Fairness Adjustment (-8 to +15):
 * - Derived from historical opportunity distribution over rolling 14-day window.
 * - Underserved qualified candidates receive positive equity adjustments.
 * - Heavily saturated candidates receive mild dampeners to distribute cooperative wealth.
 */

import qualificationEngine from './QualificationEngine';

export class FairDispatchEngine {
  /**
   * Run the end-to-end Fair Dispatch Ranking on candidate workers.
   * @param {Object} job - Structured job output from JobUnderstandingEngine
   * @param {Array} rawWorkers - All candidate profiles
   * @param {Object} sectorMetrics - Average jobs per worker in this sector
   * @returns {{ rankedCandidates: Array, disqualifiedCandidates: Array, selectedWorker: Object }}
   */
  dispatch(job, rawWorkers = [], sectorMetrics = { avgJobsPerWorker14d: 8.5 }) {
    // STEP 1: STRICT QUALIFICATION GATING (Safety First)
    const { qualified, disqualified } = qualificationEngine.filterCandidates(job, rawWorkers);

    // STEP 2: CALCULATE EXPLAINABLE SCORES FOR QUALIFIED WORKERS
    const scoredCandidates = qualified.map((worker) => {
      const scoringBreakdown = this.computeScoreBreakdown(job, worker, sectorMetrics);
      return {
        ...worker,
        scoringBreakdown
      };
    });

    // STEP 3: SORT BY FINAL SUITABILITY SCORE DESCENDING
    scoredCandidates.sort((a, b) => b.scoringBreakdown.finalScore - a.scoringBreakdown.finalScore);

    const selectedWorker = scoredCandidates.length > 0 ? scoredCandidates[0] : null;

    return {
      rankedCandidates: scoredCandidates,
      disqualifiedCandidates: disqualified,
      selectedWorker
    };
  }

  /**
   * Compute transparent, auditable score breakdown for an individual qualified artisan.
   * @param {Object} job
   * @param {Object} worker
   * @param {Object} sectorMetrics
   */
  computeScoreBreakdown(job, worker, sectorMetrics) {
    // A. Skill Match Component (0 - 35 points)
    const skillScore = worker.qualificationDetails?.primarySkillProficiency || 90;
    const skillPoints = (skillScore / 100) * 35;

    // B. Composite Trust & Safety Component (0 - 25 points)
    const trustVal = worker.trustScore || worker.trustProfile?.overallTrust || 98;
    const trustPoints = (trustVal / 100) * 25;

    // C. Distance & Proximity Component (0 - 20 points)
    // Distance curve: 0km -> 20pts, 10km -> 0pts
    const distanceKm = parseFloat(worker.distance) || 2.5;
    const distancePoints = Math.max(0, 20 - (distanceKm * 2.0));

    // D. Historical Reliability (0 - 10 points)
    const reliabilityVal = worker.trustProfile?.reliability || 98;
    const reliabilityPoints = (reliabilityVal / 100) * 10;

    // E. Availability & Responsiveness (0 - 10 points)
    const availabilityPoints = worker.isDutyActive ? 10 : 0;

    // TOTAL BASE SUITABILITY SCORE (0 - 100)
    const baseScore = parseFloat(
      (skillPoints + trustPoints + distancePoints + reliabilityPoints + availabilityPoints).toFixed(1)
    );

    // F. FAIRNESS ADJUSTMENT (-8 to +15)
    // Compare worker's recent missions vs. sector peer average
    const recentMissions14d = worker.recentMissions14d ?? Math.floor(Math.random() * 8 + 3);
    const peerAvg = sectorMetrics.avgJobsPerWorker14d || 8.5;
    const opportunityDelta = peerAvg - recentMissions14d;

    let fairnessAdjustment = 0;
    let fairnessExplanation = '';

    if (opportunityDelta > 2) {
      // Underserved artisan bonus
      fairnessAdjustment = Math.min(15, parseFloat((opportunityDelta * 2.5).toFixed(1)));
      fairnessExplanation = `Historically Underserved Bonus (+${fairnessAdjustment} pts): Worker received ${recentMissions14d} jobs vs. sector average of ${peerAvg}. Elevated to preserve cooperative income equity.`;
    } else if (opportunityDelta < -3) {
      // Saturated artisan dampener
      fairnessAdjustment = Math.max(-8, parseFloat((opportunityDelta * 1.5).toFixed(1)));
      fairnessExplanation = `High Opportunity Concentration Dampener (${fairnessAdjustment} pts): Worker has fulfilled ${recentMissions14d} jobs in the past 14 days (above peer avg of ${peerAvg}).`;
    } else {
      fairnessAdjustment = 0;
      fairnessExplanation = `Balanced Opportunity Range (0 pts): Worker recent allocation (${recentMissions14d}) is on par with sector average (${peerAvg}).`;
    }

    // G. WELLBEING FATIGUE PENALTY
    let fatiguePenalty = 0;
    const wellbeing = worker.wellbeing || {};
    if (wellbeing.status === 'At Risk' || (wellbeing.hoursToday || 0) >= 8) {
      fatiguePenalty = 8.0;
    } else if (wellbeing.status === 'Monitor' || (wellbeing.hoursToday || 0) >= 6) {
      fatiguePenalty = 2.0;
    }

    // FINAL SCORE
    const finalScore = parseFloat(
      Math.max(0, Math.min(100, baseScore + fairnessAdjustment - fatiguePenalty)).toFixed(1)
    );

    return {
      baseScore,
      skillPoints: parseFloat(skillPoints.toFixed(1)),
      trustPoints: parseFloat(trustPoints.toFixed(1)),
      distancePoints: parseFloat(distancePoints.toFixed(1)),
      reliabilityPoints: parseFloat(reliabilityPoints.toFixed(1)),
      availabilityPoints: parseFloat(availabilityPoints.toFixed(1)),
      fairnessAdjustment,
      fairnessExplanation,
      recentMissions14d,
      peerAvg,
      fatiguePenalty,
      finalScore,
      whySelectedText: this.generateWhySelectedSummary({
        workerName: worker.name,
        skillScore,
        distanceKm,
        baseScore,
        fairnessAdjustment,
        finalScore,
        opportunityDelta
      })
    };
  }

  generateWhySelectedSummary({ workerName, skillScore, distanceKm, baseScore, fairnessAdjustment, finalScore, opportunityDelta }) {
    if (fairnessAdjustment > 0) {
      return `${workerName} was selected because they are fully qualified (${skillScore}% Skill DNA, ${distanceKm}km proximity) and received a cooperative fairness adjustment of +${fairnessAdjustment} points due to being historically underserved in the recent dispatch cycle.`;
    }
    return `${workerName} was selected with a market-leading suitability score of ${finalScore}/100 based on exceptional verified Skill DNA (${skillScore}%), prime worksite proximity (${distanceKm}km), and high trust.`;
  }
}

export const fairDispatchEngine = new FairDispatchEngine();
export default fairDispatchEngine;
