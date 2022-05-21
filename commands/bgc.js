const Discord = require('discord.js')
const noblox = require("noblox.js")
const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('util').promisify(setTimeout);
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const {db} = require('../firebaseinit')

module.exports ={
    data: new SlashCommandBuilder()
        .setName('bgc')
        .setDescription('is used to decide whether a use passes or not.')
        .addStringOption(option =>
            option.setName('roblox_username')
            .setDescription('roblox username')
            .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply();

try{
  const username1 = interaction.options.getString('roblox_username')
  let usid = await noblox.getIdFromUsername(username1)
  let usernamo = await noblox.getUsernameFromId(usid);

  const theThingWeNeed = usernamo

  await db.ref('/stats/' + `${interaction.user.id}`).once('value').then(async function(snapshot) {

    data = snapshot.val();
  
    if (data === null) {
  
      await db.ref('/stats/' + `${interaction.user.id}`).set({
        bgc: 1,
        check: 0,
      })
    } else {
  
      const incremented_number = data.bgc + 1
      await db.ref('/stats/' + `${interaction.user.id}`).update({bgc: incremented_number})
    }
  })


const emb = new Discord.MessageEmbed()
  .setAuthor({ name: 'Canadian Forces National Investigation Service'})
  .addFields(
    { name: "Username", value: `${usernamo}`, inline: true},
    { name: "User ID", value: `${usid}`, inline: true },
 )
  .setTimestamp()
  .setColor([0, 0, 255])
  .setThumbnail("https://cdn.discordapp.com/attachments/875346234318139412/875474680012763256/Canadian_Forces_National_Investigation_Service_Canada.png")
  .setFooter({ text: 'If you want to get the information of a user, do /check <user id>, this is for deciding whether a person fails or passes.'})

const plc = "1"
const row = new MessageActionRow()

let prob = ""
emb
.setDescription('There are no accept/decline buttons as the user is not in the background checks channel.')
await interaction.client.channels.cache.get('805721136217849897').messages.fetch({ limit: 20 })
.then(messages => {
     messages.filter(function(message){
    if(message.content.toLowerCase() === theThingWeNeed.toLowerCase()){
        row
          .addComponents(
            new MessageButton()
            .setCustomId('legit1')
            .setLabel('Accept')
            .setStyle('SUCCESS'),
        new MessageButton()
            .setCustomId('legit2')
            .setLabel('Decline')
            .setStyle('DANGER'),
          )
     
          emb
          .setDescription('You have got 10 seconds to press either button. This will automatically cancel by deleting in 10 seconds.');
         
    }
    })
})

row.addComponents(
  new MessageButton()
  .setLabel('🤵 User Profile')
  .setStyle('LINK')
  .setURL(`https://roblox.com/users/${usid}/profile`),
        
);

  await wait(200);
  await interaction.editReply({embeds:[emb], components: [row]})

  const filter = i => i.customId === 'legit1' || i.customId === 'legit2';

	const collector = interaction.channel.createMessageComponentCollector({ filter, time: 10000 });



	collector.on('collect', async i => {
		
    if (i.customId === 'legit1') {

      interaction.client.channels.cache.get('805721136217849897').messages.fetch({ limit: 20 })
      .then(messages => {
          var ee = messages.filter(function(message){
          if(message.content.toLowerCase() === theThingWeNeed.toLowerCase()){
              message.reply('Background check accepted.')
              message.react('✅')
              
          }
          })
	  		        
      })
	    
	        interaction.client.channels.cache.get('867083036910682142').send(`${usernamo}`)
      const legita1 = new Discord.MessageEmbed()
      .setDescription(`You have successfully accepted ${usernamo}'s background check!`)
      .setAuthor({ name: 'Canadian Forces National Investigation Service'})
      .setColor([0, 255, 0])
      .setThumbnail("https://cdn.discordapp.com/attachments/875346234318139412/875474680012763256/Canadian_Forces_National_Investigation_Service_Canada.png")
    
      await interaction.editReply({embeds:[legita1], components: []})
      // const logem2 = new Discord.MessageEmbed()
      // .setTitle('Someone just used the accept button!')
      // .addFields(
      //   { name: 'Username', value: `${interaction.user.username}#${interaction.user.discriminator}`},
      //   { name: 'ID', value: `${interaction.user.id}`}
      // )

      // interaction.client.channels.cache.get('879656528305594379').send({embeds:[logem2]})
  }

        if (i.customId === 'legit2') {
  
          const karanka = new MessageActionRow()
          .addComponents(
            new MessageSelectMenu()
               .setCustomId('select')
              .setPlaceholder('Nothing selected')
              .addOptions([
                {
                  label: 'Not enough messages',
                  description: 'User does not meet the required minimum 250 messages.',
                  value: 'nem',
                },
                {
                  label: 'Blacklisted',
                  description: 'This user is blacklisted from the CAF',
                  value: 'bled',
                },
                {
                  label: 'Not enough friends',
                  description: 'User does not meet the required minimum 15 friends requirement.',
                  value: 'nef1'
                },
                {
                  label: 'Not enough groups',
                  description: 'User does not meet the required minimum 5 groups requirement.',
                  value: 'neg1'
                },
                {
                  label: 'Account age too young',
                  description: 'User does not meet the required minimum 60 days of account age requirement.',
                  value: 'aaty1'
                },
                {
                  label: 'Worrying/too much CFMP arrests',
                  description: 'User has been arrested multiple times by CFMP or the reasons for the arrests are worrying.',
                  value: 'wtca'
                },
                {
                  label: 'Not in the main group',
                  description: 'User is not in the main CRC group.',
                  value: 'nimg'
                },
                {
                  label: 'Known affiliation with gangs/organized crime groups',
                  description: 'User has been participating in crimes w/ organized crime groups..',
                  value: 'kawg'
                },
		            { 
			            label: 'Known for breaking in game rules',
			            description: 'User is known for breaking the game rules',
			            value: 'kbgr',
		            },
		      
              ]),
          );

        prob = await interaction.followUp({content: `${usernamo}`, fetchReply: true, components: [karanka]})
        await interaction.editReply({content: 'Please pick a reason for failing the user using the menu below.', embeds: [emb], components: []})

      // const logem1 = new Discord.MessageEmbed()
      //         .setTitle('Someone just took a fat shit!')
      //         .addFields(
      //           { name: 'Username', value: `${interaction.user.username}#${interaction.user.discriminator}`},
      //           { name: 'ID', value: `${interaction.user.id}`}
      //         )
        
      //         interaction.client.channels.cache.get('879656543769989140').send({embeds:[logem1]})
      }
		})

    await wait(10000)
    await interaction.deleteReply();  
    interaction.client.channels.cache.get(interaction.channelId).messages.fetch(prob.id).then(message => {
      message.delete()
    })
	
} catch (error) {
  const emba = new Discord.MessageEmbed()
  .setColor('RED')
  .setTitle('An error occurred!')
  .setDescription(`\`\`\`${error}\n\`\`\``)
  .setFooter({ text: 'If you get any type of "provided user is invalid" errors even though the user is valid, it means that the ROBLOX API is down.'})
  await interaction.editReply({embeds: [emba]})
}
  
    },
}
