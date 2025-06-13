import { Message, TextChannel } from 'discord.js';

export const run = async (message: Message, args: string[]) => {
    if (!message.member?.permissions.has('ManageMessages')) {
        return message.reply('Bu komutu kullanma yetkiniz yok!');
    }

    if (!(message.channel instanceof TextChannel)) {
        return message.reply('Bu komut sadece metin kanallarında kullanılabilir!');
    }

    const amount = parseInt(args[0]);
    if (isNaN(amount) || amount < 1 || amount > 100) {
        return message.reply('Lütfen 1 ile 100 arasında bir sayı belirtin!');
    }

    try {
        const deleted = await message.channel.bulkDelete(amount + 1);
        message.channel.send(`${deleted.size - 1} mesaj silindi.`)
            .then(msg => setTimeout(() => msg.delete(), 3000));
    } catch (error) {
        console.error(error);
        message.reply('Mesajlar silinirken bir hata oluştu!');
    }
}; 