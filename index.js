const axios = require('axios');
const express = require('express');
const app = express();

app.use(express.json());

let listaDeMonitoramento = ['https://pcmg.onrender.com/'];
const INTERVALO = 30000;

// Função de verificação
async function verificarSite(url) {
    try {
        await axios.get(url, { timeout: 10000 });
        console.log(`[${new Date().toLocaleTimeString()}] ✅ ONLINE: ${url}`);
    } catch (erro) {
        console.log(`[${new Date().toLocaleTimeString()}] ❌ QUEDA: ${url}`);
    }
}

// Loop de monitoramento
setInterval(() => {
    listaDeMonitoramento.forEach(verificarSite);
}, INTERVALO);

// Rota para VOCÊ adicionar sites remotamente
app.post('/add', (req, res) => {
    const { url } = req.body;
    if (url && url.startsWith('http')) {
        listaDeMonitoramento.push(url);
        console.log(`\n[+] Novo site adicionado via terminal remoto: ${url}`);
        return res.send({ status: 'Sucesso', msg: `Monitorando ${url}` });
    }
    res.status(400).send({ status: 'Erro', msg: 'URL inválida' });
});

app.listen(3000, () => {
    console.log("Monitor rodando. Aguardando novos sites na porta 3000...");
});