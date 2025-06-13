import { Message, TextChannel } from 'discord.js';

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

    try {
        await channel.permissionOverwrites.edit(message.guild.roles.everyone, {
            SendMessages: null
        });
        
        message.channel.send('Kanal kilidi kaldırıldı.');
    } catch (error) {
        console.error(error);
        message.reply('Kanal kilidi kaldırılırken bir hata oluştu!');
    }
}; 