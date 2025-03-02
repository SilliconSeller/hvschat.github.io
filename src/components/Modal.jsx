import React from 'react';

const Modal = ({
  isOpen,
  selectedProduct,
  unQuantity,
  boxQuantity,
  handleUnQuantityChange,
  handleBoxQuantityChange,
  setUnQuantity,
  setBoxQuantity,
  handleAddToCart,
  handleCloseModal
}) => {
  if (!isOpen) return null; // Don't render if the modal is not open

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[24rem] h-[34rem]">
        <h3 className="text-lg font-bold text-slate-950 mb-4">Escolha a quantidade</h3>
        <div className='mb-5 semibold'>{selectedProduct.nome}</div>
        <div className='text-sm font-light mb-1.5'>Quantidades:</div>

        {selectedProduct.quantidades[0].unidade === true && (
          <div>
            <div className="font-bold text-slate-900 text-md">
              1 unidade: R${selectedProduct.quantidades[0].valorUn}
            </div>

            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => handleUnQuantityChange('decrease')}
                className="px-3 py-1 bg-red-400 text-white rounded-lg"
              >
                -
              </button>
              <input
                type="number"
                value={unQuantity}
                onChange={(e) => setUnQuantity(parseInt(e.target.value) || 0)}
                min="1"
                className="w-12 text-center"
              />
              <button
                onClick={() => handleUnQuantityChange('increase')}
                className="px-3 py-1 bg-red-400 text-white rounded-lg"
              >
                +
              </button>
            </div>
          </div>
        )}

        {selectedProduct.quantidades[2].caixa === true && (
          <div>
            <div className="font-bold text-slate-900 text-md">
              Caixa com {selectedProduct.quantidades[2].qtdCaixa} unidades R$
              {selectedProduct.quantidades[2].valorCaixa}
            </div>

            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => handleBoxQuantityChange('decrease')}
                className="px-3 py-1 bg-red-400 text-white rounded-lg"
              >
                -
              </button>
              <input
                type="number"
                value={boxQuantity}
                onChange={(e) => setBoxQuantity(parseInt(e.target.value) || 0)}
                min="1"
                className="w-12 text-center"
              />
              <button
                onClick={() => handleBoxQuantityChange('increase')}
                className="px-3 py-1 bg-red-400 text-white rounded-lg"
              >
                +
              </button>
            </div>
          </div>
        )}



        <button
          onClick={handleAddToCart}
          className="w-full px-4 py-2 bg-red-400 text-white rounded-lg shadow-md hover:bg-red-500"
        >
          Adicionar ao carrinho
        </button>
        <button
          onClick={handleCloseModal}
          className="w-full mt-2 px-4 py-2 bg-gray-400 text-white rounded-lg"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Modal;