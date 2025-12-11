
// src/components/SpectralPlan.jsx
import React from "react";
import { ImageIcon, Leaf, Activity, Sparkles, Beaker } from "lucide-react";

/**
 * SpectralPlan
 * Props:
 *  - input:  object (fieldName, cropType, location, analysisType, temperature, climate, etc.)
 *  - output: object (cropHealthScore, canopyCoverPercentage, vegetationHeatmaps:{ ndvi, ndre, gndvi }, diseaseDetectionMap:[], aiRecommendations:[])
 *
 * NOTE: Accepts only two props. No forms, no network calls. Download exports the visible page for print/save as PDF.
 */

const getColorForIndex = (analysisType) => {
  switch (String(analysisType).toUpperCase()) {
    case "NDVI":
      return { stroke: "#ef4444", fill: "from-red-100 to-red-50" }; // red
    case "NDRE":
      return { stroke: "#f59e0b", fill: "from-yellow-100 to-yellow-50" }; // amber
    case "GNDVI":
      return { stroke: "#16a34a", fill: "from-green-100 to-green-50" }; // green
    default:
      return { stroke: "#4f46e5", fill: "from-indigo-100 to-indigo-50" }; // indigo
  }
};

const clamp01 = (v) => {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
};

export default function SpectralPlan({ input = {}, output = {} }) {
  // tolerant reads
  const analysisType = (input.analysisType || output.analysisType || "").toUpperCase() || "NDVI";
  const cropHealthScore = output.cropHealthScore ?? output.healthScore ?? null;
  const canopy = output.canopyCoverPercentage ?? null;
  const heat = output.vegetationHeatmaps || {};
  const indexValue =
    analysisType === "NDVI" ? (heat.ndvi ?? 0) : analysisType === "NDRE" ? (heat.ndre ?? 0) : (heat.gndvi ?? 0);
  // indexValue expected 0..1 or 0..100; normalize to 0..1
  const indexNormalized = clamp01(indexValue > 1 ? indexValue / 100 : indexValue);

  const diseases = Array.isArray(output.diseaseDetectionMap) ? output.diseaseDetectionMap : [];
  const recommendations = Array.isArray(output.aiRecommendations) ? output.aiRecommendations : [];

  const safe = (v) => (v === undefined || v === null || v === "" ? "—" : String(v));

  const downloadPageAsPdf = () => {
    // build snapshot HTML without raw JSON
    const inputsHtml = `
      <tr><th style="text-align:left;padding:8px;border-bottom:1px solid #eef2f7">Field</th><td style="padding:8px;border-bottom:1px solid #eef2f7">${safe(input.fieldName)}</td></tr>
      <tr><th style="text-align:left;padding:8px;border-bottom:1px solid #eef2f7">Crop</th><td style="padding:8px;border-bottom:1px solid #eef2f7">${safe(input.cropType)}</td></tr>
      <tr><th style="text-align:left;padding:8px;border-bottom:1px solid #eef2f7">Location</th><td style="padding:8px;border-bottom:1px solid #eef2f7">${safe(input.location)}</td></tr>
      <tr><th style="text-align:left;padding:8px;border-bottom:1px solid #eef2f7">Analysis</th><td style="padding:8px;border-bottom:1px solid #eef2f7">${safe(analysisType)}</td></tr>
      <tr><th style="text-align:left;padding:8px;border-bottom:1px solid #eef2f7">Temp</th><td style="padding:8px;border-bottom:1px solid #eef2f7">${safe(input.temperature)}</td></tr>
      <tr><th style="text-align:left;padding:8px;border-bottom:1px solid #eef2f7">Climate</th><td style="padding:8px;border-bottom:1px solid #eef2f7">${safe(input.climate)}</td></tr>
    `;

    const diseaseHtml = diseases.length
      ? `<ul>${diseases.map((d) => `<li>${String(d)}</li>`).join("")}</ul>`
      : `<div style="color:#6b7280">No diseases detected</div>`;

    const recHtml = recommendations.length
      ? `<ul>${recommendations.map((r) => `<li>"${r}"</li>`).join("")}</ul>`
      : `<div style="color:#6b7280">No recommendations</div>`;

    const html = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>Spectral Analysis Report</title>
          <style>
            body{ font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial;color:#0f172a;margin:18px;}
            .wrap{ max-width:900px;margin:0 auto;}
            .brand{display:inline-block;padding:6px 10px;border-radius:999px;background:linear-gradient(90deg,#4f46e5,#06b6d4);color:white;font-weight:700;font-size:12px;}
            h1{font-size:20px;margin:8px 0 4px;color:#0f172a;}
            .muted{color:#475569;font-size:13px;margin-bottom:12px;}
            .card{border-radius:10px;padding:12px;background:white;box-shadow:0 6px 20px rgba(2,6,23,0.06);margin-bottom:12px;}
            table{width:100%;border-collapse:collapse;margin-top:6px;}
            th{padding:8px;text-align:left;color:#475569;}
            td{padding:8px;color:#0f172a;}
            @media print{body{margin:6px} .no-print{display:none}}
          </style>
        </head>
        <body>
          <div class="wrap">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <div>
                <div class="brand">SPECTRAL INSIGHT</div>
                <h1>Spectral Analysis Report</h1>
                <div class="muted">Generated: ${new Date().toLocaleString()}</div>
              </div>
              <div class="no-print">
                <button onclick="window.print()" style="background:linear-gradient(90deg,#4f46e5,#06b6d4);color:white;border:none;padding:10px 12px;border-radius:8px;cursor:pointer">Print / Save as PDF</button>
              </div>
            </div>

            <div class="card" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div>
                <div style="font-size:13px;color:#475569">Crop Health Score</div>
                <div style="font-size:28px;font-weight:800;color:#0f172a;margin-top:6px">${safe(cropHealthScore ?? "—")}</div>
                <div style="color:#6b7280;margin-top:8px">Canopy: ${safe(canopy ?? "—")}</div>
              </div>
              <div>
                <div style="font-size:13px;color:#475569">Selected Index</div>
                <div style="font-size:28px;font-weight:800;color:#0f172a;margin-top:6px">${safe((analysisType || "") + " — " + (indexValue ?? "—"))}</div>
              </div>
            </div>

            <div class="card">
              <h3 style="margin:0 0 8px 0;color:#0f172a">Inputs</h3>
              <table><tbody>${inputsHtml}</tbody></table>
            </div>

            <div class="card" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div>
                <h3 style="margin:0 0 8px 0;color:#0f172a">Disease Detection</h3>
                ${diseaseHtml}
              </div>
              <div>
                <h3 style="margin:0 0 8px 0;color:#0f172a">AI Recommendations</h3>
                ${recHtml}
              </div>
            </div>

            <div style="font-size:12px;color:#6b7280;margin-top:8px">* AI suggestions — verify with local sensors and agronomist advice before applying.</div>
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

  const arcCirc = 2 * Math.PI * 45; // using r=45% of viewbox -> strokeDasharray constant similar to previous
  const dash = Math.round(arcCirc * (1 - indexNormalized)); // strokeDashoffset to show progress
  const { stroke: arcStroke, fill: arcFill } = getColorForIndex(analysisType);

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow p-6">
      {/* header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-block rounded-full px-3 py-1 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-semibold">SPECTRAL INSIGHT</div>
          <h2 className="mt-3 text-2xl font-bold text-indigo-900">Spectral Analysis</h2>
          <p className="text-sm text-slate-500 mt-1">Vegetation indices, disease detection & AI recommendations</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={downloadPageAsPdf}
            className="px-3 py-1 rounded-md border bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-sm hover:opacity-95 shadow"
          >
            Download Page (PDF)
          </button>
        </div>
      </div>

      {/* row: index cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-indigo-600" />
            <div>
              <div className="text-xs text-slate-500">Crop Health Score</div>
              <div className="text-2xl font-bold text-indigo-900">{safe(cropHealthScore ?? "—")}{cropHealthScore !== null ? " / 100" : ""}</div>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">Higher is healthier — aggregated from indices and canopy metrics.</p>
        </div>

        <div className="bg-white rounded-xl border p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Leaf className="w-5 h-5 text-green-600" />
            <div>
              <div className="text-xs text-slate-500">Canopy Cover</div>
              <div className="text-2xl font-bold text-green-800">{safe(canopy ?? "—")}{canopy !== null ? " %" : ""}</div>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">Estimated green canopy percentage from image analysis.</p>
        </div>

        <div className="bg-white rounded-xl border p-4 shadow-sm flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-rose-500" />
          <div>
            <div className="text-xs text-slate-500">Selected Index</div>
            <div className="text-2xl font-bold text-gray-800">{analysisType}</div>
            <div className="text-sm text-slate-400 mt-1">{(indexValue !== undefined && indexValue !== null) ? String(indexValue) : "—"}</div>
          </div>
        </div>
      </div>

      {/* row: circular graph + explanation */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="bg-white rounded-xl border p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">{analysisType} Index Graph</h3>

          <div className="relative w-44 h-44">
            {/* background circle */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="45" strokeWidth="10" stroke="#e6e7ee" fill="transparent" />
            </svg>

            {/* progress arc */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="45"
                strokeWidth="10"
                stroke={arcStroke}
                fill="transparent"
                strokeDasharray={arcCirc}
                strokeDashoffset={dash}
                strokeLinecap="round"
              />
            </svg>

            {/* center text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800">{Math.round(indexNormalized * 100)}%</div>
                <div className="text-xs text-slate-500 mt-1">Index strength</div>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-3 text-center">Visual gauge for selected vegetation index (normalized).</p>
        </div>

        <div className="bg-white rounded-xl border p-6">
          <h4 className="font-semibold text-slate-800">Interpretation</h4>
          <p className="text-sm text-slate-600 mt-2">
            {analysisType === "NDVI"
              ? "NDVI indicates plant vigor and photosynthetic capacity. Higher values → healthier canopy."
              : analysisType === "NDRE"
              ? "NDRE is more sensitive to chlorophyll changes and early stress (useful for nitrogen monitoring)."
              : "GNDVI emphasizes green reflectance and can detect water stress & greenness."}
          </p>

          <div className="mt-4">
            <h5 className="text-sm font-medium text-slate-700">Quick actions</h5>
            <ul className="mt-2 text-sm text-slate-600 space-y-2">
              <li>• Focus scouting on zones with low index values.</li>
              <li>• Validate low-index areas with ground truth (soil test / plant inspection).</li>
              <li>• Apply targeted fertilizer or irrigation based on index + soil data.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* diseases */}
      <div className="mt-6">
        <h3 className="font-semibold text-slate-800">Disease Detection</h3>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {diseases.length ? (
            diseases.map((d, i) => (
              <div key={i} className="p-3 bg-white rounded-lg border flex items-center gap-3 shadow-sm">
                <Beaker className="w-5 h-5 text-rose-500" />
                <div>
                  <div className="font-medium text-slate-800">{String(d)}</div>
                  <div className="text-xs text-slate-500">Detected by image model</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-slate-500">No diseases detected</div>
          )}
        </div>
      </div>

      {/* recommendations */}
      <div className="mt-6">
        <h3 className="font-semibold text-slate-800">AI Recommendations</h3>
        <div className="mt-3 space-y-3">
          {recommendations.length ? (
            recommendations.map((rec, i) => (
              <div key={i} className="p-3 bg-white rounded-lg border-l-4 border-indigo-600 shadow-sm">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-indigo-600 mt-1" />
                  <div>
                    <div className="text-slate-800">{String(rec)}</div>
                    <div className="text-xs text-slate-500">AI suggestion — validate locally</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-slate-500">No recommendations</div>
          )}
        </div>
      </div>

      {/* input highlights */}
      <div className="mt-6 p-4 bg-slate-50 rounded-lg border">
        <h4 className="font-medium text-slate-800 mb-2">Input Summary</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white p-3 rounded border">
            <div className="text-xs text-slate-400">Field</div>
            <div className="font-medium text-slate-800 mt-1">{safe(input.fieldName)}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <div className="text-xs text-slate-400">Crop</div>
            <div className="font-medium text-slate-800 mt-1">{safe(input.cropType)}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <div className="text-xs text-slate-400">Analysis</div>
            <div className="font-medium text-slate-800 mt-1">{safe(analysisType)}</div>
          </div>
          <div className="bg-white p-3 rounded border">
            <div className="text-xs text-slate-400">Temp</div>
            <div className="font-medium text-slate-800 mt-1">{safe(input.temperature)}</div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-slate-400">* AI suggestions — validate with local scouting and soil tests before acting.</div>
    </div>
  );
}
