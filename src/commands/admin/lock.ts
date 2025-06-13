import { Message, PermissionsBitField, TextChannel } from 'discord.js';

export const run = async (message: Message, args: string[]) => {
    if (!message.member?.permissions.has('ManageChannels')) {
        return message.reply('Bu komutu kullanma yetkiniz yok!');
    }

    if (!(message.channel instanceof TextChannel)) {
        return message.reply('Bu komut sadece metin kanallarında kullanılabilir!');
    }

    if (!message.guild) {
        return message.reply('Bu komut sadece sunucularda kullanılabilir!');
    }

    const channel = message.channel;
    const reason = args.join(' ') || 'Sebep belirtilmedi';

    try {
        await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
            SendMessages: false
        });
        
        message.channel.send(`Kanal kilitlendi.\nSebep: ${reason}`);
    } catch (error) {
        console.error(error);
        message.reply('Kanal kilitlenirken bir hata oluştu!');
    }
}; 