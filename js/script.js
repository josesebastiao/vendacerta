let mode = "margem";

function selectMode(el, m) {
  mode = m;

  document.querySelectorAll(".option").forEach(o => o.classList.remove("active"));
  el.classList.add("active");

  const label = document.getElementById("dynamicLabel");
  const input = document.getElementById("dynamicInput");
  input.value = "";

  if (m === "margem") label.innerHTML = "Margem de Lucro (%)";
  if (m === "preco") label.innerHTML = "Preço Final (R$)";
  if (m === "lucro") label.innerHTML = "Lucro Desejado (R$)";
}

function calcular() {
  const produto = parseFloat(produtoEl().value);
  const embalagem = parseFloat(embalagemEl().value);
  const valor = parseFloat(dynamicEl().value);

  if (!produto || !embalagem || !valor) {
    alert("Preencha os campos obrigatórios");
    return;
  }

  const custo = produto + embalagem;
  let preco = 0;
  let lucro = 0;

  if (mode === "margem") {
    lucro = custo * (valor / 100);
    preco = (custo + lucro + 4) / 0.8;
  }

  document.getElementById("resultado").style.display = "block";
  document.getElementById("resPreco").innerText = `R$ ${preco.toFixed(2)}`;
  document.getElementById("resLucro").innerText = `R$ ${lucro.toFixed(2)}`;
}

const produtoEl = () => document.getElementById("produto");
const embalagemEl = () => document.getElementById("embalagem");
const dynamicEl = () => document.getElementById("dynamicInput");
