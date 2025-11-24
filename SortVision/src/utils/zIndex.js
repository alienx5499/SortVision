/**
 * Z-Index Management System for SortVision
 * 
 * This file defines a centralized z-index system to prevent conflicts
 * between different UI components and modals.
 * 
 * Z-Index Hierarchy (from lowest to highest):
 * - Base UI elements: 1-100
 * - Dropdowns/Tooltips: 100-500
 * - Modals/Overlays: 1000-5000
 * - Critical modals: 5000-10000
 * - System alerts: 10000+
 */

export const Z_INDEX = {
  // Base UI elements
  BASE: 1,
  DROPDOWN: 100,
  TOOLTIP: 200,
  STICKY: 300,
  
  // Modals and overlays
  MODAL_BACKDROP: 1000,
  MODAL: 1001,
  CHATBOT: 2000,
  CHATBOT_BACKDROP: 1999,
  
  // Critical modals (higher priority)
  GITHUB_STAR_BACKDROP: 9998,
  GITHUB_STAR_MODAL: 9999,
  SPONSOR_BACKDROP: 9996,
  SPONSOR_MODAL: 9997,
  
  // System alerts and critical notifications
  OFFLINE_INDICATOR: 9995,
  PWA_INSTALL_BACKDROP: 10000,
  PWA_INSTALL_MODAL: 10001,
  
  // Emergency/System level
  EMERGENCY: 99999,
};

/**
 * Get z-index value for a component
 * @param {keyof typeof Z_INDEX} component - Component name
 * @returns {number} Z-index value
 */
export const getZIndex = (component) => {
  return Z_INDEX[component] || Z_INDEX.BASE;
};

/**
 * Check if a component should appear above another
 * @param {keyof typeof Z_INDEX} component1 - First component
 * @param {keyof typeof Z_INDEX} component2 - Second component
 * @returns {boolean} True if component1 should appear above component2
 */
export const isAbove = (component1, component2) => {
  return getZIndex(component1) > getZIndex(component2);
};

export default Z_INDEX;
