🌾 SmartAgro AI – Intelligent Farming Assistant

SmartAgro AI is an advanced AI-powered agriculture assistant that helps farmers improve crop yield, detect plant diseases, monitor soil health, predict pests, and optimize irrigation schedules.
Built using MERN Stack + AI Models, it delivers real-time insights with an easy-to-use interface.

🚀 Features
🔍 AI Analysis Tools

Plant Disease Detection – Upload images and get instant disease identification.

Pest Prediction AI – Forecast pest risk and provide preventive recommendations.

Soil Health Analysis – NPK levels, deficiency prediction, nutrient balance visualization.

Spectral Analysis – NDVI-based vegetation and health analysis.

Irrigation Planning AI – Smart water scheduling & crop-specific recommendations.

🌦 Weather Monitoring

Live weather dashboard

7-day forecast

Beautiful UI with OpenWeather API icons

🧠 User Dashboard

Latest AI Summary

Recent History with detailed report viewer

Quick Actions panel

Weekly weather & AI updates

Sidebar navigation with mobile support

📊 Report System

Each analysis generates:

Full Input & Output report

Summary cards

Weekly schedule / graphs

Download JSON option

Export/Print Report (PDF)

View previous reports directly from history

🛠 Tech Stack
Frontend

React.js

Tailwind CSS

Framer Motion

Axios

Lucide Icons

Backend

Node.js

Express

MongoDB

Mongoose

AI APIs (Gemini / Custom ML endpoints)

Other

OpenWeather API

Govt Agriculture APIs (optional)

Authentication with JWT + HTTP Only Cookies

📁 Project Structure
/client
 ├── src
 │    ├── components
 │    ├── pages
 │    ├── Context
 │    ├── utils
 │    └── App.js
/server
 ├── controllers
 ├── models
 ├── routes
 ├── middleware
 └── index.js

⚙️ Setup Instructions
1. Clone the Repository
git clone https://github.com/YOUR-USERNAME/SmartAgro-AI.git
cd SmartAgro-AI

2. Install Dependencies
Client
cd client
npm install

Server
cd server
npm install

3. Environment Variables

Create .env inside server:

MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
OPENWEATHER_API_KEY=your_api_key
GEMINI_API_KEY=your_api_key

4. Start Development Server
Frontend:
npm run dev

Backend:
npm start

📸 Screenshots (Add your own)

Dashboard UI

Weather Panel

Weekly Forecast

AI Summary Section

Quick Actions

Reports Page

(You can add actual images once pushed to GitHub)

🧑‍💻 Developer

Pranshu Chauhan
Full Stack MERN Developer | AI Enthusiast
Building Smart Solutions for Modern Agriculture 🌱

🤝 Contributing

Pull requests are welcome.
For major changes, open an issue first to discuss what you want to improve.

📄 License

This project is open-source and available under the MIT License.
