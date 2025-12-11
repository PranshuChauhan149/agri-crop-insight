import React, { useContext } from "react";
import RightSideImageSlider from "../components/RightSideImageSlider";
import AppContext from "../Context/AppContext";
import WeatherDashboard from "../components/WeatherDashboard";
import WeeklyWeather from "../components/WeeklyData";
import LatestAISummary from "../components/atestAISummary";
import QuickActions from "../components/QuickAction";
import RecentHistory from "../components/RecentHistory";
import SlideBar from "../components/SlideBar";

const Dashboard = () => {
  const { weather } = useContext(AppContext);

  return (
    <div className="w-full mt-16 min-h-screen bg-gradient-to-br from-green-200 via-gray-200 to-green-300 flex">
      
      {/* SIDEBAR */}
      <div className="hidden md:block fixed left-0 top-16 h-full z-30">
        <SlideBar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-0 md:ml-[260px] p-6 flex flex-col gap-6">

        {/* SLIDER + WEATHER */}
        <div className="flex flex-col md:flex-row gap-6">
          <RightSideImageSlider />

          {weather && <WeatherDashboard weather={weather} />}
        </div>

        {/* WEEKLY DATA */}
        <WeeklyWeather />

        {/* LATEST AI + QUICK ACTIONS */}
        <div className="w-full flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <LatestAISummary />
          </div>

          <div className="w-full lg:w-[350px]">
            <QuickActions />
          </div>
        </div>

        {/* RECENT HISTORY */}
        <RecentHistory />
      </div>
    </div>
  );
};

export default Dashboard;
