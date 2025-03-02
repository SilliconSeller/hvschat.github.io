import React, { useEffect, useRef, useState } from "react";
import ProductHandler from "../models/productHandler";
import ProductCard from './ProductCard';
import Modal from './Modal'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Cart, { ShowCartPopup } from './Cart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import ProductInfo from './ProductInfo';

function Chatbox() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [messageToWpp, setMessageToWpp] = useState("");
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [unQuantity, setUnQuantity] = useState(0);
  const [boxQuantity, setBoxQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isProductInfoOpen, setProductInfoOpen] = useState(false);
  const [selectedProductInfo, setSelectedProductInfo] = useState(null);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCartShow = () => {
    setIsCartOpen(prevState => !prevState); // Alterna entre true e false
  };

  const handleFinalizePurchase = () => {
    // Construct the message to send to WhatsApp
    const cartMessage = cart.map((product) => {
      return `${product.nome} (x${product.quantity}) - R$ ${product.preco}`;
    }).join("\n");
  
    const totalMessage = `Total: R$ ${calculateTotal()}`;
  
    // Prepare the complete message
    const completeMessage = `Itens no carrinho:\n${cartMessage}\n\n${totalMessage}`;
  
    // Use the copyMessage function to send the message
    copyMessage(completeMessage);
    console.log(completeMessage)

  };

  
  const addToCart = (product, qty) => {
    const updatedCart = [...cart];
    const existingProduct = updatedCart.find((item) => item._id === product._id);

    if (existingProduct) {
      existingProduct.quantity += qty; // Increase quantity if product already in cart
    } else {
      updatedCart.push({ ...product, quantity: qty });
    }

    setCart(updatedCart); // Update the cart state
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true); // Open modal to select quantity
  };


  const handleProductInfoClick = (product) => {
    setSelectedProductInfo(product);
    setProductInfoOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  }

  const handleQuantityChange = (action) => {
    setQuantity(prevQuantity => {
      if (action === 'increase') {
        return prevQuantity + 1;
      } else if (action === 'decrease' && prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, quantity); // Add selected quantity to the cart
      setIsModalOpen(false); // Close modal after adding to cart
      setQuantity(1); // Reset quantity to 1
    }
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
        setMessageToWpp(copyMessageText); // Atualiza a mensagem para enviar ao WhatsApp
      })
      .catch(err => {
        console.error('Falha ao copiar: ', err);
      })
      .finally(() => {
        handleSendMessage(copyMessageText); // Passa o texto copiado para o envio
      });
  }

  const handleSendMessage = (messageToWpp) => {
    if (!messageToWpp) {
      console.error('Mensagem não definida');
      return;
    }

    const phoneNumber = '44998484800'; // Número de telefone no formato internacional
    const text = encodeURIComponent(messageToWpp); // Codifica a mensagem para URL
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${text}`;

    window.open(whatsappURL, '_blank'); // Abre o link do WhatsApp com a mensagem
  };


  const sendMessage = async () => {
    if (userInput.trim() === "") return; // Don't send empty messages

    // Update messages with user input
    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput(""); // Clear input field

    try {
      // Prepare messages for the API
      const apiMessages = newMessages.map(msg => ({
        role: msg.sender === "user" ? "user" : "system",
        content: msg.text,
      }));

      // Encoding user input for the API request
      const apiMessagesString = encodeURIComponent(userInput.toLocaleLowerCase());

      const response = await fetch(`http://localhost:5008/product?search=${apiMessagesString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        const handler = new ProductHandler(data);
        const result = await handler.getProductsAndMessage();
        const products = await result.products;
        const gptResponseMessageToUser = await result.gptResponseMessageToUser;

        if (products.length === 0) {
          // If no products found, send a message
          setMessages([
            ...newMessages,
            { sender: "bot", text: responseToNotFound },
          ]);
        } else {
          const formattedProducts = products.map((product) => (
            <ProductCard key={product._id} product={product} handleProductInfoClick={handleProductInfoClick} handleProductClick={handleProductClick} />
          ));

          // Store the messages with formatted content
          setMessages([
            ...newMessages,
            {
              sender: "bot",
              text: (
                <div>
                  <div>{formattedProducts || responseToNotFound}</div>

                </div>
              ), // Use JSX elements instead of strings
            },
          ]);
        }
      } else {
        console.error('Error:', data.error || 'Unknown error');
        setMessages([
          ...newMessages,
          { sender: "bot", text: "00 Desculpe, ocorreu um erro. Tente novamente." },
        ]);
      }
    } catch (error) {
      console.error('Erro:', error);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "01 Desculpe, ocorreu um erro. Tente novamente." },
      ]);
    }

  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + parseFloat(product.preco), 0).toFixed(2);
  };

  const TypingIndicator = () => (
    <div className="flex justify-start items-center space-x-2">
      <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-bounce"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-bounce200"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-bounce"></div>
    </div>
  );

  function guigo() {

    setProductInfoOpen(true)
    return(

      console.log('func guigooo')
    )
  }

  const handleUnQuantityChange = () => {
    console.log('aaa')
  }
  return (
    <>
      <div className="flex h-full">
        {/* Chat Section */}
        <div className="flex-1 p-8 flex flex-col bg-white">
          {/* Chat History */}
          <div className="flex-1 mt-4 p-3 overflow-auto space-y-2">
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
          <div className="pt-4 bg-white border-t border-gray-200">
            <div className="relative flex items-center">
              <input
                type="text"
                className="w-full px-3 py-3.5 bg-gray-50 shadow-md border-[0.4px] border-zinc-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
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
                <div className="bg-zinc-800 self-center px-4 py-3.5 text-center text-white font-semibold text-md rounded-lg shadow-sm hover:bg-red-500">
                  Enviar
                </div>
              </button>
            </div>
          </div>
        </div>
        {/* Cart Section */}
        {isCartOpen ?
          (
            <>
              <div className="w-[25rem] h-full shadow-xl bg-zinc-100 border-l-[0.8px] border-slate-100 overflow-y-auto">
                <Cart
                  handleFinalizePurchase={null}
                  cart={cart}
                  calculateTotal={calculateTotal}
                  isOpen={isCartOpen}
                  toggleCart={toggleCartShow}
                />
              </div>
            </>
          ) : <ShowCartPopup
            toggleCart={toggleCartShow}
          />
        }
      </div>

      <ProductInfo
        isOpen={isProductInfoOpen}
        selectedProductInfo={selectedProductInfo}
        closeModal={() => setProductInfoOpen(false)}
      />
     
    </>
  );
}

export default Chatbox;
