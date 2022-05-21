const Discord = require('discord.js')
const noblox = require("noblox.js")
const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const Trello = require('trello')
const trello  = new Trello("3319a7cf1e7d03ec2cb7dfc47bf165d9", "87894810fba3d4c18abd7eda5237e2a2128e6a38daa0f348a977351e5d06f45d")
const { db } = require('../firebaseinit')

module.exports ={
    data: new SlashCommandBuilder()
        .setName('runtest')
        .setDescription('runs a test on the blacklists')
        .addStringOption(option => 
            option.setName('which')
            .setDescription('yes')
            .setRequired(true)
             .addChoice('Permanent', 'p')
             .addChoice('Temporary', 't')),

    async execute(interaction) {
        await interaction.deferReply();

        const opt = interaction.options.getString('which')
try {


const permBlacklists = await trello.getCardsOnList('60285559aba41178a4ebd9c5')
const tempBlacklists = await trello.getCardsOnList('60285560be64514300447ff5')

const colors = require('colors')

if (opt === 'p') {
    console.log('---------- PERM TEST ----------'.yellow)

    var passed_tests = 0
    var failed_tests = 0

    for (var i = 0; i < permBlacklists.length; i++) {


        try {
         

            var id_on_board = await noblox.getIdFromUsername(permBlacklists[i].name)
            console.log('TEST PASSED'.green);
            passed_tests++
         
          } catch (e) {
           console.log(`TEST FAILED: Name spelt incorrectly: ${permBlacklists[i].name}`.red);
           failed_tests++
          }  

         


       }

       console.log(`---------- RESULTS ----------\nCategory: permanent blacklists\nPassed tests: ${passed_tests}/${permBlacklists.length}\nFailed tests: ${failed_tests}/${permBlacklists.length}`.cyan)
} else if (opt === 't') {
    console.log('---------- TEMP TEST ----------'.yellow)

    var passed_tests = 0
    var failed_tests = 0

    for (var i = 0; i < tempBlacklists.length; i++) {


        try {
         

            var id_on_board = await noblox.getIdFromUsername(tempBlacklists[i].name)
            console.log('TEST PASSED'.green);
            passed_tests++
         
          } catch (e) {
           console.log(`TEST FAILED: Name spelt incorrectly: ${tempBlacklists[i].name}`.red);
           failed_tests++
          }  

         


       }

       console.log(`---------- RESULTS ----------\nCategory: temporary blacklists\nPassed tests: ${passed_tests}/${tempBlacklists.length}\nFailed tests: ${failed_tests}/${tempBlacklists.length}`.cyan)
}


await interaction.editReply('check your console!')



  
  } catch (error) {
    console.log(error)
const emba = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle('An error occurred!')
    .setDescription(`\`\`\`${error}\n\`\`\``)
    await interaction.editReply({embeds: [emba]})
}
    },
}
