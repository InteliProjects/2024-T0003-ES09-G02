import twilio from 'twilio';

const accountSid = 'AC609c78d76bd283b3bc30aef7da67df50';
const authToken = 'b3422ce239aedc79eaca8be9c55077f6';

const client = twilio(accountSid, authToken);

client.messages
  .create({
     body: 'Olá, isso é uma mensagem enviada do WhatsApp via Twilio!',
     from: 'whatsapp:+14155238886', // Seu número do WhatsApp Sandbox do Twilio, no formato whatsapp:+XXXXXXXXXXX
     to: 'whatsapp:+5511997531704' // O número para quem você está enviando, no formato whatsapp:+XXXXXXXXXXX
   })
  .then(message => console.log(message.sid))
  .catch(error => console.error(error));
    