const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('says something')
        .addStringOption(option => 
        option.setName('message')
        .setDescription('the message you want to send')
        .setRequired(true)),
    async execute(interaction){ 
        if (interaction.user.id !== '704996899132014652'){
            await interaction.reply('You are not allowed to use that command!')
            return;
        }

       try {
        await interaction.reply({content: 'Sent', ephemeral: true})

        const msg = interaction.options.getString('message')

        await interaction.channel.send(`${msg}`)
        
       } catch (error) {
           await interaction.reply({content: 'Something went wrong', ephemeral: true})
       }
    }
}