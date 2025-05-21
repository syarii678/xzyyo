require("./server/handler.js")

// >~~~~~~ Setting Bot & Owner  ~~~~~~~< //
global.owner = "6287819503464"
global.namabot = "Pushkontak-VVIP V4" 
global.namaowner = "Xzyyo Pedia"
global.linkgc = 'https://whatsapp.com/channel/0029VavwQ4M7Noa7HvUmrz0c'
global.packname = "Pushkontak-VVIP V4"
global.author = "Xzyyo Pedia"


// >~~~~~~~~ Setting Channel ~~~~~~~~~< //
global.idsaluran = "120363363273682860@newsletter"
global.namasaluran = "𝚇𝚉𝚈𝚈𝙾 𝙷𝙾𝙰𝚂𝚃𝙸𝙽𝙶 - 𝙲𝙷𝙰𝙽𝙴𝙻 𝚃𝙴𝚂𝚃𝙸"
global.linksaluran = "https://whatsapp.com/channel/0029VavwQ4M7Noa7HvUmrz0c"

// >~~~~ Setting Grup Reseller Panel ~~~~~< //
global.linkgrupresellerpanel = "https://whatsapp.com/channel/0029VavwQ4M7Noa7HvUmrz0c"

// >~~~~~~~~ Setting Payment ~~~~~~~~~< //
global.dana = "6287819503464"
global.ovo = "Belum Tersedia"
global.gopay = "Belum Tersedia"
global.qris = "Belum Tersedia"


// >~~~~~~~ Setting Orderkuota ~~~~~~~~< //

global.QrisOrderKuota = ""
global.ApikeyOrderKuota = ""
global.IdMerchant = ""
global.pinH2H = ""
global.passwordH2H = ""

global.apii = "new"

// >~~~~~~~~ Setting Message ~~~~~~~~~< //

global.msg = {
wait: "Memproses . . .", 
owner: "Fitur ini khusus untuk owner!", 
group: "Fitur ini untuk dalam grup!", 
private: "Fitur ini untuk dalam private chat!", 
admin: "Fitur ini untuk admin grup!", 
botadmin: "Fitur ini hanya untuk bot menjadi admin"
}



let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.cyan("File Update => "), chalk.cyan.bgBlue.bold(`${__filename}`))
delete require.cache[file]
require(file)
})