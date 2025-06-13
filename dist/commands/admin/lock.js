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
    if (!message.guild) {
        return message.reply('Bu komut sadece sunucularda kullanılabilir!');
    }
    const channel = message.channel;
    const reason = args.join(' ') || 'Sebep belirtilmedi';
    try {
        await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
            SendMessages: false
        });
        message.channel.send(`Kanal kilitlendi.\nSebep: ${reason}`);
    }
    catch (error) {
        console.error(error);
        message.reply('Kanal kilitlenirken bir hata oluştu!');
    }
};
exports.run = run;
