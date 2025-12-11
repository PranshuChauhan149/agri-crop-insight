import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../Context/AppContext";
import IrrigationPlan from "./HistoryIrr";
import SoilPlan from "./HistorySoil";
import SpectralPlan from "./SpecHistory";
import PestPlan from "./PestHistory";

// Dummy Component (replace later)

const HistoryPage = () => {
  const { user } = useContext(AppContext);
  const { id } = useParams();

  if (!user || !user.history) return <div className="mt-20">Loading...</div>;

  // Find matching item
  const match = user.history.find((item) => item?.analysisId?._id === id);

  if (!match) return <div className="mt-20">No record found</div>;

  const { analysisType, analysisId } = match;

  const input = analysisId?.input || {};
  const output = analysisId?.output || {};

  // Component mapping
  const componentMap = {
    IrrigationPlan: <IrrigationPlan input={input} output={output} />,
    SoilAnalysis: <SoilPlan input={input} output={output} />,
    PestAnalysis: <PestPlan input={input} output={output} />,
    SpectralAnalysis: <SpectralPlan input={input} output={output} />,
  };

  return <div className="mt-20">{componentMap[analysisType]}</div>;
};

export default HistoryPage;
