import { Message } from 'discord.js';

const spamMap = new Map<string, number[]>();
const SPAM_THRESHOLD = 5;
const SPAM_TIME_WINDOW = 5000; // 5 saniye

export const run = async (message: Message, args: string[]) => {
    if (!message.member?.permissions.has('ManageGuild')) {
        return message.reply('Bu komutu kullanma yetkiniz yok!');
    }

    const action = args[0]?.toLowerCase();
    
    if (!action || (action !== 'aç' && action !== 'kapat')) {
        return message.reply('Kullanım: .antispam <aç/kapat>');
    }

    if (action === 'aç') {
        // Anti-spam dinleyicisini ekle
        message.client.on('messageCreate', async (msg: Message) => {
            if (msg.author.bot) return;

            const key = `${msg.author.id}-${msg.channelId}`;
            const userMessages = spamMap.get(key) || [];
            const now = Date.now();

            // Eski mesajları temizle
            const recentMessages = userMessages.filter((timestamp: number) => now - timestamp < SPAM_TIME_WINDOW);
            
            recentMessages.push(now);
            spamMap.set(key, recentMessages);

            if (recentMessages.length >= SPAM_THRESHOLD) {
                // Spam tespit edildi
                try {
                    await msg.member?.timeout(60000, 'Spam yapma');
                    msg.channel.send(`${msg.author} spam yaptığı için 1 dakika susturuldu.`);
                    spamMap.delete(key);
                } catch (error) {
                    console.error(error);
                }
            }
        });
        message.channel.send('Anti-spam sistemi aktifleştirildi.');
    } else {
        // Anti-spam dinleyicisini kaldır
        message.client.removeAllListeners('messageCreate');
        message.channel.send('Anti-spam sistemi devre dışı bırakıldı.');
    }
}; 