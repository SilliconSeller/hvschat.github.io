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


  const handleProductInfoClick = (product) => {
    setSelectedProductInfo(product);
    setProductInfoOpen(true);
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
    setIsLoading(true); // Set loading to true when the user sends a message

    try {
      const apiMessagesString = encodeURIComponent(userInput.toLocaleLowerCase());

      const response = await fetch(`${import.meta.env.VITE_API_URL}/product?search=${apiMessagesString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const data = await response.json();
      if (response.ok) {
        const handler = new ProductHandler(data);
        const result = await handler.getProductsAndMessage();
        const products = await result.products;
        const gptResponseMessageToUser = await result.gptResponseMessageToUser;

        if (products.length === 0) {
          setIsLoading(false); // Hide the loading spinner
          setMessages([
            ...newMessages,
            { sender: "bot", text: gptResponseMessageToUser },
          ]);
        } else {
          const formattedProducts = products.map((product) => (
            <ProductCard key={product._id} product={product} handleProductInfoClick={handleProductInfoClick} handleProductClick={handleProductClick} />
          ));
          setIsLoading(false); // Hide the loading spinner
          setMessages([
            ...newMessages,
            {
              sender: "bot",
              text: (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-1">
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
          { sender: "bot", text: "Desculpe, ocorreu um erro no servidor" },
        ]);
        setIsLoading(false); // Hide the loading spinner on error
      }
    } catch (error) {
      console.error('Erro:', error);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Desculpe, ocorreu um erro. Tente novamente." },
      ]);
      setIsLoading(false); // Hide the loading spinner on error
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
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                className="w-full px-4 py-4 pr-12 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                placeholder="Digite sua mensagem..."
              />

              {/* Button inside the input box */}
              <button
                onClick={sendMessage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 text-white py-2.5 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
              >
                Enviar
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