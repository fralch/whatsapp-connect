const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const puppeteer = require('puppeteer');
const fs = require('fs');

// Función para iniciar el servicio de WhatsApp Web JS
async function launchBrowser() {
    return puppeteer.launch({
        headless: 'new',
        executablePath: '/usr/bin/chromium-browser',
        args: ['--no-sandbox'],
    });
}

// Objeto que representa el cliente de WhatsApp
    // const client = new Client({
    //     webVersionCache: {
    //         type: 'remote',
    //         remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2410.1.html',
    //         },
    //     authStrategy: new LocalAuth(),
    //     puppeteer: {
    //         headless: true,
    //         args: ["--no-sandbox"]
    //     }
    // });


    // const client = new Client({
    //     webVersionCache: {
    //         type: 'remote',
    //         remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2402.5.html',
    //         },
    //     authStrategy: new LocalAuth(),
    //     puppeteer: {
    //         headless: true,
    //         args: ["--no-sandbox"]
    //     }
    // });

    const client = new Client({
        webVersionCache: {
            type: 'remote',
            remotePath: 'https://raw.githubusercontent.com/fralch/CrediWhatsapp-connect/main/wcache.html',
            },
        authStrategy: new LocalAuth(),
        puppeteer: {
            headless: true,
            args: ["--no-sandbox"]
        }
    });

// Evento para generar y guardar un código QR
whatsappClient.on('qr', async qr => {
    qrcode.generate(qr, { small: true });
});

// Evento cuando el cliente está listo
whatsappClient.on('ready', async () => {
    console.log('Client is ready!');
  
});

module.exports = {
    launchBrowser,
    whatsappClient,
};
