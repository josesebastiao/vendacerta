function calcular() {
  const produto = Number(produtoInput());
  const embalagem = Number(document.getElementById("embalagem").value);
  const margem = Number(document.getElementById("dynamicInput").value);
  const imposto = Number(document.getElementById("imposto").value || 0) / 100;

  if (!produto || !embalagem || !margem) {
    alert("Preencha os campos obrigatórios");
    return;
  }

  document.getElementById("loading").style.display = "block";
  document.getElementById("resultado").style.display = "none";

  setTimeout(() => {
    const custo = produto + embalagem;
    const lucro = custo * (margem / 100);
    const preco = (custo + lucro + 4) / (1 - 0.20 - imposto);
    const taxas = preco * 0.20 + 4;

    document.getElementById("resPreco").innerText = `R$ ${preco.toFixed(2)}`;
    document.getElementById("resLucro").innerText = `R$ ${lucro.toFixed(2)}`;
    document.getElementById("badgeLucro").innerText = `Lucro Real: R$ ${lucro.toFixed(2)}`;

    document.getElementById("dProduto").innerText = `R$ ${produto.toFixed(2)}`;
    document.getElementById("dEmbalagem").innerText = `R$ ${embalagem.toFixed(2)}`;
    document.getElementById("dTaxas").innerText = `R$ ${taxas.toFixed(2)}`;

    document.getElementById("loading").style.display = "none";
    document.getElementById("resultado").style.display = "block";

    document.getElementById("alerta").style.display = lucro < 0 ? "block" : "none";
  }, 900);
}

function produtoInput() {
  return document.getElementById("produto").value;
}
