import { Message, EmbedBuilder } from 'discord.js';

export const run = async (message: Message, args: string[]) => {
    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Bot Komutları')
        .setDescription('Tüm komutlar için prefix: `.`')
        .addFields(
            {
                name: '📋 Temel Moderasyon Komutları',
                value: '`.ban` - Kullanıcıyı sunucudan yasaklar\n' +
                    '`.kick` - Kullanıcıyı sunucudan atar\n' +
                    '`.mute` - Kullanıcıyı susturur\n' +
                    '`.unmute` - Kullanıcının susturmasını kaldırır\n' +
                    '`.warn` - Kullanıcıya uyarı verir\n' +
                    '`.warnings` - Kullanıcının uyarılarını görüntüler\n' +
                    '`.clear` - Belirtilen sayıda mesaj siler'
            },
            {
                name: '⚙️ Sunucu Yönetim Komutları',
                value: '`.slowmode` - Kanala yavaş mod ekler\n' +
                    '`.lock` - Kanalı kilitler\n' +
                    '`.unlock` - Kanal kilidini kaldırır\n' +
                    '`.role` - Rol verir/alır\n' +
                    '`.autorole` - Otomatik rol ayarlar'
            },
            {
                name: 'ℹ️ Bilgi Komutları',
                value: '`.userinfo` - Kullanıcı bilgilerini gösterir\n' +
                    '`.serverinfo` - Sunucu bilgilerini gösterir\n' +
                    '`.roleinfo` - Rol bilgilerini gösterir'
            },
            {
                name: '🛡️ Güvenlik Komutları',
                value: '`.antiraid` - Raid koruması\n' +
                    '`.antispam` - Spam koruması\n' +
                    '`.blacklist` - Yasaklı kelime listesi yönetimi'
            },
            {
                name: '📝 Log Sistemi',
                value: '`.setlog` - Log kanalı ayarlar\n' +
                    '`.modlog` - Moderasyon loglarını görüntüler'
            }
        )
        .setTimestamp()
        .setFooter({ text: 'Daha detaylı bilgi için komutları tek tek kullanın.' });

    message.channel.send({ embeds: [embed] });
}; 