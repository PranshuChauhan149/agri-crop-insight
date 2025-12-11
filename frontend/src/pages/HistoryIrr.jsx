// src/components/IrrigationPlan.jsx
import React from "react";

/**
 * IrrigationPlan
 * Props:
 *  - input:  object (read-only highlights)
 *  - output: object (requiredWaterVolume, irrigationDuration, sevenDayIrrigationSchedule, optional change fields)
 *
 * NOTE:
 *  - This component intentionally accepts only two props.
 *  - "Download Page (PDF)" opens a print-friendly window of the same report and triggers print (user can Save as PDF).
 */

export default function IrrigationPlan({ input = {}, output = {} }) {
  const requiredWaterVolume = output.requiredWaterVolume ?? "—";
  const irrigationDuration = output.irrigationDuration ?? "—";
  const schedule = Array.isArray(output.sevenDayIrrigationSchedule) ? output.sevenDayIrrigationSchedule : [];

  const fmt = (v) => (v === undefined || v === null || v === "" ? "—" : String(v));

  const exportPageAsPdf = () => {
    // Build a clean, print-friendly HTML snapshot of the visible report (inputs + outputs + timeline)
    const safe = (v) => (v === undefined || v === null ? "" : String(v));
    const inputsRows = Object.entries(input || {})
      .map(([k, v]) => `<tr><th style="text-align:left;padding:6px 8px;border-bottom:1px solid #eef2f7;width:30%">${k}</th><td style="padding:6px 8px;border-bottom:1px solid #eef2f7">${safe(v)}</td></tr>`)
      .join("");

    const scheduleHtml = (schedule || []).map((d, i) => {
      return `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;border-radius:8px;margin-bottom:8px;background:${d.isActive ? "#ecfdf5" : d.isDone ? "#f8fafc" : "#ffffff"};border:1px solid #e6eef1">
          <div style="display:flex;gap:12px;align-items:center">
            <div style="width:36px;height:36px;border-radius:999px;background:${d.isActive ? "#bbf7d0" : d.isDone ? "#e6eef1" : "#f1f5f9"};display:flex;align-items:center;justify-content:center;font-weight:600">${i+1}</div>
            <div>
              <div style="font-weight:600;color:#0f172a">${safe(d.day) || `Day ${i+1}`}</div>
              <div style="font-size:13px;color:#475569">${safe(d.startTime)} • ${safe(d.duration)}</div>
            </div>
          </div>
          <div style="text-align:right">
            <div style="font-weight:600;color:#064e3b">${safe(d.zone || d.zoneName || "Zone")}</div>
            <div style="font-size:12px;color:#475569">${d.isDone ? "Done" : d.isActive ? "Active" : "Pending"}</div>
          </div>
        </div>
      `;
    }).join("");

    const html = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width,initial-scale=1"/>
          <title>Irrigation Plan Report</title>
          <style>
            body{ font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial; color:#0f172a; margin:18px; }
            .wrap{ max-width:900px; margin:0 auto; }
            .brand{ display:inline-block;padding:6px 10px;border-radius:999px;background:linear-gradient(90deg,#059669,#10b981);color:white;font-weight:700;font-size:12px; }
            h1{ font-size:20px;margin:10px 0 4px;color:#064e3b; }
            .muted{ color:#475569;font-size:13px;margin-bottom:12px; }
            .card{ border-radius:10px;padding:12px;background:white;box-shadow:0 6px 20px rgba(2,6,23,0.06); margin-bottom:12px; }
            table{ width:100%; border-collapse:collapse; margin-top:6px; }
            th{ text-align:left; padding:8px; color:#475569; font-weight:600; }
            td{ padding:8px; color:#0f172a; }
            .grid-2{ display:grid; grid-template-columns:1fr 1fr; gap:12px; }
            @media print {
              body{ margin:6px; }
              .no-print{ display:none; }
            }
          </style>
        </head>
        <body>
          <div class="wrap">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <div>
                <div class="brand">AI SUGGESTION</div>
                <h1>Irrigation Plan</h1>
                <div class="muted">Generated: ${new Date().toLocaleString()}</div>
              </div>
              <div class="no-print" style="text-align:right">
                <button onclick="window.print()" style="background:linear-gradient(90deg,#059669,#10b981);color:white;border:none;padding:10px 12px;border-radius:8px;cursor:pointer">Print / Save as PDF</button>
              </div>
            </div>

            <div class="card grid-2">
              <div>
                <div style="font-size:13px;color:#475569">Required Water</div>
                <div style="font-size:26px;font-weight:800;color:#064e3b;margin-top:6px">${safe(requiredWaterVolume)}</div>
                <div style="font-size:12px;color:#6b7280;margin-top:6px">Units: ${safe(output.requiredWaterUnit ?? "liters")}</div>
              </div>
              <div>
                <div style="font-size:13px;color:#475569">Irrigation Duration</div>
                <div style="font-size:26px;font-weight:800;color:#064e3b;margin-top:6px">${safe(irrigationDuration)}</div>
                <div style="font-size:12px;color:#6b7280;margin-top:6px">Preferred: ${safe(input.irrigationTimePreference ?? output.preferredTime ?? "—")}</div>
              </div>
            </div>

            <div class="card">
              <h3 style="margin:0 0 8px 0;color:#0f172a">Input Details</h3>
              ${Object.keys(input || {}).length === 0 ? `<div style="color:#6b7280">No input details provided.</div>` : `<table><tbody>${inputsRows}</tbody></table>`}
            </div>

            <div class="card">
              <h3 style="margin:0 0 8px 0;color:#0f172a">7-day Schedule</h3>
              ${scheduleHtml || `<div style="color:#6b7280">No schedule available.</div>`}
            </div>

            <div style="font-size:12px;color:#6b7280;margin-top:8px">* AI suggestions — verify with sensors and local conditions before applying.</div>
          </div>
        </body>
      </html>
    `;

    const w = window.open("", "_blank", "toolbar=0,location=0,menubar=0");
    if (!w) {
      alert("Pop-up blocked — allow popups to export/print.");
      return;
    }
    w.document.open();
    w.document.write(html);
    w.document.close();
    // Give browser a moment to render then call print
    setTimeout(() => {
      try {
        w.focus();
        w.print();
        // Optionally close window after print — commented out because some browsers block it
        // w.close();
      } catch (e) {
        console.error(e);
      }
    }, 400);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow p-5">
      {/* header with green gradient */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-block rounded-full px-3 py-1 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white text-xs font-semibold">AI SUGGESTION</div>
          <h2 className="mt-3 text-2xl font-bold text-emerald-900">Irrigation Plan</h2>
          <p className="text-sm text-slate-500 mt-1">Overview — review before applying to field</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportPageAsPdf}
            className="px-3 py-1 rounded-md border bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-sm hover:opacity-95 shadow"
          >
            Download Page (PDF)
          </button>
        </div>
      </div>

      {/* top summary tiles */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-lg p-4 bg-gradient-to-br from-emerald-50 to-white border">
          <div className="text-sm text-slate-600">Required Water</div>
          <div className="mt-2 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-emerald-900">{fmt(requiredWaterVolume)}</div>
            {output.requiredWaterVolumeChange ? (
              <div className="text-sm text-green-700 font-semibold">{fmt(output.requiredWaterVolumeChange)}</div>
            ) : (
              <div className="text-xs text-slate-400">Estimation</div>
            )}
          </div>
          <div className="text-xs text-slate-500 mt-2">Units: {fmt(output.requiredWaterUnit ?? "liters")}</div>
        </div>

        <div className="rounded-lg p-4 bg-gradient-to-br from-emerald-50 to-white border">
          <div className="text-sm text-slate-600">Irrigation Duration</div>
          <div className="mt-2 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-emerald-900">{fmt(irrigationDuration)}</div>
            {output.irrigationDurationChange ? (
              <div className="text-sm text-green-700 font-semibold">{fmt(output.irrigationDurationChange)}</div>
            ) : (
              <div className="text-xs text-slate-400">Approx.</div>
            )}
          </div>
          <div className="text-xs text-slate-500 mt-2">Preferred time: {fmt(input.irrigationTimePreference ?? output.preferredTime)}</div>
        </div>
      </div>

      {/* inputs grid */}
      <div className="mt-6 bg-slate-50 rounded-lg p-4 border">
        <h4 className="text-sm font-medium text-slate-700 mb-3">Input Details</h4>
        {Object.keys(input || {}).length === 0 ? (
          <div className="text-sm text-slate-500">No input details provided.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(input).map(([k, v]) => (
              <div key={k} className="bg-white p-3 rounded border">
                <div className="text-xs text-slate-400">{k}</div>
                <div className="text-sm font-medium text-slate-800 mt-1 break-words">{String(v ?? "—")}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 7-day timeline */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-slate-700 mb-3">7-day Schedule</h4>
        {schedule.length === 0 ? (
          <div className="text-sm text-slate-500">No schedule available.</div>
        ) : (
          <div className="space-y-3">
            {schedule.map((d, i) => {
              const done = Boolean(d.isDone);
              const active = Boolean(d.isActive);
              return (
                <div
                  key={i}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    active ? "bg-emerald-50/80 border-emerald-200" : done ? "bg-white border-slate-200" : "bg-slate-50 border-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${active ? "bg-emerald-200" : done ? "bg-slate-200" : "bg-gray-100"}`}>
                      {i + 1}
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">{d.day ?? `Day ${i + 1}`}</div>
                      <div className="text-xs text-slate-500">{fmt(d.startTime)} • {fmt(d.duration)}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-sm text-slate-700">{fmt(d.zone ?? d.zoneName ?? "Zone")}</div>
                    <div className="text-xs">
                      {done ? <span className="text-green-600 font-semibold">Done</span> : active ? <span className="text-emerald-700 font-semibold">Active</span> : <span className="text-slate-500">Pending</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-slate-400">* AI suggestions — verify with sensors and local conditions before applying.</div>
    </div>
  );
}
