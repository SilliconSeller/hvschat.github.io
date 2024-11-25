import React, { useState } from 'react';

const WppBtn = ({ enviarMensagem }) => {
  const [wppMessage, setWppMessage] = useState(''); // Gerencia o estado da mensagem local

  // Função que cria o link para o WhatsApp com a mensagem
  const handleSendMessage = () => {
    const phoneNumber = '5511999999999'; // Número de telefone no formato internacional
    const text = encodeURIComponent(wppMessage); // Codifica a mensagem para a URL
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${text}`;

    // Passa a mensagem como parâmetro para o componente pai
    enviarMensagem(wppMessage);  // Aqui passamos a mensagem como parâmetro

    window.open(whatsappURL, '_blank'); // Abre o link no WhatsApp
  };

  return (
    <div>
      <h1>Envie uma mensagem pelo WhatsApp</h1>
      <input
        type="text"
        placeholder="Digite sua mensagem"
        value={wppMessage}
        onChange={(e) => setWppMessage(e.target.value)} // Atualiza a mensagem local
      />
      <button onClick={handleSendMessage} className='bg-green-500 rounded-lg p-1'>
        Enviar para o WhatsApp
      </button>
    </div>
  );
};

export default WppBtn;
