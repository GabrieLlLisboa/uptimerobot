const axios = require('axios');
const express = require('express');
const readline = require('readline');
const fs = require('fs');

const app = express();
app.use(express.json());

// CONFIGURAÇÕES
let listaDeMonitoramento = ['https://pcmg.onrender.com/'];
const INTERVALO = 30000; // 30 segundos
const PORTA_API = 3000; // Porta que o Python vai chamar

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

/**
 * Lógica de monitoramento
 */
async function verificarSite(url) {
    try {
        const res = await axios.get(url, { timeout: 10000 });
        console.log(`\n[${new Date().toLocaleTimeString()}] ✅ ONLINE: ${url}`);
    } catch (erro) {
        console.log(`\n[${new Date().toLocaleTimeString()}] ❌ QUEDA: ${url}`);
        fs.appendFileSync('quedas.txt', `[${new Date().toLocaleString()}] ${url} caiu!\n`);
    }
}

// Inicia o loop
setInterval(() => {
    listaDeMonitoramento.forEach(verificarSite);
}, INTERVALO);

/**
 * "Antena" para o Python adicionar sites
 */
app.post('/add', (req, res) => {
    const { url } = req.body;
    if (url && url.startsWith('http')) {
        listaDeMonitoramento.push(url);
        console.log(`\n[+] Novo site adicionado via Python: ${url}`);
        return res.send({ status: 'Sucesso' });
    }
    res.status(400).send({ status: 'Erro' });
});

// Abre a porta no seu Windows
app.listen(PORTA_API, () => {
    console.clear();
    console.log("==========================================");
    console.log("      MONITOR WINDOWS COM API ATIVA       ");
    console.log("==========================================");
    console.log(`> Aguardando comandos na porta ${PORTA_API}`);
    console.log(`> Monitorando agora: ${listaDeMonitoramento[0]}`);
    console.log("------------------------------------------");
});