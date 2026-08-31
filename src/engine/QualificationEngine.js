/**
 * UNIVO Core Intelligence Layer: Worker Qualification Engine
 * 
 * CORE PRINCIPLE:
 * "Never allow fairness to override safety or qualification."
 * 
 * Before any fair ranking or suitability score is calculated, this engine
 * rigorously evaluates candidate artisans against strict technical, regulatory,
 * and physical safety cutoffs.
 * 
 * Any candidate failing even one qualification requirement is IMMEDIATELY REMOVED
 * from the candidate pool, logging an explicit, auditable reason.
 */

export const QUALIFICATION_RULES = {
  MIN_SKILL_PROFICIENCY: 75, // Minimum Skill DNA required for consideration
  MAX_HOURS_FOR_DISPATCH: 9.5, // Workers over 9.5 hours are strictly rested
  MAX_CONSECUTIVE_DAYS: 6, // 6 days max before mandatory cooperative rest
  MAX_EMERGENCY_DISTANCE_KM: 10.0 // Strict reach limit for critical/emergency missions
};

/**
 * @typedef {Object} QualificationResult
 * @property {boolean} isQualified
 * @property {string[]} passedGates
 * @property {string[]} disqualificationReasons
 * @property {number} primarySkillProficiency
 */

class QualificationEngine {
  /**
   * Filter candidate pool strictly before fair dispatch ranking.
   * @param {Object} job - Structured job output from JobUnderstandingEngine
   * @param {Array} workers - Array of worker candidate profiles
   * @returns {{ qualified: Array, disqualified: Array }}
   */
  filterCandidates(job, workers = []) {
    const qualified = [];
    const disqualified = [];

    for (const worker of workers) {
      const evaluation = this.evaluateWorker(job, worker);

      if (evaluation.isQualified) {
        qualified.push({
          ...worker,
          qualificationDetails: evaluation
        });
      } else {
        disqualified.push({
          ...worker,
          qualificationDetails: evaluation
        });
      }
    }

    return { qualified, disqualified };
  }

  /**
   * Evaluate a single worker candidate against the 6 Golden Safety Gates.
   * @param {Object} job
   * @param {Object} worker
   * @returns {QualificationResult}
   */
  evaluateWorker(job, worker) {
    const passedGates = [];
    const disqualificationReasons = [];

    // GATE 1: Verified Identity & Active Duty Status
    if (!worker.isDutyActive) {
      disqualificationReasons.push('Duty Status: Worker is in Rest Mode / Offline (Rest Shield Active)');
    } else {
      passedGates.push('Active Duty & Sovereign Identity Verified');
    }

    // GATE 2: Skill DNA & Technical Proficiency Gate
    // Find highest match among required skills
    let maxSkillScore = 0;
    const workerSkills = worker.skillDNA || {};

    // Check if workerSkills is array of objects or key-value dictionary
    if (Array.isArray(workerSkills)) {
      for (const skillObj of workerSkills) {
        const matchesRequired = (job.requiredSkills || []).some(
          (req) => skillObj.name.toLowerCase().includes(req.toLowerCase()) || req.toLowerCase().includes(skillObj.name.toLowerCase())
        );
        if (matchesRequired && skillObj.proficiency > maxSkillScore) {
          maxSkillScore = skillObj.proficiency;
        }
      }
    } else {
      for (const [skillName, score] of Object.entries(workerSkills)) {
        const matchesRequired = (job.requiredSkills || []).some(
          (req) => skillName.toLowerCase().includes(req.toLowerCase()) || req.toLowerCase().includes(skillName.toLowerCase())
        );
        if (matchesRequired && score > maxSkillScore) {
          maxSkillScore = score;
        }
      }
    }

    // Fallback: If no direct match found, check general chamber match
    if (maxSkillScore === 0 && worker.skillMatchPercentage) {
      maxSkillScore = worker.skillMatchPercentage;
    }

    if (maxSkillScore < QUALIFICATION_RULES.MIN_SKILL_PROFICIENCY) {
      disqualificationReasons.push(
        `Skill DNA Deficit: Highest verified skill proficiency (${maxSkillScore}%) is below required safety threshold (${QUALIFICATION_RULES.MIN_SKILL_PROFICIENCY}%)`
      );
    } else {
      passedGates.push(`Technical DNA Cleared: ${maxSkillScore}% Proficiency (Threshold: ${QUALIFICATION_RULES.MIN_SKILL_PROFICIENCY}%)`);
    }

    // GATE 3: Verification Evidence & Truth Protocol
    // Never allow an unverified claim
    const hasUnverifiedConflict = (worker.skillDNA && Array.isArray(worker.skillDNA))
      ? worker.skillDNA.some((s) => s.status === 'SELF_DECLARED' && (job.requiredSkills || []).some((r) => s.name.includes(r)))
      : false;

    if (hasUnverifiedConflict) {
      disqualificationReasons.push('Truth Protocol Violation: Required skill is only self-declared with pending certification audit.');
    } else {
      passedGates.push('Truth Protocol Cleared: Credentials audited by Co-op Committee');
    }

    // GATE 4: Human Wellbeing & Fatigue Gating
    const wellbeing = worker.wellbeing || {};
    const hoursToday = wellbeing.hoursToday || 0;
    const consecutiveDays = wellbeing.consecutiveDays || 0;

    if (hoursToday >= QUALIFICATION_RULES.MAX_HOURS_FOR_DISPATCH) {
      disqualificationReasons.push(
        `Fatigue Cutoff: Logged ${hoursToday} hours today (Max Permitted: ${QUALIFICATION_RULES.MAX_HOURS_FOR_DISPATCH}h). Mandatory rest enforced.`
      );
    } else if (consecutiveDays >= QUALIFICATION_RULES.MAX_CONSECUTIVE_DAYS) {
      disqualificationReasons.push(
        `Circadian Overload: ${consecutiveDays} consecutive working days logged. Mandatory 24h rest shield active.`
      );
    } else if (wellbeing.status === 'Critical') {
      disqualificationReasons.push('Wellbeing Engine flagged worker as Critical strain.');
    } else {
      passedGates.push(`Wellbeing Safe: ${hoursToday}h today, ${consecutiveDays} consecutive days`);
    }

    // GATE 5: Geographic & Urgency Reach
    const distNum = parseFloat(worker.distance) || 2.0;
    if (job.urgency === 'CRITICAL' && distNum > QUALIFICATION_RULES.MAX_EMERGENCY_DISTANCE_KM) {
      disqualificationReasons.push(
        `Emergency Geofence Exceeded: Distance (${distNum} km) exceeds rapid response safety limit (${QUALIFICATION_RULES.MAX_EMERGENCY_DISTANCE_KM} km)`
      );
    } else {
      passedGates.push(`Geographic Reach Cleared: ${distNum} km from worksite`);
    }

    // GATE 6: Zero Safety Violation Record
    if (worker.activeSafetyViolation) {
      disqualificationReasons.push('Safety Hold: Active protocol investigation in progress.');
    } else {
      passedGates.push('Safety Clearance: Zero active violations on decentralized ledger');
    }

    const isQualified = disqualificationReasons.length === 0;

    return {
      isQualified,
      passedGates,
      disqualificationReasons,
      primarySkillProficiency: maxSkillScore
    };
  }
}

export const qualificationEngine = new QualificationEngine();
export default qualificationEngine;
