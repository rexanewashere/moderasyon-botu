"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const discord_js_1 = require("discord.js");
// Log kanallarını saklamak için basit bir Map
const logChannels = new Map();
const run = async (message, args) => {
    if (!message.member?.permissions.has('ManageGuild')) {
        return message.reply('Bu komutu kullanma yetkiniz yok!');
    }
    if (!message.guild) {
        return message.reply('Bu komut sadece sunucularda kullanılabilir!');
    }
    const channel = message.mentions.channels.first();
    if (!channel || !(channel instanceof discord_js_1.TextChannel)) {
        return message.reply('Lütfen geçerli bir metin kanalı etiketleyin!');
    }
    try {
        // Log kanalını kaydet
        logChannels.set(message.guild.id, channel.id);
        message.channel.send(`Log kanalı ${channel} olarak ayarlandı.`);
        // Test mesajı gönder
        channel.send('Log sistemi aktif! Bu kanal artık moderasyon loglarını alacak.');
    }
    catch (error) {
        console.error(error);
        message.reply('Log kanalı ayarlanırken bir hata oluştu!');
    }
};
exports.run = run;
