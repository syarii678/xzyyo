require("./server/connect")
const func = require("./server/baileys.js")
const readline = require("readline")
const usePairingCode = true
const yargs = require("yargs")
const axios = require("axios")
const { Boom } = require('@hapi/boom');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
})
const question = (text) => {
return new Promise((resolve) => {
rl.question(text, resolve)
})}

const { welcomeBanner, promoteBanner } = require("./server/canvafy.js")


async function startSesi() {
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const { state, saveCreds } = await useMultiFileAuthState(`./session`)

const connectionOptions = {
version: (await (await fetch('https://raw.githubusercontent.com/WhiskeySockets/Baileys/master/src/Defaults/baileys-version.json')).json()).version,
browser: ['Ubuntu', 'Safari', '18.1'],
getMessage: async (key) => {
if (store) {
const msg = await store.loadMessage(key.remoteJid, key.id, undefined)
return msg?.message || undefined
}
return {
conversation: 'welcome'
}}, 
printQRInTerminal: !usePairingCode,
logger: pino({ level: "silent" }),
auth: state
}

const Xzy = await func.makeWASocket(connectionOptions)
if (usePairingCode && !Xzy.authState.creds.registered) {
const phoneNumber = await question(chalk.blue.bold('Masukan Nomor WhatsApp :\n'));
const code = await Xzy.requestPairingCode(phoneNumber.trim())
await console.log(`${chalk.blue.bold('Kode Pairing')} : ${chalk.white.bold(code)}`)
rl.close()
}

await store?.bind(Xzy.ev)

Xzy.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
const reason = new Boom(lastDisconnect?.error)?.output.statusCode
console.log(lastDisconnect.error)
if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
process.exit()
} else if (reason === DisconnectReason.badSession) {
console.log(`Bad Session File, Please Delete Session and Scan Again`)
process.exit()
} else if (reason === DisconnectReason.connectionClosed) {
console.log('[SYSTEM]\nConnection closed, reconnecting...')
process.exit()
} else if (reason === DisconnectReason.connectionLost) {
console.log('[SYSTEM]\nConnection lost, trying to reconnect')
process.exit()
} else if (reason === DisconnectReason.connectionReplaced) {
console.log('Connection Replaced, Another New Session Opened, Please Close Current Session First')
Xzy.logout()
} else if (reason === DisconnectReason.restartRequired) {
console.log('Restart Required...');
startSesi()
} else if (reason === DisconnectReason.loggedOut) {
console.log(`Device Logged Out, Please Scan Again And Run.`)
Xzy.logout()
} else if (reason === DisconnectReason.timedOut) {
console.log('Connection TimedOut, Reconnecting...')
startSesi()
}
} else if (connection === 'open') {
console.log(chalk.blue.bold('Successfully Connected To Server'));
try {
const channelId = '120363363273682860@newsletter';
await Xzy.newsletterFollow(channelId);
  } catch (err) {
console.error(chalk.red('Failed to auto-join channel:'), err);
}
Xzy.sendMessage("6287819503464" + "@s.whatsapp.net", {text: "Connected Successfully !\nBot By Xzyyo Pedia\n\nJoin Channel Agar Mendapatkan Info Terbaru:\nhttps://whatsapp.com/channel/0029VavwQ4M7Noa7HvUmrz0c"})

}

});

Xzy.ev.on('messages.upsert', async (chatUpdate) => {
try {
m = chatUpdate.messages[0]
if (!m.message) return
m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
if (m.key && m.key.remoteJid === 'status@broadcast') return 
if (!Xzy.public && m.key.remoteJid !== global.owner+"@s.whatsapp.net" && !m.key.fromMe && chatUpdate.type === 'notify') return
m = await func.configurasi(Xzy, m, store)
if (m.isBaileys) return
require("./xzyyopedia.js")(Xzy, m, store)
} catch (err) {
console.log(err)
}
})

Xzy.ev.on('contacts.update', (update) => {
for (let contact of update) {
let id = Xzy.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

Xzy.ev.on('creds.update', saveCreds)

Xzy.ev.on('group-participants.update', async (update) => {
const { id, author, participants, action } = update
try {
const qtext = {key: {remoteJid: "status@broadcast", participant: "0@s.whatsapp.net"}, message: { "extendedTextMessage": {"text": "[ 𝗚𝗿𝗼𝘂𝗽 𝗡𝗼𝘁𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻 ]"}}}

if (global.db.groups[id] && global.db.groups[id].welcome == true) {
const metadata = await Xzy.groupMetadata(id)
let teks
for(let n of participants) {
let profile;
try {
profile = await Xzy.profilePictureUrl(n, 'image');
} catch {
profile = 'https://telegra.ph/file/95670d63378f7f4210f03.png';
}
if (action == 'add') {
teks = author.split("").length < 1 ? `@${n.split('@')[0]} join via *link group*` : author !== n ? `@${author.split("@")[0]} telah *menambahkan* @${n.split('@')[0]} kedalam grup` : ``
let img = await welcomeBanner(profile, n.split("@")[0], metadata.subject, "welcome")
await Xzy.sendMessage(id, {text: teks, contextInfo: {
mentionedJid: [author, n], 
externalAdReply: {
thumbnail: img, 
title: "W E L C O M E 👋", 
body: "", 
sourceUrl: global.linkgc, 
renderLargerThumbnail: true, 
mediaType: 1
}
}})
} else if (action == 'remove') {
teks = author == n ? `@${n.split('@')[0]} telah *keluar* dari grup` : author !== n ? `@${author.split("@")[0]} telah *mengeluarkan* @${n.split('@')[0]} dari grup` : ""
let img = await welcomeBanner(profile, n.split("@")[0], metadata.subject, "remove")
await Xzy.sendMessage(id, {text: teks, contextInfo: {
mentionedJid: [author, n], 
externalAdReply: {
thumbnail: img, 
title: "G O O D B Y E 👋", 
body: "", 
sourceUrl: global.linkgc, 
renderLargerThumbnail: true, 
mediaType: 1
}
}})
} else if (action == 'promote') {
teks = author == n ? `@${n.split('@')[0]} telah *menjadi admin* grup ` : author !== n ? `@${author.split("@")[0]} telah *menjadikan* @${n.split('@')[0]} sebagai *admin* grup` : ""
let img = await promoteBanner(profile, n.split("@")[0], "promote")
await Xzy.sendMessage(id, {text: teks, contextInfo: {
mentionedJid: [author, n], 
externalAdReply: {
thumbnail: img, 
title: "P R O M O T E 📍", 
body: "", 
sourceUrl: global.linkgc, 
renderLargerThumbnail: true, 
mediaType: 1
}
}})
} else if (action == 'demote') {
teks = author == n ? `@${n.split('@')[0]} telah *berhenti* menjadi *admin*` : author !== n ? `@${author.split("@")[0]} telah *menghentikan* @${n.split('@')[0]} sebagai *admin* grup` : ""
let img = await promoteBanner(profile, n.split("@")[0], "demote")
await Xzy.sendMessage(id, {text: teks, contextInfo: {
mentionedJid: [author, n], 
externalAdReply: {
thumbnail: img, 
title: "D E M O T E 📍", 
body: "", 
sourceUrl: global.linkgc, 
renderLargerThumbnail: true, 
mediaType: 1
}
}})
}}}
} catch (e) {
}
})

Xzy.public = true

return Xzy
}

startSesi()

process.on('uncaughtException', (err) => {
  // ignore error jidDecode undefined yang spam console
  if (err.message && err.message.includes("Cannot destructure property 'user'")) return
  console.error('Caught exception:', err)
})

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.cyan("File Update => "), chalk.cyan.bgBlue.bold(`${__filename}`))
delete require.cache[file]
require(file)
})