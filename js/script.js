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

  // 1. Esconde resultados anteriores e mostra o Loading
  document.getElementById("resultado").style.display = "none";
  const loading = document.getElementById("loading");
  loading.style.display = "block";

  // 2. Faz o cálculo
  const custo = produto + embalagem;
  let preco = 0;
  let lucro = 0;

  if (mode === "margem") {
    lucro = custo * (valor / 100);
    // Fórmula baseada na taxa de 20% + R$4 fixa da Shopee
    preco = (custo + lucro + 4) / 0.8;
  }
  
  // Cálculo de taxas para exibir no card
  const taxas = (preco * 0.20) + 4;

  // 3. Aguarda 1.5 segundos para mostrar o resultado (Efeito "Calculando")
  setTimeout(() => {
    loading.style.display = "none";
    
    document.getElementById("resultado").style.display = "block";
    document.getElementById("resPreco").innerText = `R$ ${preco.toFixed(2)}`;
    document.getElementById("resTaxas").innerText = `R$ ${taxas.toFixed(2)}`;
    document.getElementById("resLucro").innerText = `R$ ${lucro.toFixed(2)}`;

    // Rola a página suavemente para o resultado
    document.getElementById("resultado").scrollIntoView({ behavior: 'smooth' });
  }, 1500); 
}