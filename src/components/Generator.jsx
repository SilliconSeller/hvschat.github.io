import React, { useRef } from "react";
import html2canvas from "html2canvas";
import ClearTec from "./ClearTec";

const lojas = [
  { id: 1, nome: "Loja Um", refMes: "março" },
  { id: 2, nome: "Loja Dois", refMes: "março" },
  { id: 3, nome: "Loja Tres", refMes: "março"},

];

const GenerateCards = () => {
  const cardRefs = useRef({});

  const captureCard = async (id) => {
    const card = document.getElementById(`card-${id}`);
    if (card) {
      const canvas = await html2canvas(card);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `cartao_loja_${id}.png`;
      link.click();
    }
  };

  const generateAllCards = async () => {
    for (let loja of lojas) {
      await captureCard(loja.id);
    }
  };

  return (
    <>
      <h1 className="text-xl font-bold">Gerar Cartões de Visita</h1>
      <div className="grid grid-cols-3 gap-4">
        {lojas.map((loja) => (
          <div key={loja.id} ref={(el) => (cardRefs.current[loja.id] = el)}>
            <ClearTec loja={loja} />
          </div>
        ))}
      </div>
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={generateAllCards}
      >
        Baixar Todos os Cartões
      </button>
      </>
  );
};

export default GenerateCards;
