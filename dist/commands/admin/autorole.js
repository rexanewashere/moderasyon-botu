"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const autoRoles = new Map();
const run = async (message, args) => {
    if (!message.member?.permissions.has('ManageGuild')) {
        return message.reply('Bu komutu kullanma yetkiniz yok!');
    }
    if (!message.guild) {
        return message.reply('Bu komut sadece sunucularda kullanılabilir!');
    }
    const action = args[0]?.toLowerCase();
    if (!action || (action !== 'ayarla' && action !== 'kaldır')) {
        return message.reply('Kullanım: .autorole <ayarla/kaldır> @rol');
    }
    if (action === 'ayarla') {
        const role = message.mentions.roles.first();
        if (!role) {
            return message.reply('Lütfen bir rol etiketleyin!');
        }
        autoRoles.set(message.guild.id, role.id);
        message.channel.send(`Otomatik rol ${role.name} olarak ayarlandı.`);
        // Otorol event listener'ı ekle
        message.client.on('guildMemberAdd', async (member) => {
            if (member.guild.id === message.guild?.id) {
                const roleId = autoRoles.get(member.guild.id);
                if (roleId) {
                    try {
                        const role = await member.guild.roles.fetch(roleId);
                        if (role) {
                            await member.roles.add(role);
                        }
                    }
                    catch (error) {
                        console.error(error);
                    }
                }
            }
        });
    }
    else {
        autoRoles.delete(message.guild.id);
        message.channel.send('Otomatik rol kaldırıldı.');
    }
};
exports.run = run;
