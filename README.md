 
 # WhatsApp Service Library



A JavaScript library that simplifies the initialization and management of WhatsApp Web services using `whatsapp-web.js` and `puppeteer`. It provides an easy-to-use interface for handling authentication, generating QR codes as images, and enabling users to perform additional actions programmatically, such as sending messages.
For more information, check out the [GitHub repository](https://github.com/fralch/whatsapp-connect) of this project.

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

## Chromium Browser installation
It is crucial to install chromium-browser specifically for the library to function correctly. Ensure to follow these detailed steps:
```bash
# Install Chromium Browser
sudo apt install chromium-browser
```
### 1. Verify:
Afterward, verify the installation of chromium-browser by running the following command:
```bash
chromium-browser --version

```
This command will display the installed version of `Chromium-Browser`. Make sure the installation is successful before proceeding with the library usage. The specific version of `chromium-browser` is essential for library compatibility, so confirming its correct installation is crucial.

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
#### Important Note on the `targetNumber` Variable:
In this example, a message is being sent to a Peru number `"51971619505@c.us"`. The country code for Peru is `+51`, but for the library, we omit the `"+"` symbol. Change the country code to the desired one for the number you want to send; for example, `"961610362"` is a mobile number in Peru. Replace it with the desired phone number, and end with `"@c.us"` which is the required format for processing.


### Note on Using the `SendMsg` Function

In step 4 of the script (`index.js`), the function `SendMsg` is used to send a test message through the WhatsApp client. It's important to note that the name of the function `SendMsg` is arbitrary and can be modified according to user preferences. In fact, this function can be integrated in various ways into your application.

- **Variation of the Function Name:**
  The `SendMsg` function can be renamed according to preferred naming conventions. You can use any name that better reflects its purpose and code structure.

- **Integration with a REST API:**
  Instead of encapsulating the functionality in a standalone function, you can integrate it directly into an endpoint of your REST API. This allows the execution of the message-sending service through HTTP requests, providing greater flexibility in integration with other parts of your application.

- **IMPORTANT:**
  Important to add to your `.gitignore` the folders `.wwebjs_auth` and `.wwebjs_cache`, as the WhatsApp session is stored there.

Here's a basic example of how the code might be structured within a REST API endpoint:

```javascript
// Example of integration into a REST API
const express = require('express');
const { launchBrowser, whatsappClient } = require('whatsapp-connect');
const app = express();

app.use(express.json());

async function startWhatsAppBot() {
    const browserInstance = await launchBrowser();
    whatsappClient.on('qr', async qr => {
        console.log('Scan the following QR code with your phone:');
    });
    await whatsappClient.initialize();
}

startWhatsAppBot();

const SendMsg = async (targetNumber, message) => {
    console.log('Sending message...');
    try {
        await whatsappClient.sendMessage(targetNumber, message);
        console.log('Message sent successfully');
        return true;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};


app.post('/api/whatsapp',  async (req, res) => {
    const message = req.body.message;
    const phone = req.body.phone;
    const targetNumber = `51${phone}@c.us`;

    try {
        const msg = await SendMsg(targetNumber, message);
        res.json(msg? { message: 'Message sent successfully' } : { message: 'Error sending message' });
    } catch (error) {
        res.status(500).json({ error: 'Error sending message' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`REST API server listening on port ${PORT}`);
});


```
### Complete example

```javascript
const { launchBrowser, whatsappClient } = require('whatsapp-connect');

async function startWhatsAppBot() {
    const browserInstance = await launchBrowser();
    whatsappClient.on('qr', async qr => {
       console.log('Scan the following QR code with your phone:');    
    });   
    whatsappClient.initialize();
}
startWhatsAppBot();

const SendMsg = async (req, res) => {
    await whatsappClient.on('ready', async () => {              
        const targetNumber = `51961610362@c.us`;
        const message = 'Hola, soy un bot que envía dddddd';
        await whatsappClient.sendMessage(targetNumber, message);
        console.log('Message sent successfully');
    })
}
SendMsg();

```
or 

```javascript
import { launchBrowser, whatsappClient } from 'whatsapp-connect';
async function startWhatsAppBot() {   
    const browserInstance = await launchBrowser();
    whatsappClient.on('qr', async qr => {
        console.log('Escanea el siguiente código QR con tu teléfono:');
    });
    whatsappClient.initialize();
}
startWhatsAppBot();

const SendMsg = async () => {
    await whatsappClient.on('ready', async () => {
        const targetNumber = `51971619505@c.us`;
        const message = 'Hola, soy un bot que envía dddddd';
        await whatsappClient.sendMessage(targetNumber, message);
        console.log('Mensaje enviado correctamente');
    });
}
SendMsg();

``` 


 
# WhatsApp Service Library - Español



Una biblioteca de JavaScript que simplifica la inicialización y gestión de los servicios de WhatsApp Web utilizando `whatsapp-web.js` y `puppeteer`. Proporciona una interfaz fácil de usar para manejar la autenticación, generar códigos QR como imágenes y permitir a los usuarios realizar acciones adicionales programáticamente, como enviar mensajes.
Para obtener más información, consulta el [GitHub repository](https://github.com/fralch/whatsapp-connect) de este proyecto.

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

## Instalación de Chromium Browser
Es crucial instalar específicamente `chromium-browser` para que la biblioteca funcione correctamente. Asegúrate de seguir estos pasos detallados:
```bash
# Install Chromium Browser
sudo apt install chromium-browser
```
### 1. Verify:
Luego, verifica la instalación de `chromium-browser` ejecutando el siguiente comando:
```bash
chromium-browser --version

```
Este comando mostrará la versión instalada de `Chromium Browser`. Asegúrate de que la instalación sea exitosa antes de proceder con el uso de la biblioteca. La versión específica de `chromium-browser` es esencial para la compatibilidad de la biblioteca, por lo que es crucial confirmar su correcta instalación.


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
#### Nota Importante sobre la Variable `targetNumber`:
En este ejemplo, se está enviando un mensaje a un número de Perú `"51971619505@c.us"`. El código de país para Perú es `+51`, pero para la biblioteca, omitimos el símbolo `"+"`. Cambia al código de país que desees para el número que quieras enviar, por ejemplo, "961610362" es un número de celular en Perú. Reemplaza con el número de teléfono deseado y termina con `"@c.us"`, que es el formato necesario para ser procesado.

### Nota sobre el Uso de la Función  `SendMsg` 

En el paso 4 del script (`index.js`), la función `SendMsg` se utiliza para enviar un mensaje de prueba a través del cliente de WhatsApp. Es importante tener en cuenta que el nombre de la función `SendMsg` es arbitrario y puede modificarse según las preferencias del usuario. De hecho, esta función se puede integrar de varias maneras en tu aplicación.

- **Variación del Nombre de la Función:**
  La función `SendMsg` puede ser renombrada según las convenciones de nombres preferidas. Puedes usar cualquier nombre que refleje mejor su propósito y estructura de código.

- **Integración con una API REST:**
  En lugar de encapsular la funcionalidad en una función independiente, puedes integrarla directamente en un punto final de tu API REST. Esto permite la ejecución del servicio de envío de mensajes a través de solicitudes HTTP, brindando una mayor flexibilidad en la integración con otras partes de tu aplicación.
  - **IMPORTANTE:**
  Es importante agregar a tu archivo `.gitignore` las carpetas `.wwebjs_auth` y `.wwebjs_cache`, ya que es allí donde se guarda la sesión de WhatsApp.

Aquí tienes un ejemplo básico de cómo podría estructurarse el código dentro de un punto final de una API REST:

```javascript
// Ejemplo de integración en una API REST
const express = require('express');
const { launchBrowser, whatsappClient } = require('whatsapp-connect');
const app = express();

app.use(express.json());


async function startWhatsAppBot() {
    const browserInstance = await launchBrowser();
    whatsappClient.on('qr', async qr => {
        console.log('Scan the following QR code with your phone:');
    });
    await whatsappClient.initialize();
}

startWhatsAppBot();

const SendMsg = async (targetNumber, message) => {
    console.log('Sending message...');
    try {
        await whatsappClient.sendMessage(targetNumber, message);
        console.log('Message sent successfully');
        return true;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};


app.post('/api/whatsapp',  async (req, res) => {
    const message = req.body.message;
    const phone = req.body.phone;
    const targetNumber = `51${phone}@c.us`;

    try {
        const msg = await SendMsg(targetNumber, message);
        res.json(msg? { message: 'Message sent successfully' } : { message: 'Error sending message' });
    } catch (error) {
        res.status(500).json({ error: 'Error sending message' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`REST API server listening on port ${PORT}`);
});

```

### Ejemplo completo

```javascript
const { launchBrowser, whatsappClient } = require('whatsapp-connect');

async function startWhatsAppBot() {
    const browserInstance = await launchBrowser();
    whatsappClient.on('qr', async qr => {
       console.log('Scan the following QR code with your phone:');    
    });   
    whatsappClient.initialize();
}
startWhatsAppBot();

const SendMsg = async (req, res) => {
    await whatsappClient.on('ready', async () => {              
        const targetNumber = `51961610362@c.us`;
        const message = 'Hola, soy un bot que envía dddddd';
        await whatsappClient.sendMessage(targetNumber, message);
        console.log('Message sent successfully');
    })
}
SendMsg();

```
o

```javascript
import { launchBrowser, whatsappClient } from 'whatsapp-connect';
async function startWhatsAppBot() {   
    const browserInstance = await launchBrowser();
    whatsappClient.on('qr', async qr => {
        console.log('Escanea el siguiente código QR con tu teléfono:');
    });
    whatsappClient.initialize();
}
startWhatsAppBot();

const SendMsg = async () => {
    await whatsappClient.on('ready', async () => {
        const targetNumber = `51971619505@c.us`;
        const message = 'Hola, soy un bot que envía dddddd';
        await whatsappClient.sendMessage(targetNumber, message);
        console.log('Mensaje enviado correctamente');
    });
}
SendMsg();

``` 