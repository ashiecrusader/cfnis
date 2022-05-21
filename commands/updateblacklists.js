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
        .setName('updateblacklists')
        .setDescription('pushes all blacklists to db'),

    async execute(interaction) {
        await interaction.deferReply();



const colors = require('colors');

var tfails = 0
var tsuc = 0
var pfails = 0
var psuc = 0

const tempBlacklists = await trello.getCardsOnList("60285560be64514300447ff5")
console.log('--------- TEMPORARY UPDATE ---------'.yellow)
console.log(tempBlacklists[2])

for (var i = 0; i < tempBlacklists.length; i++) {

  try {
    var id_on_board = await noblox.getIdFromUsername(tempBlacklists[i].name)
 
     const object2 = {
         type: 'temp',
         cardId: `${tempBlacklists[i].id}`,
         reason: `${tempBlacklists[i].desc}`
     }
 
    db.ref("blacklists/" + `${id_on_board}`).set(object2, function(error) {
     if (error) {
       // The write failed...
     } else {
       // The write was successful...
       console.log("WRITE SUCCESSFULL".green)
       tsuc++
     }
 })
 
  } catch (e) {
   console.log(`WRITE FAILED`.red);
   tfails++
  }  
 
 
 }

 const permBlacklists = await trello.getCardsOnList("60285559aba41178a4ebd9c5")

 console.log('--------- PERMANENT UPDATE ---------'.yellow)
 for (var i = 0; i < permBlacklists.length; i++) {

  try {
    var id_on_board = await noblox.getIdFromUsername(permBlacklists[i].name)
 
     const object2 = {
         type: 'perm',
         cardId: `${permBlacklists[i].id}`,
         reason: `${permBlacklists[i].desc}`
     }
 
    db.ref("blacklists/" + `${id_on_board}`).set(object2, function(error) {
     if (error) {
       // The write failed...
     } else {
       // The write was successful...
       console.log("WRITE SUCCESSFULL".green)
       psuc++
     }
 })
 
  } catch (e) {
   console.log(`WRITE FAILED`.red);
   pfails++
  }  
 
 
 }
 
setTimeout(() => {
  console.log(`--------- WRITE OPERATION COMPLETED ---------\nSucceeded temp blacklist writes: ${tsuc}/${tempBlacklists.length}\nFailed temp blacklist writes: ${tfails}/${tempBlacklists.length}\nSucceeded perm blacklist writes: ${psuc}/${permBlacklists.length}\nFailed perm blacklist writes: ${pfails}/${permBlacklists.length}\n`.cyan)
}, 500);

await interaction.editReply('done') 
    }
}

