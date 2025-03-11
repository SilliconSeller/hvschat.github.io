import React, { useEffect, useRef, useState } from "react";
import logo from '../assets/logohvs.webp';

const Teste = ({ itemValue, codValue, undValue, descValue, marcaValue, loteValue, qtdeValue, vlrUnValue, vlrTotalValue }) => {
    let ola = 'teste valor'
    let budgetNumber = '8978'    

    const companyData = {
        name: "MAX MED PRODUTOS CIRURGICOS",
        adress: "AV PARIGOT DE SOUZA, 491 - CENTRO",
        city: "MARINGA",
        telphone: "(44) 3262-1182",
        email: "Atendimento@hvscirurgica.com.br",
        CPNJ: "06.114.172/0001-72",
        stateSubs: "9030601901"
    }
    return (
        <>
            <div className=" w-[70em] bg-white p-3 mx-20 my-20 border-[0.4px] border-black">
                <div className="flex flex-row justify-between mb-2">
                    <div className="w-96 -mt-3 -ml-5">
                        <img src={logo} alt="HVS" />
                    </div>
                    <div className="text text-right font-light">
                        <p>{companyData.name}</p>
                        <p>{companyData.adress}</p>
                        <p>{companyData.city}</p>
                        <p>{companyData.CPNJ}</p>
                        <p>{companyData.telphone}</p>
                        <p>{companyData.stateSubs}</p>
                    </div>
                </div>
                <div className="flex flex-row space-x-36 font-bold">
                    <span>ORÇAMENTO</span>
                    <span>{`N: ${budgetNumber}`}</span>
                </div>
                <div className="border-[1px] border-black p-2 mb-4">
                    <div className="flex flex-row justify-stretch space-x-96">
                        <div>
                            <p>{`Emissao: ${ola}`} </p>
                            <p>{`Cliente: ${ola}`} </p>
                            <p>{`Cliente: ${ola}`} </p>
                            <p>{`CNPJ/CPF: ${ola}`} </p>
                            <p>{`Endereço: ${ola}`} </p>
                            <p>{`Bairro: ${ola}`} </p>
                            <p>{`Comprador: ${ola}`} </p>
                        </div>
                        <div>
                            <p>{`Vendedor: ${ola}`} </p>
                            <p>{`Telefone: ${ola}`} </p>
                            <p>{`Cidade: ${ola}`} </p>
                            <p>{`UF: ${ola}`} </p>
                            <p>{`CEP: ${ola}`} </p>
                            <p>{`Data incl.: ${ola}`} </p>
                        </div>
                    </div>
                </div>
                <div>
                    <thead className="flex justify-between">
                        <th>Item</th>
                        <th>Cod</th>
                        <th>Und.</th>
                        <th>Descricao do produto</th>
                        <th>Marca</th>
                        <th>Lote</th>
                        <th>Qtde</th>
                        <th>Vlr unitário</th>
                        <th>Vlr total</th>
                    </thead>
                    <div className="w-full h-[1px] bg-black" />
                    <tbody className="flex justify-between">
                        <td> {itemValue} </td>
                        <td> {codValue} </td>
                        <td> {undValue} </td>
                        <td> {descValue} </td>
                        <td> {marcaValue} </td>
                        <td> {loteValue} </td>
                        <td> {qtdeValue} </td>
                        <td> {vlrUnValue} </td>
                        <td> {vlrTotalValue}  </td>
                    </tbody>
                    <div className="w-full h-[1px] bg-black" />
                    <tfoot className="flex justify-between mb-4">
                        <th>Total pedido</th>
                        <th>Frete</th>
                        <th>Desconto</th>
                        <th>Total geral</th>
                    </tfoot>
                </div>
                <div className="flex h-[7em] flex-row justify-between border-[1px] border-black px-5 py-1">
                    <div>
                        CONDICAO PG
                    </div>
                    <div className="flex-col content-end">
                        <div className="w-64 h-[0.1em] mb-1 bg-zinc-800" />
                        <div className="text-center font-bold">
                            Assinatura
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Teste