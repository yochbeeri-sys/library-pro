/* ===========================================================
   שְׁמִירַת הַתְקַדְּמוּת בְּ-localStorage
   =========================================================== */
const GameStorage = (() => {
  const KEY = 'golem_prague_progress_v1';
  const MUTE_KEY = 'golem_prague_muted_v1';

  function emptyProgress() {
    return STAGES.map(() => ({
      completed: new Array(5).fill(false)
    }));
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return emptyProgress();
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length !== STAGES.length) return emptyProgress();
      return parsed;
    } catch (e) {
      return emptyProgress();
    }
  }

  function save(progress) {
    try {
      localStorage.setItem(KEY, JSON.stringify(progress));
    } catch (e) { /* אחסון מלא/חסום - מתעלמים בשקט */ }
  }

  function isMuted() {
    try {
      return localStorage.getItem(MUTE_KEY) === '1';
    } catch (e) { return false; }
  }

  function setMuted(val) {
    try {
      localStorage.setItem(MUTE_KEY, val ? '1' : '0');
    } catch (e) { /* ignore */ }
  }

  return { load, save, isMuted, setMuted };
})();
