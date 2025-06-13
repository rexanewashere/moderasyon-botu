"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
// Yasaklı kelimeler listesi (sunucu bazlı)
const blacklistedWords = new Map();
const run = async (message, args) => {
    if (!message.member?.permissions.has('ManageGuild')) {
        return message.reply('Bu komutu kullanma yetkiniz yok!');
    }
    if (!message.guild) {
        return message.reply('Bu komut sadece sunucularda kullanılabilir!');
    }
    const action = args[0]?.toLowerCase();
    if (!action || !['ekle', 'kaldır', 'liste'].includes(action)) {
        return message.reply('Kullanım: .blacklist <ekle/kaldır/liste> [kelime]');
    }
    // Sunucunun yasaklı kelimeler listesini al
    const guildWords = blacklistedWords.get(message.guild.id) || new Set();
    switch (action) {
        case 'ekle': {
            const word = args[1]?.toLowerCase();
            if (!word) {
                return message.reply('Lütfen yasaklanacak kelimeyi belirtin!');
            }
            guildWords.add(word);
            blacklistedWords.set(message.guild.id, guildWords);
            message.channel.send(`"${word}" kelimesi yasaklı kelimeler listesine eklendi.`);
            // Mesaj kontrol event listener'ı
            message.client.on('messageCreate', async (msg) => {
                if (msg.author.bot || !msg.guild)
                    return;
                const guildBlacklist = blacklistedWords.get(msg.guild.id);
                if (!guildBlacklist)
                    return;
                const content = msg.content.toLowerCase();
                for (const word of guildBlacklist) {
                    if (content.includes(word)) {
                        try {
                            await msg.delete();
                            msg.channel.send(`${msg.author}, yasaklı kelime kullanımı tespit edildi!`)
                                .then(warning => setTimeout(() => warning.delete(), 5000));
                            break;
                        }
                        catch (error) {
                            console.error(error);
                        }
                    }
                }
            });
            break;
        }
        case 'kaldır': {
            const word = args[1]?.toLowerCase();
            if (!word) {
                return message.reply('Lütfen kaldırılacak kelimeyi belirtin!');
            }
            if (guildWords.has(word)) {
                guildWords.delete(word);
                blacklistedWords.set(message.guild.id, guildWords);
                message.channel.send(`"${word}" kelimesi yasaklı kelimeler listesinden kaldırıldı.`);
            }
            else {
                message.reply('Bu kelime zaten yasaklı listede değil!');
            }
            break;
        }
        case 'liste': {
            const wordList = Array.from(guildWords).join(', ');
            if (wordList.length === 0) {
                message.channel.send('Yasaklı kelime listesi boş.');
            }
            else {
                message.channel.send(`Yasaklı kelimeler: ${wordList}`);
            }
            break;
        }
    }
};
exports.run = run;
