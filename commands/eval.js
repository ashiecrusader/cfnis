const Discord = require('discord.js')
const wait = require('util').promisify(setTimeout);
const { SlashCommandBuilder } = require('@discordjs/builders')
const { inspect } = require('util');
const {db} = require('../firebaseinit')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('evaluate a snippet of code')
        .addStringOption(option =>
            option.setName('asyncnonasync')
            .setDescription('is the code async or non-async?')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('code')
            .setDescription('the code')
            .setRequired(true)),

    async execute(interaction){
        await interaction.deferReply();
        const opt = interaction.options.getString('asyncnonasync')
        const script = interaction.options.getString('code')

        if (interaction.user.id !== '704996899132014652') {
            const emb = new Discord.MessageEmbed()
                .setDescription(':x: You do not have permission to use that command!')
                .setColor([255, 0, 0])
            
            await interaction.editReply({embeds: [emb]})
            return;
        }
    
        try {

            let evaled;
            if(opt === '--non-async') {
                evaled = eval(script);
            }
            else if(opt === '--async' || !opt) {
                evaled = await eval(script);
            }
            const embedEvalField = inspect(evaled, { depth: 0 });   
            const succesEmbed = new Discord.MessageEmbed()
                .setColor('BLURPLE')
                .addFields(
                    { name: 'Script', value: `\`\`\`js\n${script}\n\`\`\``, inline: false },
                    { name: 'Output', value: `\`\`\`js\n${embedEvalField}\n\`\`\``, inline: false },
                    { name: 'Websocket latency', value: `\`\`\`js\n${interaction.client.ws.ping}\n\`\`\`` },
                )
                .setFooter({ text: `Type: ${typeof (evaled)}`})
                .setTimestamp();    
            await interaction.editReply({embeds: [succesEmbed]})
        }
        catch (error){
            await interaction.editReply({content: 'There was an error executing this command.'})
            console.log(error)
        }
}
}
