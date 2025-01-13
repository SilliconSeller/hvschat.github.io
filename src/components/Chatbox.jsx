import logo from '../assets/logohvs.webp';
import React, { useEffect, useRef, useState } from "react";

function Chatbox() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [messageToWpp, setMessageToWpp] = useState("");
  const [cart, setCart] = useState([]); // State to store the cart items

  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]); // Add the product to the cart
  };

  const handleProductClick = (product) => {
    addToCart(product);
    console.log(cart); // Optionally log the cart to see its contents
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
      const apiMessagesString = encodeURIComponent(userInput);

      const response = await fetch(`http://localhost:5008/product?search=${apiMessagesString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        const products = data.data.products;
        const gptResponse = data.data.gptResponse;

        // Format product list with clickable items
        const formattedProducts = products.map(product => (
          <div
            key={product._id}
            onClick={() => handleProductClick(product)}
            style={{ cursor: 'pointer', color: 'blue' }}
          >
            {product.name} ({product.category}) - R$ {product.price}
          </div>
        ));

        // Format GPT insights
        const formattedGPTResponse = (
          <div>
            <h4>GPT Insights:</h4>
            <pre>{JSON.stringify(gptResponse, null, 2)}</pre>
          </div>
        );

        // Store the messages with formatted content
        setMessages([
          ...newMessages,
          {
            sender: "bot",
            text: (
              <div>
                <div>{formattedProducts}</div>
                <div>{formattedGPTResponse}</div>
              </div>
            ), // Use JSX elements instead of strings
          },
        ]);
      } else {
        console.error('Error:', data.error || 'Unknown error');
        setMessages([
          ...newMessages,
          { sender: "bot", text: "Desculpe, ocorreu um erro. Tente novamente." },
        ]);
      }
    } catch (error) {
      console.error('Erro:', error);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Desculpe, ocorreu um erro. Tente novamente." },
      ]);
    }
  };


  return (
    <>
    <div className='flex flex-row justify-between mt-28'>

   
      <div className="flex-row justify-between bg-gradient-to-b from-gray-200 ml-9">
        <div className="bg-white p-5 w-full sm:w-[640px] h-[33em] rounded-lg shadow-lg">
          <div className="flex flex-row-reverse justify-between mb-10">
            <div>
              <h1 className="text-3xl font-bold text-center text-red-400">
                Atendente virtual
              </h1>
            </div>
            <div className="w-40">
              <img src={logo} alt="HVS" />
            </div>
          </div>

          {/* Chat History */}
          <div className="bg-gradient-to-b from-gray-100 border-[0.4px] border-zinc-300 shadow-sm p-4 h-[20em] rounded-lg overflow-y-auto mb-5">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${msg.sender === "bot" ? "text-left" : "text-right"}`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${msg.sender === "bot" ? "bg-white text-red-400 border-[0.4px] border-zinc-200" : "bg-gray-200 text-blue-500 border-[0.4px] border-zinc-200"}`}
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
          <div className="flex justify-around mt-5">
            <input
              type="text"
              className="w-full px-3 py-3.5 bg-gray-50 shadow-md border-[0.4px] border-zinc-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder="Digite sua mensagem..."
              value={userInput.toLowerCase()}
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

      {/* Shopping Cart (fixed on the right side) */}
      <div
        className=" bg-white p-3 rounded-lg shadow-lg w-96 h-[350px] overflow-y-auto mr-9"
        style={{ zIndex: 100 }}
      >
        <h3 className="text-xl font-semibold text-red-400 mb-4">Carrinho de compras</h3>
        <ul className="space-y-2">
          {cart.map((product, index) => (
            <li key={index} className="flex justify-between items-center border-b pb-2">
              <span className="text-sm">{product.name}</span>
              <span className="text-sm text-gray-600">R$ {product.price}</span>
            </li>
          ))}
        </ul>
        {cart.length === 0 && (
          <p className="text-sm text-gray-500 mt-4">Seu carrinho está vazio.</p>
        )}
        <div className="mt-4 flex">
          <button className="bg-red-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-500">
            Finalizar Compra
          </button>
        </div>
      </div>
      </div>
    </>
  );
}

export default Chatbox;
