const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('returns all commands'),
    async execute(interaction) {

        await interaction.deferReply();

        const commands = await interaction.guild.commands.fetch()

        let commandsList = "**All commands registered in this guild!**\n\n"

        commands.forEach(command => {
            commandsList += `⌨️ /${command.name}\n:question: ${command.description}\n----------------\n`
        })

        await interaction.editReply(`${commandsList}`)

    }
}