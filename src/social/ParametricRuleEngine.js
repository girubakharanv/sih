/**
 * UNIVO Social Infrastructure: Parametric Protection Rule Engine
 * 
 * CORE PRINCIPLE:
 * Prototype rule engine for measurable environmental and catastrophic telemetry:
 * - Extreme Heat (Temperature >= 42C, Wet-bulb >= 32C)
 * - Torrential Rainfall (>= 75 mm/hr)
 * - Urban Flash Flood Inundation (>= 0.40m)
 * 
 * IMPORTANT: Labeled strictly as a Mutual Aid / Parametric Protection Concept Prototype.
 */

export const PARAMETRIC_THRESHOLDS = {
  EXTREME_HEAT_TEMP_C: 42.0,
  EXTREME_HEAT_WET_BULB_C: 32.0,
  HEAVY_RAIN_MM_PER_HR: 75.0,
  FLASH_FLOOD_DEPTH_METERS: 0.40
};

export class ParametricRuleEngine {
  /**
   * Evaluate regional sensor telemetry against cooperative mutual aid trigger thresholds.
   * @param {Object} telemetry - Sensor inputs
   * @returns {Object} Trigger results, calculated relief stipends, and non-punitive rest orders
   */
  evaluateTriggers(telemetry = {}) {
    const temp = telemetry.ambientTemperature ?? 43.5;
    const rain = telemetry.rainfallRate ?? 85;
    const flood = telemetry.floodInundationDepth ?? 0.45;

    const triggeredRules = [];
    let totalDirectStipend = 0;
    const automatedDirectives = [];

    // RULE 1: EXTREME HEAT PROTOCOL
    if (temp >= PARAMETRIC_THRESHOLDS.EXTREME_HEAT_TEMP_C) {
      triggeredRules.push({
        id: 'RULE-HEAT-01',
        title: 'Extreme Heatwave Parametric Alert',
        metric: `${temp}°C (Threshold: ≥ ${PARAMETRIC_THRESHOLDS.EXTREME_HEAT_TEMP_C}°C)`,
        action: 'Mandatory midday break authorization (12:00 - 15:00) with zero algorithm penalty.',
        stipendGranted: '₹350 / day Hydration & Heat Shield Subsidy'
      });
      totalDirectStipend += 350;
      automatedDirectives.push('Non-punitive midday work stoppage authorized for all outdoor technicians.');
    }

    // RULE 2: HEAVY MONSOON RAIN PROTOCOL
    if (rain >= PARAMETRIC_THRESHOLDS.HEAVY_RAIN_MM_PER_HR) {
      triggeredRules.push({
        id: 'RULE-RAIN-02',
        title: 'Torrential Precipitation Mutual Shield',
        metric: `${rain} mm/hr (Threshold: ≥ ${PARAMETRIC_THRESHOLDS.HEAVY_RAIN_MM_PER_HR} mm/hr)`,
        action: 'Severe weather travel hazard bonus activated (+₹250/trip). Right of refusal guaranteed.',
        stipendGranted: '₹250 per emergency transit mission'
      });
      totalDirectStipend += 250;
      automatedDirectives.push('Travel hazard bonus active. Refusing transport carries zero score reduction.');
    }

    // RULE 3: URBAN FLASH FLOOD PROTOCOL
    if (flood >= PARAMETRIC_THRESHOLDS.FLASH_FLOOD_DEPTH_METERS) {
      triggeredRules.push({
        id: 'RULE-FLOOD-03',
        title: 'Inundation Sensor Water Barrier Protocol',
        metric: `${flood}m flood depth (Threshold: ≥ ${PARAMETRIC_THRESHOLDS.FLASH_FLOOD_DEPTH_METERS}m)`,
        action: 'Automated wage protection guarantee triggered. Co-op Emergency Strike Teams mobilised.',
        stipendGranted: '₹1,200 / day Guaranteed Baseline Income Protection'
      });
      totalDirectStipend += 1200;
      automatedDirectives.push('Guaranteed ₹1,200 baseline income released to all members in affected sectors.');
    }

    const isAnyTriggerActive = triggeredRules.length > 0;

    return {
      isAnyTriggerActive,
      triggeredRulesCount: triggeredRules.length,
      triggeredRules,
      totalDirectStipend: `₹${totalDirectStipend}`,
      automatedDirectives,
      disclaimer: 'PARAMETRIC PROTECTION PROTOTYPE CONCEPT: Demonstrates automated, objective rule-based mutual aid triggers using environmental sensor feeds. Not an insurance policy.'
    };
  }
}

export const parametricRuleEngine = new ParametricRuleEngine();
export default parametricRuleEngine;
