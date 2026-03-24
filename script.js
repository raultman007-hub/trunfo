// =====================
// DADOS
// =====================
var cartas = [
  { 
    nome: "Raposa",
    imagem: "1.jpeg", 
    atributos: { 
      ataque: 82, 
      defesa: 75, 
      magia: 90 
    } 
  } ,
  { 
    nome: "Foxie", 
    imagem: "2.jpeg", 
    atributos: 
    { 
      ataque: 80, 
      defesa: 70, 
      magia: 60 
    } 
  },
  { 
    nome: "chicken", 
    imagem: "3.jpeg", 
    atributos: { 
      ataque: 85, 
      defesa: 72, 
      magia: 58 
    } 
  },
  { 
    nome: "hihihiha", 
    imagem: "4.jpeg", 
    atributos: { 
      ataque: 30,//1000000000000000000000000000000000000000000000000000000000000000000000000000000000000, 
      defesa: 100,//7000000000000000000000000000000000000000000000000000000000000000000000000000000000000,
       magia: 10//35000000000000000000000000000000000000000000000000000000000000000000000000000000000000,
    } 
  },
  { 
    nome: "guardião caido", 
    imagem: "5.jpeg", 
    atributos: { 
      ataque: 100, 
      defesa: 92, 
      magia: 78 
    } 
  },
  { 
    nome: "cilencio caotico", 
    imagem: "6.jpeg", 
    atributos: { 
      ataque: 75, 
      defesa: 42, 
      magia: 108 
    } 
  },
  { 
    nome: "golden freddy", 
    imagem: "7.jpeg", 
    atributos: { 
      ataque: 125, 
      defesa: 74, 
      magia: 70
    } 
  },
  { 
    nome: "shint esria", 
    imagem: "8.jpeg", 
    atributos: { 
      ataque: 90, 
      defesa: 89, 
      magia: 88 
    } 
  },
  { 
    nome: "the puppet", 
    imagem: "9.jpeg", 
    atributos: { 
      ataque: 95, 
      defesa: 62, 
      magia: 87 
    } 
  },
  { 
    nome: "pikachu", 
    imagem: "10.jpeg", 
    atributos: { 
      ataque: 111, 
      defesa: 123, 
      magia: 118 
    } 
  },
];
var somsortear = new Audio("./sons/ramdomiozar.wav");
var somVitoria = new Audio("./sons/vitoria.wav");
var somDerrota = new Audio("./sons/lose.wav");
var somCampeao = new Audio("./sons/vitoria definitiva.wav");

var cartaJogador = null;
var cartaMaquina = null;

var pontosJogador = 0;
var pontosMaquina = 0;
var disputaEncerrada = false;

var URL_MOLDURA = "https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png";

// =====================
// UTILITÁRIOS
// =====================
function aleatorio(max) {
  return parseInt(Math.random() * max);
}

function sorteiaCarta() {
  return cartas[aleatorio(cartas.length)];
}
function tocar(som){
  som.currentTime = 0;
  som.play()
}
function sorteiaCartaDiferente(cartaProibida) {
  var c = sorteiaCarta();
  while (c === cartaProibida) {
    c = sorteiaCarta();
  }
  return c;
}

// =====================
// Pegar qual radio ou bolinha foi selecionado
// =====================
function getRadioSelecionado(nomeRadio) {
  var radios = document.getElementsByName(nomeRadio);
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) return radios[i].value;
  }
  return null;
}


// =====================
// UI (TELA)
// =====================
function desenhaCarta(divId, carta, modo) {
  // modo = "jogador" (com radio) ou "maquina" (texto)
  var div = document.getElementById(divId);

  div.style.backgroundImage = `url(${carta.imagem})`;

  var moldura = `<img src="${URL_MOLDURA}" style="width: inherit; height: inherit; position: absolute;">`;
  var nome = `<p class="carta-subtitle">${carta.nome}</p>`;

  var conteudo = "";

  for (var attr in carta.atributos) {
    var valor = carta.atributos[attr];

    if (modo === "jogador") {
      conteudo += `
        <label>
          <input type="radio" name="atributo" value="${attr}">
          ${attr}: ${valor}
        </label><br>
      `;
    } else {
      conteudo += `<p>${attr}: ${valor}</p>`;
    }
  }

  div.innerHTML = moldura + nome + `<div class="carta-status">${conteudo}</div>`;
}

function setBotoes(jaSorteou) {
  document.getElementById("btnSortear").disabled = jaSorteou;
  document.getElementById("btnJogar").disabled = !jaSorteou;
  //add botão jogavar novamente
}

// =====================
// MOSTRAR RESULTADO NA TELA
// =====================

function setResultado(texto) {
  document.getElementById("resultado").innerHTML = `<p class="resultado-final">${texto}</p>`;
}
//fazer atualizar placar
function atualizaPlacar() {
 document.getElementById("placar").innerHTML =
 `Jogador: ${pontosJogador} | Computador: ${pontosMaquina}`;
}

// =====================
// REGRAS DO JOGO
// =====================

// FAZER
function compara(valorJogador, valorMaquina){
  if(valorJogador > valorMaquina ) return "👍👍👍";
  if(valorJogador < valorMaquina ) return "👎👎👎";
  return "Empate";
}

//fazer
function verificaCampeao() {
if(pontosJogador>10){
  setResultado("jogador é o melhor entendeu chatGPT!!!!!!!!!!!!")
  tocar(somCampeao)
setBotoes(false)
  }else if(pontosMaquina>10){
    setResultado("hahahahaha o chatGPT é mil vezes melhor")
    setBotoes(true)
  }
}
function ultimoponto(){
if(pontosJogador===9 || pontosMaquina===9){
 alert("ponto decisivo, boa sorte")
}
}

// =====================
// AÇÕES
// =====================
function sortearCarta() {
   cartaJogador = sorteiaCarta();
  cartaMaquina = sorteiaCartaDiferente(cartaJogador);
tocar(somsortear)
  desenhaCarta("carta-jogador", cartaJogador, "jogador");

  var cartaMaquinaDiv = document.getElementById("carta-maquina");
  cartaMaquinaDiv.innerHTML = "";
  cartaMaquinaDiv.style.backgroundImage = "none";

  document.getElementById("resultado").innerHTML = "";
  document.getElementById("btnSortear").disabled = true;
  document.getElementById("btnJogar").disabled = false;

  
  //desabilitar botao jogar novamente
  document.getElementById("btnJogarNovamente").disabled = true;
}


// =====================
// QUANDO CLICAR NO BOTAO JOGAR
// =====================
function jogar(){
  var attr = getRadioSelecionado("atributo")

  if(!attr){
    setResultado("Escolha um atributo");
    tocar(somsortear)
    return
  }

  var vJ = cartaJogador.atributos[attr]
  var vM = cartaMaquina.atributos[attr]

  var resultado = compara(vJ, vM);
  //contar pontos
if(resultado === "👍👍👍"){
  pontosJogador++
  tocar(somVitoria)
}else if(resultado === "👎👎👎"){
  pontosMaquina++
  tocar(somDerrota)
}
  desenhaCarta("carta-maquina", cartaMaquina, "maquina")
  //atualizar placar
atualizaPlacar();
  setResultado(resultado);
   // Depois de jogar, trava jogar e sortear de novo até clicar em jogar novamente
  document.getElementById("btnJogar").disabled = true;
  document.getElementById("btnSortear").disabled = true;
  document.getElementById("btnJogarNovamente").disabled = false;
  verificaCampeao()
  ultimoponto()
}

function jogarNovamente() {
//fazer
tocar(somsortear)
 document.getElementById("btnSortear").disabled = false;
  document.getElementById("btnJogarNovamente").disabled = true;
sortearCarta()
}

atualizaPlacar();