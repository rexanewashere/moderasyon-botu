"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const run = async (message, args) => {
    if (!message.guild) {
        return message.reply('Bu komut sadece sunucularda kullanılabilir!');
    }
    const target = message.mentions.members?.first() || message.member;
    if (!target) {
        return message.reply('Kullanıcı bulunamadı!');
    }
    const key = `${message.guild.id}-${target.id}`;
    const userWarnings = warnings.get(key) || [];
    if (userWarnings.length === 0) {
        return message.channel.send(`${target.user.tag} kullanıcısının hiç uyarısı yok.`);
    }
    const warningList = userWarnings
        .map((warn, index) => `${index + 1}. Sebep: ${warn.reason} (${warn.date.toLocaleDateString()})`)
        .join('\n');
    message.channel.send(`${target.user.tag} kullanıcısının uyarıları:\n${warningList}`);
};
exports.run = run;
