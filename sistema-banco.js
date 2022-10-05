const total_contas = 5,
  total_transferencias = gerador_numeros(1, 20, false);

const contas = new Array(),
  transferencias = new Array();

while (contas.length < total_contas) {
  const conta = gerador_conta(contas);
  contas.push(conta);
}

const visor = [
  "numero",
  "saldo",
  "limite",
  "banco",
  "transfRecebidas",
  "transfEfetuadas",
  "transfNegadas",
];
console.table(contas, visor);

while (transferencias.length < total_transferencias) {
  const transf = gerador_transferencias(contas);
  transferencias.push(transf);

  for (let conta of contas) {
    if (transf.origem == conta.numero) {
      conta.historico.push(transf);

      if (
        Number(transf.valor) <= Number(conta.saldo) &&
        Number(transf.valor) <= Number(conta.limite)
      ) {
        transf.descricao = "Transação aprovada";
        conta.saldo = (Number(conta.saldo) - Number(transf.valor)).toFixed(2);
        conta.transfEfetuadas++;
      } else {
        transf.descricao = "Transação não aprovada";
        conta.transfNegadas++;
      }
    }
    if (transf.destino == conta.numero) {
      if (transf.descricao == "Transação aprovada") {
        conta.historico.push(transf);
        conta.saldo = (Number(conta.saldo) + Number(transf.valor)).toFixed(2);
        conta.transfRecebidas++;
      }
    }
  }
}

console.table(contas, visor);

for (let conta of contas) {
  console.log(`\nHistórico da conta ${conta.numero}`);
  console.table(conta.historico);
}

function gerador_numeros(min, max, float) {
  if (float) {
    return Math.random() * (max - min) + min;
  } else {
    return Math.floor(Math.random() * (max - min) + min);
  }
}

function gerador_unicos(contas) {
  let num = gerador_numeros(0, 100, false);

  for (let conta of contas) {
    if (conta.numero == num) {
      num = gerador_unicos(contas);
    }
  }

  return num;
}

function sorteador(lista) {
  let index = gerador_numeros(0, lista.length, false);
  return lista[index];
}

function gerador_conta(contas) {
  return {
    numero: gerador_unicos(contas),
    saldo: gerador_numeros(1000, 50000, true).toFixed(2),
    limite: gerador_numeros(1000, 50000, true).toFixed(2),
    banco: sorteador(["Banco PicPay", "BB", "Bradesco"]),
    transfRecebidas: 0,
    transfEfetuadas: 0,
    transfNegadas: 0,
    historico: [],
  };
}

function gerador_transferencias(contas) {
  let origem = sorteador(contas);
  let destino = sorteador(contas);

  while (origem.numero == destino.numero) {
    origem = sorteador(contas);
  }

  const caminhos = [origem, destino],
    valor = gerador_numeros(1000, 50000, true).toFixed(2);

  let tipo = "Interbancário";
  if (caminhos[0].banco == caminhos[1].banco) {
    tipo = "Intrabancário";
  }

  return {
    meio: sorteador(["TED", "DOC", "PIX"]),
    tipo: tipo,
    valor: valor,
    origem: caminhos[0].numero,
    destino: caminhos[1].numero,
    descricao: "",
  };
}
