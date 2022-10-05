let tipoProd = Math.floor(Math.random() * 5 + 1);
let todosProd = [];
let listaPrecos = [];

for (let j = 1; j <= 5; j++) {
  let preco = Math.random() * 100 + 1;
  listaPrecos.push(preco);
}

for (let x = 1; x <= tipoProd; x++) {
  let QuantCadaTipo = Math.floor(Math.random() * 10 + 1);
  for (let i = 1; i <= QuantCadaTipo; i++) {
    let armazenarFab = fabricacao();
    let armazenarVal = validadeDiasEQuantLotes(365);
    let armazenarQuantLote = validadeDiasEQuantLotes(360);
    let armazenarValidade = dataValidade(armazenarFab, armazenarVal);
    let armazenarHoje = dataHoje();
    let armazenarPreco = preco(listaPrecos, x);
    let armazenarEstado = estado(armazenarHoje, armazenarValidade);

    let produto = {
      tipo: x,
      hoje: armazenarHoje.toLocaleDateString(),
      fabricao: armazenarFab.toLocaleDateString(),
      validade: armazenarValidade.toLocaleDateString(),
      validadeDias: armazenarVal,
      qualidade: armazenarEstado,
      precoUnitario: armazenarPreco.toFixed(2),
      quantidadeLote: armazenarQuantLote
    };
    todosProd.push(produto);
  }
}

let listaQuant = 0;
let listaPrecoPerdas = 0;

for (let z = 0; z < todosProd.length; z++) {
  if (todosProd[z].qualidade == "vencido") {
    listaQuant += todosProd[z].quantidadeLote
    let perdas = todosProd[z].quantidadeLote * todosProd[z].precoUnitario;
    listaPrecoPerdas += perdas

  }
}

function dataHoje() {
  let dataAtual = new Date();
  return dataAtual;
}

function validadeDiasEQuantLotes(x) {
  let validadeOuLote = Math.floor(Math.random() * x + 1);
  return validadeOuLote;
}

function fabricacao() {
  let dataFabricacao = new Date(
    2022,
    Math.floor(Math.random() * 9),
    Math.floor(Math.random() * 31 + 1)
  );
  return dataFabricacao;
}

function dataValidade(armazenarFab, diasValidade) {
  let data = new Date(armazenarFab);
  data.setDate(data.getDate() + diasValidade);
  return data;
}

function estado(diaHoje, validade) {
  let estado = diaHoje > validade ? "vencido" : "consumível";
  return estado;
}

function preco(listaPrecos, indice) {
  let preco = listaPrecos[indice - 1];
  return preco;
}

console.table(todosProd);
let saidaDois = {quantidade: listaQuant, valor: listaPrecoPerdas.toFixed(2)};
console.table(saidaDois);
