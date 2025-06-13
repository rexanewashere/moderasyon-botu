"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const discord_js_1 = require("discord.js");
const run = async (message, args) => {
    if (!message.guild)
        return;
    const role = message.mentions.roles.first();
    if (!role) {
        return message.reply('Lütfen bir rol etiketleyin!');
    }
    const embed = new discord_js_1.EmbedBuilder()
        .setColor(role.color)
        .setTitle('Rol Bilgisi')
        .addFields({ name: 'Rol Adı', value: role.name, inline: true }, { name: 'Rol ID', value: role.id, inline: true }, { name: 'Renk', value: `#${role.color.toString(16).padStart(6, '0')}`, inline: true }, { name: 'Pozisyon', value: role.position.toString(), inline: true }, { name: 'Üye Sayısı', value: role.members.size.toString(), inline: true }, { name: 'Etiketlenebilir', value: role.mentionable ? 'Evet' : 'Hayır', inline: true }, { name: 'Oluşturulma Tarihi', value: role.createdAt.toLocaleDateString(), inline: true })
        .setTimestamp();
    message.channel.send({ embeds: [embed] });
};
exports.run = run;
