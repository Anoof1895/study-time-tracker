import { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import DailyLog from './components/DailyLog';
import SyllabusChecklist from './components/SyllabusChecklist';

const initialSubjects = [
  { id: 1, name: 'IAL Mathematics', targetHours: 5, loggedHours: 0, frictionEntries: [] },
  { id: 2, name: 'IAL Chemistry',   targetHours: 5, loggedHours: 0, frictionEntries: [] },
  { id: 3, name: 'IAL Physics',     targetHours: 5, loggedHours: 0, frictionEntries: [] },
  { id: 4, name: 'Islam',           targetHours: 3, loggedHours: 0, frictionEntries: [] },
  { id: 5, name: 'Dhivehi',         targetHours: 3, loggedHours: 0, frictionEntries: [] },
];

const FRICTION_VALUES = { Easy: 1, Normal: 2, Difficult: 3 };

// ── Nav tab definitions ───────────────────────────────────────────────────────
const NAV_TABS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    id: 'syllabus',
    label: 'Syllabus',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
];

function App() {
  const [subjects,     setSubjects]     = useState(initialSubjects);
  const [academicMode, setAcademicMode] = useState(false);
  const [activeView,   setActiveView]   = useState('dashboard');

  const updateTargetHours = (id, newTarget) => {
    setSubjects((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, targetHours: Number(newTarget) } : sub))
    );
  };

  const addLoggedHours = (id, hoursToAdd, frictionLevel) => {
    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.id !== id) return sub;
        return {
          ...sub,
          loggedHours: sub.loggedHours + Number(hoursToAdd),
          frictionEntries: frictionLevel
            ? [...sub.frictionEntries, FRICTION_VALUES[frictionLevel]]
            : sub.frictionEntries,
        };
      })
    );
  };

  /* ── Shared style tokens ── */
  const appBg = academicMode
    ? 'academic-mode bg-stone-50 text-stone-900 font-serif'
    : 'bg-gradient-to-br from-gray-900 via-indigo-950 to-slate-900 text-gray-100 font-sans';

  const navBarBg = academicMode
    ? 'bg-white border-b border-stone-200 shadow-sm'
    : 'bg-black/30 backdrop-blur-xl border-b border-white/10';

  const tabActive = academicMode
    ? 'bg-stone-800 text-white shadow'
    : 'bg-white/15 text-white shadow-lg';

  const tabInactive = academicMode
    ? 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
    : 'text-white/50 hover:text-white/90 hover:bg-white/5';

  return (
    <div className={`min-h-screen selection:bg-indigo-500 selection:text-white ${appBg}`}>

      {/* ══ Sticky top navigation bar ══════════════════════════════════════════ */}
      <nav className={`sticky top-0 z-50 ${navBarBg}`}>
        <div className="max-w-screen-2xl mx-auto px-6 py-3 flex items-center justify-between gap-4">

          {/* Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                academicMode ? 'bg-stone-800' : 'bg-gradient-to-br from-indigo-500 to-purple-600'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span
              className={`font-bold text-base tracking-tight ${
                academicMode ? 'text-stone-800 font-serif' : 'text-white'
              }`}
            >
              Study Time Tracker
            </span>
          </div>

          {/* Centre: page tabs */}
          <div
            className={`flex rounded-xl p-1 gap-1 ${
              academicMode ? 'bg-stone-100' : 'bg-white/5'
            }`}
          >
            {NAV_TABS.map((tab) => (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => setActiveView(tab.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 focus:outline-none ${
                  activeView === tab.id ? tabActive : tabInactive
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right: mode toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <span
              className={`hidden sm:block text-xs font-semibold uppercase tracking-wider ${
                academicMode ? 'text-stone-400' : 'text-indigo-300'
              }`}
            >
              {academicMode ? 'Academic' : 'Digital'}
            </span>
            <button
              id="mode-toggle"
              aria-label="Toggle Academic Mode"
              onClick={() => setAcademicMode((m) => !m)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                academicMode
                  ? 'bg-stone-700 focus:ring-stone-500 focus:ring-offset-stone-50'
                  : 'bg-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                  academicMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* ══ Page content ═══════════════════════════════════════════════════════ */}
      <div className={`max-w-screen-2xl mx-auto ${academicMode ? 'px-6 md:px-14 py-10' : 'px-6 md:px-12 py-10'}`}>

        {/* ── Dashboard view ── */}
        {activeView === 'dashboard' && (
          <>
            {/* Page heading */}
            <header className="mb-8">
              <h1
                className={
                  academicMode
                    ? 'text-3xl md:text-4xl font-bold tracking-tight text-stone-800 border-b-2 border-stone-800 pb-2 inline-block'
                    : 'text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-sm'
                }
              >
                Weekly Overview
              </h1>
              <p
                className={
                  academicMode
                    ? 'text-stone-500 text-base mt-2 italic'
                    : 'text-indigo-200 text-base font-medium opacity-70 mt-2'
                }
              >
                {academicMode
                  ? 'Monitor your study hours against weekly targets.'
                  : 'Track hours, spot friction patterns, crush your weekly goals.'}
              </p>
            </header>

            <main className="grid grid-cols-1 gap-8 xl:gap-12 lg:grid-cols-4 items-start">
              <div className="lg:col-span-3 min-w-0">
                <Dashboard
                  subjects={subjects}
                  updateTargetHours={updateTargetHours}
                  academicMode={academicMode}
                />
              </div>
              <div className="lg:col-span-1 sticky top-24">
                <DailyLog
                  subjects={subjects}
                  addLoggedHours={addLoggedHours}
                  academicMode={academicMode}
                />
              </div>
            </main>
          </>
        )}

        {/* ── Syllabus view ── */}
        {activeView === 'syllabus' && (
          <>
            <header className="mb-6">
              <h1
                className={
                  academicMode
                    ? 'text-3xl md:text-4xl font-bold tracking-tight text-stone-800 border-b-2 border-stone-800 pb-2 inline-block'
                    : 'text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 drop-shadow-sm'
                }
              >
                Syllabus Checklist
              </h1>
              <p
                className={
                  academicMode
                    ? 'text-stone-500 text-base mt-2 italic'
                    : 'text-indigo-200 text-base font-medium opacity-70 mt-2'
                }
              >
                {academicMode
                  ? 'Mark off each learning objective as you cover it. Progress is saved automatically.'
                  : 'Drill into any unit and tick off exact spec objectives. Saved to localStorage.'}
              </p>
            </header>
            <SyllabusChecklist academicMode={academicMode} />
          </>
        )}

      </div>
    </div>
  );
}

export default App;
