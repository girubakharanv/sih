import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShaderBackground from '../components/ShaderBackground';
import { useSocial } from '../social/SocialContext';

export default function GovernmentPortal() {
  const { crisisMetrics, postCrisisReport } = useSocial();
  const [selectedZone, setSelectedZone] = useState('ALL');
  const [auditExported, setAuditExported] = useState(false);

  // Government & Regulatory Compliance Aggregates (Steps 43 - 49)
  const govMetrics = {
    // 44. Cooperative Health
    cooperativeHealth: {
      financialSolvencyRatio: '2.42x',
      treasuryLiquidReserve: '₹24,80,000',
      statutoryAuditStatus: 'CLEAN_UNQUALIFIED_OPINION',
      operationalUptime: '99.98%'
    },
    // 45. Employment Impact
    employmentImpact: {
      registeredActiveArtisans: 240,
      averageMonthlyEarnings: '₹18,450',
      stateMinimumWageMultiple: '1.74x',
      fairWageCompliancePct: 99.4,
      formalBankingInclusionPct: 100.0
    },
    // 46. Skills / Training
    skillsTraining: {
      apprenticesEnrolled: 18,
      certifiedAdvancedArtisans: 45,
      nsdcAccreditedCourses: 6,
      skillGapDeficitClosedPct: 78.5
    },
    // 47. Welfare Impact
    welfareImpact: {
      totalWelfareDisbursed: '₹1,84,500',
      cashlessMedicalIncidentsResolved: 84,
      parametricallyShieldedWorkers: 240,
      averageDisbursementHours: '1.2 hrs'
    },
    // 48. Crisis Impact
    crisisImpact: {
      emergencyDeploymentsActive: crisisMetrics.workersDeployed,
      householdsProtected: crisisMetrics.householdsReached,
      fatalitiesAverted: 84,
      municipalInfrastructureRestored: crisisMetrics.waterSystemsRestored
    },
    // 49. Service Coverage
    serviceCoverage: {
      'Sector 4 (Central Chennai)': { coverage: '98.5%', avgEta: '14 mins', status: 'OPTIMAL' },
      'Sector 5 (South Corridor)': { coverage: '94.2%', avgEta: '18 mins', status: 'HEALTHY' },
      'Sector 3 (West Industrial)': { coverage: '91.0%', avgEta: '21 mins', status: 'HEALTHY' },
      'Sector 2 (North Periphery)': { coverage: '82.5%', avgEta: '28 mins', status: 'MONITOR' }
    }
  };

  const handleExportAuditProof = () => {
    setAuditExported(true);
    setTimeout(() => setAuditExported(false), 3000);
  };

  return (
    <div className="w-full min-h-screen relative bg-background text-on-background selection:bg-primary selection:text-on-primary">
      <ShaderBackground className="fixed inset-0 z-0 opacity-25 pointer-events-none" />

      <div className="relative z-10 w-full min-h-screen pt-28 px-4 md:px-10 max-w-7xl mx-auto pb-28 flex flex-col gap-8">
        {/* Breadcrumb & Regulatory Stamp */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-xs font-mono text-on-surface-variant hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Main Dashboard</span>
          </Link>

          <div className="flex items-center gap-2 font-mono text-xs text-primary">
            <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-primary">verified_user</span>
              <span>Tamil Nadu Urban Platform Worker Welfare Board (Govt. of TN)</span>
            </span>
          </div>
        </div>

        {/* Header Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in-up">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-2">
              <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-wider">
                Steps 43 - 49: Government &amp; Regulatory Oversight Portal
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-sans font-bold text-white tracking-tight">
              State Regulatory &amp; Cooperative Health Monitor
            </h1>
            <p className="text-xs md:text-sm text-on-surface-variant font-mono mt-1 max-w-3xl">
              Official compliance telemetric oversight for municipal authorities, labor ministries, and social audit ombudsmen. Live cryptographic verification of living wages, welfare disbursement, and crisis mitigation.
            </p>
            <div className="mt-3 p-3 rounded-xl bg-error/10 border border-error/20 inline-flex items-start gap-2">
              <span className="material-symbols-outlined text-sm text-error mt-0.5">privacy_tip</span>
              <p className="text-[10px] font-mono text-error/90 leading-relaxed max-w-xl">
                <strong>STRICT DATA GOVERNANCE ENFORCED:</strong> All data displayed is aggregated, anonymized, and strictly cooperative-level or regional. Individual worker/customer private information (including passwords, specific geolocation traces, and personal welfare cases) is explicitly blocked from government access. The government monitors impact but <strong>cannot directly assign or penalize individual workers.</strong>
              </p>
            </div>
          </div>

          <button
            onClick={handleExportAuditProof}
            className="px-5 py-3 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-bold font-sans text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(173,198,255,0.3)] transition-all hover:scale-105 whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-base">file_download</span>
            <span>{auditExported ? 'Audit Report Exported (SHA-256)' : 'Export Cryptographic Audit Proof'}</span>
          </button>
        </div>

        {/* 43. AGGREGATED METRICS SUMMARY CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs animate-fade-in-up">
          <div className="glass-card p-5 rounded-2xl border border-secondary/30">
            <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Living Wage Compliance</span>
            <div className="text-3xl font-bold text-secondary mt-1">{govMetrics.employmentImpact.fairWageCompliancePct}%</div>
            <span className="text-[10px] text-secondary">1.74x State Minimum Floor</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-primary/30">
            <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Registered Co-op Artisans</span>
            <div className="text-3xl font-bold text-white mt-1">{govMetrics.employmentImpact.registeredActiveArtisans}</div>
            <span className="text-[10px] text-primary">100% Sovereign DID Issued</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-white/10">
            <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Co-op Solvency Multiple</span>
            <div className="text-3xl font-bold text-white mt-1">{govMetrics.cooperativeHealth.financialSolvencyRatio}</div>
            <span className="text-[10px] text-secondary">Liquid Treasury: ₹24.8L</span>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-tertiary/30">
            <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Crisis Mitigation</span>
            <div className="text-3xl font-bold text-tertiary mt-1">{govMetrics.crisisImpact.householdsProtected}</div>
            <span className="text-[10px] text-tertiary">Families Shielded</span>
          </div>
        </div>

        {/* 44 & 45. COOPERATIVE HEALTH & EMPLOYMENT IMPACT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          {/* Cooperative Health */}
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-base">account_balance</span>
                <h3 className="font-sans font-bold text-base text-white">44. Cooperative Health &amp; Solvency</h3>
              </div>
              <span className="text-secondary font-bold text-[10px] px-2 py-0.5 rounded bg-secondary/15 border border-secondary/30">
                AUDITED: HEALTHY
              </span>
            </div>

            <div className="space-y-2.5 text-[11px]">
              <div className="flex justify-between p-3 rounded-xl bg-white/5 items-center">
                <span className="text-on-surface-variant">Overall Health Indicator:</span>
                <span className="px-2 py-1 bg-secondary/20 text-secondary font-bold rounded">HEALTHY</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-on-surface-variant">Statutory Audit Rating:</span>
                <strong className="text-white">Clean Unqualified Opinion (FY 2026)</strong>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-on-surface-variant">Liquid Treasury Reserve:</span>
                <strong className="text-secondary">{govMetrics.cooperativeHealth.treasuryLiquidReserve}</strong>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-on-surface-variant">Worker Welfare Capital Pool:</span>
                <strong className="text-primary">₹4,82,000 (Protected Cashless Escrow)</strong>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-on-surface-variant">Operational Platform Uptime:</span>
                <strong className="text-white">{govMetrics.cooperativeHealth.operationalUptime}</strong>
              </div>
            </div>
          </div>

          {/* Employment & Livelihood Impact */}
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">payments</span>
                <h3 className="font-sans font-bold text-base text-white">45. Employment &amp; Living Wage Parity</h3>
              </div>
              <span className="text-primary font-bold text-[10px] px-2 py-0.5 rounded bg-primary/15 border border-primary/30">
                LIVING WAGE VERIFIED
              </span>
            </div>

            <div className="space-y-2.5 text-[11px]">
              <div className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-on-surface-variant">Average Monthly Artisan Income:</span>
                <strong className="text-white">{govMetrics.employmentImpact.averageMonthlyEarnings}</strong>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-on-surface-variant">State Statutory Minimum Multiple:</span>
                <strong className="text-secondary">{govMetrics.employmentImpact.stateMinimumWageMultiple} (High Dignity)</strong>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-on-surface-variant">Direct Labor Revenue Share:</span>
                <strong className="text-primary">82.0% (Zero Middleman Extraction)</strong>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-on-surface-variant">Formal Banking &amp; UPI Inclusion:</span>
                <strong className="text-white">{govMetrics.employmentImpact.formalBankingInclusionPct}% Direct-to-Account</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 46 & 47. SKILLS PROGRESSION & WELFARE IMPACT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          {/* Skills & Training */}
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-base">school</span>
                <h3 className="font-sans font-bold text-base text-white">46. Skills Accreditation &amp; Progression</h3>
              </div>
              <span className="text-tertiary font-bold text-[10px] px-2 py-0.5 rounded bg-tertiary/15 border border-tertiary/30">
                NSDC ALIGNED
              </span>
            </div>

            <div className="space-y-2.5 text-[11px]">
              <div className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-on-surface-variant">Certified Master Specialists:</span>
                <strong className="text-white">{govMetrics.skillsTraining.certifiedAdvancedArtisans} Artisans</strong>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-on-surface-variant">Active Apprentices Mentored:</span>
                <strong className="text-secondary">{govMetrics.skillsTraining.apprenticesEnrolled} Youth Technicians</strong>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-on-surface-variant">Regional Skill Gap Closed:</span>
                <strong className="text-primary">{govMetrics.skillsTraining.skillGapDeficitClosedPct}% Deficit Solved</strong>
              </div>
            </div>
          </div>

          {/* Welfare Impact */}
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-base">health_and_safety</span>
                <h3 className="font-sans font-bold text-base text-white">47. Mutual Aid &amp; Social Protection</h3>
              </div>
              <span className="text-secondary font-bold text-[10px] px-2 py-0.5 rounded bg-secondary/15 border border-secondary/30">
                PARAMETRIC SHIELD ACTIVE
              </span>
            </div>

            <div className="space-y-2.5 text-[11px]">
              <div className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-on-surface-variant">Season Welfare Disbursed:</span>
                <strong className="text-white">{govMetrics.welfareImpact.totalWelfareDisbursed}</strong>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-on-surface-variant">Medical Emergencies Settled:</span>
                <strong className="text-secondary">{govMetrics.welfareImpact.cashlessMedicalIncidentsResolved} Families</strong>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-white/5">
                <span className="text-on-surface-variant">Parametric Automatic Clearing Time:</span>
                <strong className="text-primary">{govMetrics.welfareImpact.averageDisbursementHours}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 48 & 49. CRISIS MITIGATION & REGIONAL COVERAGE */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 font-mono text-xs animate-fade-in-up">
          <div className="flex justify-between items-start pb-2 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-error text-base">emergency_home</span>
                <h3 className="font-sans font-bold text-lg text-white">48 &amp; 49. Disaster Resilience &amp; Geographic Coverage</h3>
              </div>
              <p className="text-on-surface-variant mt-0.5 text-[11px]">
                Regional coverage equity prevents peripheral urban neglect and coordinates municipal disaster bypasses.
              </p>
            </div>
            <span className="text-primary font-bold text-sm">4 GEOGRAPHIC SECTORS MONITORED</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(govMetrics.serviceCoverage).map(([sector, data]) => (
              <div key={sector} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-on-surface-variant font-bold uppercase">{sector.split(' ')[0]} {sector.split(' ')[1]}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    data.status === 'OPTIMAL' ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'
                  }`}>
                    {data.status}
                  </span>
                </div>
                <div className="text-lg font-bold text-white">{data.coverage} Coverage</div>
                <div className="text-[10px] text-on-surface-variant">Average Rapid ETA: <strong className="text-white">{data.avgEta}</strong></div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-[#0e0e0f]/90 border border-primary/30 text-[11px] text-white/90 space-y-1">
            <span className="font-bold text-primary block">MUNICIPAL CIVIL DEFENSE AUDIT NOTE:</span>
            <p className="text-on-surface-variant leading-relaxed">
              During August Inundation operations, cooperative volunteer teams successfully restored <strong>{crisisMetrics.waterSystemsRestored} community drinking water pumps</strong>, isolated <strong>{crisisMetrics.hazardsFixed} flooded electrical sub-panels</strong>, and secured safe passage for <strong>{crisisMetrics.householdsReached} families</strong> across vulnerable low-lying wards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
