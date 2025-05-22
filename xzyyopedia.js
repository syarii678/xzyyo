require('./settings');
const premium = JSON.parse(fs.readFileSync("./data/premium.json"))
const antilink = JSON.parse(fs.readFileSync("./data/antilink.json"))
const welcome = JSON.parse(fs.readFileSync("./data/welcome.json"))
const bljpm = JSON.parse(fs.readFileSync("./data/bljpm.json"))
const ownplus = JSON.parse(fs.readFileSync("./data/owner.json"))
const setbot = JSON.parse(fs.readFileSync("./data/bot.json"))
const list = JSON.parse(fs.readFileSync("./data/list.json"))
const channel = JSON.parse(fs.readFileSync("./data/channel.json"))

module.exports = async (sock, m, chat) => {
try {
const body = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'interactiveResponseMessage') ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : ""

const prefix = '.'
const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
const chats = chat
const cmd = prefix + command
const args = body.trim().split(/ +/).slice(1)
const crypto = require("crypto")
const makeid = crypto.randomBytes(3).toString('hex')
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const text = q = args.join(" ")
const botNumber = await sock.decodeJid(sock.user.id)
const isOwner = m.sender.split("@")[0] == global.owner ? true : m.fromMe ? true : ownplus.includes(m.sender)
const isGrupReseller = premium.includes(m.chat)
const pushname = m.pushName || `${m.sender.split("@")[0]}`
const isBot = botNumber.includes(m.sender)
const func = require('./server/utils.js')

// >~~~~~~~ Metadata Groups ~~~~~~~~< //

try {
m.isGroup = m.chat.endsWith("g.us");
m.metadata = m.isGroup ? await sock.groupMetadata(m.chat).catch(_ => {}) : {};
const participants = m.metadata?.participants || [];
m.isAdmin = Boolean(participants.find(e => e.admin !== null && e.id === m.sender));
m.isBotAdmin = Boolean(participants.find(e => e.admin !== null && e.id === botNumber));
} catch (error) {
m.metadata = {};
m.isAdmin = false;
m.isBotAdmin = false;
}

// >~~~~~~~~~ Database ~~~~~~~~~~~< //

if (!isCmd) {
let check = list.find(e => e.cmd == m.text.toLowerCase())
if (check) {
await m.reply(check.respon)
}}

// >~~~~~~~~ Fake Quoted ~~~~~~~~~~< //

const qpay = {key: {remoteJid: '0@s.whatsapp.net', fromMe: false, id: `ownername`, participant: '0@s.whatsapp.net'}, message: {requestPaymentMessage: {currencyCodeIso4217: "USD", amount1000: 999999999, requestFrom: '0@s.whatsapp.net', noteMessage: { extendedTextMessage: { text: `${namaowner}`}}, expiryTimestamp: 999999999, amount: {value: 91929291929, offset: 1000, currencyCode: "USD"}}}}

const qtext = {key: {remoteJid: "status@broadcast", participant: "0@s.whatsapp.net"}, message: {"extendedTextMessage": {"text": `${namaowner} V4`}}}

const qjasajpm = {key: {remoteJid: "status@broadcast", participant: "0@s.whatsapp.net"}, message: {"extendedTextMessage": {"text": `Jasa Jpm By ${namaowner}`}}}

const qcmd = {key: {remoteJid: "status@broadcast", participant: "0@s.whatsapp.net"}, message: {"extendedTextMessage": {"text": `${prefix+command}`}}}

// >~~~~~~~~~~ Function ~~~~~~~~~~~< //

const example = async (teks) => {
const commander = ` *Contoh Command :*\n*${cmd}* ${teks}`
return m.reply(commander)
}

if (isCmd) {
  const sender  = m.sender.split("@")[0];
  const message = cmd;
  const time    = new Date().toLocaleTimeString("id-ID", {
    hour12: false
  });

  console.log(
    chalk.white.bgBlue.bold('\n[ MESSAGE NOTIFICATION ]')
  );

  console.log(
    chalk.blueBright('╭───────────────────────────────')
  );
  console.log(
    chalk.white('│ ') + chalk.bold('Sender  : ') + chalk.cyan(sender)
  );
  console.log(
    chalk.white('│ ') + chalk.bold('Message : ') + chalk.green(message)
  );
  console.log(
    chalk.white('│ ') + chalk.bold('Time    : ') + chalk.gray(time)
  );
  console.log(
    chalk.blueBright('╰───────────────────────────────\n')
  );
}


if (m.isGroup && antilink.some(i => i.id === m.chat)) {
    const linkRegex = /chat\.whatsapp\.com|buka tautaniniuntukbergabungkegrupwhatsapp/gi;

    if (linkRegex.test(chats) && !isOwner && !m.isAdmin && m.isBotAdmin && !m.fromMe) {
        try {
            const gclink = `https://chat.whatsapp.com/${await sock.groupInviteCode(m.chat)}`;
            const isLinkThisGc = new RegExp(gclink, 'i');

            if (isLinkThisGc.test(m.text)) return;

            const room = antilink.find(i => i.id === m.chat);
            const { participant, id } = m.key;

            await sock.sendMessage(m.chat, {
                text: `\n*乂 Link Grup Terdeteksi*\n\nMaaf, ${room.kick ? "Kamu akan saya kick" : "pesan kamu saya hapus"}, karena admin/owner bot telah mengaktifkan fitur *Antilink Grup*\n`,
                mentions: [m.sender]
            }, { quoted: m });

            await sock.sendMessage(m.chat, {
                delete: { remoteJid: m.chat, fromMe: false, id, participant }
            });

            if (room.kick) {
                await func.sleep(1000);
                await sock.groupParticipantsUpdate(m.chat, [m.sender], "remove");
            }
        } catch (error) {
            console.error("Error saat memproses antilink:", error);
        }
    }
}

// >~~~~~~~~~ Command ~~~~~~~~~~< //

switch (command) {
case "menu": case "help": {
const imageUrl = 'https://files.catbox.moe/wjwkv5.jpg';
const textnya = ` 
╔═══════════════════════════╗
║ 🤖 *INFORMATION BOT* 🤖
╠═══════════════════════════╣
║ • *Botname* : ${namabot}
║ • *Mode*    : ${sock.public ? "Public" : "Self"}
║ • *Version* : v4.0.0
╚═══════════════════════════╝

👋 *Hii* @${m.sender.split("@")[0]}
🌞 *Selamat ${func.ucapan()}*

╔══════════════════╗
║ 📂 *MAIN MENU*
╠══════════════════╣
║ • .qc
║ • .ai
║ • .gpt
║ • .brat
║ • .brat2
║ • .sticker
║ • .swm
║ • .readqr
║ • .tourl
║ • .ttstalk
║ • .igstalk
║ • .removebg
║ • .ssweb
║ • .rvo
║ • .enchard
║ • .tohd
╚══════════════════╝

╔═════════════════════╗
║ 📥 *DOWNLOAD MENU*
╠═════════════════════╣
║ • .tiktok
║ • .ytplay      
║ • .ytmp3       
║ • .ytmp4       
║ • .playspotify 
║ • .gitclone    
║ • .instagram   
║ • .xnxx        
║ • .videy       
║ • .facebook    
╚═════════════════════╝

╔══════════════════╗
║ 🔍 *SEARCH MENU*
╠══════════════════╣
║ • .yts       
║ • .xnxxs     
║ • .tiktoks   
║ • .npm       
╚══════════════════╝

╔══════════════════╗
║ 👥 *GROUP MENU*
╠══════════════════╣
║ • .antilink   
║ • .bljpm      
║ • .welcome    
║ • .buatgc     
║ • .kick       
║ • .promote    
║ • .demote     
║ • .hidetag    
║ • .close/open 
║ • .resetlink  
║ • .tagall     
║ • .idgc       
║ • .leave      
╚══════════════════╝

╔══════════════════╗
║ 📺 *CHANNEL MENU*
╠══════════════════╣
║ • .cekidch    
╚══════════════════╝

╔══════════════════╗
║ 🛒 *STORE MENU*
╠══════════════════╣
║ • .pushkontak   (GC tertutup)
║ • .pushkontak2  (GC terbuka)
║ • .pushkontak3  (Gc Tertutup + Delay)
║ • .listgc
║ • .savekontak.   (Gc Terbuka)
║ • .savekontak2.  (Gc Tertutup)
║ • .addrespon   
║ • .delrespon
║ • .listrespon
║ • .done 
║ • .jpmtesti
║ • .jpm
║ • .owner
║ • .jpmht
╚══════════════════╝

╔══════════════════╗
║ 🔧 *OWNER MENU*
╠══════════════════╣
║ • .addowner
║ • .delowner
║ • .listowner  
║ • .setppbot   
║ • .delppbot   
║ • .block      
║ • .unblock    
║ • .restart    
║ • .delsampah  
║ • .getip      
║ • .get        
║ • .cpaste     
║ • .backupsc   
╚══════════════════╝

╔═══════════════╗
║ ⚙️ *SETBOT MENU*
╠═══════════════╣
║ • .autoread      
║ • .autoreadsw    
║ • .autotyping    
║ • .autorecording 
║ • .anticall      
╚═══════════════╝
`
await sock.sendMessage(m.chat, {
  image: { url: imageUrl },        // tambahkan ini
  caption: textnya,                 // teks sebagai caption
  contextInfo: {
    isForwarded: true,
    mentionedJid: [ m.sender, `${global.owner}@s.whatsapp.net` ],
    forwardedNewsletterMessageInfo: {
      newsletterJid: global.idsaluran,
      newsletterName: global.namasaluran,
      serverId: 200
    }
  }
}, { quoted: qpay })
}
 break

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

case "buatgc": {
if (!isOwner) return m.reply(msg.owner)
if (!q) return example("nama grup")
let res = await sock.groupCreate(q, [])
const urlGrup = "https://chat.whatsapp.com/" + await sock.groupInviteCode(res.id)
let teks = `
*Grup WhatsApp Berhasil Dibuat ✅*
${urlGrup}
`
return m.reply(teks)
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "welcome": case "welcom": {
if (!isOwner) return m.reply(msg.owner)
if (!m.isGroup) return m.reply(msg.group)
if (!text || !/on|off/.test(text)) return example("on/off")
const input = text.toLowerCase()
if (/on/.test(input)) {
if (welcome.includes(m.chat)) return m.reply(`Welcome di grup ini sudah aktif!`)
welcome.push(m.chat)
await fs.writeFileSync("./data/welcome.json", JSON.stringify(welcome, null, 2))
return m.reply(`Berhasil menghidupkan Welcome di grup ini ✅`)
} 
if (/off/.test(input)) {
if (!welcome.includes(m.chat)) return m.reply(`Welcome di grup ini sudah tidak aktif!`)
let posi = welcome.indexOf(m.chat)
await welcome.splice(posi, 1)
await fs.writeFileSync("./data/welcome.json", JSON.stringify(welcome, null, 2))
return m.reply(`Berhasil mematikan welcome di grup ini ✅`)
}
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "ping": case "uptime": {
  const os = require('os');
  const nou = require('node-os-utils');
  const speed = require('performance-now');

  async function getServerInfo(func, m) {
    const timestamp = speed();
    const tio = await nou.os.oos();
    const tot = await nou.drive.info();
    const memInfo = await nou.mem.info(); // <- Added 'await' here
    const totalGB = (memInfo.totalMemMb / 1024).toFixed(2);
    const usedGB = (memInfo.usedMemMb / 1024).toFixed(2);
    const freeGB = (memInfo.freeMemMb / 1024).toFixed(2);
    const cpuCores = os.cpus().length;
    const vpsUptime = func.runtime(os.uptime());
    const botUptime = func.runtime(process.uptime());
    const latency = (speed() - timestamp).toFixed(4);

    const respon = `
*─── SERVER INFORMATION ───*

📂 *OS Platform*: ${nou.os.type()}  
💾 *Total RAM*: ${totalGB} GB  
⚡ *Used RAM*: ${usedGB} GB  
💡 *Free RAM*: ${freeGB} GB  
💻 *Total Disk Space*: ${tot.totalGb} GB  
🧠 *CPU Cores*: ${cpuCores} Core(s)  
⏳ *VPS Uptime*: ${vpsUptime}  

*─── BOT INFORMATION ───*

⚡ *Response Speed*: ${latency} seconds  
🤖 *Bot Uptime*: ${botUptime}  
🖥️ *Running on*: ${os.arch()} architecture  
🔌 *CPU Model*: ${os.cpus()[0].model}  
💼 *Host*: ${os.hostname()}  
`;

    return m.reply(respon);
  }

  return getServerInfo(func, m);
}
break;

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "autoread": case "autoreadsw": case "anticall": case "autotyping": case "autorecording": {
if (!isOwner) return m.reply(msg.owner)
const getStatus = () => {
let teks = ""
for (let i of Object.keys(setbot)) {
teks += `* *${func.capital(i)} :* ${setbot[i] ? "aktif ✅" : "tidak aktif ❌"}
`
}
return teks
}
if (!text || !/on|off/.test(text)) return m.reply(`\nContoh : *${cmd}* on/off\n\n${getStatus()}`)
const input = text.toLowerCase()
if (/on/.test(input)) {
if (setbot[command.toLowerCase()] == true) return m.reply(`*${func.capital(command)}* sudah aktif!`)
if (command == "autotyping" && setbot.autorecording == true) setbot.autorecording = false
if (command == "autorecording" && setbot.autotyping == true) setbot.autotyping = false
setbot[command.toLowerCase()] = true
await fs.writeFileSync("./data/bot.json", JSON.stringify(setbot, null, 2))
return m.reply(`
Berhasil menyalakan *${func.capital(command)}* ✅

${getStatus()}`)
} 
if (/off/.test(input)) {
if (setbot[command.toLowerCase()] == false) return m.reply(`${func.capital(command)} sudah tidak aktif!`)
setbot[command.toLowerCase()] = false
await fs.writeFileSync("./data/bot.json", JSON.stringify(setbot, null, 2))
return m.reply(`
Berhasil mematikan *${func.capital(command)}* ✅

${getStatus()}`)
}
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "bljpm": case "blgcjpm": {
if (!isOwner) return m.reply(msg.owner)
if (!m.isGroup) return m.reply(msg.group)
if (!text || !/on|off/.test(text)) return example("on/off")
const input = text.toLowerCase()
if (/on/.test(input)) {
if (bljpm.includes(m.chat)) return m.reply(`Blacklist jpm di grup ini sudah aktif!`)
bljpm.push(m.chat)
await fs.writeFileSync("./data/bljpm.json", JSON.stringify(bljpm, null, 2))
return m.reply(`Berhasil menghidupkan blacklist jpm di grup ini ✅`)
} 
if (/off/.test(input)) {
if (!bljpm.includes(m.chat)) return m.reply(`Blacklist jpm di grup ini sudah tidak aktif!`)
let posi = bljpm.indexOf(m.chat)
await bljpm.splice(posi, 1)
await fs.writeFileSync("./data/bljpm.json", JSON.stringify(bljpm, null, 2))
return m.reply(`Berhasil mematikan blacklist jpm di grup ini ✅`)
}
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "idgc": {
if (!m.isGroup) return m.reply(msg.group)
return m.reply(m.chat)
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "tagall": {
if (!m.isGroup) return m.reply(msg.group)
if (!isOwner && !m.isAdmin) return m.reply(msg.admin)
if (!text) return m.reply(example("pesannya"))
let teks = text+"\n\n"
let member = await m.metadata.participants.map(v => v.id).filter(e => e !== botNumber && e !== m.sender)
await member.forEach((e) => {
teks += `@${e.split("@")[0]}\n`
})
await sock.sendMessage(m.chat, {text: teks, mentions: [...member]}, {quoted: m})
}
break

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

case "leave": {
if (!isOwner) return m.reply(msg.owner)
if (!m.isGroup) return m.reply(msg.group)
await func.sleep(4000)
await sock.groupLeave(m.chat)
}
break

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

case "resetlinkgc": case "resetlink": {
if (!isOwner) return m.reply(msg.owner)
if (!m.isGroup) return m.reply(msg.group)
if (!m.isBotAdmin) return m.reply(msg.botadmin)
await sock.groupRevokeInvite(m.chat)
m.reply("Sukses mereset ling grup ini ✅")
}
break

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

case "readqr": {
if (!/image/.test(mime)) return example("dengan reply qris")
const Jimp = require("jimp");
const QrCode = require("qrcode-reader");
async function readQRISFromBuffer(buffer) {
    return new Promise(async (resolve, reject) => {
        try {
            const image = await Jimp.read(buffer);
            const qr = new QrCode();
            qr.callback = (err, value) => {
                if (err) return reject(err);
                resolve(value ? value.result : null);
            };
            qr.decode(image.bitmap);
        } catch (error) {
            return m.reply("error : " + error)
        }
    });
}

let aa = m.quoted ? await m.quoted.download() : await m.download()
let dd = await readQRISFromBuffer(aa)
await sock.sendMessage(m.chat, {text: `${dd}`}, {quoted: m})
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "enchard": case "encrypthard": {
if (!/javascript/g.test(mime)) return example("dengan kirim file .js")
let media = m.quoted ? await m.quoted.download() : await m.download()
let filename = m.quoted ? m.quoted.fakeObj.message.documentMessage.fileName : m.fakeObj.message.documentMessage.fileName
await m.reply("Memproses encrypt hard code . . .")
await JsConfuser.obfuscate(media.toString(), {
  target: "node",
    preset: "high",
    compact: true,
    minify: true,
    flatten: true,

    identifierGenerator: function() {
        const originalString = `素晴座素晴Xzyyopedia`

        function hapusKarakterTidakDiinginkan(input) {
            return input.replace(
                /[^a-zA-Z/*ᨒZenn/*^/*($break)*/]/g, ''
            );
        }

        function stringAcak(panjang) {
            let hasil = '';
            const karakter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            const panjangKarakter = karakter.length;

            for (let i = 0; i < panjang; i++) {
                hasil += karakter.charAt(
                    Math.floor(Math.random() * panjangKarakter)
                );
            }
            return hasil;
        }

        return hapusKarakterTidakDiinginkan(originalString) + stringAcak(2);
    },

    renameVariables: true,
    renameGlobals: true,

    // Kurangi encoding dan pemisahan string untuk mengoptimalkan ukuran
    stringEncoding: 0.01, 
    stringSplitting: 0.1, 
    stringConcealing: true,
    stringCompression: true,
    duplicateLiteralsRemoval: true,

    shuffle: {
        hash: false,
        true: false
    },
    controlFlowFlattening: false, 
    opaquePredicates: false, 
    deadCode: false, 
    dispatcher: false,
    rgf: false,
    calculator: false,
    hexadecimalNumbers: false,
    movedDeclarations: true,
    objectExtraction: true,
    globalConcealing: true
}).then(async (obfuscated) => {
  await fs.writeFileSync(`./@hardenc${filename}`, obfuscated.code)
  await sock.sendMessage(m.chat, {document: await fs.readFileSync(`./@hardenc${filename}`), mimetype: "application/javascript", fileName: filename, caption: "Encrypt File JS *Sukses*!\nType:*String*"}, {quoted: m})
}).catch(e => m.reply("Error :" + e))
await fs.unlinkSync(`./@hardenc${filename}`)
}
break

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

case "pushkontak2": {
if (!isOwner) return m.reply(msg.owner)
if (!m.isGroup) return m.reply(msg.group)
if (!text) return example("pesannya")
const teks = text
const jidawal = m.chat
const data = await sock.groupMetadata(m.chat)
const halls = await data.participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
await m.reply(`Memproses pushkontak ke *${halls.length}* member grup`)
for (let mem of halls) {
if (mem !== botNumber && mem.split("@")[0] !== global.owner) {
await sock.sendMessage(mem, {text: teks}, {quoted: qtext})
await func.sleep(8000)
}}

await sock.sendMessage(jidawal, {text: `*Pushkontak Berhasil ✅*\nTotal member : ${halls.length}`}, {quoted: m})
}
break

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

case "pushkontak": {
  // Hanya owner yang boleh
  if (!isOwner) return m.reply(msg.owner)

  // Pastikan ada parameter
  if (!text) return m.reply("Format: .pushkontak idGrup,pesan\nContoh: .pushkontak 123456789-0987654321,Hello semua!")

  // Split hanya di koma pertama agar pesan tetap mendukung koma
  const parts = text.match(/^([^,]+),([\s\S]+)$/)
  if (!parts) return m.reply("Format salah!\nGunakan: .pushkontak idGrup,pesan")

  let [, rawId, pesan] = parts
  rawId = rawId.trim()
  pesan = pesan.trim()
  // Tambahkan domain jika belum ada
  const groupId = rawId.includes("@g.us") ? rawId : `${rawId}@g.us`

  try {
    // Ambil metadata grup
    const data = await sock.groupMetadata(groupId)
    const subject = data.subject || "–"
    // Ambil semua participant JID
    const members = data.participants.map(v => v.id)

    // Konfirmasi mulai
    await m.reply(`Memproses *pushkontak* ke grup *${subject}* (${members.length} member)…`)

    // Kirim pesan ke tiap member
    for (let jid of members) {
      // Lewatkan bot sendiri dan owner
      if (jid === botNumber || jid === global.owner) continue
      await sock.sendMessage(jid, { text: pesan }, {quoted: qtext})
      // Jeda 2 detik antar pesan (untuk menghindari blokir)
      await func.sleep(8000)
    }

    // Selesai
    await m.reply(`*Pushkontak Berhasil ✅*\nTotal member: ${members.length}`)
  } catch (err) {
    console.error(err)
    m.reply(`Gagal memproses pushkontak:\n${err.message}`)
  }
}
break


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

case "pushkontak3": {
  // Hanya owner yang boleh gunakan
  if (!isOwner) return m.reply(msg.owner)
  
  // Cek ada teks parameter
  if (!text) {
    return m.reply("Format: .pushkontak3 idGrup,delay(ms),pesan\nContoh: .pushkontak3 12345-67890,5000,Halo semuanya!")
  }

  // Split di dua koma pertama: idGrup, delay, pesan (pesan bisa mengandung koma)
  const parts = text.match(/^([^,]+),(\d+),([\s\S]+)$/)
  if (!parts) {
    return m.reply("Format salah!\nGunakan: .pushkontak3 idGrup,delay(ms),pesan")
  }

  let [, rawId, delayStr, pesan] = parts
  rawId = rawId.trim()
  pesan = pesan.trim()

  // Parse delay
  const delay = parseInt(delayStr, 10)
  if (isNaN(delay) || delay < 0) {
    return m.reply("Delay harus berupa angka milidetik (contoh: 5000 untuk 5 detik).")
  }

  // Pastikan domain grup @g.us
  const groupId = rawId.includes("@g.us") ? rawId : `${rawId}@g.us`

  try {
    // Ambil metadata grup
    const data = await sock.groupMetadata(groupId)
    const subject = data.subject || "–"
    const members = data.participants.map(v => v.id)

    // Konfirmasi proses mulai
    await m.reply(`Memproses pushkontak3 ke grup *${subject}* (${members.length} member) dengan delay ${delay} ms…`)

    // Kirim ke tiap member
    for (let jid of members) {
      // Lewatkan bot sendiri dan owner
      if (jid === botNumber || jid === global.owner) continue

      await sock.sendMessage(jid, { text: pesan }, {quoted: qtext})
      // Jeda sesuai input user
      await func.sleep(delay)
    }

    // Selesai
    await m.reply(`*Pushkontak3 Berhasil ✅*\nTotal member: ${members.length}`)
  } catch (err) {
    console.error(err)
    m.reply(`Gagal memproses pushkontak3:\n${err.message}`)
  }
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //        
case "savekontak": {
  if (!isOwner) return m.reply(msg.owner)
  if (!m.isGroup) return m.reply(msg.group)
  if (!text) {
    return m.reply("Contoh: .savekontak Nama kontak")
  }
  const reqNama = text.trim()
  try {
    const data = await sock.groupMetadata(m.chat)
    const subject = data.subject || "–"
    const halls = data.participants
      .filter(v => v.id.endsWith('.net'))
      .map(v => v.id)
      .filter(id => id !== botNumber && id.split("@")[0] !== global.owner)
    if (halls.length === 0) {
      return m.reply(`Grup *${subject}* tidak memiliki kontak yang bisa disimpan.`)
    }
    if (!fs.existsSync("./data")) fs.mkdirSync("./data")
    fs.writeFileSync(
      "./data/contacts.json",
      JSON.stringify(halls, null, 2),
      "utf8"
    )
    const vcardContent = halls.map(contact => {
      const phone = contact.split("@")[0]
      return [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${reqNama} - ${phone}`,
        `TEL;type=CELL;type=VOICE;waid=${phone}:+${phone}`,
        "END:VCARD",
        ""
      ].join("\n")
    }).join("")
    fs.writeFileSync("./data/contacts.vcf", vcardContent, "utf8")
    await m.reply(
      `*Berhasil membuat file kontak ✅*\n` +
      `Grup: *${subject}*\n` +
      `Total kontak: *${halls.length}*\n` +
      `File kontak telah dikirim ke chat pribadi Anda.`
    )
    await sock.sendMessage(
      m.sender,
      {
        document: fs.readFileSync("./data/contacts.vcf"),
        fileName: "contacts.vcf",
        mimetype: "text/vcard",
        caption:
          `File kontak untuk grup *${subject}*:\n` +
          `• Nama kontak: ${reqNama}\n` +
          `• Total kontak: ${halls.length}`
      },
      { quoted: m }
    )
    fs.unlinkSync("./data/contacts.json")
    fs.unlinkSync("./data/contacts.vcf")
  } catch (err) {
    console.error(err)
    m.reply(`❌ Gagal menyimpan kontak:\n${err.message}`)
  }
}
break


// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //        
case "savekontak2": {
  if (!isOwner) return m.reply(msg.owner)
  if (!text) {
    return m.reply("Contoh: .savekontak idgrub,nama kontak")
  }
  const parts = text.match(/^([^,]+),([\s\S]+)$/)
  if (!parts) {
    return m.reply("Format salah!\nGunakan: .savekontak idgrub,nama kontak")
  }
  let [, rawId, reqNama] = parts
  rawId   = rawId.trim()
  reqNama = reqNama.trim()
  const groupId = rawId.includes("@g.us") ? rawId : `${rawId}@g.us`
  try {
    const data = await sock.groupMetadata(groupId)
    const subject = data.subject || "–"
    const halls = data.participants
      .filter(v => v.id.endsWith('.net'))
      .map(v => v.id)
      .filter(id => id !== botNumber && id.split("@")[0] !== global.owner)

    if (halls.length === 0) {
      return m.reply(`Grup *${subject}* tidak memiliki kontak yang bisa disimpan.`)
    }
    if (!fs.existsSync("./data")) fs.mkdirSync("./data")
    fs.writeFileSync(
      "./data/contacts.json",
      JSON.stringify(halls, null, 2),
      "utf8"
    )
    const vcardContent = halls.map(contact => {
      const phone = contact.split("@")[0]
      return [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${reqNama} - ${phone}`,
        `TEL;type=CELL;type=VOICE;waid=${phone}:+${phone}`,
        "END:VCARD",
        ""
      ].join("\n")
    }).join("")
    fs.writeFileSync("./data/contacts.vcf", vcardContent, "utf8")
    
    if (m.chat !== m.sender) {
      await m.reply(
        `*Berhasil membuat file kontak ✅*\n` +
        `Grup: *${subject}*\n` +
        `Total kontak: *${halls.length}*\n` +
        `File kontak telah dikirim ke chat pribadi Anda.`
      )
    }

    await sock.sendMessage(
      m.sender,
      {
        document: fs.readFileSync("./data/contacts.vcf"),
        fileName: "contacts.vcf",
        mimetype: "text/vcard",
        caption:
          `File kontak untuk grup *${subject}*:\n` +
          `• Nama Kontak: ${reqNama}\n` +
          `• Total kontak: ${halls.length}`
      },
      { quoted: m }
    )
    
    fs.unlinkSync("./data/contacts.json")
    fs.unlinkSync("./data/contacts.vcf")
  } catch (err) {
    console.error(err)
    m.reply(`❌ Gagal menyimpan kontak:\n${err.message}`)
  }
}
break
                
// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "addown": case "addowner": {
if (!isOwner) return m.reply(msg.owner)
if (!text && !m.quoted) return example("6287XX atau @tag")
let input = m.quoted ? m.quoted.sender : m.mentionedJid ? m.mentionedJid[0] : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
if (!input) return example("6287XX atau @tag")
if (ownplus.includes(input)) return m.reply(`Nomor ${input.split("@")[0]} sudah terdaftar sebagai owner!`)
if (input == botNumber) return m.reply(`Nomor ${input.split("@")[0]} sudah terdaftar sebagai owner!`)
if (input.split("@")[0] == global.owner) return m.reply(`Nomor ${input.split("@")[0]} sudah terdaftar sebagai owner!`)
await ownplus.push(input)
await fs.writeFileSync("./data/owner.json", JSON.stringify(ownplus, null, 2))
return m.reply(`Sukses menjadikan ${input.split("@")[0]} sebagai *owner*`)
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "delown": case "delowner": {
if (!isOwner) return m.reply(msg.owner)
if (!text && !m.quoted) return example("6287XX atau @tag")
if (text == "all") {
ownplus.length = 0
await fs.writeFileSync("./data/owner.json", JSON.stringify(ownplus, null, 2))
return m.reply("Berhasil menghapus semua owner ✅")
}
let input = m.quoted ? m.quoted.sender : m.mentionedJid ? m.mentionedJid[0] : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
if (!input) return example("6287XX atau @tag")
if (!ownplus.includes(input)) return m.reply(`Nomor ${input.split("@")[0]} tidak terdaftar sebagai owner!`)
if (input == botNumber) return m.reply(`Nomor ${input.split("@")[0]} tidak terdaftar sebagai owner!`)
if (input.split("@")[0] == global.owner) return m.reply(`Nomor ${input.split("@")[0]} tidak terdaftar sebagai owner!`)
const posi = ownplus.indexOf(input)
await ownplus.splice(posi, 1)
await fs.writeFileSync("./data/owner.json", JSON.stringify(ownplus, null, 2))
return m.reply(`Sukses menghapus ${input.split("@")[0]} sebagai *owner*`)
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "delppbot": case "delpp": {
if (!isOwner) return m.reply(msg.owner)
await sock.removeProfilePicture(botNumber)
m.reply("Berhasil menghapus profile bot ✅")
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "unblok": case "unblock": {
if (!isOwner) return
if (m.isGroup && !m.quoted && !text) return example("@tag/nomornya")
const mem = !m.isGroup ? m.chat : m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net" : ""
await sock.updateBlockStatus(mem, "unblock");
if (m.isGroup) sock.sendMessage(m.chat, {text: `Berhasil membuka blokiran @${mem.split('@')[0]}`, mentions: [mem]}, {quoted: m})
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "block": case "blok": {
if (!isOwner) return
if (m.isGroup && !m.quoted && !text) return example("@tag/nomornya")
const mem = !m.isGroup ? m.chat : m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net" : ""
await sock.updateBlockStatus(mem, "block")
if (m.isGroup) sock.sendMessage(m.chat, {text: `Berhasil memblokir @${mem.split('@')[0]}`, mentions: [mem]}, {quoted: m})
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "boost": case "delsampah": {
if (!isOwner) return m.reply(msg.owner)
let sampah = await fs.readdirSync('./server/tmp').filter(e => e !== "Xzyyopedia.txt")
if (sampah.length < 1) return m.reply("Tidak ada sampah")
const total = sampah.length
sampah.forEach((i) => {
fs.unlinkSync('./server/tmp/' + i)
})
m.reply(`Berhasil membersihkan ${total} sampah tmp`)
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "setppbot": case "setpp": {
if (!isOwner) return m.reply(msg.owner)
if (!/image/.test(mime)) return example("dengan mengirim foto")
const { S_WHATSAPP_NET } = require("baileys");

const buffer = await sock.downloadAndSaveMediaMessage(qmsg)
var { img } = await func.generateProfilePicture(buffer)
await sock.query({
tag: 'iq',
attrs: {
to: S_WHATSAPP_NET,
type: 'set',
xmlns: 'w:profile:picture'
},
content: [
{
tag: 'picture',
attrs: { type: 'image' },
content: img
}
]
})
m.reply("Berhasil mengganti profile bot ✅")
fs.unlinkSync(buffer)
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "cekidch": case "idch": {
if (!text) return example("linkchnya")
if (!text.includes("https://whatsapp.com/channel/")) return m.reply("Link tautan tidak valid")
let result = text.split('https://whatsapp.com/channel/')[1]
let res = await sock.newsletterMetadata("invite", result)
let teks = `${res.id}

* ${res.name}
* ${res.subscribers} Pengikut`
return m.reply(teks)
}
break

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

case "sendtesti": case "testi": case "uptesti": case "jpmtesti": {
if (!isOwner) return m.reply(msg.owner)
if (!text) return example("teks dengan mengirim foto")
if (!/image/.test(mime)) return example("teks dengan mengirim foto")
const allgrup = await sock.groupFetchAllParticipating()
const res = await Object.keys(allgrup)
let count = 0
const teks = text
const jid = m.chat
const rest = await sock.downloadAndSaveMediaMessage(qmsg)
await m.reply(`Memproses jpm testimoni ke dalam saluran & ${res.length} grup chat`)
try {
await sock.sendMessage(global.idsaluran, {image: await fs.readFileSync(rest), caption: teks})
} catch {}
for (let i of res) {
if (bljpm.includes(i)) continue
try {
await sock.sendMessage(i, {image: await fs.readFileSync(rest), caption: teks, contextInfo: {
isForwarded: true, mentionedJid: [m.sender], 
forwardedNewsletterMessageInfo: {
newsletterJid: global.idsaluran, newsletterName: global.namasaluran
}}}, {quoted: m})
count += 1
} catch {}
await func.sleep(4000)
}
await fs.unlinkSync(rest)
await sock.sendMessage(jid, {text: `Testimoni berhasil dikirim ke dalam channel & ${count} grup`}, {quoted: m})
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "jpm": {
if (!isOwner) return m.reply(msg.owner)
if (!text) return example("teksnya & foto (opsional)")
let rest
if (/image/.test(mime)) {
rest = await sock.downloadAndSaveMediaMessage(qmsg)
}
const allgrup = await sock.groupFetchAllParticipating()
const res = await Object.keys(allgrup)
let count = 0
const ttks = text
const pesancoy = rest !== undefined ? { image: await fs.readFileSync(rest), caption: ttks } : { text: ttks }
const jid = m.chat
await m.reply(`Memproses ${rest !== undefined ? "jpm teks & foto" : "jpm teks"} ke ${res.length} grup chat`)

for (let i of res) {
if (bljpm.includes(i)) continue
try {
await sock.sendMessage(i, pesancoy, {quoted: qtext})
count += 1
} catch {}
await func.sleep(8000)
}
if (rest !== undefined) await fs.unlinkSync(rest)
await sock.sendMessage(jid, {text: `Jpm ${rest !== undefined ? "teks & foto" : "teks"} berhasil dikirim ke ${count} grup`}, {quoted: m})
}
break

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

case "jpmht": {
if (!isOwner) return m.reply(msg.owner)
if (!text) return example("teksnya & foto (opsional)")
let rest
if (/image/.test(mime)) {
rest = await sock.downloadAndSaveMediaMessage(qmsg)
}
const allgrup = await sock.groupFetchAllParticipating()
const res = await Object.keys(allgrup)
let count = 0
const ttks = text
const opsijpm = rest !== undefined ? "teks & foto ht" : "teks ht"
const jid = m.chat
await m.reply(`Memproses jpm *${opsijpm}* ke ${res.length} grup chat`)
for (let i of res) {
if (global.db.groups[i] && global.db.groups[i].blacklistjpm && global.db.groups[i].blacklistjpm == true) continue
try {
let ments = allgrup[i].participants.map(e => e.id)
let pesancoy = rest !== undefined ? { image: await fs.readFileSync(rest), caption: ttks, mentions: ments } : { text: ttks, mentions: ments }
await sock.sendMessage(i, pesancoy, {quoted: qtext})
count += 1
} catch {}
await sleep(global.delayJpm)
}
if (rest !== undefined) await fs.unlinkSync(rest)
await sock.sendMessage(jid, {text: `Jpm *${opsijpm}* berhasil dikirim ke ${count} grup chat`}, {quoted: m})
}
break

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

case "listgc": case "listgrup": {
if (!isOwner) return
let teks = `\n`
let a = await sock.groupFetchAllParticipating()
let gc = Object.values(a)
teks += `\n* *Total group :* ${gc.length}\n`
for (const u of gc) {
teks += `\n* *ID :* ${u.id}
* *Nama :* ${u.subject}
* *Member :* ${u.participants.length}
* *Status :* ${u.announce == false ? "Terbuka": "Hanya Admin"}
* *Pembuat :* ${u?.subjectOwner ? u?.subjectOwner.split("@")[0] : "Sudah Keluar"}\n`
}
return m.reply(teks)
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "done": case "proses": {
if (!isOwner) return m.reply(msg.owner)
if (!text) return example("jasa install panel")
let teks = `*Transaksi Telah Selesai Next Order✅*
* ${text}
* ${func.tanggal(Date.now())}

*Testimoni :*
* https://whatsapp.com/channel/0029VavwQ4M7Noa7HvUmrz0c
`
await sock.sendMessage(m.chat, {text: teks, mentions: [m.sender], contextInfo: {
   isForwarded: true, 
   mentionedJid: [m.sender, "0@s.whatsapp.net", global.owner+"@s.whatsapp.net"], 
   forwardedNewsletterMessageInfo: {
   newsletterJid: global.idsaluran,
   newsletterName: global.namasaluran
   }
  },}, {quoted: null})
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "listown": case "listowner": {
if (ownplus.length < 1) return m.reply("Tidak ada owner tambahan!")
var teks = ""
teks += `\n @${global.owner}\n`
for (let i of ownplus) {
teks += `\n * @${i.split("@")[0]}\n`
}
await sock.sendMessage(m.chat, {text: teks, mentions: ownplus}, {quoted: m})
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case 'plays': case 'playspotify': {
  if (!text) return m.reply('Masukkan judul lagu!\nContoh: plays Jakarta Hari Ini');
  const res = await fetch(`https://api.nekorinn.my.id/downloader/spotifyplay?q=${encodeURIComponent(text)}`);
  if (!res.ok) return m.reply('Gagal mengambil data lagu.');
  const data = await res.json();
  if (!data.status) return m.reply('Lagu tidak ditemukan!');
  const { title, artist, duration, imageUrl, link } = data.result.metadata;
  const downloadUrl = data.result.downloadUrl;
  await sock.sendMessage(m.chat, {
    audio: { url: downloadUrl },
    mimetype: 'audio/mpeg',
    fileName: `${title}.mp3`,
    ptt: true, // true kalau mau dikirim sebagai VN
    contextInfo: {
      externalAdReply: {
        title: title,
        body: `${artist} • ${duration}`,
        mediaType: 2, 
        thumbnailUrl: imageUrl,
        renderLargerThumbnail: true,
        sourceUrl: link, 
        showAdAttribution: true
      }
    }
  }, { quoted: m });
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case 'plays':
case 'play': 
case "ytplay": {
    if (!text) return example("one of the girls");

    m.reply("🔎 Sedang mencari lagu, mohon tunggu...");

    try {
        let ytsSearch = await yts(text);
        if (!ytsSearch?.all?.length) {
            return m.reply("Lagu tidak ditemukan, coba kata kunci lain.");
        }

        const res = ytsSearch.all[0];
        const anu = await func.fetchJson(`https://api-simplebot.vercel.app/download/ytmp3?apikey=free&url=`+res.url);

        if (anu?.result) {
            let urlMp3 = anu.result.media

            await sock.sendMessage(m.chat, {
                audio: { url: urlMp3 },
                mimetype: "audio/mpeg",
                contextInfo: {
                    externalAdReply: {
                        thumbnailUrl: res.thumbnail,
                        title: res.title,
                        body: `Author: ${res.author.name} | Duration: ${res.timestamp}`,
                        sourceUrl: res.url,
                        renderLargerThumbnail: true,
                        mediaType: 1
                    }
                }
            }, { quoted: m });
        } else {
            m.reply("Gagal mendapatkan audio dari video tersebut.");
        }
    } catch (err) {
        console.error("Error play:", err);
        m.reply("Terjadi kesalahan saat memproses permintaan.");
    }
}
break;

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "yts": {
if (!q) return example("lagu tiktok viral")
let data = await yts(q)
if (data.all.length < 1) return m.reply("Result tidak ditemukan!")
let anuan = data.all
let teks = ""
for (let res of anuan) {
teks += `\n* *Title :* ${res.title}
* *Durasi :* ${res.timestamp}
* *Upload :* ${res.ago}
* *Views :* ${await func.toRupiah(res.views) || "Unknown"}
* *Author :* ${res?.author?.name || "Unknown"}
* *Source :* ${res.url}\n`
}
await m.reply(teks)
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "xnxxs": case "xnxxsearch": {
if (!q) return example("step sister")
let data = await func.fetchJson(`https://restapi.simplebot.my.id/search/xnxx?apikey=${global.apii}&q=${q}`)
if (data.result.length < 1) return m.reply("Result tidak ditemukan!")
let anuan = data.result
let teks = ""
for (let res of anuan) {
teks += `\n* *Title :* ${res.title}
* *Info :* ${res.info.trim()}
* *Link :* ${res.link}\n`
}
await m.reply(teks)
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "npm": case "npmsearch": {
if (!q) return example("axios")
let data = await func.fetchJson(`https://restapi.simplebot.my.id/search/npm?apikey=${global.apii}&q=${q}`)
if (data.result.length < 1) return m.reply("Result tidak ditemukan!")
let anuan = data.result
let teks = ""
for (let res of anuan) {
teks += `\n* *${res.title}*
* *Update :* ${res.update.split("T").join(" ").split("Z")[0]}
* *Link :* ${res.links.npm}
* *Github :* ${res.links.repository}\n`
}
await m.reply(teks)
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "tiktoksearch": case "tiktoks": {
if (!q) return example("axios")
let data = await func.fetchJson(`https://restapi.simplebot.my.id/search/tiktok?apikey=${global.apii}&q=${q}`)
if (data.result.length < 1) return m.reply("Result tidak ditemukan!")
let anuan = data.result
let teks = ""
for (let res of anuan) {
teks += `
* *Title :* ${res.title}
* *Views :* ${await func.toRupiah(res.play_count)}
* *Author :* ${res.author.nickname}
* *Upload :* ${func.tanggal(res.create_time)}
* *Vidio :* ${res.play}
* *Audio :* ${res.music_info.play}
`
}
await m.reply(teks)
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "xnxx": case "xnxxdl": {
if (!q) return example("linknya")
let data = await func.fetchJson(`https://restapi.simplebot.my.id/download/xnxx?apikey=${global.apii}&url=${q}`)
if (!data.result) return m.reply("Result tidak ditemukan!")
await sock.sendMessage(m.chat, {video: {url: data.result.files.high || data.result.files.low}, caption: "XNXX Download Done ✅", mimetype: "video/mp4"}, {quoted: m})
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "ytmp4": {
    if (!text) return example("linknya");

    m.reply("📥 Sedang memproses YouTube MP4...");

    try {
        const anu = await func.fetchJson(`https://api-simplebot.vercel.app/download/ytmp4?apikey=free&url=`+text);

        if (!anu?.result) {
            return m.reply("Gagal mendapatkan video dari YouTube.");
        }

        await sock.sendMessage(m.chat, {
            video: { url: anu.result.media },
            mimetype: "video/mp4"
        }, { quoted: m });

    } catch (err) {
        console.error("YTMP4 Error:", err);
        m.reply("Terjadi kesalahan saat mengunduh video YouTube.");
    }
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //


case 'ytmp3': case 'ytaudio':
 if (!text) return m.reply('Masukkan judul lagu yang ingin dicari!');
 try {
 const axios = require('axios');
 const fs = require('fs');
 const path = require('path');
 await sock.sendMessage(m.chat, { react: { text: "⏱️", key: m.key } });
 let apiUrl = `https://api.alvianuxio.eu.org/api/play?query=${encodeURIComponent(text)}&apikey=kayzuMD&format=mp3`;
 let { data } = await axios.get(apiUrl, { timeout: 15000 });
 if (!data || !data.data || !data.data.response) {
 return m.reply('Gagal menemukan lagu.');
 }
 let song = data.data.response;
 let caption = `🎵 *Judul:* ${song.title}\n`
 + `⏳ *Durasi:* ${song.duration}\n`
 + `📅 *Upload:* ${song.uploadDate}\n`
 + `👀 *Views:* ${song.views?.toLocaleString() || 'N/A'}\n`
 + `🎤 *Channel:* ${song.channel?.name || 'Unknown'}\n`
 + `🔗 *Video:* ${song.videoUrl}\n`
 + `🎧 *Download:* ${song.download}`;
 const videoId = song.videoUrl.includes('v=') ? song.videoUrl.split('v=')[1].split('&')[0] : null;
 const thumbnailUrl = videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null;
 await sock.sendMessage(m.chat, {
 text: caption,
 contextInfo: {
 externalAdReply: {
 showAdAttribution: true,
 title: song.title,
 body: `Music Player`,
 mediaType: 1,
 thumbnailUrl: thumbnailUrl,
 sourceUrl: song.videoUrl
 }
 }
 }, { quoted: m });
 const sanitizedTitle = song.title.replace(/[^\w\s-]/gi, '_').substring(0, 50);
 let audioPath = path.join(__dirname, `temp_${Date.now()}_${sanitizedTitle}.mp3`);
 try {
 const response = await axios({
 method: 'get',
 url: song.download,
 responseType: 'arraybuffer',
 timeout: 60000,
 headers: {
 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
 }
 });
 if (!response.data || response.data.length === 0) {
 throw new Error('Empty response data');
 }
 fs.writeFileSync(audioPath, Buffer.from(response.data));
 try {
 await sock.sendMessage(m.chat, {
 audio: fs.readFileSync(audioPath),
 mimetype: 'audio/mpeg',
 fileName: `${sanitizedTitle}.mp3`,
 }, { quoted: m });
 } catch (audioSendError) {
 await sock.sendMessage(m.chat, {
 document: fs.readFileSync(audioPath),
 mimetype: 'audio/mpeg',
 fileName: `${sanitizedTitle}.mp3`,
 }, { quoted: m });
 }
 if (fs.existsSync(audioPath)) {
 fs.unlinkSync(audioPath);
 }
 await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
 } catch (downloadError) {
 try {
 const alternativeUrl = `https://api.akuari.my.id/downloader/youtube?link=${song.videoUrl}`;
 const altResponse = await axios.get(alternativeUrl);
 if (altResponse.data && altResponse.data.mp3) {
 const audioResponse = await axios({
 method: 'get',
 url: altResponse.data.mp3,
 responseType: 'arraybuffer',
 timeout: 60000
 });
 audioPath = path.join(__dirname, `temp_alt_${Date.now()}_${sanitizedTitle}.mp3`);
 fs.writeFileSync(audioPath, Buffer.from(audioResponse.data));
 await sock.sendMessage(m.chat, {
 document: fs.readFileSync(audioPath),
 mimetype: 'audio/mpeg',
 fileName: `${sanitizedTitle}.mp3`,
 }, { quoted: m });

 if (fs.existsSync(audioPath)) {
 fs.unlinkSync(audioPath);
 }
 await sock.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
 } else {
 throw new Error('Alternative API failed');
 }
 } catch (altError) {
 if (fs.existsSync(audioPath)) {
 fs.unlinkSync(audioPath);
 }
 m.reply('Gagal mengunduh audio. Coba lagi nanti.');
 await sock.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
 }
 }
 } catch (error) {
 m.reply('Terjadi kesalahan saat mencari atau memproses lagu.');
 await sock.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
 }
 break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "tiktok":
case "tt": {
    if (!text) return example("linknya");

    m.reply("📥 Sedang memproses video TikTok...");

    try {
        const anu = await func.fetchJson(`https://api-simplebot.vercel.app/download/tiktok?apikey=free&url=${encodeURIComponent(text)}`);

        if (!anu?.status || !anu?.result) {
            return m.reply("Gagal mengambil data TikTok. Pastikan link valid.");
        }

        const { video_nowm, audio_url, slides } = anu.result;

        if (slides && slides.length > 1) {
            for (const i of slides) {
                await sock.sendFileUrl(m.chat, i.url, "Tiktok Slide ✅", m);
            }
        } else if (video_nowm) {
            await sock.sendMessage(m.chat, {
                video: { url: video_nowm },
                caption: "Tiktok Video ✅",
                mimetype: "video/mp4"
            }, { quoted: m });
        }

        if (audio_url) {
            await sock.sendMessage(m.chat, {
                audio: { url: audio_url },
                mimetype: "audio/mpeg"
            }, { quoted: m });
        }

    } catch (err) {
        console.error("Error TikTok Downloader:", err);
        m.reply("Terjadi kesalahan saat mengunduh video TikTok.");
    }
}
break

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

case "gitclone": {
if (!text) return example("https://github.com/xxx/xxx")
try {
let res = await await func.fetchJson(`https://restapi.simplebot.my.id/download/github?apikey=${global.apii}&url=${text}`)
let filename = res.result.filename
let url = res.result.download
await sock.sendMessage(m.chat, { document: { url: url }, mimetype: 'application/zip', fileName: `${filename}`}, { quoted : m })
} catch (e) {
await m.reply(`Error! repositori tidak ditemukan`)
}}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "instagram": case "ig": {
if (!text) return example("linknya")
m.reply("📥 Memproses instagram downloader . .")
var anu = await func.fetchJson(`https://restapi.simplebot.my.id/download/instagram?apikey=${global.apii}&url=${text}`)
if (anu.status) {
for (let i of anu.result.downloadUrls) {
await sock.sendFileUrl(m.chat, i, "Instagram Download Done ✅", m)
}
} else {
return m.reply("Error! Result Not Found")
}
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "facebook": case "fb": {
if (!text) return example("linknya")
m.reply("📥 Memproses facebook downloader . .")
var anu = await func.fetchJson(`https://restapi.simplebot.my.id/download/facebook?apikey=${global.apii}&url=${text}`)
if (anu.status) {
await sock.sendMessage(m.chat, {video: {url: anu.result.media}, caption: "Facebook Download Done ✅"}, {quoted: m})
} else {
return m.reply("Error! Result Not Found")
}
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "videy": {
if (!text) return example("linknya")
m.reply("📥 Memproses videy downloader . .")
var anu = await func.fetchJson(`https://restapi.simplebot.my.id/download/videy?apikey=${global.apii}&url=${text}`)
if (anu.status) {
await sock.sendMessage(m.chat, {video: {url: anu.result}, caption: "Videy Download Done ✅"}, {quoted: m})
} else {
return m.reply("Error! Result Not Found")
}
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "videy": {
if (!text) return example("linknya")
m.reply("📥 Memproses videy downloader . .")
try {
let res = await fetch(`https://videy.co/api/download?url=${encodeURIComponent(text)}`)
let json = await res.json()
        
if (!json.success) return m.reply("Error! Video tidak ditemukan")
        
let videoUrl = json.result.video_url
let videoTitle = json.result.title || "Video"
        
await sock.sendMessage(m.chat, {video: {url: videoUrl}, caption: `🎥 *${videoTitle}*`}, {quoted: m})
await sock.sendMessage(m.chat, {react: {text: '', key: m.key}})
} catch (e) {
return m.reply("Error! Result Not Found")
}
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case 'ytmp4': 
case 'ytvideo': 
case 'ytv': {
 if (!text) return m.reply(`Gunakan: ${prefix + command} <url> [resolusi]`); 
 let url = args[0]; 
 let resolution = args[1] && !isNaN(args[1]) ? args[1] : "720"; 
 try { 
 await sock.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
 let info = await getVideoInfo(url);
 if (!info || !info.status) return m.reply('❌ Gagal mendapatkan informasi video.');
 await sock.sendMessage(m.chat, { react: { text: '📥', key: m.key } });
 let video = await downloadVideo(url, resolution);
 if (!video.status || !video.downloadUrl) return m.reply('❌ Gagal mendapatkan file video.');
 let captionInfo = `📹 *${info.title}*\n👤 *Creator:* ${info.creator}\n⏳ *Durasi:* ${info.duration} detik\n📡 *Sumber:* ${video.source}\n🎥 *Resolusi:* ${resolution}p\n🔗 *URL:* ${info.url}`;
 await sock.sendMessage(m.chat, {
 image: { url: info.thumbnail },
 caption: captionInfo
 }, { quoted: m });
 await sock.sendMessage(m.chat, { react: { text: '📤', key: m.key } });
 let fileSize = await getFileSizeFromUrl(video.downloadUrl);
 let captionMedia = `📹 *${info.title}*\n👤 *${info.creator}*\n📡 *Sumber:* ${video.source}`;
 if (fileSize > 15 * 1024 * 1024) {
 await sock.sendMessage(m.chat, { 
 document: { url: video.downloadUrl },
 mimetype: 'video/mp4',
 fileName: `${info.title}.mp4`,
 caption: captionMedia
 }, { quoted: m });
 } else {
 await sock.sendMessage(m.chat, { 
 video: { url: video.downloadUrl },
 caption: captionMedia,
 fileName: `${info.title}.mp4`
 }, { quoted: m });
 }
 await sock.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
 } catch (err) { 
 console.error(err); 
 m.reply('❌ Terjadi kesalahan.'); 
 } 
} 
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "tourl": {
if (!/image|video/.test(mime)) return example("dengan kirim/reply foto")
const FormData = require('form-data');
const { fromBuffer } = require('file-type');
async function getUrls (buffer) {
  let { ext } = await fromBuffer(buffer);
  let bodyForm = new FormData();
  bodyForm.append("fileToUpload", buffer, "file." + ext);
  bodyForm.append("reqtype", "fileupload");
  let res = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: bodyForm,
  });
  let data = await res.text();
  return data;
}
let media = await sock.downloadAndSaveMediaMessage(qmsg)
let teks = await getUrls(fs.readFileSync(media))
await sock.sendMessage(m.chat, {text: teks}, {quoted: m})
await fs.unlinkSync(media)
}
break

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

case "tiktokstalk": case "ttstalk": {
if (!text) return example("username")
try {
const res = await func.fetchJson(`https://restapi.simplebot.my.id/stalk/tiktok?apikey=${global.apii}&user=${text}`)
if (!res.status) return m.reply("Error nama pengguna tidak ditemukan")
const teks = `
* *Nama :* ${res.result.nickname}
* *Username :* ${res.result.uniqueId}
* *Bio :* ${res?.result?.signature || ""}
* *Followers :* ${res.result.followerCount}
* *Following :* ${res.result.followingCount}
* *Private :* ${res.result.privateAccount == true ? "Ya" : "Tidak"}
`
await sock.sendMessage(m.chat, {image: {url: res.result.avatarMedium}, caption: teks}, {quoted: m})
} catch (err) {
return m.reply("Error : "+err)
}
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "igstalk": {
if (!text) return example("username")
try {
let res = await func.fetchJson(`https://cikaa-rest-api.vercel.app/stalk/instagram?user=${q}`)
const teks = `
* *Nama :* ${res.result.name}
* *Username :* ${res.result.username}
* *Bio :* ${res.result.bio}
* *Total Postingan :* ${res.result.posts}
* *Followers :* ${res.result.followers}
* *Following :* ${res.result.following}
`
await sock.sendMessage(m.chat, {image: {url: res.result.avatar}, caption: teks}, {quoted: m})
} catch (err) {
return m.reply("Error : "+err)
}
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "remini": case "tohd": case "hd": {
    if (!/image/.test(mime)) return example("dengan kirim/reply foto");
    m.reply(`🚀 Memproses *${command.toLowerCase()}*...`);
    const FormData = require('form-data');
    const { fromBuffer } = require('file-type');
    const fs = require('fs');
    async function uploadToCatbox(buffer) {
        try {
            let { ext } = await fromBuffer(buffer);
            let form = new FormData();
            form.append("fileToUpload", buffer, "file." + ext);
            form.append("reqtype", "fileupload");

            let res = await fetch("https://catbox.moe/user/api.php", {
                method: "POST",
                body: form,
            });

            return await res.text();
        } catch (err) {
            console.error("Upload Error:", err);
            return null;
        }
    }
    try {
        const mediaPath = await sock.downloadAndSaveMediaMessage(qmsg);
        const buffer = fs.readFileSync(mediaPath);
        const directLink = await uploadToCatbox(buffer);

        if (!directLink || !directLink.startsWith("https://")) {
            throw new Error("Gagal upload gambar ke server");
        }
        const response = await func.fetchJson(`https://api.anieshost.xyz/imagecreator/upscale?url=${directLink}`);
        if (!response?.result) throw new Error("Gagal meningkatkan kualitas gambar.");
        await sock.sendMessage(m.chat, {
            image: { url: response.result },
            caption: "Berhasil meningkatkan kualitas foto ✅"
        }, { quoted: m });
        fs.unlinkSync(mediaPath);
    } catch (err) {
        console.error("Remini error:", err);
        m.reply("Terjadi kesalahan: " + err.message);
    }
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "removebg": case "rbg": {
if (!/image/.test(mime)) return example("dengan kirim/reply foto")
const FormData = require('form-data');
const { fromBuffer } = require('file-type');
async function getUrls (buffer) {
  let { ext } = await fromBuffer(buffer);
  let bodyForm = new FormData();
  bodyForm.append("fileToUpload", buffer, "file." + ext);
  bodyForm.append("reqtype", "fileupload");
  let res = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: bodyForm,
  });
  let data = await res.text();
  return data;
}
let media = await sock.downloadAndSaveMediaMessage(qmsg)
let directLink = await getUrls(fs.readFileSync(media))
try {
const apa = await func.fetchJson(`https://api.anieshost.xyz/imagecreator/removebg?url=${directLink}`)
await sock.sendMessage(m.chat, {image: {url: apa.result}, caption: "Berhasil ✅"}, {quoted: m})
} catch (err) {
await m.reply("Error: " + err)
}
await fs.unlinkSync(media)
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "ssweb": {
  if (!text) return m.reply("\nMasukkan link website yang ingin di-screenshot.\n\nContoh *.ssweb* https://example.com\n")

  try {
    const res = await func.fetchJson(`https://api.botcahx.eu.org/api/tools/ssweb?url=${encodeURIComponent(text)}&apikey=dxAivLUR`)

    if (!res || !res.result) {
      return sock.sendMessage(m.chat, {
        text: "Gagal mengambil screenshot. Pastikan link yang diberikan valid dan server API aktif.",
      }, { quoted: m })
    }

    return sock.sendMessage(m.chat, {
      image: { url: res.result },
      caption: "Screenshot Web Done ✅"
    }, { quoted: m })

  } catch (err) {
    console.error("Error ssweb:", err)
    return sock.sendMessage(m.chat, {
      text: "Terjadi kesalahan saat mengambil screenshot. Coba lagi nanti.",
    }, { quoted: m })
  }
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "rvo": case "readviewonce": {
if (!m.quoted) return example("dengan reply pesannya")
let msg = m.quoted.fakeObj.message
    let type = Object.keys(msg)[0]
if (!msg[type].viewOnce && m.quoted.mtype !== "viewOnceMessageV2") return m.reply("Pesan itu bukan viewonce!")
let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : type == 'videoMessage' ? 'video' : 'audio')
    let buffer = Buffer.from([])
    for await (const chunk of media) {
        buffer = Buffer.concat([buffer, chunk])
    }
    if (/video/.test(type)) {
        return sock.sendMessage(m.chat, {video: buffer, caption: msg[type].caption || ""}, {quoted: m})
    } else if (/image/.test(type)) {
        return sock.sendMessage(m.chat, {image: buffer, caption: msg[type].caption || ""}, {quoted: m})
    } else if (/audio/.test(type)) {
        return sock.sendMessage(m.chat, {audio: buffer, mimetype: "audio/mpeg", ptt: true}, {quoted: m})
    } 
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "qc": {
if (!text) return example('teksnya')
let warna = ["#fffff"]
let ppuser
try {
ppuser = await sock.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://files.catbox.moe/gqs7oz.jpg'
}
let reswarna = await warna[Math.floor(Math.random()*warna.length)]
const obj = {
      "type": "quote",
      "format": "png",
      "backgroundColor": reswarna,
      "width": 512,
      "height": 768,
      "scale": 2,
      "messages": [{
         "entities": [],
         "avatar": true,
         "from": {
            "id": 1,
            "name": m.pushName,
            "photo": {
               "url": ppuser
            }
         },
         "text": text,
         "replyMessage": {}
      }]
   }
   try {
   const json = await axios.post('https://bot.lyo.su/quote/generate', obj, {
      headers: {
         'Content-Type': 'application/json'
      }
   })
   const buffer = Buffer.from(json.data.result.image, 'base64')
sock.sendStimg(m.chat, buffer, m, { packname: global.packname })
   } catch (error) {
   m.reply(error.toString())
   }
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "ai": case "openai": {
if (!text) return example("kamu siapa")
await func.fetchJson(`https://api-simplebot.vercel.app/ai/gemini?apikey=free&text=${text}`).then((e) => {
if (!e.status) return m.reply(JSON.stringify(e, null, 2))
var teks = `${e.result}`
sock.sendMessage(m.chat, {text: teks, ai: true}, {quoted: m})
})
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "gpt": case "chatgpt": {
if (!text) return example("kamu siapa")
await func.fetchJson(`https://vapis.my.id/api/blackbox?q=${text}`).then((e) => {
if (!e.status) return m.reply(JSON.stringify(e, null, 2))
var teks = `${e.result}`
sock.sendMessage(m.chat, {text: teks, ai: true}, {quoted: m})
})
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "closegc": case "close": 
case "opengc": case "open": {
if (!m.isGroup) return m.reply(msg.group)
if (!isOwner && !m.isAdmin) return m.reply(msg.admin)
if (!m.isBotAdmin) return m.reply(msg.botadmin)
if (/open|opengc/.test(command)) {
if (m.metadata.announce == false) return 
await sock.groupSettingUpdate(m.chat, 'not_announcement')
} else if (/closegc|close/.test(command)) {
if (m.metadata.announce == true) return 
await sock.groupSettingUpdate(m.chat, 'announcement')
} else {}
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "kick": case "kik": {
if (!isOwner) return m.reply(msg.admin)
if (!m.isGroup) return m.reply(msg.group)
if (!m.isBotAdmin) return m.reply(msg.botadmin)
if (text || m.quoted) {
const input = m.mentionedJid ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net" : false
var onWa = await sock.onWhatsApp(input.split("@")[0])
if (onWa.length < 1) return m.reply("Nomor tidak terdaftar di whatsapp")
const res = await sock.groupParticipantsUpdate(m.chat, [input], 'remove')
} else {
return example("@tag/reply")
}
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "demote":
case "promote": {
if (!isOwner) return m.reply(msg.admin)
if (!m.isGroup) return m.reply(msg.group)
if (!m.isBotAdmin) return m.reply(msg.botadmin)
if (m.quoted || text) {
var action
let target = m.mentionedJid ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
if (/demote/.test(command)) action = "Demote"
if (/promote/.test(command)) action = "Promote"
await sock.groupParticipantsUpdate(m.chat, [target], action.toLowerCase()).then(async () => {
await sock.sendMessage(m.chat, {text: `Berhasil ${action.toLowerCase()} @${target.split("@")[0]}`, mentions: [target]}, {quoted: m})
})
} else {
return example("@tag/6287XX")
}
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "ht": case "hidetag": {
if (!m.isGroup) return m.reply(msg.group)
if (!isOwner && !m.isAdmin) return m.reply(msg.admin)
if (!text) return example("pesannya")
let member = m.metadata.participants.map(v => v.id)
await sock.sendMessage(m.chat, {text: text, mentions: [...member]}, {quoted: m})
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "sticker": case "stiker": case "sgif": case "s": {
if (!/image|video/.test(mime)) return example("dengan mengirim foto/vidio")
if (/video/.test(mime)) {
if ((qmsg).seconds > 15) return m.reply("Durasi vidio maksimal 15 detik!")
}
var media = await sock.downloadAndSaveMediaMessage(qmsg)
await sock.sendStimg(m.chat, media, m, {packname: "©Xzyyo Pedia 2025"})
await fs.unlinkSync(media)
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "stickerwm": case "swm": case "wm": {
if (!text) return example("namamu & mengirim foto/vidio")
if (!/image|video/.test(mime)) return example("namamu & mengirim foto/vidio")
if (/video/.test(mime)) {
if ((qmsg).seconds > 15) return m.reply("Durasi vidio maksimal 15 detik!")
}
var media = await sock.downloadAndSaveMediaMessage(qmsg)
await sock.sendStimg(m.chat, media, m, {packname: text})
await fs.unlinkSync(media)
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "brat": {
if (!text) return example("Hello World!")
await sock.sendStimg(m.chat, `https://cikaa-rest-api.vercel.app/imagecreator/brat?text=${text}`, m, {packname: global.namaowner})
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "brat2": {
if (!text) return example("Hello World!")
await sock.sendStimg(m.chat, `https://vapis.my.id/api/bratv2?q=${text}`, m, {packname: global.namaowner})
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "public": {
if (!isOwner) return m.reply(msg.owner)
sock.public = true
m.reply("Berhasil mengganti mode bot menjadi *Public*")
}
break

case "self": {
if (!isOwner) return m.reply(msg.owner)
sock.public = false
m.reply("Berhasil mengganti mode bot menjadi *Self*")
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "get": {
if (!isOwner) return m.reply(msg.owner)
if (!text) return m.reply("linknya")
try {
const data = await axios.get(text, { responseType: 'arraybuffer' });
const mime = data.headers['content-type'] || (await FileType.fromBuffer(data.data)).mime
if (/gif|image|video|audio|pdf/i.test(mime)) {
return m.reply(text)
}
var check = await func.fetchJson(text)
return m.reply(JSON.stringify(check, null, 2))
} catch {
return m.reply(`${e}`)
}
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "antilink": case "antilinkgc": {
  if (!isOwner) return m.reply(msg.owner);
  if (!m.isGroup) return m.reply(msg.group);

  let room = antilink.find((i) => i.id == m.chat);

  if (!args[0] || !args[1]) return example(`on/off nokik/kik\n\n*Status Antilinkgc :* ${room ? `Aktif ✅ (${room.kick ? "kick" : "nokik"})` : "Tidak Aktif ❌"}`)

  let mode = args[0].toLowerCase();
  let state = args[1].toLowerCase();
  let isOn = /on/g.test(state);
  let isOff = /off/g.test(state);

  if (!["kick", "nokick", "kik", "nokik"].includes(mode)) return example(`on/off nokik/kik\n\n*Status Antilinkgc :* ${room ? `Aktif ✅ (${room.kick ? "kick" : "nokik"})` : "Tidak Aktif ❌"}`)

  if (!isOn && !isOff) return example(`on/off nokik/kik\n\n*Status Antilinkgc :* ${room ? `Aktif ✅ (${room.kick ? "kick" : "nokik"})` : "Tidak Aktif ❌"}`)

  let shouldKick = mode === "kick" || mode === "kik";

  if (isOn) {
    if (room && room.kick === shouldKick)
      return m.reply(
        `*Antilink grup ${shouldKick ? "kick" : "no kick"}* di grup ini sudah aktif!`
      );

    if (room) {
      let ind = antilink.indexOf(room);
      antilink.splice(ind, 1);
    }

    antilink.push({ id: m.chat, kick: shouldKick });
    fs.writeFileSync("./data/antilink.json", JSON.stringify(antilink, null, 2));
    return m.reply(
      `*Antilink grup ${shouldKick ? "kick" : "no kick"}* berhasil diaktifkan ✅`
    );
  } else if (isOff) {
    if (!room || room.kick !== shouldKick)
      return m.reply(
        `*Antilink grup ${shouldKick ? "kick" : "no kick"}* di grup ini sudah tidak aktif!`
      );

    let ind = antilink.indexOf(room);
    antilink.splice(ind, 1);
    fs.writeFileSync("./data/antilink.json", JSON.stringify(antilink, null, 2));
    return m.reply(
      `*Antilink grup ${shouldKick ? "kick" : "no kick"}* berhasil dimatikan ✅`
    );
  }
}
break
// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "developerbot": case "owner": case "creator": {
await sock.sendContact(m.chat, [global.owner], m)
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "backupsc": case "bck": case "backup": {
if (m.sender.split("@")[0] !== global.owner && m.sender !== botNumber) return m.reply("Fitur ini hanya untuk owner pemilik bot!")
let dir = await fs.readdirSync("./server/tmp")
if (dir.length >= 2) {
let res = await dir.filter(e => !e.endsWith(".txt"))
for (let i of res) {
await fs.unlinkSync(`./server/tmp/${i}`)
}}
await m.reply("Processing Backup Script . .")
const tgl = func.getTime().split("T")[0]
let jam = func.getTime().split("T")[1].split("+")[0].split(":")
jam = jam.slice(0, 2).join(":")
const name = `Backup-${tgl}#${jam}`
const ls = (await execSync("ls"))
.toString()
.split("\n")
.filter(
(pe) =>
pe != "node_modules" &&
pe != "session" &&
pe != "package-lock.json" &&
pe != "yarn.lock" &&
pe != ""
)
const anu = await execSync(`zip -r ${name}.zip ${ls.join(" ")}`)
await sock.sendMessage(m.sender, {document: await fs.readFileSync(`./${name}.zip`), fileName: `${name}.zip`, mimetype: "application/zip"}, {quoted: m})
await execSync(`rm -rf ${name}.zip`)
if (m.chat !== m.sender) return m.reply("Script bot berhasil dikirim ke private chat")
}
break
// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "ambilq": case "q": {
if (!m.quoted) return
let jsonData = JSON.stringify(m.quoted, null, 2)
m.reply(jsonData)
} 
break

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

case "addrespon": {
if (!isOwner) return m.reply(msg.owner)
if (!text) return example("cmd|responnya")
if (!text.split("|")) return example("cmd|responnya")
let result = text.split("|")
if (result.length < 2) return example("cmd|responnya")
const [ cmd, respon ] = result
let res = list.find(e => e.cmd == cmd.toLowerCase())
if (res) return m.reply("Cmd respon sudah ada")
let obj = {
cmd: cmd.toLowerCase(), 
respon: respon
}
list.push(obj)
fs.writeFileSync("./data/list.json", JSON.stringify(list, null, 2))
m.reply(`Berhasil menambah cmd respon *${cmd.toLowerCase()}* kedalam database respon`)
}
break

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

case "delrespon": {
if (!isOwner) return m.reply(msg.owner)
if (!text) return ("cmd\n\n ketik *.listrespon* untuk melihat semua cmd")
const cmd = text.toLowerCase()
if (cmd == "all") {
list.splice(0, list.length)
await fs.writeFileSync("./data/list.json", JSON.stringify(list, null, 2))
return m.reply("Berhasil menghapus semua respon ✅")
}
let res = list.find(e => e.cmd == cmd.toLowerCase())
if (!res) return m.reply("Cmd respon tidak ditemukan\nketik *.listrespon* untuk melihat semua cmd respon")
let position = list.indexOf(res)
await list.splice(position, 1)
fs.writeFileSync("./data/list.json", JSON.stringify(list, null, 2))
m.reply(`Berhasil menghapus cmd respon *${cmd.toLowerCase()}* dari database respon`)
}
break

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

case "listrespon": {
if (!isOwner) return m.reply(msg.owner)
if (list.length < 1) return m.reply("Tidak ada cmd respon")
let teks = ""
await list.forEach(e => teks += `\n* *Cmd :* ${e.cmd}\n`)
m.reply(`${teks}`)
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //
case "buyjasajpm": case "buyjasashare": {
  if (m.isGroup)
    return m.reply(
      "Pembelian Jasa Jpm hanya bisa di dalam private chat."
    );
  if (sock[m.sender])
return m.reply(
`Masih ada transaksi yang belum diselesaikan.
      
ketik *.batalbeli* untuk membatalkan transaksi sebelumnya`
);
const groups = await sock.groupFetchAllParticipating()
if (!text) return m.reply(`Contoh : *${cmd}* pesannya & bisa dengan foto juga\n\nTotal grup : ${(Object.keys(groups)).length}`)
  let Obj = {}
if (/image/i.test(mime)) {
Obj.image = m.quoted ? await m.quoted.download() : await m.download()
}
  Obj.teksjpm = text
  Obj.grup = await Object.keys(groups)
  Obj.harga = 1 // harga

  const amount = Number(Obj.harga) + func.generateRandomNumber(110, 250);

  try {
    const get = await axios.get(
      `https://restapi.simplebot.my.id/orderkuota/createpayment?apikey=${global.apii}&amount=${amount}&codeqr=${global.QrisOrderKuota}`
    );

    const teks3 = `
 *── INFORMASI PEMBAYARAN ──*
  
 *• ID :* ${get.data.result.idtransaksi}
 *• Total Pembayaran :* Rp${await func.toRupiah(get.data.result.jumlah)}
 *• Barang :* Jasa Jpm
 *• Target :* ${Obj.grup.length} Grup
 *• Expired :* 5 menit

*Note :* 
_Qris pembayaran hanya berlaku dalam 5 menit, jika sudah melewati 5 menit pembayaran dinyatakan tidak valid!_
`

    let msgQr = await sock.sendMessage(m.chat, {
  buttons: [
    {
      buttonId: `.batalbeli`,
      buttonText: { displayText: 'Batalkan Pembelian' },
      type: 1
    }
  ],
  headerType: 1,
  viewOnce: true,
  image: {url: get.data.result.imageqris.url}, 
  caption: teks3,
  contextInfo: {
   mentionedJid: [m.sender], 
   isForwarded: true
  },
})

    sock[m.sender] = {
      msg: msgQr,
      chat: m.sender,
      idDeposit: get.data.result.idtransaksi,
      amount: get.data.result.jumlah.toString(),
      status: true,
      exp: setTimeout(async () => {
        if (sock[m.sender] && sock[m.sender].status) {
          await sock.sendMessage(sock[m.sender].chat, { text: "QRIS Pembayaran Telah Expired." }, { quoted: sock[m.sender].msg });
          await sock.sendMessage(sock[m.sender].chat, { delete: sock[m.sender].msg.key })
          delete sock[m.sender];
        }
      }, 250000)
    };
    

    while (sock[m.sender] && sock[m.sender].status && sock[m.sender].amount) {
      await func.sleep(5000);
      const resultcek = await axios.get(
        `https://restapi.simplebot.my.id/orderkuota/cekstatus?apikey=${global.apii}&merchant=${global.IdMerchant}&keyorkut=${global.ApikeyOrderKuota}`
      );
      const req = resultcek.data;

      if (sock[m.sender] && req?.result?.amount == sock[m.sender].amount) {
        sock[m.sender].status = false;
        clearTimeout(sock[m.sender].exp);

        await sock.sendMessage(sock[m.sender].chat, {
          text: `
*PEMBAYARAN BERHASIL ✅*

 *• ID :* ${sock[m.sender].idDeposit}
 *• Total Pembayaran :* Rp${await func.toRupiah(sock[m.sender].amount)}
 *• Barang :* Jasa Jpm
 *• Target : ${Obj.grup.length} Grup
`,
        }, { quoted: sock[m.sender].msg });

await sock.sendMessage(sock[m.sender].chat, { delete: sock[m.sender].msg.key });
const gcnya = Obj.grup
await sock.sendMessage(sock[m.sender].chat,
{text: `Memproses Jpm pesan *${Obj.image !== undefined ? "teks & foto" : "teks"}* ke ${gcnya.length} grup`, contextInfo: {isForwarded: true}}, { quoted: null });
let messages = Obj.image !== undefined ? { image: Obj.image, caption: Obj.teksjpm } : { text: Obj.teksjpm }
for (let id of gcnya) {
if (bljpm.includes(id)) continue
try {
await sock.sendMessage(id, messages, { quoted: qjasajpm })
await func.sleep(4000)
} catch {}
}
await sock.sendMessage(sock[m.sender].chat,
{text: `Berhasil Jpm pesan *${Obj.image !== undefined ? "teks & foto" : "teks"}* ke ${gcnya.length} grup`, contextInfo: {isForwarded: true}}, { quoted: null })
delete sock[m.sender]
      }
    }
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
 }
 }
break
// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "cpaste": case "pastebin": {
if (!text) return example("teksnya")
let { PasteClient, Publicity, ExpireDate } = require("pastebin-api")
const client = new PasteClient("XRP7K6sqg-cafuC5J509m0fFMUiLFxi5");
const url = await client.createPaste({
  code: text,
  expireDate: ExpireDate.Never,
  format: "javascript",
  name: "something.js",
  publicity: Publicity.Public,
});
let links = `https://pastebin.com/raw/${url.split("/")[3]}`
return m.reply(links)
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "ip": case "getip": {
if (!isOwner) return
let t = await func.fetchJson('https://api64.ipify.org?format=json')
m.reply(`IP Panel : ${t.ip}`)
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "rst": case "restart": {
if (!isOwner) return
const { spawn } = require("child_process");

function restartServer() {
  // Spawn proses baru untuk menjalankan ulang server
  const newProcess = spawn(process.argv[0], process.argv.slice(1), {
    detached: true,
    stdio: "inherit",
  });

  // Keluar dari proses lama
  process.exit(0);
}

await m.reply("Restarting bot . . .")
// Contoh penggunaan: Restart setelah 5 detik
await setTimeout(() => {
  restartServer();
}, 5000);
}
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

default:
if ((m.text).startsWith('$')) {
if (!isOwner) return
exec(chats.slice(2), (err, stdout) => {
if(err) return sock.sendMessage(m.chat, {text: err.toString()}, {quoted: m})
if (stdout) return sock.sendMessage(m.chat, {text: util.format(stdout)}, {quoted: m})
})}

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

if ((m.text).startsWith("=>")) {
if (!isOwner) return
try {
const evaling = await eval(`;(async () => { ${text} })();`);
return sock.sendMessage(m.chat, {text: util.format(evaling)}, {quoted: m})
} catch (e) {
return sock.sendMessage(m.chat, {text: util.format(e)}, {quoted: m})
}}

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

if ((m.text).startsWith(">")) {
if (!isOwner) return
try {
let evaled = await eval(text)
if (typeof evaled !== 'string') evaled = util.inspect(evaled)
sock.sendMessage(m.chat, {text: util.format(evaled)}, {quoted: m})
} catch (e) {
sock.sendMessage(m.chat, {text: util.format(e)}, {quoted: m})
}}

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

}} catch (e) {
console.log(e)
sock.sendMessage(`${owner}@s.whatsapp.net`, {text:`${util.format(e)}`}, {quoted: m})
}}

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //


let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.cyan("File Update => "),
chalk.cyan.bgBlue.bold(`${__filename}`))
delete require.cache[file]
require(file)
})