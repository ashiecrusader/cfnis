const { SlashCommandBuilder } = require('@discordjs/builders')
const noblox = require('noblox.js')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('shows roblox information about a user')
        .addStringOption(option => 
        option.setName('username')
        .setDescription('the username i guess')
        .setRequired(true)),
    
    async execute(interaction) {
        await interaction.deferReply();
cmd
        const opt = interaction.options.getString('username')

     try {
        let theid = await noblox.getIdFromUsername(opt)
        let user = await noblox.getPlayerInfo(theid)
        let userAvatar = await noblox.getPlayerThumbnail(theid)

        console.log(interaction.user)
        const emb = new Discord.MessageEmbed()
            .setThumbnail(`${userAvatar[0].imageUrl}`)
            .setColor('BLURPLE')
            .setTitle('User Information')
            .setAuthor({ name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.displayAvatarURL()}` })
            .setTimestamp()
            .setFooter({ text: 'i love chicken nuggies.'})

            let banned = false 

            if (user.isBanned === true) {
                emb.setDescription('*This user is banned!*')
                banned = true
            } 

        // lists username & displayname

        emb.addField("Username", `[${user.username}](https://www.roblox.com/users/${theid}/profile)`, true)
        if(user.displayName) {
        emb.addField("Display Name", `${user.displayName}`, true)
        }

        emb.addField("User ID", `${theid}`)

        if(user.status) {
            emb.addField("Status", `${user.status}`, false)
        }
        
        if (user.blurb) {
            emb.addField("Blurb", `${user.blurb}`)
        }

        if(user.age) {
            emb.addField('Age', `${user.age} days`)
        }

        emb.addField("Join Date", `${user.joinDate}`)

        if(user.friendCount) {
            emb.addField("Friends", `${user.friendCount}`, true)
        }

        if(user.followerCount) {
            emb.addField("Followers", `${user.followerCount}`, true)
        }

        if(user.followingCount) {
            emb.addField("Following", `${user.followingCount}`, true)
        }

        // lists old names
        console.log("old names ", user.oldNames)

        if(banned === false) {
            if(user.oldNames.length !== 0){
                let oldNames = user.oldNames
    
                let reply = ""
                for (var i = 0; i < oldNames.length; i++) {
                    reply += `${oldNames[i]}, `
                }
        
                reply = reply.substring(0, reply.length - 2);
        
                emb.addField("Old Names", reply, true)
        }
        }
        await interaction.editReply({embeds: [emb]})
     } catch (error) {
         await interaction.editReply('I was unable to find that user!')
        
     }
    }
}