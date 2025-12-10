import axios from "axios";
import { useEffect, useState, createContext } from "react";
import { serrverUrl } from "../main";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [location, setLoaction] = useState(null);
  const [weather,setWeather] = useState(null);

  const [error, setError] = useState(null);

  const current = async () => {
    try {
      const res = await axios.get(`${serrverUrl}/api/auth/current`, {
        withCredentials: true,
      });

      setUser(res.data.user);

      setError(null);
    } catch (err) {
      console.error("Current User Error:", err.response?.data || err.message);
      setUser(null);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    current();
  }, []);

  return (
    <AppContext.Provider
      value={{ user, error, current, setUser, location, setLoaction,setWeather,weather}}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
