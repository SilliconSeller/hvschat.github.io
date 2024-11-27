import React, { useState } from "react";
import logo from '../assets/logohvs.webp';

function Chatbox () {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");

    try {
      const systemMessage = {
        role: 'system',
        content:`
        Você é como um funcionário do meu e-commerce que vende produtos de saúde para clínicas, vou inserir neste texto alguns produtos
                que tenho em estoque e preciso que você fale sobre os produtos caso o cliente pergunte sobre algum deles e ajude-o a encontrar o produto.
               Os produtos no estoque da nossa loja são em BRL real.
               os produtos com quantiade com "g" ou "gr" em frente a um numero, signficam o peso em grama, nao é necessario exibir as contas dos produtos, apenas o resultado do calculo.
               Quando solicitado um orcamento informar o valor dos produtos solicitados, e mencionar o estoque apenas se faltar;
               Caso o produto solicitado pelo cliente nao tenha estoque disponível, avisa-lo que nao ha estoque no momento o estoque sigfnica o "S" nos objetos do JSON;
               Os produtos constam no json a baixo, e "P" equivale a "produto", "V" a "Validade" e "Vlr" a "Valor":
            ${JSON.stringify([
          {
            "abaixador": [
              {
                "P": "ABAIXADOR DE LINGUA EM MADEIRA C/100 UN MAGAZINE MEDICA",
                "V": "01/04/2024",
                "S": 1,
                "Vlr": 13.00
              },
              {
                "P": "ABAIXADOR LINGUA(MADEIRA) C/100",
                "V": "25/01/2029",
                "S": 235,
                "Vlr": 6.00
              },
              {
                "P": "ABAIXADOR LINGUA(MADEIRA) C/100",
                "V": "N/A",
                "S": 853,
                "Vlr": 6.00
              }
            ],
            "absorvente": [
              {
                "P": "ABSORVENTE GERIATRICO - CONFORT MASTER C/20",
                "V": "22/08/2026",
                "S": 104,
                "Vlr": 20.00
              },
              {
                "P": "ABSORVENTE MASC. - DRYMAN C/10",
                "V": "N/A",
                "S": 262,
                "Vlr": 20.00
              }
            ],
            "acido_peracetico": [
              {
                "P": "ACIDO PERACETICO 0,2% 5000ML",
                "V": "10/07/2025",
                "S": 12,
                "Vlr": 185.50
              }
            ],
            "acido_valproico": [
              {
                "P": "ACIDO VALPROICO 250MG [25](EPILENIL)\"C1\"-BIOLAB",
                "V": "N/A",
                "S": 1,
                "Vlr": 7.86
              }
            ],
            "actibio": [
              {
                "P": "ACTIBIO PT CAFEINA 60 CAPS 350MG",
                "V": "30/07/2026",
                "S": 3,
                "Vlr": 23.63
              },
              {
                "P": "ACTIBIO PT OMEGA 3 OLEO DE PEIXE 120 CAPS 1450MG",
                "V": "30/06/2026",
                "S": 2,
                "Vlr": 75.70
              },
              {
                "P": "ACTIBIO PT OMEGA 3 OLEO DE PEIXE 60 CAPS 1450MG",
                "V": "30/06/2025",
                "S": 1,
                "Vlr": 40.61
              }
            ],
            "adaptador": [
              {
                "P": "ADAPTADOR PARA CANETA PRESSURIZADA",
                "V": "01/03/2025",
                "S": 7,
                "Vlr": 16.83
              }
            ],
            "adesivo": [
              {
                "P": "ADESIVO ANTI-ALERGICO C/500 STOPPER",
                "V": "30/11/2026",
                "S": 484,
                "Vlr": 13.30
              }
            ],
            "adrenalina": [
              {
                "P": "ADRENALINA 100X1ML(EPINEFRINA)",
                "V": "31/10/2025",
                "S": 183,
                "Vlr": 4.00
              }
            ],
            "aerosol": [
              {
                "P": "AERODINI SPRAY 200 DOSES",
                "V": "09/09/2024",
                "S": 100,
                "Vlr": 23.17
              }
            ],
            "aerossol": [
              {
                "P": "AEROSSOL TOPICO - SALICILATO DE METILA 30MG + 19MG/ML - FRASCO",
                "V": "N/A",
                "S": 12,
                "Vlr": 15.60
              }
            ],
            "agua": [
              {
                "P": "FLACONETE DE AGUA BI-DESTILADA 10ML",
                "V": "22/07/2026",
                "S": 4000,
                "Vlr": 0.80
              },
              {
                "P": "AGUA OXIGENADA 10 VOL.1000ML-RIOQUIMICA",
                "V": "12/03/2027",
                "S": 9,
                "Vlr": 10.00
              },
              {
                "P": "AGUA OXIGENADA 10 VOL.1000ML-RIOQUIMICA",
                "V": "30/04/2027",
                "S": 60,
                "Vlr": 10.00
              },
              {
                "P": "AGUA P/AUTOCLAVE 05 LITROS-SS PLUS",
                "V": "30/09/2025",
                "S": 219,
                "Vlr": 13.00
              },
              {
                "P": "AGUA P/INJETAVEIS 1000ML FRASCO [16]- FRESENIUS",
                "V": "01/02/2026",
                "S": 343,
                "Vlr": 12.00
              },
              {
                "P": "AGUA P/INJETAVEIS 1000ML[10]-BRAUN",
                "V": "N/A",
                "S": 33,
                "Vlr": 12.00
              }
            ],
            "agulha": [
              {
                "P": "AGULHA 13x0,3 MEDIX - 30G",
                "V": "30/06/2029",
                "S": 88,
                "Vlr": 15.00
              },
              {
                "P": "AGULHA 13X0,4 -BD- 27G",
                "V": "30/04/2029",
                "S": 4000,
                "Vlr": 0.50
              },
              {
                "P": "AGULHA 13X0,45 -BD- 26G",
                "V": "N/A",
                "S": 186,
                "Vlr": 0.50
              },
              {
                "P": "AGULHA 13X0,45 MEDIX - 26G",
                "V": "30/05/2029",
                "S": 100,
                "Vlr": 8.46
              },
              {
                "P": "AGULHA 13X0,45 MEDIX - 26G",
                "V": "N/A",
                "S": 38,
                "Vlr": 8.46
              },
              {
                "P": "AGULHA 20X0,55 - 24G - MEDIX",
                "V": "30/05/2029",
                "S": 6,
                "Vlr": 15.00
              },
              {
                "P": "AGULHA 20X0,55 - 24G - MEDIX",
                "V": "30/06/2029",
                "S": 100,
                "Vlr": 15.00
              },
              {
                "P": "AGULHA 25X0,6 - MEDIX - 23G",
                "V": "N/A",
                "S": 87,
                "Vlr": 15.00
              },
              {
                "P": "AGULHA 25X0,6 -BD- 23G",
                "V": "N/A",
                "S": 5253,
                "Vlr": 0.50
              },
              {
                "P": "AGULHA 25X0,6 -BD- 23G",
                "V": "N/A",
                "S": 2000,
                "Vlr": 0.50
              },
              {
                "P": "AGULHA 25X0,6 -BD- 23G",
                "V": "N/A",
                "S": 8900,
                "Vlr": 0.50
              },
              {
                "P": "AGULHA 25X0,6 -BD- 23G",
                "V": "N/A",
                "S": 44,
                "Vlr": 0.50
              },
              {
                "P": "AGULHA 25X0.7 MEDIX - 22G",
                "V": "30/06/2029",
                "S": 31,
                "Vlr": 15.00
              },
              {
                "P": "AGULHA 25X0,8 - MEDIX - 21G",
                "V": "N/A",
                "S": 72,
                "Vlr": 15.00
              },
              {
                "P": "AGULHA 25X0,8 -BD- 21G",
                "V": "30/10/2028",
                "S": 6596,
                "Vlr": 0.50
              },
              {
                "P": "AGULHA 25X10 -BD- 19G",
                "V": "N/A",
                "S": 2355,
                "Vlr": 0.50
              },
              {
                "P": "AGULHA 30X0,7 MEDIX - 22G",
                "V": "30/05/2029",
                "S": 27,
                "Vlr": 8.47
              },
              {
                "P": "AGULHA 30X0,7 MEDIX - 22G",
                "V": "30/05/2029",
                "S": 100,
                "Vlr": 8.47
              },
              {
                "P": "AGULHA 30X0,8 -BD- 21G",
                "V": "N/A",
                "S": 227,
                "Vlr": 0.50
              },
              {
                "P": "AGULHA 30X0,8 -BD- 21G",
                "V": "N/A",
                "S": 2000,
                "Vlr": 0.50
              },
              {
                "P": "AGULHA 30X0,8 -BD- 21G",
                "V": "N/A",
                "S": 900,
                "Vlr": 0.50
              },
              {
                "P": "AGULHA 30X0,8 -BD- 21G",
                "V": "30/09/2028",
                "S": 3000,
                "Vlr": 0.50
              },
              {
                "P": "AGULHA 30X10 -BD- 19G",
                "V": "N/A",
                "S": 1400,
                "Vlr": 0.50
              },
              {
                "P": "AGULHA 30X10 -BD- 19G",
                "V": "N/A",
                "S": 1303,
                "Vlr": 0.50
              },
              {
                "P": "AGULHA 40X0,8 -BD- 21G",
                "V": "N/A",
                "S": 1539,
                "Vlr": 0.50
              },
              {
                "P": "AGULHA 40X0,8 -BD- 21G",
                "V": "N/A",
                "S": 2000,
                "Vlr": 0.50
              },
              {
                "P": "AGULHA 40X0,8 -BD- 21G",
                "V": "30/07/2028",
                "S": 1000,
                "Vlr": 0.50
              },
              {
                "P": "AGULHA 40X0,8 -BD- 21G",
                "V": "N/A",
                "S": 2000,
                "Vlr": 0.50
              },
              {
                "P": "AGULHA 40X12 -BD- 18G",
                "V": "28/02/2029",
                "S": 2386,
                "Vlr": 0.28
              },
              {
                "P": "AGULHA 40X12 -BD- 18G",
                "V": "28/02/2029",
                "S": 1000,
                "Vlr": 0.28
              },
              {
                "P": "AGULHA 40X12 -BD- 18G",
                "V": "28/02/2029",
                "S": 2000,
                "Vlr": 0.28
              },
              {
                "P": "AGULHA 40X12 MEDIX - 18G",
                "V": "30/07/2029",
                "S": 76,
                "Vlr": 15.00
              },
              {
                "P": "AGULHA 40X16 -BD- 16G",
                "V": "N/A",
                "S": 2209,
                "Vlr": 0.50
              },
              {
                "P": "AGULHA 40X16 -BD- 16G",
                "V": "30/07/2027",
                "S": 5000,
                "Vlr": 0.50
              },
              {
                "P": "AGULHA DESC.13X03 - BD - 30G",
                "V": "30/08/2029",
                "S": 8689,
                "Vlr": 0.31
              },
              {
                "P": "AGULHA HIPODERMICAS 25MMX0,6MM 23G - UNIQMED",
                "V": "N/A",
                "S": 10,
                "Vlr": 6.00
              },
              {
                "P": "AGULHA P ACUPUNTURA 0,2X30MM",
                "V": "N/A",
                "S": 1,
                "Vlr": 60.00
              },
              {
                "P": "AGULHA P/ ACUPUNTURA 0,2X15MM",
                "V": "N/A",
                "S": 8,
                "Vlr": 8.00
              },
              {
                "P": "AGULHA PARA CANETA DE INSULINA",
                "V": "31/01/2026",
                "S": 518,
                "Vlr": 1.00
              }
            ],
            "alcool": [
              {
                "P": "ALCOOL 70% 1000ML-TUPI",
                "V": "29/07/2026",
                "S": 5,
                "Vlr": 8.00
              },
              {
                "P": "ALCOOL 70% GEL 5KG",
                "V": "N/A",
                "S": 10,
                "Vlr": 50.00
              },
              {
                "P": "ALCOOL 92,8 1000ML-TUPI",
                "V": "N/A",
                "S": 129,
                "Vlr": 10.00
              },
              {
                "P": "ALCOOL ISOPROPILICO 1000ML",
                "V": "01/03/2026",
                "S": 21,
                "Vlr": 45.00
              },
              {
                "P": "ALCOOL ISOPROPILICO 50ML",
                "V": "17/06/2026",
                "S": 10,
                "Vlr": 8.00
              },
              {
                "P": "ALCOOL SWABS",
                "V": "31/03/2029",
                "S": 69,
                "Vlr": 8.00
              }
            ],
            "algodao": [
              {
                "P": "ALGODAO BOLA MELHORMED 50G",
                "V": "18/03/2029",
                "S": 164,
                "Vlr": 2.66
              },
              {
                "P": "ALGODAO BOLA MELHORMED 50G",
                "V": "24/04/2029",
                "S": 166,
                "Vlr": 2.66
              },
              {
                "P": "ALGODAO HIDROFILO 500GR-CREMER",
                "V": "04/06/2028",
                "S": 54,
                "Vlr": 22.00
              },
              {
                "P": "ALGODAO HIDROFILO 500GR-MELHOR MED",
                "V": "25/09/2029",
                "S": 328,
                "Vlr": 18.00
              },
              {
                "P": "ALGODAO HIDROFILO DISCO 50 UN",
                "V": "25/09/2029",
                "S": 96,
                "Vlr": 7.65
              },
              {
                "P": "ALGODAO QUADRADO 50 UN",
                "V": "21/05/2029",
                "S": 158,
                "Vlr": 14.00
              }
            ],
            "aparelho pressao": [
              {
                "P": "APARELHO GLICOSE ACCU-CHECK ACTIVE C/ 50 TIRAS",
                "V": "04/01/2026",
                "S": 14,
                "Vlr": 140.00
              },
              {
                "P": "APARELHO P/TRICOTOMIA",
                "V": "20/05/2026",
                "S": 400,
                "Vlr": 1.31
              },
              {
                "P": "APARELHO PRESSAO AD F/METAL C/ESTETO-BIC",
                "V": "01/08/2028",
                "S": 2,
                "Vlr": 300.00
              },
              {
                "P": "APARELHO PRESSAO AD F/METAL C/ESTETO-BLACK BIC",
                "V": "04/04/2029",
                "S": 14,
                "Vlr": 220.77
              },
              {
                "P": "APARELHO PRESSAO AD F/METAL S/ESTETO-BIC",
                "V": "N/A",
                "S": 5,
                "Vlr": 220.00
              },
              {
                "P": "APARELHO PRESSAO AD F/VELCRO S/ESTETOSCOPIO-BIC",
                "V": "N/A",
                "S": 14,
                "Vlr": 200.00
              },
              {
                "P": "APARELHO PRESSAO DIG PULSO OMRON HEM-6181",
                "V": "30/06/2026",
                "S": 11,
                "Vlr": 130.00
              },
              {
                "P": "APARELHO PRESSAO DIG/BRACO UNIVERSAL-OMRON",
                "V": "30/06/2026",
                "S": 31,
                "Vlr": 250.00
              }
            ],
            "atadura": [
              {
                "P": "ATADURA CREPE 06X1,80M - NEVE",
                "V": "N/A",
                "S": 237,
                "Vlr": 0.80
              },
              {
                "P": "ATADURA CREPE 06X1,80M - NEVE",
                "V": "01/07/2027",
                "S": 240,
                "Vlr": 0.80
              },
              {
                "P": "ATADURA CREPE 08X4,5M-NEVE",
                "V": "01/05/2028",
                "S": 229,
                "Vlr": 0.84
              },
              {
                "P": "ATADURA CREPE 10X1,20M - NEVE",
                "V": "N/A",
                "S": 208,
                "Vlr": 1.00
              },
              {
                "P": "ATADURA CREPE 10X1,80M - CREMER",
                "V": "30/06/2029",
                "S": 550,
                "Vlr": 2.50
              },
              {
                "P": "ATADURA CREPE 10X1,80M - CREMER",
                "V": "N/A",
                "S": 840,
                "Vlr": 2.50
              },
              {
                "P": "ATADURA CREPE 12x1,2M - NEVE",
                "V": "01/04/2027",
                "S": 119,
                "Vlr": 1.25
              },
              {
                "P": "ATADURA CREPE 12x1,2M - NEVE",
                "V": "30/08/2029",
                "S": 960,
                "Vlr": 1.25
              },
              {
                "P": "ATADURA CREPE 12X1,80M - CREMER",
                "V": "N/A",
                "S": 619,
                "Vlr": 3.00
              },
              {
                "P": "ATADURA CREPE 12X1,80M - CREMER",
                "V": "30/04/2029",
                "S": 420,
                "Vlr": 3.00
              },
              {
                "P": "ATADURA CREPE 15X1,80M - CREMER",
                "V": "01/04/2028",
                "S": 288,
                "Vlr": 3.50
              },
              {
                "P": "ATADURA CREPE 15X1,80M - CREMER",
                "V": "22/03/2029",
                "S": 79,
                "Vlr": 3.50
              },
              {
                "P": "ATADURA CREPE 15X1,80M - NEVE",
                "V": "11/12/2028",
                "S": 342,
                "Vlr": 2.00
              },
              {
                "P": "ATADURA CREPE 20X1,80M - CREMER",
                "V": "30/09/2028",
                "S": 1,
                "Vlr": 4.00
              },
              {
                "P": "ATADURA CREPE 20X1,80M - NEVE",
                "V": "01/12/2028",
                "S": 315,
                "Vlr": 2.00
              },
              {
                "P": "ATADURA CREPE 30X1,80M - CREMER",
                "V": "N/A",
                "S": 128,
                "Vlr": 4.08
              },
              {
                "P": "ATADURA DE CREPOM 10 CM X 1,8 M POLARFIX",
                "V": "N/A",
                "S": 864,
                "Vlr": 1.00
              },
              {
                "P": "ATADURA DR CREPOM 12 CM X 1,8 M",
                "V": "N/A",
                "S": 720,
                "Vlr": 1.50
              },
              {
                "P": "ATADURA ELASTICA 10CMX3,0M - ATADRESS",
                "V": "01/03/2027",
                "S": 21,
                "Vlr": 60.00
              },
              {
                "P": "ATADURA GESSADA 10CM",
                "V": "30/08/2027",
                "S": 17,
                "Vlr": 3.50
              },
              {
                "P": "ATADURA GESSADA 10CM",
                "V": "N/A",
                "S": 100,
                "Vlr": 3.50
              },
              {
                "P": "ATADURA GESSADA 15CM",
                "V": "22/05/2027",
                "S": 38,
                "Vlr": 4.00
              },
              {
                "P": "ATADURA GESSADA 20CM",
                "V": "30/05/2027",
                "S": 1,
                "Vlr": 7.00
              },
              {
                "P": "ATADURA GESSADA 20CM",
                "V": "19/09/2027",
                "S": 40,
                "Vlr": 7.00
              },
              {
                "P": "ATADURA RAYON 7,5CMX05M ESTERIL",
                "V": "01/02/2029",
                "S": 4,
                "Vlr": 10.00
              },
              {
                "P": "ATADURA RAYON 7,5CMX05M ESTERIL",
                "V": "N/A",
                "S": 450,
                "Vlr": 10.00
              }
            ],
            "bandagem": [
              {
                "P": "BANDAGEM ELASTICA ADESIVA (AMARELO)-KINESIO",
                "V": "N/A",
                "S": 35,
                "Vlr": 40.00
              },
              {
                "P": "BANDAGEM ELASTICA ADESIVA (AZUL)-KINESIO",
                "V": "28/06/2026",
                "S": 6,
                "Vlr": 40.00
              },
              {
                "P": "BANDAGEM ELASTICA ADESIVA (AZUL-MARINHO)",
                "V": "19/09/2026",
                "S": 39,
                "Vlr": 40.00
              },
              {
                "P": "BANDAGEM ELASTICA ADESIVA (BEGE)-KINESIO",
                "V": "30/06/2026",
                "S": 211,
                "Vlr": 40.00
              },
              {
                "P": "BANDAGEM ELASTICA ADESIVA (LARANJA)-KINESIO",
                "V": "N/A",
                "S": 1,
                "Vlr": 40.00
              },
              {
                "P": "BANDAGEM ELASTICA ADESIVA (LARANJA)-KINESIO",
                "V": "23/11/2025",
                "S": 36,
                "Vlr": 40.00
              },
              {
                "P": "BANDAGEM ELASTICA ADESIVA (LILAS)",
                "V": "30/06/2026",
                "S": 5,
                "Vlr": 40.00
              },
              {
                "P": "BANDAGEM ELASTICA ADESIVA (PRETA)-KINESIO",
                "V": "28/02/2028",
                "S": 81,
                "Vlr": 40.00
              },
              {
                "P": "BANDAGEM ELASTICA ADESIVA (PRETA)-KINESIO",
                "V": "13/07/2026",
                "S": 60,
                "Vlr": 40.00
              },
              {
                "P": "BANDAGEM ELASTICA ADESIVA (VERDE)-KINESIO",
                "V": "N/A",
                "S": 19,
                "Vlr": 40.00
              },
              {
                "P": "BANDAGEM ELASTICA ADESIVA (VERDE)-KINESIO",
                "V": "05/12/2025",
                "S": 36,
                "Vlr": 40.00
              },
              {
                "P": "BANDAGEM ELASTICA ADESIVA (VERMELHO)-KINESIO",
                "V": "18/08/2025",
                "S": 13,
                "Vlr": 40.00
              },
              {
                "P": "BANDAGEM ELASTICA ADESIVA (VERMELHO)-KINESIO",
                "V": "N/A",
                "S": 10,
                "Vlr": 40.00
              },
              {
                "P": "BATERIA BOTAO DE LITIO CR2032",
                "V": "31/01/2026",
                "S": 26,
                "Vlr": 10.00
              },
              {
                "P": "BANDAGEM ELASTICA ADESIVA (PINK)-KINESIO",
                "V": "N/A",
                "S": 22,
                "Vlr": 40.00
              }
            ],
            "bolsa": [
              {
                "P": "BOLSA ACT-LIFE 19/64 OPACA C/10-546",
                "V": "01/06/2029",
                "S": 18,
                "Vlr": 18.00
              },
              {
                "P": "BOLSA ACT-LIFE 19/64 TRANSP C/10-882",
                "V": "N/A",
                "S": 80,
                "Vlr": 18.00
              },
              {
                "P": "BOLSA ACT-LIFE 19/64 TRANSP C/10-882",
                "V": "01/02/2029",
                "S": 36,
                "Vlr": 18.00
              },
              {
                "P": "BOLSA ACT-LIFE 19/64 TRANSP C/10-882",
                "V": "01/06/2029",
                "S": 80,
                "Vlr": 18.00
              },
              {
                "P": "BOLSA COLOST C/ORIF 3.0 C/10-CPL",
                "V": "N/A",
                "S": 15,
                "Vlr": 12.00
              },
              {
                "P": "BOLSA COLOST C/ORIF 3.0 C/10-CPL",
                "V": "30/11/2027",
                "S": 1000,
                "Vlr": 12.00
              },
              {
                "P": "BOLSA COLOST C/ORIF 4.0 C/10-CPL",
                "V": "30/11/2027",
                "S": 1787,
                "Vlr": 12.00
              },
              {
                "P": "BOLSA COLOST C/ORIF 4.0 C/10-CPL",
                "V": "30/06/2029",
                "S": 1000,
                "Vlr": 12.00
              },
              {
                "P": "BOLSA COLOST C/ORIF 5.0 C/10-CPL",
                "V": "01/02/2028",
                "S": 742,
                "Vlr": 12.00
              },
              {
                "P": "BOLSA COLOST C/ORIF 5.0 C/10-CPL",
                "V": "01/09/2028",
                "S": 200,
                "Vlr": 12.00
              },
              {
                "P": "BOLSA P/GELO",
                "V": "N/A",
                "S": 4,
                "Vlr": 62.22
              },
              {
                "P": "BOLSA SUR-FIT 38MM-602",
                "V": "01/07/2028",
                "S": 25,
                "Vlr": 41.62
              },
              {
                "P": "BOLSA SUR-FIT 45MM-603",
                "V": "01/01/2029",
                "S": 55,
                "Vlr": 18.00
              },
              {
                "P": "BOLSA SUR-FIT 45MM-603",
                "V": "02/02/2029",
                "S": 30,
                "Vlr": 18.00
              },
              {
                "P": "BOLSA SUR-FIT 45MM-603",
                "V": "01/03/2029",
                "S": 30,
                "Vlr": 18.00
              },
              {
                "P": "BOLSA SUR-FIT 57MM-604",
                "V": "01/01/2027",
                "S": 50,
                "Vlr": 18.00
              },
              {
                "P": "BOLSA SUR-FIT 57MM-604",
                "V": "N/A",
                "S": 162,
                "Vlr": 18.00
              },
              {
                "P": "BOLSA SUR-FIT 70MM-605",
                "V": "01/04/2029",
                "S": 60,
                "Vlr": 18.00
              },
              {
                "P": "BOLSA SUR-FIT 70MM-605",
                "V": "01/04/2029",
                "S": 30,
                "Vlr": 18.00
              },
              {
                "P": "BOLSA SUR-FIT 70MM-605",
                "V": "02/02/2029",
                "S": 17,
                "Vlr": 18.00
              },
              {
                "P": "BOLSA TERMICA GEL BODY CARE-MERCUR",
                "V": "N/A",
                "S": 33,
                "Vlr": 40.00
              }
            ],
            "canula": [
              {
                "P": "CANULA TRAQ.METAL 02 STANDART-CPL",
                "V": "01/05/2022",
                "S": 1,
                "Vlr": 66.42
              },
              {
                "P": "CANULA TRAQ.METAL 02 STANDART-CPL",
                "V": "01/05/2022",
                "S": 2,
                "Vlr": 66.42
              },
              {
                "P": "CANULA TRAQ.METAL 03 LONGA-CPL",
                "V": "N/A",
                "S": 5,
                "Vlr": 120.00
              },
              {
                "P": "CANULA TRAQ.METAL 03 LONGA-CPL",
                "V": "N/A",
                "S": 1,
                "Vlr": 120.00
              },
              {
                "P": "CANULA TRAQ.METAL 03 STANDART-CPL",
                "V": "N/A",
                "S": 1,
                "Vlr": 90.00
              },
              {
                "P": "CANULA TRAQ.METAL 03 STANDART-CPL",
                "V": "01/02/2028",
                "S": 6,
                "Vlr": 90.00
              },
              {
                "P": "CANULA TRAQ.METAL 04 LONGA-CPL",
                "V": "01/09/2028",
                "S": 5,
                "Vlr": 120.00
              },
              {
                "P": "CANULA TRAQ.METAL 04 LONGA-CPL",
                "V": "01/04/2028",
                "S": 8,
                "Vlr": 120.00
              },
              {
                "P": "CANULA TRAQ.METAL 04 STANDART-CPL",
                "V": "31/05/2029",
                "S": 9,
                "Vlr": 90.00
              },
              {
                "P": "CANULA TRAQ.METAL 05 LONGA-CPL",
                "V": "01/08/2029",
                "S": 5,
                "Vlr": 112.50
              },
              {
                "P": "CANULA TRAQ.METAL 05 STANDART-CPL",
                "V": "01/08/2028",
                "S": 1,
                "Vlr": 90.00
              },
              {
                "P": "CANULA TRAQ.METAL 05 STANDART-CPL",
                "V": "01/11/2028",
                "S": 8,
                "Vlr": 90.00
              },
              {
                "P": "CANULA TRAQ.METAL 05 STANDART-CPL",
                "V": "N/A",
                "S": 1,
                "Vlr": 90.00
              }
            ],
            "cateter": [
              {
                "P": "CATETER 14G - SOLIDOR",
                "V": "N/A",
                "S": 330,
                "Vlr": 2.00
              },
              {
                "P": "CATETER 14G- SOLIDOR",
                "V": "30/04/2027",
                "S": 465,
                "Vlr": 2.00
              },
              {
                "P": "CATETER 16 - SOLIDOR",
                "V": "N/A",
                "S": 1264,
                "Vlr": 2.00
              },
              {
                "P": "CATETER 18G- MEDIX",
                "V": "30/05/2027",
                "S": 334,
                "Vlr": 2.00
              },
              {
                "P": "CATETER 20 - COM DISPOSITIVO DE SEGURANÇA-DESCARPACK",
                "V": "30/01/2028",
                "S": 198,
                "Vlr": 2.00
              },
              {
                "P": "CATETER 20G-MEDIX",
                "V": "30/04/2029",
                "S": 1000,
                "Vlr": 1.11
              },
              {
                "P": "CATETER 20G-MEDIX",
                "V": "01/03/2027",
                "S": 360,
                "Vlr": 1.11
              },
              {
                "P": "CATETER 22G - SOLIDOR",
                "V": "31/01/2029",
                "S": 280,
                "Vlr": 2.00
              },
              {
                "P": "CATETER 22G-DESCARPACK",
                "V": "01/01/2029",
                "S": 141,
                "Vlr": 1.19
              },
              {
                "P": "CATETER 22G-DESCARPACK",
                "V": "31/05/2029",
                "S": 1000,
                "Vlr": 1.19
              },
              {
                "P": "CATETER 24G-DESCARPACK",
                "V": "31/05/2029",
                "S": 765,
                "Vlr": 1.33
              },
              {
                "P": "CATETER ANGIOCATH 16G - BD",
                "V": "N/A",
                "S": 200,
                "Vlr": 4.50
              },
              {
                "P": "CATETER ANGIOCATH 16G - BD",
                "V": "08/03/2027",
                "S": 200,
                "Vlr": 4.50
              },
              {
                "P": "CATETER ANGIOCATH 16G - BD",
                "V": "31/05/2023",
                "S": 41,
                "Vlr": 4.50
              },
              {
                "P": "CATETER ANGIOCATH 18G - BD",
                "V": "N/A",
                "S": 812,
                "Vlr": 3.50
              },
              {
                "P": "CATETER ANGIOCATH 20G - BD",
                "V": "30/07/2028",
                "S": 121,
                "Vlr": 3.50
              },
              {
                "P": "CATETER ANGIOCATH 20G - BD",
                "V": "01/04/2028",
                "S": 600,
                "Vlr": 3.50
              },
              {
                "P": "CATETER ANGIOCATH 22G - BD",
                "V": "23/07/2026",
                "S": 568,
                "Vlr": 3.15
              },
              {
                "P": "CATETER ANGIOCATH 22G - BD",
                "V": "30/07/2029",
                "S": 1600,
                "Vlr": 3.15
              },
              {
                "P": "CATETER ANGIOCATH 24G - BD",
                "V": "30/08/2029",
                "S": 1382,
                "Vlr": 3.15
              },
              {
                "P": "CATETER P/OXIGENIO TIPO OCULOS",
                "V": "30/04/2027",
                "S": 1001,
                "Vlr": 2.00
              }
            ],
            "clorexidina": [
              {
                "P": "CLOREXIDINA 0,2% 1000ML(LOCAO AQUOSA)-RIOHEX-RIOQUIMICA",
                "V": "28/02/2026",
                "S": 5,
                "Vlr": 5.80
              },
              {
                "P": "CLOREXIDINA 0,2% 1000ML(LOCAO AQUOSA)-RIOHEX-RIOQUIMICA",
                "V": "10/06/2026",
                "S": 24,
                "Vlr": 5.80
              },
              {
                "P": "CLOREXIDINA 0,2% 1000ML(LOCAO AQUOSA)-RIOHEX-RIOQUIMICA",
                "V": "22/07/2026",
                "S": 24,
                "Vlr": 5.80
              },
              {
                "P": "CLOREXIDINA 0,5% 1000ML-SOL. ALCOOLICA-RIOHEX-RIOQUIMICA",
                "V": "30/09/2027",
                "S": 69,
                "Vlr": 17.00
              },
              {
                "P": "CLOREXIDINA 2% - 1 LITRO -RIOHEX-RIOQUIMICA",
                "V": "26/06/2026",
                "S": 25,
                "Vlr": 25.00
              },
              {
                "P": "CLOREXIDINA 2% - 1 LITRO -RIOHEX-RIOQUIMICA",
                "V": "20/09/2026",
                "S": 240,
                "Vlr": 25.00
              },
              {
                "P": "CLOREXIDINA 2% 100ML-RIOHEX-RIOQUIMICA",
                "V": "15/08/2026",
                "S": 93,
                "Vlr": 5.00
              },
              {
                "P": "CLOREXIDINA 2% 100ML-RIOHEX-RIOQUIMICA",
                "V": "14/08/2026",
                "S": 210,
                "Vlr": 5.00
              },
              {
                "P": "CLOREXIDINA 2% AQUOSA 1000ML-RIOHEX-RIOQUIMICA",
                "V": "N/A",
                "S": 11,
                "Vlr": 25.00
              },
              {
                "P": "CLOREXIDINA 2% AQUOSA 1000ML-RIOHEX-RIOQUIMICA",
                "V": "30/04/2027",
                "S": 24,
                "Vlr": 25.00
              },
              {
                "P": "CLOREXIDINA 2% AQUOSA 1000ML-RIOHEX-RIOQUIMICA",
                "V": "27/09/2026",
                "S": 24,
                "Vlr": 25.00
              },
              {
                "P": "CLOREXIDINA 4% 1 LITRO -RIOHEX-RIOQUIMICA",
                "V": "04/03/2026",
                "S": 6,
                "Vlr": 35.00
              },
              {
                "P": "CLOREXIDINA 4% 1 LITRO -RIOHEX-RIOQUIMICA",
                "V": "22/03/2026",
                "S": 72,
                "Vlr": 35.00
              },
              {
                "P": "CLOREXIDINA 4% 100ML-RIOHEX-RIOQUIMICA",
                "V": "N/A",
                "S": 139,
                "Vlr": 4.90
              }
            ],"papel toalha":
                {
                  "P": "PAPEL TOALHA C/1000 BRANCO - ",
                  "V": "null",
                  "S": 32,
                  "Vlr": 18.69
                }
            ,
            "seringa":
              [
                {
                  "P": "SERINGA ZERO RESIDUO - SEM AGULHA 01ML- MEDIX",
                  "V": "null",
                  "S": 3000,
                  "Vlr": 0.40
                },
                {
                  "P": "SERINGA SEM AGULHA BICO ROSCA 5ml - BD",
                  "V": "null",
                  "S": 3000,
                  "Vlr": 0.65
                },
                {
                  "P": "SERINGA SEM AGULHA BICO ROSCA 10ml - BD",
                  "V": "null",
                  "S": 900,
                  "Vlr": 0.85
                }
              ]



          }
        ])}
        `
      };

      const apiMessages = [
        systemMessage,
        ...newMessages.map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        })),
      ];

      const response = await fetch('https://my-chat-api-af131ed6ad57.herokuapp.com/api/chat', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await response.json();
      if (response.ok) {
        const assistantMessage = data.message;
        setMessages([
          ...newMessages,
          { sender: "bot", text: assistantMessage },
        ]);
      } else {
        console.error('Error:', data.error || 'Unknown error');
        setMessages([
          ...newMessages,
          { sender: "bot", text: "Desculpe, ocorreu um erro. Tente novamente." },
        ]);
      }
    } catch (error) {
      console.error('Erro:', error);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Desculpe, ocorreu um erro. Tente novamente." },
      ]);
    }
  };

  const copyMessage = (messageText) => {
    // Implement copy message logic for WhatsApp or other platforms
    console.log(`Copying message: ${messageText}`);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-200">
      <div className="bg-white p-5 w-full sm:w-[640px] h-[33em] rounded-lg shadow-lg">
        <div className="flex flex-row-reverse justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-center text-red-400">
              Atendente virtual
            </h1>
          </div>
          <div className="w-40">
            <img src={logo} alt="HVS" />
          </div>
        </div>

        {/* Chat History */}
        <div className="bg-gradient-to-b from-gray-100 border-[0.4px] border-zinc-300 shadow-sm p-4 h-[20em] rounded-lg overflow-y-auto mb-5">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${msg.sender === "bot" ? "text-left" : "text-right"}`}
            >
              <div
                className={`inline-block p-3 rounded-lg ${msg.sender === "bot" ? "bg-white text-red-400" : "bg-gray-100 text-blue-500"}`}
              >
                {msg.text}
              </div>
              {msg.sender === "bot" && (
                <div className="flex mt-2 justify-end">
                  <button
                    onClick={() => copyMessage(msg.text)}
                    className="bg-transparent text-sm font-thin text-zinc-800 hover:underline"
                  >
                    Enviar Para WhatsApp
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Field and Send Button */}
        <div className="flex justify-between space-x-2 mt-5">
          <input
            type="text"
            className="w-full px-3 py-3.5 bg-gray-50 shadow-md border-[0.4px] border-zinc-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Digite sua mensagem..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage(); // Send message when Enter is pressed
              }
            }}
          />
          <button onClick={sendMessage}>
            <div className="bg-red-600 self-center px-4 py-3.5 text-center text-white font-semibold text-md rounded-lg shadow-sm hover:bg-red-700">
              Enviar
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
