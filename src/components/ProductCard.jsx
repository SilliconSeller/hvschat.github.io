import React from "react";

const ProductCard = ({ product, handleProductClick }) => {
  return (
    <div
      key={product._id}
      onClick={() => handleProductClick(product)}
      className="cursor-pointer bg-gradient-to-t from-slate-100 from-10% via-slatge-50 via-30% to-gray-50 to-90% border border-gray-200 rounded-lg p-3.5 pb-4 shadow-md flex flex-col justify-between max-w-xs m-1.5 transition-transform transform hover:scale-105"
    >
      <div className="font-bold text-md text-red-600 mb-1.5">
       {product.nome}
      </div>
      <div className="text-sm text-gray-600 mb-4">Categoria: {product.categoria}</div>

      {product.quantidades[0].unidade === true ?  (
        <div className="font-semibold text-slate-700 text-sm">
          Valor de 1 unidade: R${product.quantidades[0].valorUn}
        </div>
      ) :''}

      {product.quantidades[1].pacote === true ? (
        <div className="font-semibold text-slate-700 text-sm">
          Valor pacote com {product.quantidades[1].qtdPacote} unidades: R$
          {product.quantidades[1].valorPacote}
        </div>
      ):''}

      {product.quantidades[2].caixa === true ? (
        <div className="font-semibold text-slate-700 text-sm">
          Valor caixa com {product.quantidades[2].qtdCaixa} un R$
          {product.quantidades[2].valorCaixa}
        </div>
      ):''}
    </div>
  );
};

export default ProductCard;
