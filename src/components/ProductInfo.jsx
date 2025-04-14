import { useState } from 'react';
import React from 'react';
import Modal from './Modal'
import Cart from './Cart';

const ProductInfo = ({ isOpen, selectedProductInfo, closeModal }) => {
  if (!isOpen) return null; // Não renderizar se o modal não estiver aberto

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unQuantity, setUnQuantity] = useState(0);
  const [boxQuantity, setBoxQuantity] = useState(0);

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

  const toggleCartShow = () => {
    setIsCartOpen(prevState => !prevState); // Alterna entre true e false
  };

  const addToCart = (product, qty, qtyBox) => {
    const updatedCart = [...cart];
    const existingProduct = updatedCart.find((item) => item._id === product._id);

    if (existingProduct) {
      // If the product already exists in the cart, update both quantities
      existingProduct.unQuantity += qty;
      existingProduct.boxQuantity += qtyBox;
    } else {
      // If the product does not exist, add a new entry with the given quantities
      updatedCart.push({
        ...product,
        unQuantity: qty,
        boxQuantity: qtyBox,
      });
    }

    setCart(updatedCart); // Update the cart state
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUnQuantity(0)
    setBoxQuantity(0)
  }

  const handleUnQuantityChange = (action) => {
    setUnQuantity(prevUnQuantity => {
      if (action === 'increase') {
        return prevUnQuantity + 1;
      } else if (action === 'decrease' && prevUnQuantity > 1) {
        return prevUnQuantity - 1;
      }
      return prevUnQuantity;
    });
  };

  const handleBoxQuantityChange = (action) => {
    setBoxQuantity(prevBoxQuantity => {
      if (action === 'increase') {
        return prevBoxQuantity + 1;
      } else if (action === 'decrease' && prevBoxQuantity > 1) {
        return prevBoxQuantity - 1;
      }
      return prevBoxQuantity;
    });
  };

  const handleAddToCart = () => {
    if (selectedProductInfo) {
      // Add both units and boxes to the cart at the same time
      if (unQuantity > 0 || boxQuantity > 0) {
        addToCart(selectedProductInfo, boxQuantity);  // Add both quantities
        setUnQuantity(unQuantity);  // Reset the unit quantity
        setBoxQuantity(boxQuantity);  // Reset the box quantity
      }
    }

    setIsModalOpen(false);  // Close the modal after adding to the cart
    setUnQuantity(0);  // Reset the unit quantity
    setBoxQuantity(0)
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const unQuantityTotal = item.unQuantity > 0
        ? item.unQuantity * parseFloat(item.quantidades[0].valorUn)
        : 0;

      const boxQuantityTotal = item.boxQuantity > 0
        ? item.boxQuantity * parseFloat(item.quantidades[2].valorCaixa)
        : 0;

      return total + unQuantityTotal + boxQuantityTotal;
    }, 0).toFixed(2);
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-4 rounded-lg shadow-lg w-[48rem] h-[40rem]">
          <div className='flex flex-row justify-between'>
            <div>
              <div>
              </div>
              <div className="flex flex-row space-x-2">
                <img width={72} height={72} src="https://images.tcdn.com.br/img/img_prod/964420/agulha_25x6_hipodermica_23g_medix_1857_1_75e5f81e7317bb2b940a190cc7eb2a17.png" alt="" />
                <div>
                  <h1 className='text-md font-semibold'> {selectedProductInfo.nome} </h1>
                  <h3 className='text-sm font-light'>{selectedProductInfo._id}:</h3>
                </div>
              </div>
            </div>

            <div onClick={() => setIsModalOpen(true)} className='flex space-x-1 items-center flex-row p-3 rounded-lg bg-zinc-100 hover:bg-zinc-300 hover:cursor-pointer'>
              <div className='text-lg font-bold'>
                +
              </div>
              <span className="text-lg">🛒</span>
            </div>
            <div>
              <div onClick={closeModal}>
                fechar
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 flex flex-col bg-white">
            {/* Histórico de mensagens */}
            <div className='h-[28rem]'>
              <div className="flex-1  p-3 overflow-auto space-y-2">
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
      <Modal
        isOpen={isModalOpen}
        selectedProduct={selectedProductInfo}
        unQuantity={unQuantity}
        boxQuantity={boxQuantity}
        handleUnQuantityChange={handleUnQuantityChange}
        handleBoxQuantityChange={handleBoxQuantityChange}
        setUnQuantity={setUnQuantity}
        setBoxQuantity={setBoxQuantity}
        handleAddToCart={handleAddToCart}
        handleCloseModal={handleCloseModal}
      />
      <Cart
        handleFinalizePurchase={null}
        cart={cart}
        calculateTotal={calculateTotal}
        isOpen={false}
        toggleCart={toggleCartShow}
      />
    </>
  );
};

export default ProductInfo;
