import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCustomer } from './CustomerContext';
import ShaderBackground from '../components/ShaderBackground';

export default function CustomerJobTracking() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { activeJobs, cancelJob, rescheduleJob } = useCustomer();

  const job = activeJobs.find((j) => j.id === jobId) || activeJobs[0];

  // Lifecycle states:
  // 1: DISPATCHED, 2: IN_TRANSIT, 3: ARRIVED, 4: IN_PROGRESS, 5: COMPLETED
  const [currentStep, setCurrentStep] = useState(2);
  const [eta, setEta] = useState(job?.etaMinutes || 12);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('Found temporary fix / emergency averted');
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [rescheduledSlot, setRescheduledSlot] = useState('Tomorrow, 10:00 AM');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'worker', time: '21:14', text: 'Namaste! I am en route with high-voltage isolation gear and replacement breakers.' },
    { sender: 'customer', time: '21:15', text: 'Thank you. Please ring Flat 402 upon arrival.' }
  ]);
  const [newMsg, setNewMsg] = useState('');

  // Simulated countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setEta((prev) => (prev > 1 ? prev - 1 : 1));
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { sender: 'customer', time: 'Just now', text: newMsg.trim() }
    ]);
    setNewMsg('');
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: 'worker', time: 'Just now', text: 'Acknowledged. Navigating into Sector 4.' }
      ]);
    }, 1500);
  };

  const handleExecuteCancel = () => {
    if (!job) return;
    cancelJob(job.id, cancelReason);
    setIsCancelModalOpen(false);
    navigate('/customer');
  };

  const handleExecuteReschedule = () => {
    if (!job) return;
    rescheduleJob(job.id, rescheduledSlot);
    setIsRescheduleModalOpen(false);
  };

  const handleSimulateFinish = () => {
    if (!job) return;
    navigate(`/customer/settlement/${job.id}`);
  };

  if (!job) {
    return (
      <div className="w-full min-h-screen pt-32 text-center font-mono">
        <p>No active job found.</p>
        <Link to="/customer" className="text-primary underline mt-2 block">
          Return to Portal
        </Link>
      </div>
    );
  }

  const steps = [
    { label: 'Dispatched', icon: 'send', desc: 'Protocol broadcast' },
    { label: 'In Transit', icon: 'navigation', desc: 'En route to location' },
    { label: 'Arrived On-Site', icon: 'pin_drop', desc: 'Physical inspection' },
    { label: 'Service In Progress', icon: 'construction', desc: 'Active execution' },
    { label: 'Completed', icon: 'verified', desc: 'Workmanship confirmed' }
  ];

  return (
    <div className="w-full min-h-screen relative bg-background text-on-background selection:bg-primary selection:text-on-primary">
      <ShaderBackground className="fixed inset-0 z-0 opacity-25 pointer-events-none" />

      <div className="relative z-10 w-full min-h-screen pt-28 px-4 md:px-10 max-w-6xl mx-auto pb-28 flex flex-col gap-8">
        {/* Top Breadcrumbs & Title */}
        <div className="flex items-center justify-between">
          <Link
            to="/customer"
            className="flex items-center gap-2 text-xs font-mono text-on-surface-variant hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Back to Customer Portal</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
            <span className="text-xs font-mono text-secondary font-bold uppercase tracking-wider">
              Live Satellite &amp; Telemetry Feed
            </span>
          </div>
        </div>

        {/* Tracking Header Grid */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-primary font-bold">{job.id}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary/15 text-secondary border border-secondary/30">
                  {job.status}
                </span>
                <span className="text-[10px] font-mono text-on-surface-variant/80">
                  • {job.category}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-sans font-bold text-white tracking-tight">
                {job.serviceName}
              </h1>
              <p className="text-xs font-mono text-on-surface-variant mt-1">
                Delivering to: <span className="text-white">{job.location}</span>
              </p>
            </div>

            <div className="glass-hud px-6 py-4 rounded-2xl border border-secondary/30 text-right">
              <div className="text-[11px] font-mono uppercase text-on-surface-variant">Live Estimated Arrival</div>
              <div className="text-3xl font-bold font-mono text-secondary">{eta} MINS</div>
              <div className="text-[10px] font-mono text-primary mt-0.5">Speed: 28 km/h • Distance: 1.1 km</div>
            </div>
          </div>

          {/* Stepper Progression */}
          <div className="relative my-6">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 z-0"></div>
            <div
              className="hidden md:block absolute top-1/2 left-0 h-1 bg-secondary -translate-y-1/2 z-0 transition-all duration-700"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 relative z-10 font-mono text-xs">
              {steps.map((st, i) => {
                const stepNum = i + 1;
                const isPassed = stepNum <= currentStep;
                const isCurrent = stepNum === currentStep;
                return (
                  <button
                    key={st.label}
                    onClick={() => setCurrentStep(stepNum)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isCurrent
                        ? 'bg-secondary/20 border-secondary text-white shadow-[0_0_15px_rgba(78,222,163,0.3)] scale-105'
                        : isPassed
                        ? 'bg-white/10 border-white/20 text-white'
                        : 'bg-[#131314]/80 border-white/5 text-on-surface-variant/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-base">
                        {isPassed ? 'check_circle' : st.icon}
                      </span>
                      <span className="font-bold text-[11px] uppercase">{st.label}</span>
                    </div>
                    <div className="text-[10px] opacity-70 leading-tight">{st.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Two Columns: Radar Simulation & Worker Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Simulated Radar Map Viewport */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-white/10 relative overflow-hidden flex flex-col justify-between h-[440px]">
            <div className="flex justify-between items-center z-10">
              <div className="font-mono text-xs text-primary bg-primary/10 px-3 py-1 rounded-lg border border-primary/20 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span>Active Geofence: Sector 4 Mesh</span>
              </div>
              <span className="font-mono text-xs text-on-surface-variant">GPS Accuracy: ±1.4m</span>
            </div>

            {/* Radar Circular Simulation */}
            <div className="relative w-full h-[260px] flex items-center justify-center my-auto">
              <div className="w-[280px] h-[280px] rounded-full border border-white/10 absolute"></div>
              <div className="w-[180px] h-[180px] rounded-full border border-primary/20 border-dashed absolute animate-[spin_45s_linear_infinite]"></div>
              <div className="w-[90px] h-[90px] rounded-full border border-secondary/30 absolute"></div>

              {/* Customer Home Pin */}
              <div className="absolute flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-primary animate-ping"></div>
                <div className="w-3 h-3 rounded-full bg-primary absolute top-0.5"></div>
                <span className="font-mono text-[10px] text-white bg-black/80 px-2 py-0.5 rounded mt-2 border border-white/10">
                  Your Location
                </span>
              </div>

              {/* Approaching Worker Pin */}
              <div
                className="absolute transition-all duration-1000 flex flex-col items-center"
                style={{
                  top: currentStep >= 3 ? '42%' : '20%',
                  left: currentStep >= 3 ? '48%' : '75%'
                }}
              >
                <div className="w-9 h-9 rounded-2xl border-2 border-secondary overflow-hidden shadow-[0_0_20px_rgba(78,222,163,0.8)] bg-black">
                  <img src={job.worker?.avatar} alt="worker" className="w-full h-full object-cover" />
                </div>
                <span className="font-mono text-[10px] text-secondary bg-black/80 px-2 py-0.5 rounded mt-1 border border-secondary/30">
                  {job.worker?.name.split(' ')[0]} ({eta}m)
                </span>
              </div>
            </div>

            {/* Map Action Overlay */}
            <div className="glass-hud p-3 rounded-xl border border-white/10 flex justify-between items-center text-xs font-mono z-10">
              <span className="text-on-surface-variant">Step Progress Simulation:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 5))}
                  className="px-3 py-1 rounded bg-secondary/20 text-secondary border border-secondary/30"
                >
                  Advance Step ({currentStep}/5)
                </button>
                {currentStep >= 4 && (
                  <button
                    onClick={handleSimulateFinish}
                    className="px-3 py-1 rounded bg-primary text-on-primary font-bold"
                  >
                    Proceed to Payment &amp; Rating
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Worker Identity Card & Actions */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-5">
              <div className="flex items-center gap-4">
                <img
                  src={job.worker?.avatar}
                  alt={job.worker?.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-white/15 shadow-xl"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-sans font-bold text-lg text-white">{job.worker?.name}</h3>
                    <span className="material-symbols-outlined text-secondary text-base" title="Verified Worker">
                      verified
                    </span>
                  </div>
                  <p className="text-xs font-mono text-on-surface-variant">{job.worker?.role}</p>
                  <div className="flex items-center gap-3 text-xs font-mono text-secondary mt-1">
                    <span>Trust: {job.worker?.trustScore}%</span>
                    <span>•</span>
                    <span>{job.worker?.experience}</span>
                  </div>
                </div>
              </div>

              {/* Verified Credentials */}
              <div className="p-3.5 rounded-2xl bg-[#0e0e0f]/80 border border-white/5 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Worker ID:</span>
                  <span className="text-white font-bold">{job.worker?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Direct Phone:</span>
                  <a href={`tel:${job.worker?.phone}`} className="text-primary font-bold hover:underline">
                    {job.worker?.phone}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Spoken Languages:</span>
                  <span className="text-white">{job.worker?.languages.join(', ')}</span>
                </div>
              </div>

              {/* Direct Communication Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${job.worker?.phone}`}
                  className="py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <span className="material-symbols-outlined text-base text-secondary">call</span>
                  <span>Call Worker</span>
                </a>
                <button
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className="py-3 rounded-xl bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  <span>Secure Chat</span>
                </button>
              </div>

              {/* Cancel / Reschedule Actions */}
              <div className="flex gap-3 pt-3 border-t border-white/5">
                <button
                  onClick={() => setIsRescheduleModalOpen(true)}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-on-surface-variant hover:text-white text-xs font-mono border border-white/10"
                >
                  Reschedule
                </button>
                <button
                  onClick={() => setIsCancelModalOpen(true)}
                  className="flex-1 py-2.5 rounded-xl bg-error/10 hover:bg-error/20 text-error text-xs font-mono border border-error/30"
                >
                  Cancel Job
                </button>
              </div>
            </div>

            {/* In-App Live Chat Drawer */}
            {isChatOpen && (
              <div className="glass-panel rounded-2xl p-4 border border-primary/30 space-y-3 animate-fade-in-up">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    Direct Dispatch Channel
                  </span>
                  <button onClick={() => setIsChatOpen(false)} className="text-on-surface-variant hover:text-white">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>

                <div className="h-44 overflow-y-auto space-y-2 font-mono text-xs pr-1">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-2.5 rounded-xl max-w-[85%] ${
                        msg.sender === 'customer'
                          ? 'ml-auto bg-primary/20 text-white border border-primary/30'
                          : 'mr-auto bg-white/5 text-on-surface border border-white/10'
                      }`}
                    >
                      <div className="text-[10px] opacity-60 mb-0.5">{msg.sender === 'customer' ? 'You' : job.worker?.name.split(' ')[0]} • {msg.time}</div>
                      <div>{msg.text}</div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChat} className="flex gap-2 pt-2 border-t border-white/5">
                  <input
                    type="text"
                    value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)}
                    placeholder="Message technician..."
                    className="flex-1 bg-[#1c1b1c] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  />
                  <button type="submit" className="px-3 py-2 bg-primary text-on-primary font-bold rounded-xl text-xs">
                    Send
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl p-6 md:p-8 max-w-md w-full border border-error/30 shadow-2xl animate-fade-in-up">
            <span className="material-symbols-outlined text-4xl text-error mb-2">cancel</span>
            <h3 className="font-sans font-bold text-lg text-white">Cancel Service Protocol?</h3>
            <p className="text-xs font-mono text-on-surface-variant mt-1 mb-4">
              Our cooperative fairness rule applies: cancellations within 5 minutes of dispatch carry zero fee.
            </p>

            <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1 font-semibold">
              Reason for Cancellation:
            </label>
            <select
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl p-3 text-xs text-white mb-6"
            >
              <option value="Found temporary fix / emergency averted">Found temporary fix / emergency averted</option>
              <option value="Need to reschedule to different day">Need to reschedule to different day</option>
              <option value="Worker delay exceeding urgency limits">Worker delay exceeding urgency limits</option>
              <option value="Requested by mistake">Requested by mistake</option>
            </select>

            <div className="flex gap-3">
              <button
                onClick={() => setIsCancelModalOpen(false)}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs"
              >
                Keep Active
              </button>
              <button
                onClick={handleExecuteCancel}
                className="flex-1 py-3 rounded-xl bg-error text-[#470003] font-mono text-xs font-bold"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {isRescheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card rounded-3xl p-6 md:p-8 max-w-md w-full border border-white/15 shadow-2xl animate-fade-in-up">
            <span className="material-symbols-outlined text-4xl text-primary mb-2">schedule</span>
            <h3 className="font-sans font-bold text-lg text-white">Reschedule Service Protocol</h3>
            <p className="text-xs font-mono text-on-surface-variant mt-1 mb-4">
              Your assigned worker will reserve the updated time slot automatically.
            </p>

            <label className="block text-xs font-mono uppercase text-on-surface-variant mb-1 font-semibold">
              Select New Time Window:
            </label>
            <select
              value={rescheduledSlot}
              onChange={(e) => setRescheduledSlot(e.target.value)}
              className="w-full bg-[#1c1b1c] border border-white/10 rounded-xl p-3 text-xs text-white mb-6"
            >
              <option value="Tomorrow, 09:00 AM - 11:00 AM">Tomorrow, 09:00 AM - 11:00 AM</option>
              <option value="Tomorrow, 02:00 PM - 04:00 PM">Tomorrow, 02:00 PM - 04:00 PM</option>
              <option value="Wednesday, Priority Morning">Wednesday, Priority Morning</option>
              <option value="Weekend Saturday Slot">Weekend Saturday Slot</option>
            </select>

            <div className="flex gap-3">
              <button
                onClick={() => setIsRescheduleModalOpen(false)}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs"
              >
                Back
              </button>
              <button
                onClick={handleExecuteReschedule}
                className="flex-1 py-3 rounded-xl bg-primary text-on-primary font-mono text-xs font-bold"
              >
                Update Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
