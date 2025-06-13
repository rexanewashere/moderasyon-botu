import { Message, EmbedBuilder } from 'discord.js';

export const run = async (message: Message, args: string[]) => {
    if (!message.guild) return;

    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Sunucu Bilgisi')
        .setThumbnail(message.guild.iconURL() || '')
        .addFields(
            { name: 'Sunucu Adı', value: message.guild.name, inline: true },
            { name: 'Sunucu ID', value: message.guild.id, inline: true },
            { name: 'Sunucu Sahibi', value: `<@${message.guild.ownerId}>`, inline: true },
            { name: 'Toplam Üye', value: message.guild.memberCount.toString(), inline: true },
            { name: 'Rol Sayısı', value: message.guild.roles.cache.size.toString(), inline: true },
            { name: 'Kanal Sayısı', value: message.guild.channels.cache.size.toString(), inline: true },
            { name: 'Boost Sayısı', value: message.guild.premiumSubscriptionCount?.toString() || '0', inline: true },
            { name: 'Oluşturulma Tarihi', value: message.guild.createdAt.toLocaleDateString(), inline: true }
        )
        .setTimestamp();

    message.channel.send({ embeds: [embed] });
}; 