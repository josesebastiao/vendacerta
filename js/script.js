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
function animateValue(element, start, end, duration = 800) {
  let startTimestamp = null;

  function step(timestamp) {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = progress * (end - start) + start;
    element.innerText = `R$ ${value.toFixed(2)}`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

function calcular() {
  const produto = parseFloat(document.getElementById("produto").value);
  const embalagem = parseFloat(document.getElementById("embalagem").value);
  const impostoPerc = parseFloat(document.getElementById("imposto").value) || 0;
  const roas = parseFloat(document.getElementById("roas").value) || 0;
  const margem = parseFloat(document.getElementById("dynamicInput").value);

  if (!produto || !embalagem || !margem) {
    alert("Preencha os campos obrigatórios.");
    return;
  }

  const loading = document.getElementById("loading");
  const resultado = document.getElementById("resultado");

  resultado.style.display = "none";
  loading.style.display = "flex";

  setTimeout(() => {

    const custoTotal = produto + embalagem;
    const imposto = impostoPerc / 100;
    const lucro = custoTotal * (margem / 100);
    const precoVenda = (custoTotal + lucro + 4) / (1 - 0.20 - imposto);
    const taxas = precoVenda * 0.20 + 4 + precoVenda * imposto;

    loading.style.display = "none";
    resultado.style.display = "block";

    animateValue(document.getElementById("resPreco"), 0, precoVenda);
    animateValue(document.getElementById("resLucro"), 0, lucro);

    document.getElementById("badgeLucro").innerText =
      `Lucro Real: R$ ${lucro.toFixed(2)}`;

    document.getElementById("dProduto").innerText = `R$ ${produto.toFixed(2)}`;
    document.getElementById("dEmbalagem").innerText = `R$ ${embalagem.toFixed(2)}`;
    document.getElementById("dTaxas").innerText = `R$ ${taxas.toFixed(2)}`;

    const alerta = document.getElementById("alerta");
    alerta.style.display = lucro < 0 ? "block" : "none";

  }, 800); // delay “calculando…”
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
