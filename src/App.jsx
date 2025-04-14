import React, { useState } from "react";
import Chatbox from "./components/Chatbox";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MultiChatbox from "./components/MultiChatbox";
import Teste from "./components/Teste";


//import About from "./pages/About";

function App() {

  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar remains persistent */}
        <Sidebar className="w-64 bg-gray-800 text-white" />

        <div className="flex-1 flex flex-col">
          {/* Header remains persistent */}
          <Header className="bg-blue-500 text-white" />

          <div className="flex-1 overflow-y-auto flex flex-col">
            <div className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Chatbox />} />
              <Route path="/pedidos" element={<MultiChatbox />} />  
              <Route path="/teste" element={<Teste />} />  
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
