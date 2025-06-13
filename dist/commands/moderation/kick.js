"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const run = async (message, args) => {
    if (!message.member?.permissions.has('KickMembers')) {
        return message.reply('Bu komutu kullanma yetkiniz yok!');
    }
    const target = message.mentions.members?.first();
    if (!target) {
        return message.reply('Lütfen atılacak kullanıcıyı etiketleyin!');
    }
    const reason = args.slice(1).join(' ') || 'Sebep belirtilmedi';
    if (!target.kickable) {
        return message.reply('Bu kullanıcıyı atamıyorum!');
    }
    try {
        await target.kick(reason);
        message.channel.send(`${target.user.tag} sunucudan atıldı.\nSebep: ${reason}`);
    }
    catch (error) {
        console.error(error);
        message.reply('Kullanıcı atılırken bir hata oluştu!');
    }
};
exports.run = run;
