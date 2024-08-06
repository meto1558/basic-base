const { Client, GatewayIntentBits, Message } = require("discord.js");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const client = new Client({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.Guilds
    ]
});

/**
 * Daha fazla "ready" olayı hakkında bilgiyi ornekler/ready_examples.js'de bulabilirsiniz.
 * once, on, off fonksiyonunlarının ne işe yaradığını bilmiyorsanız, ornekler/event_handlers.js'e bakabilirsiniz.
 */
client.once("ready", () => {
    console.log(`${client.user.displayName} olarak giriş yapıldı.`);
});

client.on("messageCreate", async (message) => {
    const PREFIX = "!"; // Bunu değiştirebilirsiniz
    const commandsPath = path.join(__dirname, "./komutlar");
    const commandFiles = fs.readdirSync(commandsPath).filter((files) => files.endsWith(".js"));
    
    for (const file of commandFiles) {
        const commands = path.join(commandsPath, file);
        const command = require(commands);

        if (message.content.startsWith(PREFIX + command.name)) 
            command.execute(message);
    }
});

// Discord'a bağlanma
client.login(process.env.TOKEN); // TOKEN değerini .env dosyasında kendi botunuzun tokeni ile değişmeyi unutmayın.
