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
const whatsappClient = new Client({
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
