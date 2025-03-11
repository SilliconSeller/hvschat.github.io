import React, { useState } from "react";
import cartSVG from '../assets/cartempty.svg';
import Teste from "./Teste";

export const ShowCartPopup = ({toggleCart}) => {
  return (
    
    <button
    onClick={toggleCart}
    className="fixed top-16 right-0 bg-zinc-200 text-white p-3 rounded-bl-3xl shadow-md hover:bg-gray-200 transition-all"
  >
    <span className="text-mg">🛒</span>
  </button>
  )
}


const Cart = ({ cart, handleFinalizePurchase, calculateTotal, product , isOpen, toggleCart}) => {

  const generateNote = () => {
    
    cart.map((product, index) => (
      <li key={index} className="border-b pb-3">
        <div className="text-md font-semibold mb-2">{product.nome}</div>
        {product.unQuantity > 0 && (
          <div className="text-sm font-thin">
            (x{product.unQuantity} unidade) valor: R${(product.unQuantity * parseFloat(product.quantidades[0].valorUn)).toFixed(2)}
          </div>
        )}
        {product.boxQuantity > 0 && (
          <div className="text-sm font-thin">
            (x{product.boxQuantity} caixa) valor: R${(product.boxQuantity * parseFloat(product.quantidades[2].valorCaixa)).toFixed(2)}
          </div>
        )}
      </li>
    ))

  }

  return (
    <div>
      {/* Button to toggle cart visibility */}


      {/* Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full transition-all duration-300 transform bg-white shadow-lg overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ width: '24rem' }} // Cart width
      >
        {/* Cart Header */}
        <div className="pt-10">
          <h3 className="font-light text-center text-xl">Carrinho de compras</h3>
        </div>
        <div>
          <ShowCartPopup
            toggleCart={toggleCart}
          />
        </div>

        {/* Cart Items */}
        <div className="p-3 flex-grow">
          <ul className="space-y-3">
            {cart.length > 0 ? (
              cart.map((product, index) => (
                <li key={index} className="border-b pb-3">
                  <div className="text-md font-semibold mb-2">{product.nome}</div>
                  {product.unQuantity > 0 && (
                    <div className="text-sm font-thin">
                      (x{product.unQuantity} unidade) valor: R${(product.unQuantity * parseFloat(product.quantidades[0].valorUn)).toFixed(2)}
                    </div>
                  )}
                  {product.boxQuantity > 0 && (
                    <div className="text-sm font-thin">
                      (x{product.boxQuantity} caixa) valor: R${(product.boxQuantity * parseFloat(product.quantidades[2].valorCaixa)).toFixed(2)}
                    </div>
                  )}
                </li>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-[22rem]">
                <img src={cartSVG} alt="Empty Cart" className="w-28 h-28" />
                <p className="text-md font-extralight text-gray-500 mt-4">Seu carrinho está vazio.</p>
              </div>
            )}
          </ul>
        </div>

        {/* Total and Finalize Button */}
        <div className="p-3 mt-auto">
          {cart.length > 0 && (
            <div className="flex justify-between items-center">
              <p className="text-lg font-mono">Total: R$ {parseFloat(calculateTotal(product)).toFixed(2)}</p>
              <button
                onClick={handleFinalizePurchase}
                className="bg-red-400 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-500 transition-all"
              >
                Finalizar Compra
              </button>
            </div>
          )}
          <div>
            
            <button onClick={generateNote}>
              GERAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
