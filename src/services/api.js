/**
 * UNIVO Production API Client
 * 
 * Provides unified HTTP client with JWT session token management,
 * error handling, query filtering, pagination, and seamless fallback.
 */

const API_BASE = 'http://localhost:4000/api';

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('univo_jwt_token') || null;
  }

  setToken(token) {
    this.token = token;
    if (token) localStorage.setItem('univo_jwt_token', token);
    else localStorage.removeItem('univo_jwt_token');
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      ...options.headers
    };

    try {
      const response = await fetch(url, { ...options, headers });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || data.error || 'Network error');
      }
      return data;
    } catch (err) {
      console.warn(`[ApiClient] Request to ${endpoint} failed:`, err.message);
      throw err;
    }
  }

  // System & Health
  async getHealth() {
    return this.request('/health');
  }

  // Authentication
  async login(credentials) {
    const res = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    if (res.token) this.setToken(res.token);
    return res;
  }

  async getMe() {
    return this.request('/auth/me');
  }

  // Workers
  async getWorkers(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/workers?${query}`);
  }

  async getWorkerPassport(workerId) {
    return this.request(`/workers/${workerId}/passport`);
  }

  // Service Requests & Jobs
  async createRequest(requestData) {
    return this.request('/requests', {
      method: 'POST',
      body: JSON.stringify(requestData)
    });
  }

  async dispatchJob(dispatchData) {
    return this.request('/jobs/dispatch', {
      method: 'POST',
      body: JSON.stringify(dispatchData)
    });
  }

  // Cryptographic Ledger
  async getLedgerEntries(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/ledger?${query}`);
  }

  async verifyLedgerChain() {
    return this.request('/ledger/verify-chain');
  }

  async settleLedgerEntry(settlementData) {
    return this.request('/ledger/settle', {
      method: 'POST',
      body: JSON.stringify(settlementData)
    });
  }

  // Governance & Proposals
  async getProposals() {
    return this.request('/proposals');
  }

  async castProposalVote(proposalId, voteData) {
    return this.request(`/proposals/${proposalId}/vote`, {
      method: 'POST',
      body: JSON.stringify(voteData)
    });
  }

  // Crisis Operations
  async getCrisisLiveStatus() {
    return this.request('/crisis/live');
  }
}

export const api = new ApiClient();
export default api;
