/**
 * Manus API Integration
 * 
 * Uses Manus APIs for:
 * - Research and analysis
 * - Optimization suggestions
 * - Speed improvements
 * - Best practices
 */

import axios from 'axios';
import { EventEmitter } from 'eventemitter3';

export class ManusIntegration extends EventEmitter {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor(apiUrl: string = process.env.MANUS_API_URL || '', apiKey: string = process.env.MANUS_API_KEY || '') {
    super();
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  async research(query: string): Promise<string> {
    if (!this.apiUrl || !this.apiKey) return '';
    try {
      const response = await axios.post(`${this.apiUrl}/api/research`, { query }, {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      });
      return response.data.result || '';
    } catch (error) {
      console.warn('Manus research failed:', error);
      return '';
    }
  }

  async optimize(code: string): Promise<string> {
    if (!this.apiUrl || !this.apiKey) return code;
    try {
      const response = await axios.post(`${this.apiUrl}/api/optimize`, { code }, {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      });
      return response.data.optimized || code;
    } catch (error) {
      console.warn('Manus optimization failed:', error);
      return code;
    }
  }

  async getBestPractices(projectType: string): Promise<string[]> {
    if (!this.apiUrl || !this.apiKey) return [];
    try {
      const response = await axios.get(`${this.apiUrl}/api/best-practices/${projectType}`, {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      });
      return response.data.practices || [];
    } catch (error) {
      console.warn('Manus best practices failed:', error);
      return [];
    }
  }
}

export const manusIntegration = new ManusIntegration();
