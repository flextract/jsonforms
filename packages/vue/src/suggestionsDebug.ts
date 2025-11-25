/**
 * Debug utility for tracing suggestions flow through JSON Forms
 *
 * To enable debug mode, set localStorage:
 *   localStorage.setItem('jsonforms_suggestions_debug', 'true')
 *
 * To disable debug mode, remove the key:
 *   localStorage.removeItem('jsonforms_suggestions_debug')
 */

const STORAGE_KEY = 'jsonforms_suggestions_debug';

/**
 * Check if debug mode is enabled from localStorage
 */
const isDebugEnabled = (): boolean => {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return false;
  }
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch (e) {
    return false;
  }
};

/**
 * Debug logger with color coding and structured output
 */
export const debugLog = (category: string, message: string, data?: any) => {
  if (!isDebugEnabled()) return;

  const colors: Record<string, string> = {
    'JsonForms': '#3b82f6',      // blue
    'Resolution': '#8b5cf6',      // purple
    'Control': '#10b981',         // green
    'Vanilla': '#f59e0b',         // orange
    'Wrapper': '#ef4444',         // red
    'State': '#ec4899',           // pink
  };

  const color = colors[category] || '#6b7280';
  const timestamp = new Date().toISOString().split('T')[1].slice(0, -1);

  console.groupCollapsed(
    `%c[${timestamp}] [${category}] ${message}`,
    `color: ${color}; font-weight: bold`
  );

  if (data !== undefined) {
    if (typeof data === 'object') {
      console.log('%cData:', 'color: #9ca3af; font-weight: bold');
      console.log(JSON.parse(JSON.stringify(data))); // Deep clone to avoid reference issues
    } else {
      console.log('%cValue:', 'color: #9ca3af; font-weight: bold', data);
    }
  }

  console.trace('Call stack');
  console.groupEnd();
};

/**
 * Debug logger for suggestion resolution
 */
export const debugResolution = (path: string, suggestions: any, result: any) => {
  if (!isDebugEnabled()) return;

  debugLog('Resolution', `Resolving suggestion for path: "${path}"`, {
    path,
    suggestions: suggestions,
    resolved: result,
    hasValue: result !== undefined,
  });
};

/**
 * Debug logger for control binding
 */
export const debugControl = (
  uischemaType: string,
  path: string,
  hasSuggestion: boolean,
  suggestion: any
) => {
  if (!isDebugEnabled()) return;

  debugLog('Control', `Control bound: ${uischemaType} at "${path}"`, {
    uischemaType,
    path,
    hasSuggestion,
    suggestion,
  });
};

/**
 * Debug logger for vanilla control setup
 */
export const debugVanillaControl = (
  path: string,
  hasSuggestion: boolean,
  suggestion: any,
  suggestionState: string
) => {
  if (!isDebugEnabled()) return;

  debugLog('Vanilla', `Vanilla control setup for "${path}"`, {
    path,
    hasSuggestion,
    suggestion,
    suggestionState,
  });
};

/**
 * Debug logger for suggestion actions
 */
export const debugAction = (
  action: 'accept' | 'reject',
  path: string,
  suggestion: any
) => {
  if (!isDebugEnabled()) return;

  debugLog('State', `Suggestion ${action}ed at "${path}"`, {
    action,
    path,
    suggestion,
  });
};

/**
 * Debug logger for wrapper rendering
 */
export const debugWrapper = (
  id: string,
  hasSuggestion: boolean,
  showSuggestion: boolean,
  suggestionState: string,
  suggestion: any
) => {
  if (!isDebugEnabled()) return;

  debugLog('Wrapper', `Rendering wrapper for control "${id}"`, {
    id,
    hasSuggestion,
    showSuggestion,
    suggestionState,
    suggestion,
  });
};

/**
 * Debug logger for JsonForms component
 */
export const debugJsonForms = (action: string, suggestions: any) => {
  if (!isDebugEnabled()) return;

  debugLog('JsonForms', action, {
    suggestions: suggestions,
    hasValue: suggestions !== undefined,
  });
};
