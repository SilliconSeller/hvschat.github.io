import React from "react";
import logoct from '../assets/ct.png';

const BusinessCard = ({ loja}) => {

    const semanaEnum = [  '1ª', '2ª', '3ª', '4ª']

    const WeekBox = ({semanaEnum}) => {
        return (
            <div className="border font-light text-sm pt-3 border-black h-20 w-20 text-center">
                {semanaEnum} 
                <br />
                semana
            </div>
        )
    }
    const DataBox = () => {
        return (
            <div className="border border-black h-10 w-[6em] text-center"/>
        )
    }
    const SignatureBox = () => {
        return (
            <div className="border border-black h-40 w-[11.5em] text-center">
            </div>
        )
    }
    const Obs = () => {
        return (
            <div className="border h-3 border-black w-[22.5em]"/>
        )
    }
    return (
        <>
            <div id={`card-${loja.id}`} className="w-[25em] h-[39em] p-4 bg-white shadow-lg border-2 border-blue-900 ">
                
                <div className="flex flex-row justify-between">
                <div className="flex flex-col mb-4">
                    <p className="text text-4xl font-bold"> CLEAR TEC </p>
                    <div className="w-[12em] h-[2px] bg-black mt-0.5"/>
                    <p className="text font-semibold ">LIMPADORA DE VIDROS</p>
                    <p className="text-2xl">Ao seu dispor.</p>
                </div>
                <div className="flex flex-col w-32 -mt-2">
                        <img src={logoct} alt="Clear Tec"/>
                        <p className="text-xs mt-4">FONE:(44)99717-7621</p>

                    </div>
                </div>
                <div className="text text-sm font-light mb-3">
                    <p>Loja: {loja.nome} </p>
                    <p>Referente ao mes: {loja.refMes}</p>
                </div>
                <div className="h-[24em] border-[2px] border-black">
                    <div className="flex flex-row h-auto ">
                        <div>
                            <WeekBox semanaEnum={semanaEnum[0]} />
                            <WeekBox semanaEnum={semanaEnum[1]}/>
                            <WeekBox semanaEnum={semanaEnum[2]}/>
                            <WeekBox semanaEnum={semanaEnum[3]}/>
                        </div>
                        <div>
                            <DataBox />
                            <DataBox />
                            <DataBox />
                            <DataBox />
                            <DataBox />
                            <DataBox />
                            <DataBox />
                            <DataBox />
                        </div>
                        <div>
                            <p className="-mb-4 pr-2 text-right font-extralight text-xs">assinatura</p>
                            <SignatureBox />
                            <p className="-mb-4 pr-2 text-right font-extralight text-xs">assinatura</p>
                            <SignatureBox />
                        </div>
                    </div>
                    <div>
                        <Obs />
                        <Obs />
                        <Obs />
                        <Obs />
                        <Obs />
                    </div>
                </div>

            </div>
        </>
    );
};

export default BusinessCard;