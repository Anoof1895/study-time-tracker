import React, { useState, useEffect, useRef } from 'react';

const FRICTION_OPTIONS = ['Easy', 'Normal', 'Difficult'];

// ─────────────────────────────────────────────────────────────────────────────
// POMODORO CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const POMODORO_SECONDS = 1500; // 25 × 60 — production value
const POMODORO_HOURS   = +(POMODORO_SECONDS / 3600).toFixed(2); // 0 for test, 0.42 for prod

// SVG ring math — circle r=45, so circumference = 2π×45 ≈ 283
const RING_CIRC = 283;

function PomodoroRing({ secondsLeft, totalSeconds, academicMode }) {
  const progress  = secondsLeft / totalSeconds;          // 1 → 0
  const dashOffset = RING_CIRC * (1 - progress);         // 0 → 283 as it drains
  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');

  const ringColor = academicMode ? '#44403c' : '#a78bfa'; // stone-700 / violet-400

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
        {/* Track */}
        <circle
          cx="60" cy="60" r="45"
          fill="none"
          strokeWidth="7"
          stroke={academicMode ? '#e7e5e4' : 'rgba(255,255,255,0.08)'}
        />
        {/* Progress arc */}
        <circle
          cx="60" cy="60" r="45"
          fill="none"
          strokeWidth="7"
          stroke={ringColor}
          strokeLinecap="round"
          strokeDasharray={RING_CIRC}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      {/* Time label — rotated back to upright */}
      <div className="relative -mt-[84px] flex flex-col items-center">
        <span
          className={`text-2xl font-bold tabular-nums tracking-tight ${
            academicMode ? 'text-stone-800' : 'text-white'
          }`}
        >
          {mins}:{secs}
        </span>
        <span
          className={`text-[10px] uppercase tracking-widest mt-0.5 ${
            academicMode ? 'text-stone-500' : 'text-indigo-300'
          }`}
        >
          focus
        </span>
      </div>
      {/* Spacer so content below the SVG isn't overlapped */}
      <div className="mt-8" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const DailyLog = ({ subjects, addLoggedHours, academicMode }) => {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]?.id || 1);
  const [hours, setHours]                     = useState('');
  const [frictionLevel, setFrictionLevel]     = useState('Normal');
  const [submitted, setSubmitted]             = useState(false);

  // Pomodoro state
  const [pomodoroActive,   setPomodoroActive]   = useState(false);
  const [secondsLeft,      setSecondsLeft]      = useState(POMODORO_SECONDS);
  const [pomodoroComplete, setPomodoroComplete] = useState(false);
  const intervalRef = useRef(null);

  // Start the countdown
  const startPomodoro = () => {
    if (pomodoroActive) return;
    setPomodoroActive(true);
    setPomodoroComplete(false);
    setSecondsLeft(POMODORO_SECONDS);

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Abandon the session
  const abandonPomodoro = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setPomodoroActive(false);
    setPomodoroComplete(false);
    setSecondsLeft(POMODORO_SECONDS);
  };

  // Detect timer hitting zero
  useEffect(() => {
    if (pomodoroActive && secondsLeft === 0) {
      setPomodoroActive(false);
      setPomodoroComplete(true);
      // Auto-fill hours with the Pomodoro duration value
      setHours(String(POMODORO_HOURS > 0 ? POMODORO_HOURS : 0.42));
    }
  }, [pomodoroActive, secondsLeft]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hours || isNaN(hours) || Number(hours) <= 0) return;

    addLoggedHours(Number(selectedSubject), Number(hours), frictionLevel);
    setHours('');
    setFrictionLevel('Normal');
    setPomodoroComplete(false);

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 1500);
  };

  /* ── Shared style helpers ── */
  const cardClass = academicMode
    ? 'bg-white border border-stone-300 rounded-2xl p-6 shadow-sm'
    : 'bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl';

  const labelClass = academicMode
    ? 'block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1'
    : 'block text-sm font-medium text-indigo-200 mb-1';

  const inputClass = academicMode
    ? 'w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-500 transition-shadow appearance-none'
    : 'w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow appearance-none';

  const frictionBadgeColors = {
    Easy:      academicMode ? 'bg-green-50 border-green-200 text-green-700'   : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300',
    Normal:    academicMode ? 'bg-amber-50 border-amber-200 text-amber-700'   : 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300',
    Difficult: academicMode ? 'bg-red-50 border-red-200 text-red-700'         : 'bg-red-500/20 border-red-500/30 text-red-300',
  };

  return (
    <div className={cardClass}>
      {/* ── Card heading ── */}
      <h2
        className={`text-2xl font-bold mb-4 flex items-center gap-2 ${
          academicMode ? 'text-stone-800 font-serif' : 'text-white'
        }`}
      >
        {!academicMode && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        Log Study Time
      </h2>

      {/* ── Pomodoro section ── */}
      <div
        className={`mb-5 rounded-xl border ${
          academicMode ? 'border-stone-200 bg-stone-50' : 'border-white/10 bg-white/5'
        }`}
      >
        {/* Header row */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${academicMode ? 'text-stone-500' : 'text-violet-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className={`text-xs font-semibold uppercase tracking-widest ${academicMode ? 'text-stone-500' : 'text-violet-300'}`}>
              Pomodoro Focus
            </span>
          </div>

          {/* Toggle button */}
          {!pomodoroActive && !pomodoroComplete && (
            <button
              id="start-pomodoro"
              type="button"
              onClick={startPomodoro}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                academicMode
                  ? 'bg-stone-800 text-white hover:bg-stone-700'
                  : 'bg-violet-600 text-white hover:bg-violet-500'
              }`}
            >
              Start Focus Session
            </button>
          )}
          {pomodoroActive && (
            <button
              id="abandon-pomodoro"
              type="button"
              onClick={abandonPomodoro}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                academicMode
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
              }`}
            >
              Abandon Session
            </button>
          )}
          {pomodoroComplete && (
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${
              academicMode ? 'bg-green-100 text-green-700' : 'bg-emerald-500/20 text-emerald-300'
            }`}>
              ✓ Session Done!
            </span>
          )}
        </div>

        {/* Ring — visible only while running */}
        {pomodoroActive && (
          <PomodoroRing
            secondsLeft={secondsLeft}
            totalSeconds={POMODORO_SECONDS}
            academicMode={academicMode}
          />
        )}

        {/* Completion nudge */}
        {pomodoroComplete && (
          <div className={`mx-4 mb-4 mt-1 rounded-lg px-4 py-3 text-xs ${
            academicMode
              ? 'bg-amber-50 border border-amber-200 text-amber-800'
              : 'bg-violet-500/10 border border-violet-500/20 text-violet-200'
          }`}>
            ⏱ 25-minute session complete — hours pre-filled.{' '}
            <strong>Select a Friction Level</strong> below, then submit.
          </div>
        )}
      </div>

      {/* ── Main form ── */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Subject */}
        <div>
          <label htmlFor="subject" className={labelClass}>Subject</label>
          <div className="relative">
            <select
              id="subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className={inputClass}
            >
              {subjects.map((sub) => (
                <option
                  key={sub.id}
                  value={sub.id}
                  className={academicMode ? 'bg-white text-stone-800' : 'bg-slate-800 text-white'}
                >
                  {sub.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 opacity-50">
              <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Hours Spent */}
        <div>
          <label htmlFor="hours" className={labelClass}>Hours Spent</label>
          <input
            id="hours"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="e.g. 1.5"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className={`${inputClass} ${
              pomodoroComplete
                ? academicMode
                  ? 'ring-2 ring-amber-400'
                  : 'ring-2 ring-violet-400'
                : ''
            }`}
            required
          />
        </div>

        {/* Friction Level */}
        <div>
          <label className={`${labelClass} ${pomodoroComplete ? (academicMode ? 'text-amber-700' : 'text-violet-300') : ''}`}>
            {pomodoroComplete ? '⬇ Select Friction Level' : 'Friction Level'}
          </label>
          <div className={`flex gap-2 rounded-xl p-1 transition-all ${
            pomodoroComplete
              ? academicMode
                ? 'ring-2 ring-amber-400 ring-offset-1 ring-offset-white'
                : 'ring-2 ring-violet-400 ring-offset-1 ring-offset-slate-900'
              : ''
          }`}>
            {FRICTION_OPTIONS.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setFrictionLevel(level)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border transition-all duration-150 focus:outline-none ${
                  frictionLevel === level
                    ? frictionBadgeColors[level] + ' ring-2 ring-offset-1 ' +
                      (academicMode ? 'ring-stone-400 ring-offset-white' : 'ring-white/30 ring-offset-slate-900')
                    : academicMode
                    ? 'bg-stone-100 border-stone-200 text-stone-500 hover:bg-stone-200'
                    : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                }`}
                aria-pressed={frictionLevel === level}
              >
                {level === 'Easy'      && '😌 '}
                {level === 'Normal'    && '😐 '}
                {level === 'Difficult' && '😤 '}
                {level}
              </button>
            ))}
          </div>
          {/* Hidden select for accessibility */}
          <select
            id="friction-level"
            value={frictionLevel}
            onChange={(e) => setFrictionLevel(e.target.value)}
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
          >
            {FRICTION_OPTIONS.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          id="submit-log"
          className={`w-full font-bold py-3 px-4 rounded-xl shadow-lg transform transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            submitted
              ? academicMode
                ? 'bg-green-600 text-white focus:ring-green-500'
                : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-green-500/30 focus:ring-green-500 focus:ring-offset-slate-900'
              : academicMode
              ? 'bg-stone-800 hover:bg-stone-700 text-white focus:ring-stone-600 focus:ring-offset-white'
              : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white shadow-purple-500/30 hover:-translate-y-0.5 active:translate-y-0 focus:ring-pink-500 focus:ring-offset-slate-900'
          }`}
        >
          {submitted ? '✓ Logged!' : 'Submit Log'}
        </button>
      </form>
    </div>
  );
};

export default DailyLog;
