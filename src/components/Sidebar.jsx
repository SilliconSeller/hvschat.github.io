import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import { faCircleUser , faHouse, faMessage, faRectangleList} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const IconTable = () => {
    return (
      <FontAwesomeIcon color='white' icon={faBars} />
    )
  }

  return (
    <div className={`flex ${isOpen ? 'w-40' : 'w-[5em]'} h-screen border-r-[0.8px] border-slate-200 bg-slate-100  text-black transition-all`}>
      {/* Sidebar content */}
      <div className="flex flex-col items-center pt-5 p-3 space-y-4">
        {/* Toggle Button */}
        <button 
          onClick={toggleMenu}
          className="text-xl w-11 h-11 rounded-full bg-red-500 hover:bg-red-400 focus:outline-none">
          {<IconTable/>}
        </button>

        {/* Sidebar Items */}
        <ul className="space-y-4 px-5">
          <li className="text-start font-semibold">
            <a href="/" className={`block mt-4 py-2 ${!isOpen && 'text-center'} hover:bg-gray-200 rounded-xl`}>
              {isOpen ? 'Home' : <FontAwesomeIcon size='lg' icon={faHouse} />}
            </a>
          </li>
          <li className="text-center  font-semibold">
            <a href="/pedidos" className={`block py-2 text-start ${!isOpen && 'text-center'} hover:bg-gray-200 rounded-xl`}>
            {isOpen ? 'Painel' :<FontAwesomeIcon size='lg' icon={faMessage} />}

            </a>
          </li>
          <li className="text-center font-semibold">
            <a href="/services" className={`block py-2 text-start ${!isOpen && 'text-center'} hover:bg-gray-200 rounded-md`}>
              {isOpen ? 'Anotacoes' : <FontAwesomeIcon size='lg' icon={faRectangleList} />}
            </a>
          </li>
          <li className="text-center font-semibold">
<<<<<<< HEAD
            <a href="/teste" className={`block py-2  text-start ${!isOpen && 'text-center'} hover:bg-gray-200 rounded-md`}>
=======
            <a href="/contact" className={`block py-2  text-start ${!isOpen && 'text-center'} hover:bg-gray-200 rounded-md`}>
>>>>>>> b42c825 (add-MultiChatbox)
              {isOpen ? 'Perfil' : <FontAwesomeIcon size='lg' icon={faCircleUser} />}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
