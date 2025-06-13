import { Message, TextChannel } from 'discord.js';

// Log kanallarını saklamak için basit bir Map
const logChannels = new Map<string, string>();

export const run = async (message: Message, args: string[]) => {
    if (!message.member?.permissions.has('ManageGuild')) {
        return message.reply('Bu komutu kullanma yetkiniz yok!');
    }

    if (!message.guild) {
        return message.reply('Bu komut sadece sunucularda kullanılabilir!');
    }

    const channel = message.mentions.channels.first();
    
    if (!channel || !(channel instanceof TextChannel)) {
        return message.reply('Lütfen geçerli bir metin kanalı etiketleyin!');
    }

    try {
        // Log kanalını kaydet
        logChannels.set(message.guild.id, channel.id);
        
        message.channel.send(`Log kanalı ${channel} olarak ayarlandı.`);

        // Test mesajı gönder
        channel.send('Log sistemi aktif! Bu kanal artık moderasyon loglarını alacak.');
    } catch (error) {
        console.error(error);
        message.reply('Log kanalı ayarlanırken bir hata oluştu!');
    }
}; 