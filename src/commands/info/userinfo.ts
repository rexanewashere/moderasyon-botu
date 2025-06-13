import { Message, EmbedBuilder } from 'discord.js';

export const run = async (message: Message, args: string[]) => {
    const target = message.mentions.members?.first() || message.member;
    if (!target) return;

    const roles = target.roles.cache
        .filter(role => role.id !== message.guild?.id)
        .map(role => role.toString())
        .join(', ') || 'Rol yok';

    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Kullanıcı Bilgisi')
        .setThumbnail(target.user.displayAvatarURL())
        .addFields(
            { name: 'Kullanıcı Adı', value: target.user.tag, inline: true },
            { name: 'ID', value: target.id, inline: true },
            { name: 'Sunucuya Katılma Tarihi', value: target.joinedAt?.toLocaleDateString() || 'Bilinmiyor', inline: true },
            { name: 'Discord\'a Katılma Tarihi', value: target.user.createdAt.toLocaleDateString(), inline: true },
            { name: 'Roller', value: roles }
        )
        .setTimestamp();

    message.channel.send({ embeds: [embed] });
}; 