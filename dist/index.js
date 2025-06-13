"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv = __importStar(require("dotenv"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
dotenv.config();
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildBans,
        discord_js_1.GatewayIntentBits.GuildMessageReactions
    ]
});
// Komutları saklamak için Collection
const commands = new discord_js_1.Collection();
// Komutları yükle
async function loadCommands(dir) {
    try {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                await loadCommands(filePath);
            }
            else if (file.endsWith('.ts') || file.endsWith('.js')) {
                try {
                    const command = await Promise.resolve(`${filePath}`).then(s => __importStar(require(s)));
                    const commandName = file.split('.')[0];
                    commands.set(commandName, command);
                    console.log(`Komut yüklendi: ${commandName}`);
                }
                catch (error) {
                    console.error(`Komut yüklenemedi: ${file}`, error);
                }
            }
        }
    }
    catch (error) {
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
                type: discord_js_1.ActivityType.Streaming,
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
client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot)
        return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();
    if (!commandName)
        return;
    const command = commands.get(commandName);
    if (!command) {
        console.log(`Komut bulunamadı: ${commandName}`);
        return;
    }
    try {
        await command.run(message, args);
    }
    catch (error) {
        console.error(`Komut çalıştırılırken hata oluştu (${commandName}):`, error);
        message.reply('Komut çalıştırılırken bir hata oluştu!');
    }
});
// Hata yakalama
process.on('unhandledRejection', (error) => {
    console.error('Yakalanmamış hata:', error);
});
client.login(process.env.TOKEN);
