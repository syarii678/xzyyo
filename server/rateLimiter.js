const pLimit = require('p-limit');
const limit = pLimit(5);

function randomDelay(min = 500, max = 1500) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Sends a message with rate limiting and random delay to emulate human behavior.
 * @param {object} sock - WhatsApp socket connection.
 * @param {string} jid - WhatsApp JID of the recipient.
 * @param {object|string} message - Message to send.
 */
async function rateLimitedSend(sock, jid, message) {
  return limit(async () => {
    await sock.sendMessage(jid, message);
    await delay(randomDelay());
  });
}

module.exports = { rateLimitedSend };
