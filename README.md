 
 # WhatsApp Service Library



A JavaScript library that simplifies the initialization and management of WhatsApp Web services using `whatsapp-web.js` and `puppeteer`. It provides an easy-to-use interface for handling authentication, generating QR codes as images, and enabling users to perform additional actions programmatically, such as sending messages.

## Features

- **Easy Initialization:** Quickly set up and initialize WhatsApp Web services.
- **QR Code Generation:** Generate QR codes as images for user authentication.

## Installation

Install the library using npm:

```bash
npm install whatsapp-connect
```

## Installation on no-gui systems

To enable Puppeteer to function correctly on Debian-based systems, like Ubuntu, you need to install the following dependencies using the apt-get command (remember to run apt-get update before installing):

```bash
sudo apt-get update
```
```bash
sudo apt install -y gconf-service libgbm-dev libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```
**Note:** These instructions are specific to systems using apt-get, such as Debian and Ubuntu. If you are using a different Linux distribution, make sure to search for and install the equivalent dependencies for your distribution.

## HOW TO USE
### 1. Module Imports:
The necessary modules are imported, including launchBrowser and whatsappClient from the whatsapp-connect library.
```javascript
    const { launchBrowser, whatsappClient } = require('whatsapp-connect');
```

### 2. Function startWhatsAppBot:
- startWhatsAppBot initiates the WhatsApp Web JS service.
- It registers an event to handle the QR code that will be printed to the console.
- It initializes the WhatsApp client by calling whatsappClient.initialize().
```javascript
    async function startWhatsAppBot() {
        const browserInstance = await launchBrowser();
        whatsappClient.on('qr', async qr => {
            console.log('Scan the following QR code with your phone:');
        });
        whatsappClient.initialize();
    }
```

### 3. Execution of startWhatsAppBot Function:
Calls the startWhatsAppBot function to start the WhatsApp bot.
```javascript
    startWhatsAppBot();
```

### 4. Function SendMsg:
SendMsg is an asynchronous function that runs when the WhatsApp client is ready.
It sends a test message to a specific phone number using whatsappClient.sendMessage().
```javascript
    const SendMsg = async () => {
        await whatsappClient.on('ready', async () => {
            const targetNumber = `51961610362@c.us`;
            const message = 'Hello, I am Frank Cairampoma! I am testing my WhatsApp-connect.';
            await whatsappClient.sendMessage(targetNumber, message);
            console.log('Message sent successfully');
        });
    }
    SendMsg();
```
### Note on Using the `SendMsg` Function

In step 4 of the script (`index.js`), the function `SendMsg` is used to send a test message through the WhatsApp client. It's important to note that the name of the function `SendMsg` is arbitrary and can be modified according to user preferences. In fact, this function can be integrated in various ways into your application.

- **Variation of the Function Name:**
  The `SendMsg` function can be renamed according to preferred naming conventions. You can use any name that better reflects its purpose and code structure.

- **Integration with a REST API:**
  Instead of encapsulating the functionality in a standalone function, you can integrate it directly into an endpoint of your REST API. This allows the execution of the message-sending service through HTTP requests, providing greater flexibility in integration with other parts of your application.

Here's a basic example of how the code might be structured within a REST API endpoint:

```javascript
// Example of integration into a REST API
const express = require('express');
const app = express();

app.post('/send-message', async (req, res) => {
    try {
        // Logic for sending the message via WhatsApp
        // ...

        res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Error sending the message' });
    }
});

// Other configuration code for the REST API
// ...

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`REST API server listening on port ${PORT}`);
});

```



 
# WhatsApp Service Library - ESPAÑOL



Una biblioteca de JavaScript que simplifica la inicialización y gestión de los servicios de WhatsApp Web utilizando `whatsapp-web.js` y `puppeteer`. Proporciona una interfaz fácil de usar para manejar la autenticación, generar códigos QR como imágenes y permitir a los usuarios realizar acciones adicionales programáticamente, como enviar mensajes.

## Características

- **Inicialización Sencilla:** Configura y inicializa rápidamente los servicios de WhatsApp Web.
- **Generación de Códigos QR:** Genera códigos QR como imágenes para la autenticación del usuario.

## Instalación

Instala la biblioteca usando npm:

```bash
npm install whatsapp-connect
```

## Instalación en sistemas sin interfaz gráfica o linux server

Para que Puppeteer funcione correctamente en sistemas basados en Debian, como Ubuntu, debes instalar las siguientes dependencias usando el comando apt-get (recuerda ejecutar apt-get update antes de instalar):

```bash
sudo apt-get update
```
```bash
sudo apt install -y gconf-service libgbm-dev libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```
**Nota:** Estas instrucciones son específicas para sistemas que utilizan apt-get, como Debian y Ubuntu. Si estás utilizando una distribución de Linux diferente, asegúrate de buscar e instalar las dependencias equivalentes para tu distribución.

## CÓMO USAR
### 1. Importación de Módulos:
Se importan los módulos necesarios, incluidos launchBrowser y whatsappClient de la biblioteca `whatsapp-connect`.
```javascript
    const { launchBrowser, whatsappClient } = require('whatsapp-connect');
```

### 2. Función startWhatsAppBot:
- `startWhatsAppBot` inicia el servicio WhatsApp Web JS.
- Registra un evento para manejar el código QR que se imprimirá en la consola.
- Inicializa el cliente de WhatsApp llamando a `whatsappClient.initialize()`.
```javascript
    async function startWhatsAppBot() {
        const browserInstance = await launchBrowser();
        whatsappClient.on('qr', async qr => {
            console.log('Scan the following QR code with your phone:');
        });
        whatsappClient.initialize();
    }
```

### 3. Ejecución de la Función startWhatsAppBot:
Llama a la función `startWhatsAppBot` para iniciar el bot de WhatsApp.
```javascript
    startWhatsAppBot();
```

### 4.  Función SendMsg:
SendMsg es una función asíncrona que se ejecuta cuando el cliente de WhatsApp está listo.
Envía un mensaje de prueba a un número de teléfono específico usando `whatsappClient.sendMessage()`.
```javascript
    const SendMsg = async () => {
        await whatsappClient.on('ready', async () => {
            const targetNumber = `51961610362@c.us`;
            const message = 'Hello, I am Frank Cairampoma! I am testing my WhatsApp-connect.';
            await whatsappClient.sendMessage(targetNumber, message);
            console.log('Message sent successfully');
        });
    }
    SendMsg();
```
### Nota sobre el Uso de la Función  `SendMsg` 

En el paso 4 del script (`index.js`), la función `SendMsg` se utiliza para enviar un mensaje de prueba a través del cliente de WhatsApp. Es importante tener en cuenta que el nombre de la función `SendMsg` es arbitrario y puede modificarse según las preferencias del usuario. De hecho, esta función se puede integrar de varias maneras en tu aplicación.

- **Variación del Nombre de la Función:**
  La función `SendMsg` puede ser renombrada según las convenciones de nombres preferidas. Puedes usar cualquier nombre que refleje mejor su propósito y estructura de código.

- **Integración con una API REST:**
  En lugar de encapsular la funcionalidad en una función independiente, puedes integrarla directamente en un punto final de tu API REST. Esto permite la ejecución del servicio de envío de mensajes a través de solicitudes HTTP, brindando una mayor flexibilidad en la integración con otras partes de tu aplicación.

Aquí tienes un ejemplo básico de cómo podría estructurarse el código dentro de un punto final de una API REST:

```javascript
// Ejemplo de integración en una API REST
const express = require('express');
const app = express();

app.post('/send-message', async (req, res) => {
    try {
         // Lógica para enviar el mensaje a través de WhatsApp
        // ...

        res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Error sending the message' });
    }
});

// Otro código de configuración para la API REST
// ...

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`REST API server listening on port ${PORT}`);
});

```