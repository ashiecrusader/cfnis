const Discord = require('discord.js')
const noblox = require("noblox.js")
const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const Trello = require('trello')
const trello  = new Trello("3319a7cf1e7d03ec2cb7dfc47bf165d9", "87894810fba3d4c18abd7eda5237e2a2128e6a38daa0f348a977351e5d06f45d")
const { db } = require('../firebaseinit')
const { Axios, default: axios } = require('axios')

module.exports ={
    data: new SlashCommandBuilder()
        .setName('check')
        .setDescription('gets 98% of data required for a background check')
        .addStringOption(option =>
            option.setName('username')
            .setDescription('ROBLOX username')
            .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply();

        const usrz = interaction.options.getString('username')          
try {
const usid = await noblox.getIdFromUsername(usrz);
let info = await noblox.getGroups(usid);
const friendCountB = await (await axios.get(`https://friends.roblox.com/v1/users/${usid}/friends/count`)).data.count
const unformatted_date = await (await axios.get(`https://users.roblox.com/v1/users/${usid}`)).data.created
const joinDate = new Date(unformatted_date)
const currentTime = new Date()
const ageA = Math.round(Math.abs((joinDate.getTime() - currentTime.getTime()) / (24 * 60 * 60 * 1000)))
let usernamo = await noblox.getUsernameFromId(usid);
let trll  = await noblox.getUsernameFromId(usid)
const user = await (await axios.get(`https://users.roblox.com/v1/users/${usid}`)).data
const followerCount = await (await axios.get(`https://friends.roblox.com/v1/users/${usid}/followers/count`)).data.count
const followingCount = await (await axios.get(`https://friends.roblox.com/v1/users/${usid}/followings/count`)).data.count


let groupCount = info.length-1

if(parseInt(groupCount) === -1){
  groupCount = 0  
}

await db.ref('/stats/' + `${interaction.user.id}`).once('value').then(async function(snapshot) {

  data = snapshot.val();

  if (data === null) {

    await db.ref('/stats/' + `${interaction.user.id}`).set({
      bgc: 0,
      check: 1
    })
  } else {

    const incremented_number = data.check + 1
    await db.ref('/stats/' + `${interaction.user.id}`).update({check: incremented_number})
  }
})


const emb = new Discord.MessageEmbed()
  .setAuthor({name: 'Canadian Forces National Investigation Service'})
  .addFields(
    { name: "Username", value: `${usernamo}`, inline: true},
    { name: "User ID", value: `${usid}`, inline: true },
    { name: "Groups", value: `${groupCount}`},
    { name: "Friends", value: `${friendCountB}`},
    { name: 'Followers', value: `${followerCount}`},
    { name: 'Following', value: `${followingCount}`},
    { name: 'Account Age', value: `${getFormatedStringFromDays(ageA)}` }
  )
  .setTimestamp()
  .setColor([98, 65, 232])
  .setThumbnail("https://cdn.discordapp.com/attachments/875346234318139412/875474680012763256/Canadian_Forces_National_Investigation_Service_Canada.png")
  .setFooter({ text: 'Please manually check the minimum messages requirement as I can not access that information!'})


if(friendCountB < 15){
emb
  .addFields(
    { name: ':exclamation: Warning!', value: '```diff\n- User does not meet the "minimum 15 friends" requirement.\n```'}
  )
}

if(info.length-1 < 5){
emb
  .addFields(
    { name: ':exclamation: Warning!', value: '```diff\n- User does not meet the "minimum 5 groups" requirement.\n```'}
  )
}

if(ageA < 60){
  emb
    .addFields(
      { name: `:exclamation: Warning!`, value: '```diff\n- User does not meet the "minimum 60 days account age" requirement.\n```' }
    )
}

                      for (var i = 0; i < info.length; i++) {
  if (info[i].Name === "Canadian Roleplay Community") {
    emb
    .addFields(
      { name: 'CRC Group', value: `✅ User is a part of the main group.`}
    )
  }
}
const plc = "1"
const row = new MessageActionRow()
			
interaction.client.channels.cache.get('805721136217849897').messages.fetch({ limit: 20 })
.then(messages => {
     messages.filter(function(message){
    if(message.content === `${usernamo}`){
      emb.addFields(
        { name: 'Background Check', value: 'This user is awaiting a background check, please do /bgc <userid> in order to decide if they pass or not.'}
      )
    }
    })
})

row
.addComponents(
  new MessageButton()
  .setLabel('🤵 User Profile')
  .setStyle('LINK')
  .setURL(`https://roblox.com/users/${usid}/profile`),
          new MessageButton()
          .setLabel('📚 CFDTC Background Checks')
          .setStyle('LINK')
          .setURL('https://trello.com/b/yF38j1QA/cadtc-background-checks'),
	new MessageButton()
		.setLabel('🧑‍⚖️ CFDTC Blacklists')
		.setStyle('LINK')
		.setURL('https://trello.com/b/GskgOSjC/cadtc-blacklist')
);

const poop = new MessageActionRow()
.addComponents(
  new MessageButton()
  .setLabel('🤵 User Profile')
  .setStyle('LINK')
  .setURL(`https://roblox.com/users/${usid}/profile`),
          new MessageButton()
          .setLabel('📚 CADTC Background Checks')
          .setStyle('LINK')
          .setURL('https://trello.com/b/yF38j1QA/cadtc-background-checks')
);

const groupBlacklists = await trello.getCardsOnList("60db5075f26a066a50cfafa3")

for (var a = 0; a < groupBlacklists.length; a++) {
for (var i = 0; i < info.length; i++) {

var grupid = parseInt(groupBlacklists[a].name)

if(info[i].Id === grupid){

    emb.addFields(
        { name: ':warning: Blacklisted Group', value: `This user is in a blacklisted group! (${info[i].Name})`}
    )
}
}
}

const blacklist_info = db.ref('blacklists/' + parseInt(usid)).once('value')
        .then(async function(snapshot) {

            data2 = snapshot.val()

            if (data2 === null) {
      
            
            } else {

              emb.addFields(
                {
                  name: ':warning: Blacklisted',
                  value: 'This user is currently blacklisted from the Canadian Armed Forces!'
                }
              )

            }
await interaction.editReply({embeds:[emb], components: [row]})
    
        })
    
// for (var i = 0; i < permBlacklists.length; i++) {
//  try {
//   // console.log('TEST PASSED'.green);
//    var id_on_board = await noblox.getIdFromUsername(permBlacklists[i].name)

//   if (parseInt(usid) === parseInt(id_on_board)) {
//     emb.addFields(
//       {
//         name: ':warning: Blacklisted!',
//         value: 'This user has a permanent blacklist.'
//       }
//     )
//   }

//  } catch (e) {
//   // console.log(`TEST FAILED: Name spelt incorrectly: ${permBlacklists[i].name}`.red);
//  }  
// }





	
  
  } catch (error) {
    console.log(error)
const emba = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle('An error occurred!')
    .setDescription(`\`\`\`${error}\n\`\`\``)
    .setFooter({ text: 'If you get any type of "provided user is invalid" errors even though the user is valid, then it just means you are completely trash!'})
    await interaction.editReply({embeds: [emba]})
}


function getFormatedStringFromDays(numberOfDays) {
  var years = Math.floor(numberOfDays / 365);
  var months = Math.floor(numberOfDays % 365 / 30);
  var days = Math.floor(numberOfDays % 365 % 30);

  var final_string = ''

  if (years !== 0){
    final_string += `${years}y `
  } 

  if (months !== 0) {
    final_string += `${months}m `
  }

  if(days !== 0) {
    final_string += `${days}d`
  }

  return final_string
}


    },
}


