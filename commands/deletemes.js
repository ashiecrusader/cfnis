const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('deletes a bot message')
        .setDefaultPermission(false)
        .addStringOption(option => 
        option.setName('message')
        .setDescription('the id of the message you want to delete')
        .setRequired(true)),
    async execute(interaction) {

       try {
        await interaction.reply({content: 'Deleted that message!', ephemeral: true})

        var msgid = interaction.options.getString('message')

		let acmsg = await interaction.channel.messages.fetch(msgid)

		acmsg.delete();

       } catch (error) {
        const emba = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('An error occurred!')
        .setDescription(`\`\`\`${error}\n\`\`\``)
        await interaction.reply({embeds: [emba]})
       }

    }
}