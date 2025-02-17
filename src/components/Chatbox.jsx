import logo from '../assets/logohvs.webp';
import React, { useEffect, useRef, useState } from "react";
import ProdutoHandler from '../models/produtoHandler';
import ProductCard from './ProductCard';
import Modal from './Modal'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Cart from './Cart'

function Chatbox() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [messageToWpp, setMessageToWpp] = useState("");
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [unQuantity, setUnQuantity] = useState(0);
  const [boxQuantity, setBoxQuantity] = useState(0);

 {/* const productTest = [
    {
      nome: "SERINGA 20G MEDIX L LOCK",
      unQuantity: 3,
      boxQuantity: 2,
      quantidades: [
        { valorUn: "10.99" },
        {},
        { valorCaixa: "25.50" }
      ]
    },
    {
      nome: "AGULHA 20G MEDIX L LOCK TEST TEST TEST",
      unQuantity: 1,
      boxQuantity: 0,
      quantidades: [
        { valorUn: "5.75" },
        {},
        { valorCaixa: "18.00" }
      ]
    }
  ];
  */}
  

  const handleFinalizePurchase = () => {
    const cartMessage = cart.map((product) => {
      return `${product.nome} (x${product.quantity}) - R$ ${product.preco}`;
    })
    const totalMessage = `Total: R$ ${calculateTotal()}`;
    const completeMessage = `Itens no carrinho:\n${cartMessage}\n\n${totalMessage}`;
    copyMessage(completeMessage);
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
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

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
    if (selectedProduct) {
      // Add both units and boxes to the cart at the same time
      if (unQuantity > 0 || boxQuantity > 0) {
        addToCart(selectedProduct, unQuantity, boxQuantity);  // Add both quantities
        setUnQuantity(unQuantity);  // Reset the unit quantity
        setBoxQuantity(boxQuantity);  // Reset the box quantity
      }
    }

    setIsModalOpen(false);  // Close the modal after adding to the cart
    setUnQuantity(0);  // Reset the unit quantity
    setBoxQuantity(0)
  };

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the messages container
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // This effect runs when messages change


  const copyMessage = (copyMessageText) => {
    navigator.clipboard.writeText(copyMessageText)
      .then(() => {
        setMessageToWpp(copyMessageText);
      })
      .catch(err => {
        console.error('Falha ao copiar: ', err);
      })
      .finally(() => {
        handleSendMessage(copyMessageText);
      });
  }

  const handleSendMessage = (messageToWpp) => {
    if (!messageToWpp) {
      console.error('Mensagem não definida');
      return;
    }

    const phoneNumber = '44998484800';
    const text = encodeURIComponent(messageToWpp);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${text}`;

    window.open(whatsappURL, '_blank');
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");

    try {
      const apiMessagesString = encodeURIComponent(userInput.toLocaleLowerCase());

      const response = await fetch(`http://localhost:5008/product?search=${apiMessagesString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const data = await response.json();
      if (response.ok) {

        const handler = new ProdutoHandler(data)
        const result = await handler.getProductsAndMessage()
        const products = await result.products
        const gptResponseMessageToUser = await result.gptResponseMessageToUser
        const responseNotFoundProducts = gptResponseMessageToUser

        if (products.length === 0) {
          setMessages([
            ...newMessages,
            { sender: "bot", text: responseNotFoundProducts },
          ]);
        } else {
          const formattedProducts = products.map((product) => (
            <ProductCard key={product._id} product={product} handleProductClick={handleProductClick} />
          ))
          setMessages([
            ...newMessages,
            {
              sender: "bot",
              text: (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {formattedProducts}
                  </div>
                </div>
              ),
            },
          ]);
        }
      } else {
        console.error('Error:', data.error || 'Unknown error');
        setMessages([
          ...newMessages,
          { sender: "bot", text: "01new Desculpe, ocorreu um erro no servidor" },
        ]);
      }
    } catch (error) {
      console.error('Erro:', error);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "02new Desculpe, ocorreu um erro. Tente novamente." },
      ]);
    }

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
      <div className='flex flex-row justify-between mt-20'>
        <div className="flex-row justify-between bg-gradient-to-b from-gray-200 ml-9">
          <div className="bg-white p-5 w-[60em] h-[41em] rounded-t-lg shadow-lg">
            <div className="flex flex-row-reverse justify-between mb-10">
              <div>
                <h1 className="text-3xl font-semibold text-center text-slate-800">
                  Atendente virtual
                </h1>
              </div>
              <div className="w-40">
                <img src={logo} alt="HVS" />
              </div>
            </div>
            {/* Chat History */}
            <div className="bg-gradient-to-b from-gray-100 border-x-[0.4px] border-zinc-300 shadow-sm p-4 h-[28em] rounded-t-lg overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 ${msg.sender === "bot" ? "text-left" : "text-right"}`}
                >
                  <div
                    className={`inline-block p-1.5 rounded-lg max-w-[54em] break-words ${msg.sender === "bot" ? "bg-white text-red-400 border-[0.4px] border-zinc-200" : "bg-gray-200 text-blue-600 border-[0.4px] border-zinc-200"}`}
                  >
                    {msg.text}
                  </div>
                  <div className="flex mt-1">
                    {msg.sender === "user" ? null : (
                      <button
                        onClick={() => copyMessage(msg.text)}
                        className="bg text-sm font-thin"
                      >
                        Enviar para WhatsApp da loja
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            {/* Input Field and Send Button */}
            <div className='p-3 bg-slate-50 border-x-[0.4px] border-b-[0.4px] border-zinc-300'>
              <div className="flex justify-around">
                <input
                  type="text"
                  className="w-full px-3 mr-2 bg-gray-50 shadow-md border-[0.4px] border-zinc-300 text-black rounded-3xl focus:outline-none focus:ring-1 focus:ring-red-400"
                  placeholder="Digite sua mensagem..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                />
                <button onClick={sendMessage}>
                  <div className="bg-slate-400 self-center px-4 py-2.5 text-center text-white text-md rounded-xl shadow-sm hover:bg-red-500">
                    Enviar
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <Cart
          handleFinalizePurchase={null}
          cart={cart}
          calculateTotal={calculateTotal}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        selectedProduct={selectedProduct}
        unQuantity={unQuantity}
        boxQuantity={boxQuantity}
        handleUnQuantityChange={handleUnQuantityChange}
        handleBoxQuantityChange={handleBoxQuantityChange}
        setUnQuantity={setUnQuantity}
        setBoxQuantity={setBoxQuantity}
        handleAddToCart={handleAddToCart}
        handleCloseModal={handleCloseModal}
      />
     
    </>
  );
}

export default Chatbox;