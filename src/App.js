import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Account from "./components/Account/Account";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home";
import Spinner from "./components/Spinner/Spinner";
import { auth, getUserFromDatabase } from "./firebase";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const fetchUserDetails = async (uid) => {
    const userDetails = await getUserFromDatabase(uid);
    console.log("user", userDetails);
    setIsDataLoaded(true);
    setUserDetails(userDetails);
  };
  useEffect(() => {
    const listner = auth.onAuthStateChanged((user) => {
      if (!user) {
        setIsDataLoaded(true);
        setIsAuthenticated(false);
        return;
      }
      setIsAuthenticated(true);
      console.log(user.uid);
      fetchUserDetails(user.uid);
    });
    return () => listner();
  }, []);
  return (
    <div className="App">
      <Router>
        {isDataLoaded ? (
          <Routes>
            {!isAuthenticated && (
              <>
                <Route path="/login" element={<Auth />} />
                <Route path="/signup" element={<Auth signup />} />
              </>
            )}
            <Route path="/" element={<Home auth={isAuthenticated} />} />
            <Route
              path="/account"
              element={
                <Account userDetails={userDetails} auth={isAuthenticated} />
              }
            />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <div className="spinner">
            <Spinner />
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
