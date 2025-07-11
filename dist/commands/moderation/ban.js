"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const run = async (message, args) => {
    if (!message.member?.permissions.has('BanMembers')) {
        return message.reply('Bu komutu kullanma yetkiniz yok!');
    }
    const target = message.mentions.members?.first();
    if (!target) {
        return message.reply('Lütfen banlanacak kullanıcıyı etiketleyin!');
    }
    const reason = args.slice(1).join(' ') || 'Sebep belirtilmedi';
    if (!target.bannable) {
        return message.reply('Bu kullanıcıyı banlayamıyorum!');
    }
    try {
        await target.ban({ reason });
        message.channel.send(`${target.user.tag} sunucudan banlandı.\nSebep: ${reason}`);
    }
    catch (error) {
        console.error(error);
        message.reply('Kullanıcı banlanırken bir hata oluştu!');
    }
};
exports.run = run;
