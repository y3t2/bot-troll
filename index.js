const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

const prefix = '+';
const allowedRoleIDs = ['ID_ROLE_1', 'ID_ROLE_2']; 

let lockedUsers = {};

if (fs.existsSync('lockedUsers.json')) {
    lockedUsers = JSON.parse(fs.readFileSync('lockedUsers.json', 'utf8'));
}

function saveLockedUsers() {
    fs.writeFileSync('lockedUsers.json', JSON.stringify(lockedUsers, null, 4));
}

client.on('ready', () => {
    console.log(`Bot connecté en tant que ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith(prefix + 'uwu')) {
        const responses = [
            `Espèce de E-Girl ${message.author}`,
            `Espèce de E-Boy ${message.author}`
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        message.channel.send(randomResponse);
    }

    if (message.content.startsWith(prefix + 'hack')) {
        let target = message.mentions.users.first() || message.author;

        await message.channel.send(`🔍 Recherche des informations de ${target.username}...`);
        setTimeout(async () => {
            await message.channel.send(`📥 Récupération de l'IP...`);
            setTimeout(async () => {
                await message.channel.send(`💻 Adresse IP : 192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`);
                setTimeout(async () => {
                    await message.channel.send(`🗃️ Récupération des mots de passe...`);
                    setTimeout(async () => {
                        await message.channel.send(`✅ ${target.username} a été "hack" avec succès !`);
                    }, 2000);
                }, 2000);
            }, 2000);
        }, 2000);
    }

    if (message.content.startsWith(prefix + 'help')) {
        const helpEmbed = new EmbedBuilder()
            .setColor(0xFF69B4)
            .setTitle('📜 Liste des Commandes')
            .setDescription('Voici les commandes disponibles :')
            .addFields(
                { name: '+uwu', value: 'Te traite d\'E-Girl ou d\'E-Boy' },
                { name: '+hack [@user]', value: 'Fait semblant de hacker quelqu\'un' },
                { name: '+lockpseudo @user', value: 'Verrouille le pseudo d\'un membre' },
                { name: '+unlockpseudo @user', value: 'Déverrouille le pseudo d\'un membre' },
                { name: '+help', value: 'Affiche ce message d\'aide' }
            )
            .setFooter({ text: `Demandé par ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

        message.channel.send({ embeds: [helpEmbed] });
    }

    if (message.content.startsWith(prefix + 'lockpseudo')) {
        if (!message.member.roles.cache.some(role => allowedRoleIDs.includes(role.id))) {
            return message.reply('🚫 Tu n\'as pas la permission d\'utiliser cette commande.');
        }

        const member = message.mentions.members.first();
        if (!member) return message.reply('Tu dois mentionner un membre !');

        lockedUsers[member.id] = member.displayName;
        saveLockedUsers();

        message.channel.send(`🔒 Le pseudo de ${member} a été verrouillé sur : **${member.displayName}**`);
    }

    if (message.content.startsWith(prefix + 'unlockpseudo')) {
        if (!message.member.roles.cache.some(role => allowedRoleIDs.includes(role.id))) {
            return message.reply('🚫 Tu n\'as pas la permission d\'utiliser cette commande.');
        }

        const member = message.mentions.members.first();
        if (!member) return message.reply('Tu dois mentionner un membre !');

        if (lockedUsers[member.id]) {
            delete lockedUsers[member.id];
            saveLockedUsers();
            message.channel.send(`🔓 Le pseudo de ${member} a été déverrouillé.`);
        } else {
            message.channel.send(`❌ Ce membre n'a pas de pseudo verrouillé.`);
        }
    }
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
    if (lockedUsers[newMember.id]) {
        const lockedName = lockedUsers[newMember.id];
        if (newMember.displayName !== lockedName) {
            newMember.setNickname(lockedName).catch(() => {});
            console.log(`Pseudo de ${newMember.user.tag} réinitialisé à ${lockedName}`);
        }
    }
});

client.login('BOT_TOKEN'); 
