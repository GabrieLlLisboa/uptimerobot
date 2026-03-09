const axios = require('axios');
const readline = require('readline');

// Configurações do alvo (o PC do seu irmão)
const URL_SERVIDOR = 'http://mistarts.sytes.net:3000/add';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.clear();
console.log("==========================================");
console.log("   CONTROLE REMOTO DE MONITORAMENTO      ");
console.log("   Alvo: mistarts.sytes.net              ");
console.log("==========================================");

/**
 * Função que envia a URL para o servidor remoto
 */
async function enviarSite(url) {
    // Ajusta a URL caso você esqueça do http
    let urlFormatada = url.trim();
    if (!urlFormatada.startsWith('http')) {
        urlFormatada = 'https://' + urlFormatada;
    }

    try {
        console.log(`\nEnviando: ${urlFormatada}...`);
        
        const resposta = await axios.post(URL_SERVIDOR, {
            url: urlFormatada
        }, { timeout: 5000 });

        if (resposta.data.status === 'Sucesso') {
            console.log("✅ SUCESSO: O PC do seu irmão já está monitorando!");
        }
    } catch (erro) {
        console.log("❌ ERRO DE CONEXÃO:");
        if (erro.code === 'ECONNREFUSED' || erro.code === 'ETIMEDOUT') {
            console.log("> Não foi possível alcançar o PC do seu irmão.");
            console.log("> Verifique se ele abriu a porta 3000 no roteador.");
        } else {
            console.log(`> Detalhes: ${erro.message}`);
        }
    }
    
    pergunta(); // Volta a perguntar
}

function pergunta() {
    rl.question('\nDigite o site para adicionar (ou "sair"): ', (input) => {
        if (input.toLowerCase() === 'sair') {
            process.exit();
        }
        if (input.trim() !== '') {
            enviarSite(input);
        } else {
            pergunta();
        }
    });
}

pergunta();