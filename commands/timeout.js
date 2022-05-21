const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('times a user out (used for fun :) )')
        .setDefaultPermission(false)
        .addUserOption(option => 
            option.setName('user_to_timeout')
            .setDescription('the user you want to timeout')
            .setRequired(true))
        .addStringOption(option =>
                option.setName('minutes')
                .setDescription('amount of minutes that the user will be timed out for')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('reason for the timeout')
            .setRequired(true)),

        async execute(interaction) {

            await interaction.deferReply();

            const user = interaction.options.getUser('user_to_timeout')
            const amount = interaction.options.getString('minutes')
            const reason = interaction.options.getString('reason')


            const guild = await interaction.client.guilds.cache.get(interaction.guildId)
            const user_ttu = await guild.members.cache.get(user.id)

            user_ttu.timeout(amount * 60 * 1000, reason)

            await interaction.editReply('User timed out!')

        }
}