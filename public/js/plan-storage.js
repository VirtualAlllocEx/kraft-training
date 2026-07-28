/* Shared Trainingsplan localStorage helpers (kraft:plan:v1).
   Loaded from Base.astro so category / plan / detail / lightbox stay in sync. */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'kraft:plan:v1';

  function readPlan() {
    try {
      var raw = JSON.parse(global.localStorage.getItem(STORAGE_KEY) || 'null');
      if (Array.isArray(raw)) return raw.slice();
      // Prefer `current` (named-plans / Base write path) over legacy `ids`
      if (raw && typeof raw === 'object') {
        if (Array.isArray(raw.current)) return raw.current.slice();
        if (Array.isArray(raw.ids)) return raw.ids.slice();
      }
    } catch (e) { /* private mode / corrupt */ }
    return [];
  }

  /**
   * Persist plan IDs. Preserves object wrappers when already present
   * (updates the field that was already in use; defaults to `current`).
   * @returns {boolean} false if storage write failed
   */
  function writePlan(ids) {
    if (!Array.isArray(ids)) ids = [];
    try {
      var raw = null;
      try {
        raw = JSON.parse(global.localStorage.getItem(STORAGE_KEY) || 'null');
      } catch (e) { /* treat as empty */ }

      if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
        if (Array.isArray(raw.current) || !Array.isArray(raw.ids)) {
          raw.current = ids;
        } else {
          raw.ids = ids;
        }
        global.localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));
      } else {
        global.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  function notifyPlanChanged() {
    try {
      global.dispatchEvent(new CustomEvent('plan-changed'));
    } catch (e) { /* IE not a concern */ }
  }

  global.kraftPlan = {
    KEY: STORAGE_KEY,
    read: readPlan,
    write: writePlan,
    notify: notifyPlanChanged,
  };
})(typeof window !== 'undefined' ? window : globalThis);
