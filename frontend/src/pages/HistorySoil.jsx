// src/components/SoilPlan.jsx
import React from "react";

/**
 * SoilPlan
 * Props:
 *  - input:  object
 *  - output: object
 *
 * This version hides raw JSON and presents styled cards for nutrient balance and AI output.
 */

export default function SoilPlan({ input = {}, output = {} }) {
  const o = output || {};
  const npk = o.npkLevels || {};
  const balance = o.nutrientBalanceOverview || {};
  const deficiency = o.soilDeficiencyPredictor || {};
  const recommended = Array.isArray(o.recommendedCrops) ? o.recommendedCrops : (o.recommendedCrops ? [o.recommendedCrops] : []);
  const health = o.soilHealthScore ?? o.healthScore ?? "—";
  const soilTemp = o.soilTemperature ?? input.soilTemperature ?? "—";

  const safe = (v) => (v === undefined || v === null || v === "" ? "—" : String(v));
  const numVal = (v) => {
    const n = Number(String(v).replace(/[^0-9.-]/g, ""));
    if (Number.isFinite(n)) return Math.max(0, Math.min(100, Math.round(n)));
    return 0;
  };

  const severityColor = (sev) => {
    if (!sev) return "bg-slate-50 text-slate-700";
    const s = String(sev).toLowerCase();
    if (s.includes("high")) return "bg-red-50 text-red-700 border-red-200";
    if (s.includes("medium")) return "bg-amber-50 text-amber-700 border-amber-200";
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  };

  const exportPageAsPdf = () => {
    // Build a print-friendly HTML snapshot (no raw JSON)
    const inputsRows = Object.entries(input || {})
      .map(([k, v]) => `<tr><th style="text-align:left;padding:6px 8px;border-bottom:1px solid #eef2f7;width:30%">${k}</th><td style="padding:6px 8px;border-bottom:1px solid #eef2f7">${String(v ?? "")}</td></tr>`)
      .join("");

    const npkHtml = [
      { lab: "Nitrogen (N)", val: numVal(npk.nitrogen) },
      { lab: "Phosphorus (P)", val: numVal(npk.phosphorus) },
      { lab: "Potassium (K)", val: numVal(npk.potassium) },
    ].map(it => `
      <div style="margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;font-weight:700;color:#0f172a">
          <div>${it.lab}</div>
          <div style="font-size:13px;color:#475569">${it.val}%</div>
        </div>
        <div style="height:10px;background:#eefaf1;border-radius:999px;margin-top:6px;overflow:hidden">
          <div style="width:${it.val}%;height:100%;background:linear-gradient(90deg,#16a34a,#84cc16)"></div>
        </div>
      </div>
    `).join("");

    const deficiencyHtml = deficiency && Object.keys(deficiency).length ? `
      <div style="padding:10px;border-radius:8px;background:#fff;border:1px solid #e6eef1">
        <div style="font-weight:700;color:#064e3b;margin-bottom:6px">${safe(deficiency.name)}</div>
        <div style="font-size:13px;color:#475569;margin-bottom:6px">${safe(deficiency.impact)}</div>
        <div style="font-size:13px;color:#475569"><strong>Severity:</strong> ${safe(deficiency.severity)}</div>
        <div style="margin-top:8px;font-size:13px;color:#064e3b"><strong>Recommendation:</strong> ${safe(deficiency.recommendation)}</div>
      </div>
    ` : `<div style="color:#6b7280">No significant deficiency detected.</div>`;

    const recHtml = recommended.length ? `<div style="display:flex;gap:6px;flex-wrap:wrap">${recommended.map(r => `<span style="background:#f8faf9;padding:6px 10px;border-radius:999px;border:1px solid #e6eef1">${r}</span>`).join("")}</div>` : `<div style="color:#6b7280">No crop suggestions</div>`;

    const html = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width,initial-scale=1"/>
          <title>Soil Analysis Report</title>
          <style>
            body{ font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial;color:#0f172a; margin:18px; }
            .wrap{ max-width:900px;margin:0 auto; }
            .brand{ display:inline-block;padding:6px 10px;border-radius:999px;background:linear-gradient(90deg,#059669,#10b981);color:white;font-weight:700;font-size:12px; }
            h1{ font-size:20px;margin:8px 0 4px;color:#064e3b; }
            .muted{ color:#475569;font-size:13px;margin-bottom:12px; }
            .card{ border-radius:10px;padding:12px;background:white;box-shadow:0 6px 20px rgba(2,6,23,0.06); margin-bottom:12px; }
            table{ width:100%; border-collapse:collapse;margin-top:6px; }
            th{ text-align:left;padding:8px;color:#475569;font-weight:600; }
            td{ padding:8px;color:#0f172a; }
            @media print { body{ margin:6px } .no-print{ display:none } }
          </style>
        </head>
        <body>
          <div class="wrap">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <div>
                <div class="brand">SOIL INSIGHT</div>
                <h1>Soil Analysis</h1>
                <div class="muted">Generated: ${new Date().toLocaleString()}</div>
              </div>
              <div class="no-print">
                <button onclick="window.print()" style="background:linear-gradient(90deg,#059669,#10b981);color:white;border:none;padding:10px 12px;border-radius:8px;cursor:pointer">Print / Save as PDF</button>
              </div>
            </div>

            <div class="card" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div>
                <div style="font-size:13px;color:#475569">Soil Health Score</div>
                <div style="font-size:28px;font-weight:800;color:#064e3b;margin-top:6px">${safe(health)}</div>
                <div style="color:#6b7280;margin-top:8px">Measured: ${safe(soilTemp)}</div>
              </div>
              <div>
                <div style="font-size:13px;color:#475569">Recommended Crops</div>
                <div style="margin-top:8px">${recHtml}</div>
              </div>
            </div>

            <div class="card">
              <h3 style="margin:0 0 8px 0;color:#0f172a">Nutrient Balance</h3>
              <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:8px">
                <div style="padding:12px;border-radius:12px;background:linear-gradient(180deg,#ecfdf5,#ffffff);border:1px solid #e6f7ec">
                  <div style="font-size:13px;color:#065f46;font-weight:700">Nitrogen</div>
                  <div style="margin-top:6px;font-size:18px;font-weight:800;color:#064e3b">${numVal(balance.nitrogen)}%</div>
                </div>
                <div style="padding:12px;border-radius:12px;background:linear-gradient(180deg,#fefce8,#ffffff);border:1px solid #fff6db">
                  <div style="font-size:13px;color:#92400e;font-weight:700">Phosphorus</div>
                  <div style="margin-top:6px;font-size:18px;font-weight:800;color:#78350f">${numVal(balance.phosphorus)}%</div>
                </div>
                <div style="padding:12px;border-radius:12px;background:linear-gradient(180deg,#ecfeff,#ffffff);border:1px solid #e6fbfa">
                  <div style="font-size:13px;color:#075985;font-weight:700">Potassium</div>
                  <div style="margin-top:6px;font-size:18px;font-weight:800;color:#075985">${numVal(balance.potassium)}%</div>
                </div>
              </div>
            </div>

            <div class="card" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div>
                <h3 style="margin:0 0 8px 0;color:#0f172a">NPK Levels</h3>
                ${npkHtml}
              </div>
              <div>
                <h3 style="margin:0 0 8px 0;color:#0f172a">Deficiency Predictor</h3>
                ${deficiencyHtml}
              </div>
            </div>

            <div class="card">
              <h3 style="margin:0 0 8px 0;color:#0f172a">Input Details</h3>
              ${Object.keys(input || {}).length === 0 ? `<div style="color:#6b7280">No input details provided.</div>` : `<table><tbody>${inputsRows}</tbody></table>`}
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
    setTimeout(() => {
      try {
        w.focus();
        w.print();
      } catch (e) {
        console.error(e);
      }
    }, 300);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow p-5">
      {/* header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-block rounded-full px-3 py-1 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white text-xs font-semibold">SOIL INSIGHT</div>
          <h2 className="mt-3 text-2xl font-bold text-emerald-900">Soil Analysis</h2>
          <p className="text-sm text-slate-500 mt-1">AI-driven soil health & crop guidance</p>
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

      {/* top row */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg p-4 bg-gradient-to-br from-emerald-50 to-white border">
          <div className="text-sm text-slate-600">Soil Health Score</div>
          <div className="mt-2 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-emerald-900">{safe(health)}</div>
            <div className="text-sm text-slate-500">Measured: {safe(soilTemp)}</div>
          </div>
          <div className="text-xs text-slate-400 mt-2">Cross-check before applying amendments</div>
        </div>

        <div className="rounded-lg p-4 bg-gradient-to-br from-emerald-50 to-white border">
          <div className="text-sm text-slate-600">Recommended Crops</div>
          <div className="mt-2">
            {recommended.length ? (
              <div className="flex flex-wrap gap-2">
                {recommended.map((c, i) => (
                  <div key={i} className="text-sm bg-white px-3 py-1 rounded-full border text-slate-800">{c}</div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-slate-500">No suggestions</div>
            )}
          </div>
        </div>
      </div>

      {/* Nutrient Balance */}
      <div className="mt-6 p-4 bg-white rounded-lg border">
        <h3 className="font-medium mb-3">Nutrient Balance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-50 to-white border">
            <div className="text-xs font-semibold text-emerald-700">Nitrogen</div>
            <div className="mt-2 text-xl font-bold text-emerald-900">{numVal(balance.nitrogen)}%</div>
          </div>

          <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-50 to-white border">
            <div className="text-xs font-semibold text-amber-700">Phosphorus</div>
            <div className="mt-2 text-xl font-bold text-amber-900">{numVal(balance.phosphorus)}%</div>
          </div>

          <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-50 to-white border">
            <div className="text-xs font-semibold text-cyan-700">Potassium</div>
            <div className="mt-2 text-xl font-bold text-cyan-900">{numVal(balance.potassium)}%</div>
          </div>
        </div>
      </div>

      {/* NPK + Deficiency */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg border">
          <h3 className="font-medium mb-3">NPK Levels</h3>
          <div className="space-y-4">
            {[
              { key: "nitrogen", label: "N", val: numVal(npk.nitrogen) },
              { key: "phosphorus", label: "P", val: numVal(npk.phosphorus) },
              { key: "potassium", label: "K", val: numVal(npk.potassium) },
            ].map((it) => (
              <div key={it.key}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <div className="font-medium">{it.label}</div>
                  <div className="text-xs text-slate-500">{it.val ?? "-"}%</div>
                </div>

                <div className="w-full bg-slate-50 rounded-full h-3 border overflow-hidden">
                  <div
                    style={{ width: `${it.val}%` }}
                    className="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-lime-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-4 rounded-lg border ${severityColor(deficiency.severity)} bg-white`}>
          <h3 className="font-medium mb-3">Deficiency Predictor</h3>
          {deficiency && Object.keys(deficiency).length ? (
            <div className="space-y-2 text-sm">
              <div><strong className="text-slate-700">Name:</strong> <span className="ml-2">{safe(deficiency.name)}</span></div>
              <div><strong className="text-slate-700">Impact:</strong> <span className="ml-2">{safe(deficiency.impact)}</span></div>
              <div><strong className="text-slate-700">Severity:</strong> <span className="ml-2">{safe(deficiency.severity)}</span></div>
              <div><strong className="text-slate-700">Recommendation:</strong> <span className="ml-2">{safe(deficiency.recommendation)}</span></div>
            </div>
          ) : (
            <div className="text-sm text-slate-500">No deficiency detected</div>
          )}
        </div>
      </div>

      {/* Input details */}
      <div className="mt-6 p-4 bg-slate-50 rounded-lg border">
        <h3 className="font-medium mb-3">Input Details</h3>
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

      <div className="mt-4 text-xs text-slate-400">* AI suggestions — verify with sensors and local conditions before applying.</div>
    </div>
  );
}
