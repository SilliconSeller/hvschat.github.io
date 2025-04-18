import React from "react";

<<<<<<< HEAD
const ProductCard = ({ product, handleProductClick, handleProductInfoClick }) => {
  return (
    <div>
    <div  onClick={() => handleProductInfoClick(product)}>
      <div>Obter informacoes</div>
    </div>
      <div
        key={product._id}
        onClick={() => handleProductClick(product)}
        className="cursor-pointer bg-gradient-to-t from-slate-100 from-10% via-slatge-50 via-30% to-gray-50 to-90% border border-gray-200 rounded-lg p-2 pb-3 shadow-md flex flex-col justify-between max-w-xl m-1.5 transition-transform transform hover:scale-105"
      >
        <div className="flex flex-row">
          <div className="w-24 mr-1.5">
            <img width={210} height={210} src="https://images.tcdn.com.br/img/img_prod/964420/agulha_25x6_hipodermica_23g_medix_1857_1_75e5f81e7317bb2b940a190cc7eb2a17.png" alt="" />
          </div>
          <div>
            <div className="font-normal text-sm text-red-600 mb-1.5">
              {product.nome}
            </div>
            <div className="text-sm font-thin text-gray-600 mb-4">Categoria: {product.categoria}</div>

            {product.quantidades[0].unidade === true ? (
              <div className="font-extralight text-slate-700 text-sm">
                Valor de 1 unidade: R${product.quantidades[0].valorUn}
              </div>
            ) : ''}

            {product.quantidades[1].pacote === true ? (
              <div className="font-extralight text-slate-700 text-sm">
                Valor pacote com {product.quantidades[1].qtdPacote} unidades:
                {product.quantidades[1].valorPacote}
              </div>
            ) : ''}

            {product.quantidades[2].caixa === true ? (
              <div className="font-extralight text-slate-700 text-sm">
                Valor caixa com {product.quantidades[2].qtdCaixa} un R$
                {product.quantidades[2].valorCaixa}
              </div>
            ) : ''}
          </div>
        </div>
      </div>

=======
const ProductCard = ({ product, handleProductClick }) => {
  return (
    <div
      key={product._id}
      onClick={() => handleProductClick(product)}
      className="cursor-pointer bg-gradient-to-t from-slate-100 from-10% via-slatge-50 via-30% to-gray-50 to-90% border border-gray-200 rounded-lg p-2 pb-3 shadow-md flex flex-col justify-between max-w-xl m-1.5 transition-transform transform hover:scale-105"
    >
      <div className="flex flex-row">

 
      <div className="w-24 mr-1.5">
        <img width={210} height={210} src="https://images.tcdn.com.br/img/img_prod/723788/agulha_desc_25x08_c_100un_verde_21g_1_medix_3135_1_2736c5f42cb7023a67d3eceb551f4bbd.png" alt="" />
      </div>
      <div>
          <div className="font-normal text-sm text-red-600 mb-1.5">
          {product.nome}
          </div>
          <div className="text-sm font-thin text-gray-600 mb-4">Categoria: {product.categoria}</div>

          {product.quantidades[0].unidade === true ?  (
            <div className="font-extralight text-slate-700 text-sm">
              Valor de 1 unidade: R${product.quantidades[0].valorUn}
            </div>
          ) :''}

          {product.quantidades[1].pacote === true ? (
            <div className="font-extralight text-slate-700 text-sm">
              Valor pacote com {product.quantidades[1].qtdPacote} unidades:
              {product.quantidades[1].valorPacote}
            </div>
          ):''}

          {product.quantidades[2].caixa === true ? (
            <div className="font-extralight text-slate-700 text-sm">
              Valor caixa com {product.quantidades[2].qtdCaixa} un R$
              {product.quantidades[2].valorCaixa}
            </div>
          ):''}
          </div>
     </div>
>>>>>>> refs/remotes/origin/main
    </div>
  );
};

export default ProductCard;
