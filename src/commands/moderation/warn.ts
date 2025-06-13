import { Message } from 'discord.js';

// Uyarıları saklamak için Map
const warnings = new Map<string, Array<{ reason: string, date: Date }>>();

export const run = async (message: Message, args: string[]) => {
    if (!message.member?.permissions.has('ModerateMembers')) {
        return message.reply('Bu komutu kullanma yetkiniz yok!');
    }

    if (!message.guild) {
        return message.reply('Bu komut sadece sunucularda kullanılabilir!');
    }

    const target = message.mentions.members?.first();
    if (!target) {
        return message.reply('Lütfen uyarılacak kullanıcıyı etiketleyin!');
    }

    const reason = args.slice(1).join(' ') || 'Sebep belirtilmedi';
    const key = `${message.guild.id}-${target.id}`;
    
    const userWarnings = warnings.get(key) || [];
    userWarnings.push({ reason, date: new Date() });
    warnings.set(key, userWarnings);

    message.channel.send(`${target.user.tag} uyarıldı.\nSebep: ${reason}\nToplam uyarı sayısı: ${userWarnings.length}`);
}; 