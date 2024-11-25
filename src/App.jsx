import React, { useState } from "react";
import Chatbox from "./components/Chatbox";
import Header from "./components/Header";

function App() {

  return (
  <>
  <div className="min-h-screen bg-gray-50">
  <Header />
  <Chatbox />
  </div>
 
  </>
  );
}

export default App;
