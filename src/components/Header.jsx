import React from "react";
import logo from '../assets/logohvs.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <div className="w-full bg-zinc-100 shadow-md top-0 sticky">
            <div className="flex flex-row justify-between ml-5 mr-6 pt-5 pb-2">
                <div className="w-28">
                    <img src={logo} alt="HVS" />
                </div>
                <button>
                    <div className="flex px-4 py-1.5 border-[0.8px] border-zinc-400 flex-row-reverse space-x-reverse space-x-3 items-center rounded-full bg-gray-100 hover:transform-gpu transition-all duration-200 hover:translate-x-3 hover:text-white hover:bg-zinc-700">
                        <FontAwesomeIcon icon={faArrowRightLong} width={24} height={24} />
                    
                        <div className="text font-light">
                            Ir para o site
                        </div>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Header;
