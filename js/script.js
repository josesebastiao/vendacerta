function calcular() {
  const produto = Number(produtoInput());
  const embalagem = Number(document.getElementById("embalagem").value);
  const margem = Number(document.getElementById("dynamicInput").value);
  const imposto = Number(document.getElementById("imposto").value || 0) / 100;
  const resultadoBox = document.getElementById("resultado");
resultadoBox.style.display = "grid";

requestAnimationFrame(() => {
  resultadoBox.classList.add("show");
});


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
function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function animateValue(el, start, end, duration = 900) {
  let startTime = null;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = easeOutExpo(progress);

    const value = start + (end - start) * eased;
    el.innerText = `R$ ${value.toFixed(2).replace('.', ',')}`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      el.closest(".result-card")?.classList.add("pulse");
      setTimeout(() => {
        el.closest(".result-card")?.classList.remove("pulse");
      }, 350);
    }
  }

  requestAnimationFrame(animate);
}
animateValue(document.getElementById("resPreco"), 0, preco);
animateValue(document.getElementById("resTaxas"), 0, taxas);
animateValue(document.getElementById("resLucro"), 0, lucro);

document.getElementById("badgeLucro").innerText =
  `Lucro Real: R$ ${lucro.toFixed(2).replace('.', ',')} (${margem}%)`;
