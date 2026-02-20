import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  getActionTimeout,
  getGlobalTimeout,
  DEFAULT_ACTION_TIMEOUT_MS,
  DEFAULT_GLOBAL_TIMEOUT_MS,
} from '../src/timeout.js';

describe('timeout functionality', () => {
  let originalActionTimeout: string | undefined;
  let originalGlobalTimeout: string | undefined;

  beforeEach(() => {
    originalActionTimeout = process.env.AGENT_BROWSER_ACTION_TIMEOUT;
    originalGlobalTimeout = process.env.AGENT_BROWSER_TIMEOUT;
    delete process.env.AGENT_BROWSER_ACTION_TIMEOUT;
    delete process.env.AGENT_BROWSER_TIMEOUT;
  });

  afterEach(() => {
    if (originalActionTimeout !== undefined) {
      process.env.AGENT_BROWSER_ACTION_TIMEOUT = originalActionTimeout;
    } else {
      delete process.env.AGENT_BROWSER_ACTION_TIMEOUT;
    }
    if (originalGlobalTimeout !== undefined) {
      process.env.AGENT_BROWSER_TIMEOUT = originalGlobalTimeout;
    } else {
      delete process.env.AGENT_BROWSER_TIMEOUT;
    }
  });

  describe('getActionTimeout', () => {
    it('should return default when env var is not set', () => {
      expect(getActionTimeout()).toBe(DEFAULT_ACTION_TIMEOUT_MS);
    });

    it('should return env var value when set', () => {
      process.env.AGENT_BROWSER_ACTION_TIMEOUT = '25000';
      expect(getActionTimeout()).toBe(25000);
    });

    it('should handle string numbers', () => {
      process.env.AGENT_BROWSER_ACTION_TIMEOUT = '5000';
      expect(getActionTimeout()).toBe(5000);
    });

    it('should return default for invalid string', () => {
      process.env.AGENT_BROWSER_ACTION_TIMEOUT = 'invalid';
      expect(getActionTimeout()).toBe(DEFAULT_ACTION_TIMEOUT_MS);
    });

    it('should return default for negative value', () => {
      process.env.AGENT_BROWSER_ACTION_TIMEOUT = '-100';
      expect(getActionTimeout()).toBe(DEFAULT_ACTION_TIMEOUT_MS);
    });

    it('should return default for zero', () => {
      process.env.AGENT_BROWSER_ACTION_TIMEOUT = '0';
      expect(getActionTimeout()).toBe(DEFAULT_ACTION_TIMEOUT_MS);
    });
  });

  describe('getGlobalTimeout', () => {
    it('should return default when env var is not set', () => {
      expect(getGlobalTimeout()).toBe(DEFAULT_GLOBAL_TIMEOUT_MS);
    });

    it('should return env var value when set', () => {
      process.env.AGENT_BROWSER_TIMEOUT = '120000';
      expect(getGlobalTimeout()).toBe(120000);
    });

    it('should handle string numbers', () => {
      process.env.AGENT_BROWSER_TIMEOUT = '30000';
      expect(getGlobalTimeout()).toBe(30000);
    });

    it('should return default for invalid string', () => {
      process.env.AGENT_BROWSER_TIMEOUT = 'not-a-number';
      expect(getGlobalTimeout()).toBe(DEFAULT_GLOBAL_TIMEOUT_MS);
    });

    it('should return default for negative value', () => {
      process.env.AGENT_BROWSER_TIMEOUT = '-500';
      expect(getGlobalTimeout()).toBe(DEFAULT_GLOBAL_TIMEOUT_MS);
    });

    it('should return default for zero', () => {
      process.env.AGENT_BROWSER_TIMEOUT = '0';
      expect(getGlobalTimeout()).toBe(DEFAULT_GLOBAL_TIMEOUT_MS);
    });
  });

  describe('constants', () => {
    it('should export DEFAULT_ACTION_TIMEOUT_MS as 10000', () => {
      expect(DEFAULT_ACTION_TIMEOUT_MS).toBe(10000);
    });

    it('should export DEFAULT_GLOBAL_TIMEOUT_MS as 60000', () => {
      expect(DEFAULT_GLOBAL_TIMEOUT_MS).toBe(60000);
    });
  });
});
