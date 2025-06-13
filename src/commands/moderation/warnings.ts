import { Message } from 'discord.js';

// warn.ts'den warnings Map'ini kullanıyoruz
declare const warnings: Map<string, Array<{ reason: string, date: Date }>>;

export const run = async (message: Message, args: string[]) => {
    if (!message.guild) {
        return message.reply('Bu komut sadece sunucularda kullanılabilir!');
    }

    const target = message.mentions.members?.first() || message.member;
    if (!target) {
        return message.reply('Kullanıcı bulunamadı!');
    }

    const key = `${message.guild.id}-${target.id}`;
    const userWarnings = warnings.get(key) || [];

    if (userWarnings.length === 0) {
        return message.channel.send(`${target.user.tag} kullanıcısının hiç uyarısı yok.`);
    }

    const warningList = userWarnings
        .map((warn, index) => `${index + 1}. Sebep: ${warn.reason} (${warn.date.toLocaleDateString()})`)
        .join('\n');

    message.channel.send(`${target.user.tag} kullanıcısının uyarıları:\n${warningList}`);
}; 