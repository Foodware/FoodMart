// App.js
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogoPage from "./components/LogoPage.jsx";
import SignUpPage from "./components/SignUpPage.jsx";
import SignInPage from "./components/SignInPage.jsx";
import FirstPage from "./components/FirstPage.jsx"
import Wallet from "./pages/Wallet.jsx"
import Tracker from "./pages/Tracker.jsx"

function App() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSignUp(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(storedLoginStatus === 'true');
  }, []);

  console.log(showSignUp);
  return (
    <>
      <BrowserRouter>
        {!showSignUp ? (
          <Routes>
            <Route index element={<LogoPage />} />
          </Routes>
        ) : (
          <Routes>
            {isLoggedIn ? (
              <Route path="/" element={<FirstPage />} />
            ) : (
              <Route path="/" element={<SignUpPage />} />
            )}
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/tracker" element={<Tracker />} />

          </Routes>

        )}
      </BrowserRouter>
    </>
  );
}

export default App;
/**
 * <BrowserRouter>
        {!showSignUp ? (
          <Route path="/" element={<LogoPage />} />
        ) : (
          <Routes>
            //Conditional rendering based on authentication status 
            {isLoggedIn ? (
              <Route path="/" element={<FirstPage />} />
            ) : (
              <Route path="/" element={<SignUpPage />} />
            )}
            <Route path="/signin" element={<SignInPage />} />
          </Routes>
        )}
      </BrowserRouter>
 */