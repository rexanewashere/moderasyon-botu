"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const run = async (message, args) => {
    if (!message.member?.permissions.has('ModerateMembers')) {
        return message.reply('Bu komutu kullanma yetkiniz yok!');
    }
    const target = message.mentions.members?.first();
    if (!target) {
        return message.reply('Lütfen susturması kaldırılacak kullanıcıyı etiketleyin!');
    }
    try {
        await target.timeout(null);
        message.channel.send(`${target.user.tag} kullanıcısının susturması kaldırıldı.`);
    }
    catch (error) {
        console.error(error);
        message.reply('Kullanıcının susturması kaldırılırken bir hata oluştu!');
    }
};
exports.run = run;
