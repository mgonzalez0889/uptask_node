const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');
const email = require('../config/email');

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user, // generated ethereal user
      pass: emailConfig.password, // generated ethereal password
    },
});

// Generar Html
const generarHTML = (archivo, opciones = {} ) => {
    const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`, opciones);
    return juice(html)
}

exports.enviar = async (opciones) => {
    const html = generarHTML(opciones.archivo, opciones);
    const text = htmlToText.htmlToText(html) // deprecated fromString()
    // send mail with defined transport object
    let opcionesEmail = ({
        from: 'UpTask  <no-reply@uptask.com>', // sender address
        to: opciones.usuario.email,
        subject: opciones.subject, // Subject line
        text,
        html
    });

    const enviarEmail = util.promisify(transport.sendMail, transport);
    return enviarEmail.call(transport, opcionesEmail)    
}


