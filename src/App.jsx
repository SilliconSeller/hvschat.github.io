import React from "react";
import Chatbox from "./components/Chatbox";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MultiChatbox from "./components/MultiChatbox";
import Teste from "./components/Teste";

//import About from "./pages/About";
=======

>>>>>>> refs/remotes/origin/main

function App() {
  return (
<<<<<<< HEAD
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
              <Route path="/Teste" element={<Teste />} />  
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
=======
    <>
<div className="flex h-screen">
  {/* Sidebar com largura fixa */}
  <Sidebar className="w-64 bg-gray-800 text-white" />

  <div className="flex-1 flex flex-col">
    {/* Header com altura fixa */}
    <Header className=" bg-blue-500 text-white" />

    {/* Chatbox ocupa o restante do espaço */}
    <div className="flex-1 overflow-y-auto flex flex-col">
  <div className="flex-1 overflow-auto">
    <Chatbox />
  </div>
</div>

  </div>
</div>

    </>
>>>>>>> refs/remotes/origin/main
  );
}

export default App;
