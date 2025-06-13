import { Client, GatewayIntentBits, Message, Collection, ActivityType } from 'discord.js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessageReactions
    ]
});

// Komutları saklamak için Collection
const commands = new Collection<string, any>();

// Komutları yükle
async function loadCommands(dir: string) {
    try {
        const files = fs.readdirSync(dir);

        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                await loadCommands(filePath);
            } else if (file.endsWith('.ts') || file.endsWith('.js')) {
                try {
                    const command = await import(filePath);
                    const commandName = file.split('.')[0];
                    commands.set(commandName, command);
                    console.log(`Komut yüklendi: ${commandName}`);
                } catch (error) {
                    console.error(`Komut yüklenemedi: ${file}`, error);
                }
            }
        }
    } catch (error) {
        console.error('Komutlar yüklenirken hata oluştu:', error);
    }
}

const prefix = '.';

client.once('ready', async () => {
    console.log(`Bot ${client.user?.tag} olarak giriş yaptı!`);
    
    // Bot durumunu ayarla
    client.user?.setPresence({
        activities: [{ 
            name: 'wrx 🖤 rexane', 
            type: ActivityType.Streaming,
            url: 'https://www.twitch.tv/rexane'
        }],
        status: 'online'
    });

    // Komutları yükle
    const commandsPath = path.join(__dirname, 'commands');
    console.log('Komutlar yükleniyor...');
    await loadCommands(commandsPath);
    console.log(`Toplam ${commands.size} komut yüklendi!`);
});

client.on('messageCreate', async (message: Message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();

    if (!commandName) return;

    const command = commands.get(commandName);
    if (!command) {
        console.log(`Komut bulunamadı: ${commandName}`);
        return;
    }

    try {
        await command.run(message, args);
    } catch (error) {
        console.error(`Komut çalıştırılırken hata oluştu (${commandName}):`, error);
        message.reply('Komut çalıştırılırken bir hata oluştu!');
    }
});

// Hata yakalama
process.on('unhandledRejection', (error) => {
    console.error('Yakalanmamış hata:', error);
});

client.login(process.env.TOKEN); 