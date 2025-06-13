"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const discord_js_1 = require("discord.js");
const run = async (message, args) => {
    if (!message.member?.permissions.has('ManageChannels')) {
        return message.reply('Bu komutu kullanma yetkiniz yok!');
    }
    if (!(message.channel instanceof discord_js_1.TextChannel)) {
        return message.reply('Bu komut sadece metin kanallarında kullanılabilir!');
    }
    const seconds = parseInt(args[0]);
    if (isNaN(seconds) || seconds < 0 || seconds > 21600) {
        return message.reply('Lütfen 0 ile 21600 saniye (6 saat) arasında bir değer girin!');
    }
    try {
        await message.channel.setRateLimitPerUser(seconds);
        message.channel.send(`Yavaş mod ${seconds} saniye olarak ayarlandı.`);
    }
    catch (error) {
        console.error(error);
        message.reply('Yavaş mod ayarlanırken bir hata oluştu!');
    }
};
exports.run = run;
