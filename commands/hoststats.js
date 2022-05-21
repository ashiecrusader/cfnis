const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const {db} = require('../firebaseinit')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hoststats')
        .setDescription('displays your host stats?')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('the user you want to view the stats of')
            .setRequired(false)),
    async execute(interaction) {
        await interaction.deferReply();

        const user = interaction.options.getUser('user')

        var display = ''
        var user_to_check = 0

        if (user === null) {
            display = 'Your'
            user_to_check = interaction.user.id
        } else {
            user_to_check = user.id
            display = `${user.username}'s`
        }   

        
        await db.ref('/hoststats/' + `${user_to_check}`).once('value').then(async function(snapshot) {

            data = snapshot.val();

            if (data === null){

                const error_embed = new Discord.MessageEmbed()
                    .setDescription('Couldn\'t find that entry in the database. This typically means that the user you\'re searching for has 0 events logged.')
                    .setColor('RED')

                await interaction.editReply({embeds: [error_embed]})
                } else {

                    const pos_embed = new Discord.MessageEmbed()
                        .setAuthor({ name: `${interaction.user.username}#${interaction.user.discriminator}`, iconURL: `${interaction.user.displayAvatarURL()}`})
                        .setTitle(`${display} host stats`)
                        .setDescription('This displays the amount of times a certain person has logged a DP-1 or BMQ. (Starting from 14/02/2022)')
                        .addFields(
                            { name: 'BMQ', value: `logged ${data.bmq} times`}, 
                            { name: 'DP-1', value: `logged ${data.dp1} times`}
                        )
                        .setColor([130, 13, 255])
                        .setFooter({ text: 'this serves 1% more purpose'})
                        .setThumbnail('https://media.discordapp.net/attachments/875346234318139412/875474680012763256/Canadian_Forces_National_Investigation_Service_Canada.png?width=515&height=664')
                        .setTimestamp();

                    await interaction.editReply({embeds: [pos_embed]})

                }


        })
    }
}