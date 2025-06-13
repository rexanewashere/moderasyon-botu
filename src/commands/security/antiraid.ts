import { Message, GuildMember, GuildVerificationLevel } from 'discord.js';

// Raid koruması için gerekli değişkenler
const joinedUsers = new Map<string, Array<{ userId: string, joinedAt: number }>>();
const RAID_THRESHOLD = 5; // 5 saniye içinde
const RAID_TIME_WINDOW = 5000; // 5 saniye
const ACCOUNT_AGE_THRESHOLD = 7 * 24 * 60 * 60 * 1000; // 7 gün

// Sunucu bazlı antiraid ayarları
const antiRaidSettings = new Map<string, boolean>();

export const run = async (message: Message, args: string[]) => {
    if (!message.member?.permissions.has('ManageGuild')) {
        return message.reply('Bu komutu kullanma yetkiniz yok!');
    }

    if (!message.guild) {
        return message.reply('Bu komut sadece sunucularda kullanılabilir!');
    }

    const action = args[0]?.toLowerCase();
    if (!action || (action !== 'aç' && action !== 'kapat')) {
        return message.reply('Kullanım: .antiraid <aç/kapat>');
    }

    if (action === 'aç') {
        antiRaidSettings.set(message.guild.id, true);
        message.channel.send('Anti-raid sistemi aktifleştirildi.');

        // Yeni üye katılma event listener'ı
        message.client.on('guildMemberAdd', async (member: GuildMember) => {
            if (!antiRaidSettings.get(member.guild.id)) return;

            const guildJoins = joinedUsers.get(member.guild.id) || [];
            const now = Date.now();

            // Eski kayıtları temizle
            const recentJoins = guildJoins.filter(join => now - join.joinedAt < RAID_TIME_WINDOW);

            // Yeni üyeyi ekle
            recentJoins.push({ userId: member.id, joinedAt: now });
            joinedUsers.set(member.guild.id, recentJoins);

            // Raid kontrolü
            if (recentJoins.length >= RAID_THRESHOLD) {
                // Raid tespit edildi
                message.channel.send('⚠️ Raid tespit edildi! Koruma önlemleri alınıyor...');

                // Son katılan üyeleri kontrol et
                recentJoins.forEach(async (join) => {
                    const raidMember = await member.guild.members.fetch(join.userId).catch(() => null);
                    if (raidMember) {
                        // Hesap yaşı kontrolü
                        const accountAge = now - raidMember.user.createdTimestamp;
                        if (accountAge < ACCOUNT_AGE_THRESHOLD) {
                            await raidMember.kick('Raid koruması: Yeni hesap tespiti').catch(console.error);
                        }
                    }
                });

                // Sunucuyu korumaya al
                try {
                    await member.guild.setVerificationLevel(GuildVerificationLevel.High);
                    message.channel.send('Sunucu doğrulama seviyesi yükseltildi.');
                } catch (error) {
                    console.error(error);
                }

                // Raid listesini temizle
                joinedUsers.delete(member.guild.id);
            }
        });
    } else {
        antiRaidSettings.delete(message.guild.id);
        message.channel.send('Anti-raid sistemi devre dışı bırakıldı.');
    }
}; 