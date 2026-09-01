import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCustomer } from './CustomerContext';
import ShaderBackground from '../components/ShaderBackground';

export default function CustomerWorkerSelection() {
  const navigate = useNavigate();
  const { draftRequest, QUALIFIED_WORKERS, setActiveJobs, forcedState } = useCustomer();

  const [selectedWorkerId, setSelectedWorkerId] = useState(QUALIFIED_WORKERS[0]?.id);
  const [isBooking, setIsBooking] = useState(false);

  // Default fallback if accessed directly
  const job = draftRequest || {
    id: 'UNV-JOB-9410',
    serviceName: 'Main Power MCB & Surge Breaker Replacement',
    category: 'Electrical Grid (Room 01)',
    specificSkill: 'High Voltage Isolation & Arc Quench Testing',
    urgency: 'ELEVATED (Within 2 Hours)',
    location: 'Apartment 402, Opal Heights, Sector 4, Chennai',
    estimatedDuration: '45 - 60 mins',
    preferredTime: 'Today, Immediate (within 30 mins)',
    estimatedRange: '₹1,200 - ₹1,600',
    preliminaryDiagnosis: {
      probableProblem: 'Thermal Overload Tripping in 63A Dual-Pole Isolator',
      severity: 'HIGH',
      confidence: 96.4,
      requiredSkills: ['High Voltage Isolation', 'Arc Quench Testing', 'Phase Balancing']
    }
  };

  // State conditions
  const isLoading = forcedState === 'loading';
  const isUnavailable = forcedState === 'worker_unavailable';
  const isUncertainty = forcedState === 'ai_uncertainty';

  const handleConfirmBooking = (worker) => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      const newActiveJob = {
        ...job,
        status: 'DISPATCHED',
        worker,
        createdAt: 'Just now',
        etaMinutes: worker.etaMinutes,
        financials: {
          basePay: 1200,
          parts: 350,
          coopTax: 75,
          platformFee: 45,
          total: 1670
        }
      };

      setActiveJobs((prev) => [newActiveJob, ...prev.filter((j) => j.id !== newActiveJob.id)]);
      navigate(`/customer/tracking/${newActiveJob.id}`);
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen relative bg-background text-on-background selection:bg-primary selection:text-on-primary">
      <ShaderBackground className="fixed inset-0 z-0 opacity-25 pointer-events-none" />

      <div className="relative z-10 w-full min-h-screen pt-28 px-4 md:px-10 max-w-6xl mx-auto pb-28 flex flex-col gap-8">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/customer/request"
            className="flex items-center gap-2 text-xs font-mono text-on-surface-variant hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Request Intake</span>
          </Link>
          <span className="text-[11px] font-mono text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            Stage 2 of 3: Worker Match &amp; Dispatch
          </span>
        </div>

        {/* Structured Job Specifications Card */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-primary/30 relative overflow-hidden shadow-2xl animate-fade-in-up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-primary font-bold">{job.id}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/15 text-primary border border-primary/30 uppercase">
                  Structured Protocol
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary/15 text-secondary border border-secondary/30">
                  {job.urgency}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-sans font-bold text-white tracking-tight">
                {job.serviceName}
              </h1>
            </div>

            <div className="text-right font-mono">
              <span className="text-xs text-on-surface-variant">Estimated Range:</span>
              <div className="text-xl font-bold text-secondary">{job.estimatedRange}</div>
              <span className="text-[11px] text-on-surface-variant/80">Est. Duration: {job.estimatedDuration}</span>
            </div>
          </div>

          {/* AI Preliminary Notice */}
          <div className="p-3.5 rounded-xl bg-tertiary/10 border border-tertiary/20 flex items-start gap-2.5 text-xs font-mono text-tertiary mb-6">
            <span className="material-symbols-outlined text-sm mt-0.5">verified</span>
            <div>
              <span className="font-bold text-white uppercase tracking-wider">PRELIMINARY AI SPECIFICATION: </span>
              <span className="text-on-surface-variant">
                Identified primary requirement as <strong>{job.specificSkill}</strong>. On-site worker will physically confirm diagnostic parameters before executing repair.
              </span>
            </div>
          </div>

          {/* Structured Key-Value Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono pt-2 border-t border-white/5">
            <div>
              <span className="text-on-surface-variant text-[10px] uppercase">Service Chamber</span>
              <div className="text-white font-bold mt-0.5">{job.category}</div>
            </div>
            <div>
              <span className="text-on-surface-variant text-[10px] uppercase">Preferred Time Slot</span>
              <div className="text-white font-bold mt-0.5">{job.preferredTime}</div>
            </div>
            <div>
              <span className="text-on-surface-variant text-[10px] uppercase">Destination Location</span>
              <div className="text-white font-bold mt-0.5 truncate" title={job.location}>{job.location}</div>
            </div>
            <div>
              <span className="text-on-surface-variant text-[10px] uppercase">Required Skill DNA</span>
              <div className="text-primary font-bold mt-0.5 truncate">{job.specificSkill}</div>
            </div>
          </div>
        </div>

        {/* AI Uncertainty Alert State */}
        {isUncertainty && (
          <div className="p-5 rounded-2xl bg-tertiary/10 border border-tertiary/40 text-xs font-mono text-tertiary flex items-start gap-3 animate-fade-in-up">
            <span className="material-symbols-outlined text-xl text-tertiary">help_outline</span>
            <div>
              <h4 className="font-bold text-white text-sm mb-1">AI Ambiguity Warning (Confidence &lt; 70%)</h4>
              <p className="text-on-surface-variant leading-relaxed">
                Optical or acoustic analysis detected overlapping symptoms (potential dual electrical and water valve involvement). 
                The system has assigned a Multi-Disciplinary Master Inspector to resolve the root cause on site.
              </p>
            </div>
          </div>
        )}

        {/* Qualified Workers Section */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-mono text-xs text-secondary uppercase tracking-wider font-semibold">
                  Qualified Co-op Workers Nearby
                </span>
              </div>
              <h2 className="text-xl font-bold text-white font-sans mt-0.5">
                Matched via Cooperative Skill DNA &amp; Fairness Index
              </h2>
              <p className="text-xs font-mono text-secondary/80 mt-2">
                UNIVO selected this worker based on qualification, suitability, availability, location and fair opportunity allocation.
              </p>
            </div>
            <span className="text-xs font-mono text-on-surface-variant">
              Showing 4 Certified Candidates
            </span>
          </div>

          {/* Worker Unavailable State */}
          {isUnavailable ? (
            <div className="glass-card rounded-2xl p-10 text-center border border-error/30 bg-error/5 animate-fade-in-up">
              <span className="material-symbols-outlined text-5xl text-error mb-2">person_off</span>
              <h3 className="font-sans font-bold text-lg text-white">No Immediate Workers in Immediate Sector</h3>
              <p className="text-xs font-mono text-on-surface-variant mt-1 max-w-md mx-auto">
                All primary technicians in your sector are actively deployed. The system is expanding its search radius to adjacent Sector Delta-3 (+8 minutes).
              </p>
              <button
                onClick={() => alert('Broadcasting priority request to secondary cooperative sector...')}
                className="mt-5 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs font-mono"
              >
                Expand Search to Neighboring Sectors
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {QUALIFIED_WORKERS.map((worker) => {
                const isSelected = selectedWorkerId === worker.id;
                return (
                  <div
                    key={worker.id}
                    className={`glass-card rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between gap-5 ${
                      isSelected
                        ? 'border-primary/60 bg-primary/5 shadow-[0_0_25px_rgba(173,198,255,0.15)]'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div>
                      {/* Worker Top Info */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={worker.avatar}
                            alt={worker.name}
                            className="w-16 h-16 rounded-2xl object-cover border border-white/15 shadow-xl"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-sans font-bold text-base text-white">{worker.name}</h3>
                              <span className="material-symbols-outlined text-secondary text-base" title="Cooperative Verified">
                                verified
                              </span>
                            </div>
                            <p className="text-xs text-on-surface-variant font-mono mt-0.5">{worker.role}</p>
                            <span className="text-[11px] font-mono text-on-surface-variant/80 block mt-0.5">
                              {worker.experience}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-mono text-base font-bold text-secondary">
                            {worker.skillMatchPercentage}% Match
                          </div>
                          <span className="text-[11px] font-mono text-on-surface-variant block">
                            Trust: <strong className="text-white">{worker.trustScore}%</strong>
                          </span>
                        </div>
                      </div>

                      {/* Skill DNA Breakdown */}
                      <div className="space-y-1.5 my-3 p-3 rounded-2xl bg-[#0e0e0f]/80 border border-white/5 text-xs font-mono">
                        <div className="text-[10px] text-on-surface-variant uppercase font-semibold">
                          Relevant Skill DNA Breakdown:
                        </div>
                        {Object.entries(worker.skillDNA).map(([skill, score]) => (
                          <div key={skill} className="flex justify-between items-center text-[11px]">
                            <span className="text-on-surface-variant">{skill}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-white/10 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-primary h-full rounded-full" style={{ width: `${score}%` }}></div>
                              </div>
                              <span className="text-primary font-bold">{score}%</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Quick Meta: Distance, ETA, Languages */}
                      <div className="grid grid-cols-3 gap-2 text-[11px] font-mono pt-2 border-t border-white/5">
                        <div>
                          <span className="text-on-surface-variant">Distance:</span>
                          <div className="text-white font-bold">{worker.distance}</div>
                        </div>
                        <div>
                          <span className="text-on-surface-variant">Estimated ETA:</span>
                          <div className="text-secondary font-bold">{worker.etaMinutes} mins</div>
                        </div>
                        <div>
                          <span className="text-on-surface-variant">Languages:</span>
                          <div className="text-white font-bold truncate">{worker.languages.join(', ')}</div>
                        </div>
                      </div>
                    </div>

                    {/* Booking Action */}
                    <button
                      onClick={() => handleConfirmBooking(worker)}
                      disabled={isBooking || !worker.available}
                      className={`w-full py-3.5 rounded-xl font-sans font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                        worker.available
                          ? 'bg-primary hover:bg-primary/90 text-on-primary shadow-[0_0_15px_rgba(173,198,255,0.3)] hover:scale-[1.01]'
                          : 'bg-white/5 text-on-surface-variant/50 cursor-not-allowed'
                      }`}
                    >
                      {isBooking ? (
                        <>
                          <span className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>
                          <span>Locking Dispatch Contract...</span>
                        </>
                      ) : worker.available ? (
                        <>
                          <span>Select &amp; Confirm Dispatch with {worker.name.split(' ')[0]}</span>
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </>
                      ) : (
                        <span>Currently Assigned on Nearby Mission</span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
