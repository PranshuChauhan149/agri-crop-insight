// src/components/PestPlan.jsx
import React from "react";

/**
 * PestPlan
 * Props:
 *  - input:  object (plantName, maybe image, other metadata)
 *  - output: object (plantOverview, possibleDisease, diseaseCause, proTip, safeSpraySuggestions[], recommendedFertilizers[], applicationGuide[])
 *
 * NOTE: Accepts only two props. No forms or axios here.
 */

export default function PestPlan({ input = {}, output = {} }) {
  const o = output || {};
  const plantOverview = o.plantOverview || {};
  const safeSprays = Array.isArray(o.safeSpraySuggestions) ? o.safeSpraySuggestions : [];
  const fertilizers = Array.isArray(o.recommendedFertilizers) ? o.recommendedFertilizers : [];
  const guide = Array.isArray(o.applicationGuide) ? o.applicationGuide : [];
  const proTip = o.proTip ?? o.tip ?? "—";

  const safe = (v) => (v === undefined || v === null || v === "" ? "—" : String(v));

  const exportPageAsPdf = () => {
    const safeList = (arr) =>
      arr && arr.length ? `<ul>${arr.map((x) => `<li>${String(x)}</li>`).join("")}</ul>` : `<div style="color:#6b7280">No items</div>`;

    const fertHtml = fertilizers.length
      ? fertilizers
          .map(
            (f) =>
              `<div style="border:1px solid #e6f4ea;padding:10px;border-radius:8px;margin-bottom:8px;background:linear-gradient(180deg,#ffffff,#f6fff7)">
                 <div style="font-weight:700;color:#054e3a">${safe(f.name)}</div>
                 <div style="font-size:13px;color:#475569">Dosage: ${safe(f.dosage)} • Timing: ${safe(f.timing)}</div>
               </div>`
          )
          .join("")
      : `<div style="color:#6b7280">No fertilizers recommended</div>`;

    const appHtml = guide.length
      ? guide
          .map(
            (s) =>
              `<div style="border:1px solid #e6f4ea;padding:8px;border-radius:8px;margin-bottom:8px">
                 <div style="font-weight:700;color:#064e3b">${safe(s.heading)}</div>
                 <div style="font-size:13px;color:#475569">${safe(s.content)}</div>
               </div>`
          )
          .join("")
      : `<div style="color:#6b7280">No application guide</div>`;

    const html = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>Pest & Fertilizer Report</title>
          <style>
            body{ font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial;color:#0f172a;margin:18px; }
            .wrap{ max-width:900px;margin:0 auto; }
            .brand{ display:inline-block;padding:6px 10px;border-radius:999px;background:linear-gradient(90deg,#10b981,#34d399);color:white;font-weight:700;font-size:12px; }
            h1{ font-size:20px;margin:8px 0 4px;color:#064e3b; }
            .muted{ color:#475569;font-size:13px;margin-bottom:12px; }
            .card{ border-radius:10px;padding:12px;background:white;box-shadow:0 6px 20px rgba(2,6,23,0.04); margin-bottom:12px; }
            table{ width:100%; border-collapse:collapse; margin-top:6px; }
            th, td{ padding:8px; text-align:left; border-bottom:1px solid #eef6f0; }
            @media print { body{ margin:6px } .no-print{ display:none } }
          </style>
        </head>
        <body>
          <div class="wrap">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <div>
                <div class="brand">PEST & FERTILITY</div>
                <h1>Pest & Fertilizer Report</h1>
                <div class="muted">Generated: ${new Date().toLocaleString()}</div>
              </div>
              <div class="no-print">
                <button onclick="window.print()" style="background:linear-gradient(90deg,#10b981,#34d399);color:white;border:none;padding:10px 12px;border-radius:8px;cursor:pointer">Print / Save as PDF</button>
              </div>
            </div>

            <div class="card" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div>
                <div style="font-size:13px;color:#475569">Plant Overview</div>
                <div style="font-weight:700;color:#064e3b;margin-top:6px">${safe(plantOverview.plantName)}</div>
                <div style="font-size:13px;color:#475569;margin-top:4px">${safe(plantOverview.plantType)}</div>
              </div>
              <div>
                <div style="font-size:13px;color:#475569">Possible Disease</div>
                <div style="font-weight:700;color:#b91c1c;margin-top:6px">${safe(o.possibleDisease)}</div>
                <div style="font-size:13px;color:#475569;margin-top:6px">Cause: ${safe(o.diseaseCause)}</div>
              </div>
            </div>

            <div class="card">
              <div style="font-weight:700;color:#064e3b">Pro Tip</div>
              <div style="margin-top:6px;color:#475569">${safe(proTip)}</div>
            </div>

            <div class="card" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div>
                <h3 style="margin:0 0 8px 0;color:#064e3b">Safe Spray Suggestions</h3>
                ${safeList(safeSprays)}
              </div>
              <div>
                <h3 style="margin:0 0 8px 0;color:#064e3b">Recommended Fertilizers</h3>
                ${fertHtml}
              </div>
            </div>

            <div class="card">
              <h3 style="margin:0 0 8px 0;color:#064e3b">Application Guide</h3>
              ${appHtml}
            </div>

            <div style="font-size:12px;color:#6b7280;margin-top:8px">* These are AI suggestions — cross-check with local agronomist and label instructions before application.</div>
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
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow p-6">
      {/* header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-block rounded-full px-3 py-1 bg-gradient-to-r from-emerald-400 to-emerald-300 text-white text-xs font-semibold">PEST & FERTILITY</div>
          <h2 className="mt-3 text-2xl font-bold text-emerald-900">Pest & Fertilizer Report</h2>
          <p className="text-sm text-slate-500 mt-1">Detection, safe sprays & fertilizer guidance (AI suggestions)</p>
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

      {/* grid */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plant overview */}
        <div className="bg-emerald-50 p-5 rounded-lg border">
          <div className="text-sm text-emerald-700 font-semibold">Plant Overview</div>
          <div className="mt-3">
            <div className="text-lg font-bold text-emerald-900">{safe(plantOverview.plantName)}</div>
            <div className="text-sm text-slate-600 mt-1">{safe(plantOverview.plantType)}</div>
          </div>
        </div>

        {/* disease */}
        <div className="bg-white p-5 rounded-lg border">
          <div className="text-sm text-red-600 font-semibold">Possible Disease</div>
          <div className="mt-3">
            <div className="text-lg font-bold text-rose-700">{safe(o.possibleDisease)}</div>
            <div className="text-sm text-slate-600 mt-1">Cause: {safe(o.diseaseCause)}</div>
          </div>
        </div>

        {/* pro tip */}
        <div className="bg-emerald-100 p-5 rounded-lg border-l-4 border-emerald-600">
          <div className="text-sm text-emerald-800 font-semibold">✅ Pro Tip</div>
          <div className="mt-3 text-sm text-slate-700">{safe(proTip)}</div>
        </div>

        {/* safe sprays */}
        <div className="bg-white p-5 rounded-lg border">
          <div className="text-sm text-emerald-700 font-semibold">🧴 Safe Spray Suggestions</div>
          <ul className="list-disc pl-5 mt-3 space-y-2 text-sm text-slate-700">
            {safeSprays.length ? safeSprays.map((s, i) => <li key={i}>{s}</li>) : <li className="text-slate-500">No suggestions</li>}
          </ul>
        </div>

        {/* fertilizers (span 2 cols) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-lg border">
          <div className="text-sm text-emerald-700 font-semibold">🌾 Recommended Fertilizers</div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            {fertilizers.length ? fertilizers.map((f, i) => (
              <div key={i} className="p-4 rounded-lg border bg-emerald-50">
                <div className="font-semibold text-emerald-900">{safe(f.name)}</div>
                <div className="text-sm text-slate-600">Dosage: {safe(f.dosage)}</div>
                <div className="text-sm text-slate-600">Timing: {safe(f.timing)}</div>
              </div>
            )) : <div className="text-slate-500">No fertilizers recommended</div>}
          </div>
        </div>

        {/* application guide (full width) */}
        <div className="lg:col-span-3 bg-white p-5 rounded-lg border">
          <div className="text-sm text-emerald-700 font-semibold">📘 Application Guide</div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            {guide.length ? guide.map((step, i) => (
              <div key={i} className="p-4 rounded-lg border bg-emerald-50">
                <div className="font-semibold text-emerald-900">{safe(step.heading)}</div>
                <div className="text-sm text-slate-700 mt-1">{safe(step.content)}</div>
              </div>
            )) : <div className="text-slate-500">No guide available</div>}
          </div>
        </div>
      </div>

      <div className="mt-6 text-xs text-slate-400">* AI suggestions — always validate with label instructions and local agronomist advice.</div>
    </div>
  );
}
