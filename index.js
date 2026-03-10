const axios = require('axios');
const express = require('express');
const app = express();

app.use(express.json());

let listaDeMonitoramento = ['https://pcmg.onrender.com/'];
const INTERVALO = 30000; 

async function verificarSite(url) {
    try {
        const res = await axios.get(url, { timeout: 10000 });
        console.log(`[${new Date().toLocaleTimeString()}] ✅ ONLINE: ${url}`);
    } catch (erro) {
        console.log(`[${new Date().toLocaleTimeString()}] ❌ QUEDA: ${url}`);
    }
}

setInterval(() => {
    listaDeMonitoramento.forEach(verificarSite);
}, INTERVALO);

// Rota para você adicionar sites remotamente pela porta alta 7177
app.post('/add', (req, res) => {
    const { url } = req.body;
    if (url && url.startsWith('http')) {
        listaDeMonitoramento.push(url);
        console.log(`\n[+] Adicionado via terminal remoto: ${url}`);
        return res.send({ status: 'Sucesso' });
    }
    res.status(400).send({ status: 'Erro' });
});

// Samuel: Alterado para a porta 7177
app.listen(7177, '0.0.0.0', () => {
    console.log("Monitor Linux Ativo em mistarts.sytes.net:7177");
});