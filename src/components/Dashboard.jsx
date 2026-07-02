import React from 'react';

// ── Friction helpers ──────────────────────────────────────────────────────────
const FRICTION_LABELS = { 1: 'Easy', 2: 'Normal', 3: 'Difficult' };
const FRICTION_COLORS = {
  Easy:      { digital: 'text-emerald-400', academic: 'text-green-700' },
  Normal:    { digital: 'text-yellow-300',  academic: 'text-amber-700' },
  Difficult: { digital: 'text-red-400',     academic: 'text-red-700'   },
};

function getAvgFriction(entries) {
  if (!entries || entries.length === 0) return null;
  const avg     = entries.reduce((a, b) => a + b, 0) / entries.length;
  const rounded = Math.round(avg);
  return FRICTION_LABELS[rounded] || null;
}

// ── Bar Chart ─────────────────────────────────────────────────────────────────
function ProgressChart({ subjects, academicMode }) {
  const maxHours = Math.max(...subjects.map((s) => Math.max(s.targetHours, s.loggedHours, 1)));

  return (
    <div
      className={`mt-8 rounded-2xl p-6 ${
        academicMode
          ? 'border border-stone-300 bg-stone-100'
          : 'bg-white/10 backdrop-blur-sm border border-white/10'
      }`}
    >
      <h3
        className={`text-sm font-semibold uppercase tracking-widest mb-6 ${
          academicMode ? 'text-stone-500' : 'text-indigo-300'
        }`}
      >
        Weekly Progress — Logged vs Target
      </h3>

      <div className="space-y-4">
        {subjects.map((sub) => {
          const loggedPct   = Math.min((sub.loggedHours / maxHours) * 100, 100);
          const targetPct   = Math.min((sub.targetHours / maxHours) * 100, 100);
          const completed   = sub.loggedHours >= sub.targetHours;

          return (
            <div key={sub.id} className="group">
              <div className="flex justify-between items-baseline mb-1.5">
                <span className={`text-xs font-medium truncate max-w-[60%] ${academicMode ? 'text-stone-700' : 'text-white/90'}`}>
                  {sub.name}
                </span>
                <span className={`text-xs tabular-nums ${academicMode ? 'text-stone-500' : 'text-white/50'}`}>
                  {sub.loggedHours}h / {sub.targetHours}h
                </span>
              </div>

              <div className={`relative h-7 rounded-lg overflow-hidden ${academicMode ? 'bg-stone-200' : 'bg-white/10'}`}>
                {/* Target marker */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 z-10 opacity-60"
                  style={{ left: `${targetPct}%`, backgroundColor: academicMode ? '#a8a29e' : 'rgba(255,255,255,0.5)' }}
                />
                {/* Logged bar */}
                <div
                  className={`h-full rounded-lg transition-all duration-700 ease-out ${
                    completed
                      ? academicMode ? 'bg-green-600' : 'bg-gradient-to-r from-emerald-500 to-green-400'
                      : academicMode ? 'bg-stone-700' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
                  }`}
                  style={{ width: `${loggedPct}%`, minWidth: sub.loggedHours > 0 ? '4px' : '0' }}
                />
                <span
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-medium pointer-events-none"
                  style={{ color: academicMode ? '#78716c' : 'rgba(255,255,255,0.4)' }}
                >
                  {sub.loggedHours === 0 ? 'Not started' : completed ? '✓ Done' : ''}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className={`flex items-center gap-5 mt-6 pt-4 border-t text-xs ${academicMode ? 'border-stone-300 text-stone-500' : 'border-white/10 text-white/40'}`}>
        <span className="flex items-center gap-1.5">
          <span className={`inline-block w-3 h-3 rounded-sm ${academicMode ? 'bg-stone-700' : 'bg-indigo-500'}`} />
          Logged Hours
        </span>
        <span className="flex items-center gap-1.5">
          <span className={`inline-block w-0.5 h-3 ${academicMode ? 'bg-stone-400' : 'bg-white/50'}`} />
          Target Marker
        </span>
        <span className="flex items-center gap-1.5">
          <span className={`inline-block w-3 h-3 rounded-sm ${academicMode ? 'bg-green-600' : 'bg-emerald-500'}`} />
          Completed
        </span>
      </div>
    </div>
  );
}

// ── Friction Insights ─────────────────────────────────────────────────────────
function getTip(sub) {
  const avg       = sub.frictionEntries.length
    ? sub.frictionEntries.reduce((a, b) => a + b, 0) / sub.frictionEntries.length
    : null;
  if (avg === null) return null;

  const pctLogged = sub.targetHours > 0 ? sub.loggedHours / sub.targetHours : 0;

  if (avg >= 2.5) {
    // Difficult territory
    return pctLogged < 0.5
      ? { icon: '🧩', text: `${sub.name}: Sessions feel tough and progress is low — break each session into 20-min focused chunks, one sub-topic at a time.` }
      : { icon: '🏋️', text: `${sub.name}: You're pushing through difficult material well — supplement with timed past-paper questions to consolidate under exam conditions.` };
  }
  if (avg < 1.5) {
    // Easy territory
    return pctLogged >= 1
      ? { icon: '🚀', text: `${sub.name}: Target met and sessions feel easy — advance to A2-level or past-paper unseen questions to stay sharp.` }
      : { icon: '⬆️', text: `${sub.name}: Sessions feel smooth but target isn't met yet — consider increasing your weekly hour target or tackling a harder topic.` };
  }
  // Normal
  return { icon: '📌', text: `${sub.name}: Steady pace — maintain consistency and add one timed practice session this week to build exam stamina.` };
}

function FrictionInsights({ subjects, academicMode }) {
  const tips = subjects.map(getTip).filter(Boolean);
  if (tips.length === 0) return null;

  return (
    <div
      className={`mt-6 rounded-2xl p-6 ${
        academicMode
          ? 'border border-stone-300 bg-stone-50'
          : 'bg-white/10 backdrop-blur-sm border border-white/10'
      }`}
    >
      <h3
        className={`text-sm font-semibold uppercase tracking-widest mb-4 flex items-center gap-2 ${
          academicMode ? 'text-stone-500' : 'text-indigo-300'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        Friction Analytics — Smart Tips
      </h3>

      <div className="space-y-3">
        {tips.map((tip, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 rounded-xl px-4 py-3 text-sm ${
              academicMode
                ? 'bg-white border border-stone-200 text-stone-700'
                : 'bg-white/5 border border-white/10 text-white/80'
            }`}
          >
            <span className="text-base shrink-0 mt-0.5">{tip.icon}</span>
            <p className="leading-relaxed">{tip.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
const Dashboard = ({ subjects, updateTargetHours, academicMode }) => {
  return (
    <div
      className={`rounded-2xl p-6 shadow-2xl ${
        academicMode
          ? 'bg-white border border-stone-300'
          : 'bg-white/10 backdrop-blur-lg border border-white/20'
      }`}
    >
      <h2
        className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
          academicMode ? 'text-stone-800 font-serif' : 'text-white'
        }`}
      >
        {!academicMode && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        )}
        Weekly Overview
      </h2>

      {/* ── Responsive table: min-w-0 on parent prevents card from expanding beyond grid cell ── */}
      <div className={`overflow-x-auto rounded-xl border min-w-0 ${academicMode ? 'border-stone-200' : 'border-white/10'}`}>
        <table className="w-full table-auto text-left text-sm">
          <thead
            className={`uppercase tracking-wider border-b ${
              academicMode
                ? 'bg-stone-100 text-stone-600 border-stone-200 text-xs'
                : 'bg-white/5 text-indigo-200 border-white/10'
            }`}
          >
            <tr>
              <th className="px-3 py-3 font-semibold rounded-tl-xl w-[30%] text-left">Subject</th>
              <th className="px-3 py-3 font-semibold w-[15%]">Target (hrs)</th>
              <th className="px-3 py-3 font-semibold w-[15%]">Logged (hrs)</th>
              <th className="px-3 py-3 font-semibold w-[15%]">Remaining</th>
              <th className="px-3 py-3 font-semibold w-[15%]">Avg Friction</th>
              <th className="px-3 py-3 font-semibold rounded-tr-xl w-[10%] text-center">Status</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${academicMode ? 'divide-stone-100' : 'divide-white/10'}`}>
            {subjects.map((sub) => {
              const remaining   = Math.max(0, sub.targetHours - sub.loggedHours);
              const avgFriction = getAvgFriction(sub.frictionEntries);

              let statusText  = 'Needs Attention';
              let statusStyle = academicMode ? 'bg-red-50 text-red-700 border-red-200' : 'bg-red-500/20 text-red-300 border-red-500/30';
              let statusDot   = 'bg-red-500';

              if (remaining <= 0) {
                statusText  = 'Completed';
                statusStyle = academicMode ? 'bg-green-50 text-green-700 border-green-200' : 'bg-green-500/20 text-green-300 border-green-500/30';
                statusDot   = 'bg-green-500';
              } else if (sub.loggedHours > 0) {
                statusText  = 'On Track';
                statusStyle = academicMode ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
                statusDot   = academicMode ? 'bg-amber-500' : 'bg-yellow-500';
              }

              return (
                <tr
                  key={sub.id}
                  className={`transition-colors duration-150 ${academicMode ? 'hover:bg-stone-50' : 'hover:bg-white/5'}`}
                >
                  <td className={`px-3 py-3 font-medium truncate ${academicMode ? 'text-stone-800' : 'text-white'}`}>{sub.name}</td>
                  <td className="px-3 py-3">
                    <input
                      type="number"
                      min="0"
                      value={sub.targetHours}
                      onChange={(e) => updateTargetHours(sub.id, e.target.value)}
                      className={`w-16 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 transition-shadow ${
                        academicMode
                          ? 'bg-stone-100 border border-stone-300 text-stone-800 focus:ring-stone-400'
                          : 'bg-black/20 border border-white/10 text-white focus:ring-indigo-500'
                      }`}
                    />
                  </td>
                  <td className={`px-3 py-3 font-semibold tabular-nums ${academicMode ? 'text-stone-700' : 'text-indigo-300'}`}>
                    {sub.loggedHours}
                  </td>
                  <td className={`px-3 py-3 tabular-nums ${academicMode ? 'text-stone-600' : ''}`}>{remaining}</td>
                  <td className="px-3 py-3">
                    {avgFriction ? (
                      <span className={`text-xs font-semibold ${FRICTION_COLORS[avgFriction][academicMode ? 'academic' : 'digital']}`}>
                        {avgFriction}
                      </span>
                    ) : (
                      <span className={`text-xs ${academicMode ? 'text-stone-400' : 'text-white/30'}`}>—</span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${statusStyle}`}>
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusDot}`} />
                      {statusText}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ProgressChart subjects={subjects} academicMode={academicMode} />
      <FrictionInsights subjects={subjects} academicMode={academicMode} />
    </div>
  );
};

export default Dashboard;
