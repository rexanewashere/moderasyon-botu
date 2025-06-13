"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const run = async (message, args) => {
    if (!message.member?.permissions.has('ModerateMembers')) {
        return message.reply('Bu komutu kullanma yetkiniz yok!');
    }
    const target = message.mentions.members?.first();
    if (!target) {
        return message.reply('Lütfen susturulacak kullanıcıyı etiketleyin!');
    }
    const duration = parseInt(args[1]) || 5;
    const reason = args.slice(2).join(' ') || 'Sebep belirtilmedi';
    try {
        await target.timeout(duration * 60 * 1000, reason);
        message.channel.send(`${target.user.tag} ${duration} dakika susturuldu.\nSebep: ${reason}`);
    }
    catch (error) {
        console.error(error);
        message.reply('Kullanıcı susturulurken bir hata oluştu!');
    }
};
exports.run = run;
