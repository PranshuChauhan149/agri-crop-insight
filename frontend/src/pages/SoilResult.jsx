// SoilResult.jsx
import React from "react";
import { motion } from "framer-motion";

/**
 * Props:
 *  - soil: (object) full SoilAnalysis object (populated analysisId or API response)
 *  - onClose: (fn) optional close handler
 *
 * Usage:
 *  <SoilResult soil={soil} onClose={() => setOpen(false)} />
 */

export default function SoilResult({ soil, onClose }) {
  if (!soil) return null;

  const o = soil.output || {};
  const npk = o.npkLevels || {};
  const bal = o.nutrientBalanceOverview || {};
  const def = o.soilDeficiencyPredictor || {};
  const rec = o.recommendedCrops || [];

  const barValue = (v) => Math.max(0, Math.min(100, Number(v) || 0));

  const downloadJSON = () => {
    const dataStr = JSON.stringify(soil, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `soil-analysis-${soil._id || Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportAsPdf = () => {
    const html = `
      <html>
        <head>
          <title>Soil Report</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            body{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial; padding:20px; color:#111; }
            .card{ max-width:900px; margin:0 auto; }
            h1{ font-size:20px; margin-bottom:6px; }
            pre{ background:#f7fafc; padding:12px; border-radius:8px; white-space:pre-wrap; word-wrap:break-word; }
            table{ width:100%; border-collapse:collapse; margin-top:8px; }
            td,th{ padding:6px 8px; border:1px solid #eee; text-align:left; }
          </style>
        </head>
        <body onload="window.print()">
          <div class="card">
            <h1>Soil Analysis Report</h1>
            <div><strong>ID:</strong> ${soil._id || "-"}</div>
            <div><strong>Date:</strong> ${new Date(soil.createdAt || Date.now()).toLocaleString()}</div>
            <h3>Input</h3>
            <pre>${JSON.stringify(soil.input || {}, null, 2)}</pre>
            <h3>Output</h3>
            <pre>${JSON.stringify(o || {}, null, 2)}</pre>
          </div>
        </body>
      </html>
    `;
    const w = window.open("", "_blank", "toolbar=0,location=0,menubar=0");
    if (!w) return alert("Pop-up blocked — allow popups to export/print.");
    w.document.write(html);
    w.document.close();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="bg-white rounded-2xl shadow-lg p-6 max-w-5xl mx-auto"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Soil Analysis Report</h2>
          <div className="text-sm text-slate-500 mt-1">ID: {soil._id}</div>
          <div className="text-sm text-slate-500">{new Date(soil.createdAt).toLocaleString()}</div>
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={downloadJSON}
            className="px-3 py-1 rounded-md border bg-white text-sm hover:bg-slate-50 shadow-sm"
          >
            Download JSON
          </button>

          <button
            onClick={exportAsPdf}
            className="px-3 py-1 rounded-md border bg-white text-sm hover:bg-slate-50 shadow-sm"
          >
            Export / Print
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-md border bg-white text-sm hover:bg-slate-50 shadow-sm"
            >
              Close
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-lg">
          <h3 className="font-medium mb-2">Summary</h3>
          <div className="text-sm text-slate-700 space-y-2">
            <div>
              <span className="font-medium">Soil Health Score: </span>
              <span>{o.soilHealthScore ?? "-"}</span>
            </div>
            <div>
              <span className="font-medium">Soil Temperature: </span>
              <span>{o.soilTemperature ?? "-"}</span>
            </div>
            <div>
              <span className="font-medium">Recommended Crops: </span>
              <span>{rec.length ? rec.join(", ") : "-"}</span>
            </div>
            <div>
              <span className="font-medium">Top Deficiency: </span>
              <span>{def.name || "-"}</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg">
          <h3 className="font-medium mb-2">NPK Levels</h3>

          <div className="space-y-3">
            {[
              { key: "nitrogen", label: "N", val: npk.nitrogen },
              { key: "phosphorus", label: "P", val: npk.phosphorus },
              { key: "potassium", label: "K", val: npk.potassium },
            ].map((it) => (
              <div key={it.key}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <div className="font-medium">{it.label}</div>
                  <div className="text-xs text-slate-500">{it.val ?? "-"}</div>
                </div>

                <div className="w-full bg-white rounded-full h-3 border overflow-hidden">
                  <div
                    style={{ width: `${barValue(it.val)}%` }}
                    className="h-3 rounded-full bg-gradient-to-r from-green-400 to-lime-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg border">
          <h3 className="font-medium mb-2">Nutrient Balance Overview</h3>
          <pre className="bg-slate-50 p-3 rounded text-xs overflow-auto">{JSON.stringify(bal, null, 2)}</pre>
        </div>

        <div className="p-4 bg-white rounded-lg border">
          <h3 className="font-medium mb-2">Soil Deficiency Predictor</h3>
          {o.soilDeficiencyPredictor ? (
            <div className="text-sm space-y-2">
              <div><strong>Name:</strong> {def.name}</div>
              <div><strong>Impact:</strong> {def.impact}</div>
              <div><strong>Severity:</strong> {def.severity}</div>
              <div><strong>Recommendation:</strong> {def.recommendation}</div>
            </div>
          ) : (
            <div className="text-sm text-slate-500">No deficiency detected</div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-medium mb-2">Raw AI Output</h3>
        <pre className="bg-slate-50 p-4 rounded text-xs overflow-auto">{JSON.stringify(o, null, 2)}</pre>
      </div>
    </motion.div>
  );
}
