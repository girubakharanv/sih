import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShaderBackground from './ShaderBackground';

export default function RoleSelectionLanding() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen relative bg-background text-on-background selection:bg-primary selection:text-on-primary overflow-hidden">
      <ShaderBackground className="fixed inset-0 z-0 opacity-30 pointer-events-none" />
      
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-center items-center px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-mono text-xs text-primary uppercase tracking-widest font-semibold">
              UNIVO OS
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-white tracking-tight mb-4">
            Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Portal</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto">
            Experience the complete ecosystem of the UNIVO Platform for India's Distributed Workforce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          
          {/* Customer */}
          <button 
            onClick={() => navigate('/customer')}
            className="group relative bg-surface/40 backdrop-blur-md border border-outline/30 rounded-2xl p-8 flex flex-col items-center text-center hover:border-primary/50 hover:bg-surface/60 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Customer</h3>
            <p className="text-sm text-on-surface-variant">Request services, track workers, and leave feedback.</p>
          </button>

          {/* Worker */}
          <button 
            onClick={() => navigate('/worker')}
            className="group relative bg-surface/40 backdrop-blur-md border border-outline/30 rounded-2xl p-8 flex flex-col items-center text-center hover:border-secondary/50 hover:bg-surface/60 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Worker</h3>
            <p className="text-sm text-on-surface-variant">Accept jobs, track earnings, and build Trust DNA.</p>
          </button>

          {/* Cooperative */}
          <button 
            onClick={() => navigate('/governance')}
            className="group relative bg-surface/40 backdrop-blur-md border border-outline/30 rounded-2xl p-8 flex flex-col items-center text-center hover:border-blue-500/50 hover:bg-surface/60 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Cooperative</h3>
            <p className="text-sm text-on-surface-variant">Manage welfare, resolve disputes, and collective governance.</p>
          </button>

          {/* Government */}
          <button 
            onClick={() => navigate('/government')}
            className="group relative bg-surface/40 backdrop-blur-md border border-outline/30 rounded-2xl p-8 flex flex-col items-center text-center hover:border-purple-500/50 hover:bg-surface/60 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Government</h3>
            <p className="text-sm text-on-surface-variant">View anonymized macro-level impact metrics and subsidies.</p>
          </button>

        </div>
      </div>
    </div>
  );
}
