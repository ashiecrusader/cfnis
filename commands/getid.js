const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);
const noblox = require('noblox.js')
const Discord = require('discord.js')

module.exports ={
    data: new SlashCommandBuilder()
        .setName('getid')
        .setDescription('gets a user id from a username')
        .addStringOption(option =>
            option.setName('username')
            .setDescription('the roblox username of the person you want the id of')
            .setRequired(true)
        ),

async execute(interaction) {

const usid = interaction.options.getString('username')

await interaction.deferReply();
   
try{
    
    const pp = await noblox.getIdFromUsername(usid)
    const currentus = await noblox.getUsernameFromId(pp)
    await interaction.editReply(`${currentus}:${pp}`)

} catch (error) {
const emba = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle('An error occurred!')
    .setDescription(`\`\`\`${error}\n\`\`\``)
    .setFooter({ text: 'If you get any type of "provided user is invalid" errors even though the user is valid, it means that the ROBLOX API is down.'})

    await interaction.editReply({embeds: [emba]})
}
}
}
