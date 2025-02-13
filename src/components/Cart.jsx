import React from "react";
import cartSVG from '../assets/cartempty.svg';

const Cart = ({ cart, handleFinalizePurchase, calculateTotal, product }) => {
  return (
    <div className="bg-white rounded-md border-2 h-[41rem] border-slate-300 shadow-lg w-96 overflow-y-auto mr-9 flex flex-col">
      {/* Header */}
      <div className="justify-between bg-slate-100 p-3 pt-5">
        <h3 className="text-2xl font-semibold text-slate-900">Carrinho de compras</h3>
      </div>

      {/* Cart Items */}
      <div className="p-3 flex-grow">
        <ul className="space-y-2">
          {cart.map((product, index) => (
            <li key={index} className="border-b pb-2">
              <div className="text-md font-normal mb-2">{product.nome}</div>
              {product.unQuantity > 0 && (
                <div className="text-sm font-thin">
                  (x{product.unQuantity} unidade) valor: R${Number(product.unQuantity * parseFloat(product.quantidades[0].valorUn), 0).toFixed(2)}
                </div>
              )}
              {product.boxQuantity > 0 && (
                <div className="text-sm font-thin">
                  (x{product.boxQuantity} caixa) valor: R${Number(product.boxQuantity * parseFloat(product.quantidades[2].valorCaixa), 0).toFixed(2)}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Empty Cart Message */}
        {cart.length === 0 && (
  <div className="flex flex-col items-center justify-center h-[22rem]">
    <img src={cartSVG} alt="Empty Cart" className="w-32 h-32" />
    <p className="text-md text-gray-500 mt-4">Seu carrinho está vazio.</p>
  </div>
)}
      </div>

      {/* Total and Finalize Button */}
      <div className="p-3 mt-auto">
        {cart.length > 0 && (
          <div className="flex justify-between items-center">
            <p className="text-lg font-mono">Total: R$ {parseFloat(calculateTotal(product)).toFixed(2)}</p>
            <button
              onClick={handleFinalizePurchase}
              className="bg-red-400 text-white px-3 py-1 rounded-md shadow-md hover:bg-red-500">
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
