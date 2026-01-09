// 🔐 PROTEÇÃO DE ACESSO
const TOKENS_VALIDOS = [
  "LIBERADO123",
  "SEBASTEC",
  "CLIENTEVIP"
];

const params = new URLSearchParams(window.location.search);
const token = params.get("token");

if (!TOKENS_VALIDOS.includes(token)) {
  window.location.href = "/";
}
