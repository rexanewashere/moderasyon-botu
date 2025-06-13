"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const run = async (message, args) => {
    if (!message.member?.permissions.has('ManageRoles')) {
        return message.reply('Bu komutu kullanma yetkiniz yok!');
    }
    if (!message.guild) {
        return message.reply('Bu komut sadece sunucularda kullanılabilir!');
    }
    const target = message.mentions.members?.first();
    if (!target) {
        return message.reply('Lütfen bir kullanıcı etiketleyin!');
    }
    const role = message.mentions.roles.first();
    if (!role) {
        return message.reply('Lütfen bir rol etiketleyin!');
    }
    const action = args[0]?.toLowerCase();
    if (!action || (action !== 'ver' && action !== 'al')) {
        return message.reply('Kullanım: .role <ver/al> @kullanıcı @rol');
    }
    try {
        if (action === 'ver') {
            await target.roles.add(role);
            message.channel.send(`${target.user.tag} kullanıcısına ${role.name} rolü verildi.`);
        }
        else {
            await target.roles.remove(role);
            message.channel.send(`${target.user.tag} kullanıcısından ${role.name} rolü alındı.`);
        }
    }
    catch (error) {
        console.error(error);
        message.reply('Rol işlemi yapılırken bir hata oluştu!');
    }
};
exports.run = run;
