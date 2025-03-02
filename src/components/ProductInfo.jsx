import { useState } from 'react';
import React from 'react';

const ProductInfo = ({ isOpen, selectedProductInfo }) => {
  if (!isOpen) return null; // Não renderizar se o modal não estiver aberto

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");
    setIsLoading(true); // Ativa o carregamento quando o usuário envia uma mensagem

    try {
      const apiSearchProductInfoMessages = encodeURIComponent(userInput.toLowerCase());
      const searchProductRefId = encodeURIComponent(selectedProductInfo._id);
      console.log('oi', searchProductRefId)
      const response = await fetch(
        `http://localhost:5008/productInfo?search=${apiSearchProductInfoMessages}&refId=${searchProductRefId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Converte a resposta para JSON
      const data = await response.json();
      console.log('333', data)
      if (response.ok) {
        // Aqui, 'productInfo' é o objeto convertido em JSON
        console.log(response, 'ola123')
        const recebido = data.data.gptResponse; // Agora 'recebido' é um objeto ou string, que pode ser renderizado

        if (recebido) {
          setIsLoading(false); // Esconde o carregamento
          setMessages([
            ...newMessages,
            { sender: "bot", text: recebido },
          ]);
        } else {
          console.log('Algum erro ao receber dados');
          setIsLoading(false); // Esconde o carregamento mesmo em caso de erro
        }
      } else {
        console.log('Erro na resposta da API');
        setIsLoading(false); // Esconde o carregamento caso a API falhe
      }
    } catch (error) {
      setIsLoading(false); // Esconde o carregamento em caso de erro na requisição
      console.error('Erro ao buscar informações do produto:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[44rem] h-[40rem]">
        <h1> {selectedProductInfo.nome} </h1>
        <h3 className='text-sm font-light mb-1.5'>{selectedProductInfo._id}:</h3>
        <div className="flex-1 p-8 flex flex-col bg-white">
          {/* Histórico de mensagens */}
          <div className="flex-1 mt-60 p-3 overflow-auto space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${msg.sender === "user" ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${msg.sender === "user" ? "bg-zinc-200 text-black" : "bg-zinc-50"}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input de mensagens */}
          <div className="pt-3 bg-white border-t border-gray-200">
            <div className="relative flex items-center">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                className="w-full px-4 py-2.5 pr-12 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                placeholder="Digite sua mensagem..."
              />
              <button
                onClick={sendMessage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 text-white py-1.5 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
{/*
  <button
          onClick={null} // Coloque a função para o carrinho aqui
          className="w-full px-4 py-2 bg-red-400 text-white rounded-lg shadow-md hover:bg-red-500"
        >
          Adicionar ao carrinho
        </button>
*/} 
      </div>
    </div>
  );
};

export default ProductInfo;
