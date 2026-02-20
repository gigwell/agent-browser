// Default Playwright action timeout in milliseconds
export const DEFAULT_ACTION_TIMEOUT_MS = 10000;

// Default global timeout in milliseconds
export const DEFAULT_GLOBAL_TIMEOUT_MS = 60000;

// Get action timeout from env var or use default
export function getActionTimeout(): number {
  const envTimeout = process.env.AGENT_BROWSER_ACTION_TIMEOUT;
  if (envTimeout) {
    const parsed = Number(envTimeout);
    if (!isNaN(parsed) && parsed > 0) {
      return parsed;
    }
  }
  return DEFAULT_ACTION_TIMEOUT_MS;
}

// Get global timeout from env var or use default
export function getGlobalTimeout(): number {
  const envTimeout = process.env.AGENT_BROWSER_TIMEOUT;
  if (envTimeout) {
    const parsed = Number(envTimeout);
    if (!isNaN(parsed) && parsed > 0) {
      return parsed;
    }
  }
  return DEFAULT_GLOBAL_TIMEOUT_MS;
}
