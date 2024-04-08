// App.js
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogoPage from "./components/LogoPage.jsx";
import SignUpPage from "./components/SignUpPage.jsx";
import SignInPage from "./components/SignInPage.jsx";

function App() {
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSignUp(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="App w-full h-full">
        {showSignUp ? <SignUpPage /> : <LogoPage />}
        {/* <SignUpPage /> */}
      </div>
    </>
  );
}

export default App;
