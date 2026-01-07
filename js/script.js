let mode = "margem";

function selectMode(m) {
    mode = m;

    document.querySelectorAll(".option").forEach(o => o.classList.remove("active"));
    event.currentTarget.classList.add("active");

    const label = document.getElementById("dynamicLabel");
    const input = document.getElementById("dynamicInput");
    input.value = "";

    if (m === "margem") {
        label.innerHTML = "Margem de Lucro Desejada (%) <span>*</span>";
        input.placeholder = "Ex: 30";
    }

    if (m === "preco") {
        label.innerHTML = "Preço de Venda Final (R$) <span>*</span>";
        input.placeholder = "Ex: 59,90";
    }

    if (m === "lucro") {
        label.innerHTML = "Lucro Desejado (R$) <span>*</span>";
        input.placeholder = "Ex: 20,00";
    }
}
function calcular() {
    const produto = parseFloat(document.getElementById("produto").value);
    const embalagem = parseFloat(document.getElementById("embalagem").value);
    const impostoPerc = parseFloat(document.getElementById("imposto").value) || 0;
    const valorUsuario = parseFloat(document.getElementById("dynamicInput").value);
    const roas = parseFloat(document.getElementById("roas").value) || 0;

    if (!produto || !embalagem || !valorUsuario) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    const custoTotal = produto + embalagem;
    const imposto = impostoPerc / 100;

    let precoVenda = 0;
    let lucro = 0;

    // 🔹 MODO MARGEM
    if (mode === "margem") {
        lucro = custoTotal * (valorUsuario / 100);
        precoVenda = (custoTotal + lucro + 4) / (1 - 0.20 - imposto);
    }

    // 🔹 MODO PREÇO FINAL
    if (mode === "preco") {
        precoVenda = valorUsuario;
        const taxaShopee = precoVenda * 0.20 + 4;
        const impostoValor = precoVenda * imposto;
        lucro = precoVenda - custoTotal - taxaShopee - impostoValor;
    }

    // 🔹 MODO LUCRO DESEJADO
    if (mode === "lucro") {
        lucro = valorUsuario;
        precoVenda = (custoTotal + lucro + 4) / (1 - 0.20 - imposto);
    }

    const taxaShopee = precoVenda * 0.20 + 4;
    const impostoValor = precoVenda * imposto;
    const taxasTotais = taxaShopee + impostoValor;

    // 📊 Atualiza cards principais
    document.getElementById("resultado").style.display = "block";
    document.getElementById("resPreco").innerText = `R$ ${precoVenda.toFixed(2)}`;
    document.getElementById("resTaxas").innerText = `R$ ${taxasTotais.toFixed(2)}`;
    document.getElementById("resLucro").innerText = `R$ ${lucro.toFixed(2)}`;

    const lucroCard = document.querySelector(".result-card.lucro");
    const alerta = document.getElementById("alertaLucro");

    lucroCard.classList.remove("positivo", "negativo");
    alerta.style.display = "none";

    if (lucro < 0) {
        lucroCard.classList.add("negativo");
        alerta.style.display = "block";
    } else {
        lucroCard.classList.add("positivo");
    }

    // 🎯 SIMULADOR SHOPEE ADS
    if (roas > 0) {
        const custoAds = precoVenda / roas;
        const lucroComAds = lucro - custoAds;

        document.getElementById("resAds").innerText = `R$ ${custoAds.toFixed(2)}`;
        document.getElementById("resLucroAds").innerText = `R$ ${lucroComAds.toFixed(2)}`;

        const adsCard = document.querySelectorAll(".result-card.ads");

        adsCard.forEach(c => c.classList.remove("negativo"));

        if (lucroComAds < 0) {
            adsCard.forEach(c => c.classList.add("negativo"));
        }
    }
}
