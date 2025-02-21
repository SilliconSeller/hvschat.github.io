import React, { useState } from "react";
import Chatbox from "./components/Chatbox";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";


function App() {

  return (
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
  );
}

export default App;
