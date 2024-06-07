const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
require('dotenv');
require('dotenv').config()

const client = require('twilio')(accountSid, authToken);
const crypto = require('crypto');
const algorithm = process.env.ALGORITHM_NAME;
const secretKey = process.env.SECRET_KEY;

export async function sendSMS(toNumber: string, name: string, message: string, distribution_id: string) {
    // Encrypt the token
    let token = encrypt(toNumber);

    // Send the message
    client.messages
        .create({
            body: `Olá ${name}, Você recebeu uma solitação de resposta a uma pesquisa\n\n${message}\n\nAcesse a pesquisa através do seguinte Link:\nhttp://localhost:4200/pesquisanps/?token=${token}&id=${distribution_id}
            `,
            from: process.env.TWILIO_MY_NUMBER,
            to: toNumber
        })
    .then((message: any) => console.log(message));
};

function encrypt(text: string) {
    const cipher = crypto.createCipher(algorithm, secretKey);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}
