let mode = "margem";

/* =========================
   FUNÇÃO AUXILIAR
========================= */
function formatMoney(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

/* =========================
   ANIMAÇÃO DE NÚMEROS
========================= */
function animateValue(element, start, end, duration = 800) {
  const range = end - start;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const current = start + range * progress;
    element.innerText = formatMoney(current);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

/* =========================
   CÁLCULO PRINCIPAL
========================= */
function calcular() {
  const produto = parseFloat(document.getElementById("produto").value);
  const embalagem = parseFloat(document.getElementById("embalagem").value);
  const impostoPerc = parseFloat(document.getElementById("imposto").value) || 0;
  const margem = parseFloat(document.getElementById("dynamicInput").value);
  const roas = parseFloat(document.getElementById("roas").value) || 0;

  if (!produto || !embalagem || !margem) {
    alert("Preencha todos os campos obrigatórios.");
    return;
  }

  /* ELEMENTOS */
  const loading = document.getElementById("loading");
  const resultado = document.getElementById("resultado");
  const alerta = document.getElementById("alerta");

  // RESET VISUAL
  resultado.style.display = "none";
  alerta.style.display = "none";
  loading.style.display = "flex";

  // SIMULA TEMPO DE CÁLCULO (UX PREMIUM)
  setTimeout(() => {

    /* CÁLCULOS */
    const custoTotal = produto + embalagem;
    const imposto = impostoPerc / 100;

    const lucroDesejado = custoTotal * (margem / 100);
    const precoVenda =
      (custoTotal + lucroDesejado + 4) / (1 - 0.20 - imposto);

    const taxaShopee = precoVenda * 0.20 + 4;
    const impostoValor = precoVenda * imposto;
    const taxasTotais = taxaShopee + impostoValor;
    const lucroReal =
      precoVenda - custoTotal - taxasTotais;

    /* ESCONDE LOADING */
    loading.style.display = "none";
    resultado.style.display = "block";

    /* ATUALIZA DETALHES */
    document.getElementById("dProduto").innerText = formatMoney(produto);
    document.getElementById("dEmbalagem").innerText = formatMoney(embalagem);
    document.getElementById("dTaxas").innerText = formatMoney(taxasTotais);

    /* ANIMA VALORES PRINCIPAIS */
    animateValue(
      document.getElementById("resPreco"),
      0,
      precoVenda
    );

    animateValue(
      document.getElementById("resLucro"),
      0,
      lucroReal
    );

    animateValue(
      document.getElementById("resLucroFinal"),
      0,
      lucroReal
    );

    /* ALERTA DE PREJUÍZO */
    if (lucroReal < 0) {
      alerta.style.display = "block";
    }

  }, 800); // tempo fake de cálculo
}
