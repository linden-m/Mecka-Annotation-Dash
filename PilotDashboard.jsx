import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";
import { RefreshCw, TrendingUp, TrendingDown, Circle } from "lucide-react";

const NAVY = "#1E2761";
const AMBER = "#E8A33D";
const TEAL = "#3FA796";
const RED = "#D9534F";
const PURPLE = "#6C63FF";

const reasonData = [
  { code: "Obj", value: 34 },
  { code: "Act", value: 28 },
  { code: "Miss", value: 18 },
  { code: "Inv", value: 11 },
  { code: "Hand", value: 9 },
];

function MetricCard({ label, big, sub, decision, accent, trend, children }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="h-1 w-8 rounded-full mb-3" style={{ backgroundColor: accent }} />
      <div className="text-[11px] font-bold tracking-wide text-slate-500 mb-1.5">{label}</div>
      <div className="text-[26px] font-serif font-bold text-[#1E2761] leading-tight mb-1">{big}</div>
      <div className="flex items-center gap-1 text-[12px] text-slate-700 mb-2">
        {trend === "up" && <TrendingUp size={13} className="text-red-500" />}
        {trend === "down" && <TrendingDown size={13} className="text-teal-600" />}
        <span>{sub}</span>
      </div>
      {children}
      <div className="text-[11px] italic text-slate-400 mt-auto pt-2">{decision}</div>
    </div>
  );
}

export default function PilotDashboard() {
  const [clips, setClips] = useState(1240);
  const [kappa, setKappa] = useState(0.79);
  const [unclear, setUnclear] = useState(6.2);
  const [live, setLive] = useState(true);
  const [pulse, setPulse] = useState(false);
  const [hoveredBar, setHoveredBar] = useState(null);

  const refresh = () => {
    setPulse(true);
    setClips((c) => Math.min(1500, c + Math.floor(Math.random() * 18)));
    setKappa((k) => Math.max(0.6, Math.min(0.95, +(k + (Math.random() - 0.45) * 0.02).toFixed(2))));
    setUnclear((u) => Math.max(2, Math.min(12, +(u + (Math.random() - 0.5) * 0.8).toFixed(1))));
    setTimeout(() => setPulse(false), 500);
  };

  useEffect(() => {
    if (!live) return;
    const id = setInterval(refresh, 4000);
    return () => clearInterval(id);
  }, [live]);

  const pct = Math.round((clips / 1500) * 100);
  const kappaOk = kappa >= 0.75;

  return (
    <div className="w-full max-w-5xl mx-auto font-sans">
      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
        {/* Header chrome bar */}
        <div className="flex items-center justify-between px-5 py-3" style={{ backgroundColor: NAVY }}>
          <div className="flex items-center gap-3">
            <span className="text-white text-[13px] font-semibold">
              Mecka Pilot — Embodied-AI Verification &nbsp;|&nbsp; Week 1
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLive((v) => !v)}
              className="flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-md transition-colors"
              style={{ backgroundColor: live ? AMBER : "rgba(255,255,255,0.15)", color: live ? NAVY : "white" }}
            >
              <Circle size={7} fill={live ? TEAL : RED} color={live ? TEAL : RED} className={live ? "animate-pulse" : ""} />
              {live ? "LIVE" : "PAUSED"}
            </button>
            <button
              onClick={refresh}
              aria-label="Refresh metrics"
              className="text-white/80 hover:text-white p-1.5 rounded-md hover:bg-white/10 transition-colors"
            >
              <RefreshCw size={15} className={pulse ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="bg-slate-50 p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            label="CLIPS COMPLETED"
            big={`${clips.toLocaleString()} / 1,500`}
            sub={`${pct}% of daily pilot target`}
            decision="Supports: add headcount/hours to hit volume"
            accent={AMBER}
          >
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-2">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, backgroundColor: AMBER }}
              />
            </div>
          </MetricCard>

          <MetricCard
            label="ROLLING COHEN'S κ"
            big={kappa.toFixed(2)}
            sub={`vs. golden set (target ≥ 0.75)`}
            decision="Supports: go/no-go gate for scaling past pilot"
            accent={kappaOk ? TEAL : RED}
            trend={kappaOk ? "down" : "up"}
          >
            <div
              className="text-[11px] font-bold px-2 py-0.5 rounded-full w-fit mb-2"
              style={{
                backgroundColor: kappaOk ? "#E1F5EE" : "#FCEBEB",
                color: kappaOk ? "#085041" : "#791F1F",
              }}
            >
              {kappaOk ? "On target" : "Below target"}
            </div>
          </MetricCard>

          <MetricCard
            label="% MARKED UNCLEAR"
            big={`${unclear.toFixed(1)}%`}
            sub="rolling daily average"
            decision="Supports: revise guidelines before volume ramps"
            accent={RED}
          />

          <MetricCard
            label="COST / DELIVERED CLIP"
            big="$0.94"
            sub="In-house $0.92  •  BPO $1.05"
            decision="Supports: volume allocation, in-house vs. BPO"
            accent={AMBER}
          />

          <MetricCard
            label="ESCALATION QUEUE"
            big="3 open"
            sub="18h avg. resolution time"
            decision="Supports: pause & clarify guidelines vs. push through"
            accent={TEAL}
          />

          <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="h-1 w-8 rounded-full mb-3" style={{ backgroundColor: PURPLE }} />
            <div className="text-[11px] font-bold tracking-wide text-slate-500 mb-1.5">REASON-CODE MIX</div>
            <div className="flex-1 -ml-2" style={{ minHeight: 90 }}>
              <ResponsiveContainer width="100%" height={90}>
                <BarChart data={reasonData} margin={{ top: 12, right: 4, left: 4, bottom: 0 }}>
                  <XAxis dataKey="code" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <Bar dataKey="value" radius={[3, 3, 0, 0]} onMouseEnter={(_, i) => setHoveredBar(i)} onMouseLeave={() => setHoveredBar(null)}>
                    {reasonData.map((_, i) => (
                      <Cell key={i} fill={i === hoveredBar ? NAVY : AMBER} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-[11px] italic text-slate-400 pt-1">Supports: feedback loop to the vision-model team</div>
          </div>
        </div>
      </div>
      <p className="text-center text-[11px] text-slate-400 mt-3">
        Live-updating mockup — numbers refresh automatically every few seconds, or click the refresh icon
      </p>
      <p className="text-center text-[11px] text-slate-400 mt-1">
        Source report: <a className="text-[#1E2761] underline underline-offset-2 hover:text-[#3FA796]" href="https://example.com/mecka-pilot-week-1-report" target="_blank" rel="noreferrer">Mecka Pilot Week 1 (mock)</a>
      </p>
    </div>
  );
}
