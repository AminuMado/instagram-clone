import React from "react";
import "./App.css";
import { Login } from "./Components/Login/Login";
import { SignUpForm } from "./Components/SignUpForm/SignUpForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Sign in</p>
        <p>Create Account</p>
        <p>Test Account</p>
      </header>
      {/* <SignUpForm />
      <Login /> */}
    </div>
  );
}

export default App;
