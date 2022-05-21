const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ partials: ["CHANNEL"], intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_TYPING] });

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./config.json');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const clientId = '813337128586444821';
const guildId = '757253486953103461';

client.commands = new Collection();
const { Axios, default: axios } = require('axios')
const {db} = require('./firebaseinit')

var configRef2 = db.ref('/botconfig/')

configRef2.on('child_changed', async (snapshot) => {

	await db.ref('/botconfig/').once('value').then(async function(snapshot) {
		var data = snapshot.val()

		client.user.setActivity(`${data.status}`, { type: `${data.statustype}`})
	})
})



client.once('ready', async () => {

	await db.ref('/botconfig/').once('value').then(async function(snapshot){
		var data5 = snapshot.val();	  
		client.user.setActivity(`${data5.status}`, { type: `${data5.statustype}`})
	  })
})	



for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}


const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

const wait = require('util').promisify(setTimeout);

const { inspect } = require('util');

const Discord = require('discord.js');
const { data } = require('./commands/check');


client.on('messageCreate', async (message) => {
	if (message.content.startsWith('>eval')){

		if (message.author.id === '704996899132014652') {
			const guild = await client.guilds.fetch('757253486953103461')

			try{
			var result = message.content.split(" ").slice(1).join(" ")
			let evaled = await eval(result);

			const embedEvalField = inspect(evaled, { depth: 0 });   
            const succesEmbed = new Discord.MessageEmbed()
                .setColor('BLURPLE')
                .addFields(
                    { name: 'Script', value: `\`\`\`js\n${result}\n\`\`\``, inline: false },
                    { name: 'Output', value: `\`\`\`js\n${embedEvalField}\n\`\`\``, inline: false },
                    { name: 'Websocket latency', value: `\`\`\`js\n${client.ws.ping}\n\`\`\`` },
                )
                .setFooter({text:`Type: ${typeof (evaled)}`})
                .setTimestamp();   

				message.reply({embeds: [succesEmbed]})
				} catch (error) {
					const emba = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle('An error occurred!')
    .setDescription(`\`\`\`${error}\n\`\`\``)
	message.reply({embeds: [emba]})
				}
				
		} else {
			message.reply('You do not have permission to do that!')
		}


	}
	else if(message.content.startsWith('>function')) {
		if(message.author.id !== '704996899132014652') {
			return message.reply('You are not permitted to use this command!')
		}
		var result = message.content.split(" ").slice(1).join(" ")

		async function getApplicationCommands(intx) {
			const guildtf = client.guilds.cache.get(intx)
			let commands = 	await guildtf.commands.fetch()
			
			let commandos = ""
		
			commands.forEach(command => {
				commandos += `${command.name}: ${command.id}\n`
			});
		
			let str = '{\nXXX}'

			let finalr = str.replace("XXX", commandos)

			const succesEmbed2 = new Discord.MessageEmbed()
			.setColor('BLURPLE')
			.addFields(
				{ name: 'Script', value: `\`\`\`js\n${result}\n\`\`\``, inline: false },
				{ name: 'Output', value: `\`\`\`js\n${finalr}\n\`\`\``, inline: false },
				{ name: 'Websocket latency', value: `\`\`\`js\n${client.ws.ping}\n\`\`\`` },
			)
			.setFooter(`Type: ApplicationCommand`)
			.setTimestamp();   

			message.reply({embeds: [succesEmbed2]})
		
					}

			await eval(result)
	}
	else if(message.content.startsWith('>reply')) {
		
var prefix = ">"

		message.delete();

		var msg = message.content.split(" ").slice(2).join(" ")
		var msgid = message.content.slice(prefix.length).trim().split(/ +/g)[1]

		console.log('msg: ', msg)
		console.log('msgid: ', msgid)

		let acmsg = await message.channel.messages.fetch(msgid)

		acmsg.reply(msg)
	} else if (message.content.startsWith('>dm')) {
		if (message.author.id !== '704996899132014652') { 
			return message.reply('You are not allowed to use that command!')
		}

		message.delete();
		var msg = message.content.split(" ").slice(2).join(" ")
		var userida = message.content.slice(1).trim().split(/ +/g)[1]

		let guas = await client.guilds.fetch('757253486953103461')

		let acuser = (await guas.members.fetch(userida)).send(msg)
	} 
})

client.on('messageCreate', async (message) => {
	if(message.channel.type === "DM") {
		if (message.author.bot) {
			return
		}

	 const guild = await client.guilds.fetch('877523080463917117')
	 const channel = await guild.channels.fetch('911923860662784041')

	 channel.send(`**${message.author.username}#${message.author.discriminator} (${message.author.id})**: ${message.content}`)
	}
})

client.on('messageCreate', async (message) => {

	if (message.channel.id === '785613074244567080') {
		if (message.content.includes('BMQ') || message.content.includes('bmq')){

			await db.ref('/hoststats/' + `${message.author.id}`).once('value').then(async function(snapshot) {
	
				data2 = snapshot.val()
	
				if (data2 === null) {
	
					await db.ref('/hoststats/' + `${message.author.id}`).set({
					  bmq: 1,
					  dp1: 0
					})
				  } else {
				
					const incremented_number = data2.bmq + 1
					await db.ref('/hoststats/' + `${message.author.id}`).update({bmq: incremented_number})
				  }
			})
	
		}	
	}

	if (message.channel.id === '766812206384807977') {
		if (message.content.includes('DP-1') || message.content.includes('DP1') || message.content.includes('dp-1') || message.content.includes('dp1')){

			await db.ref('/hoststats/' + `${message.author.id}`).once('value').then(async function(snapshot) {
	
				data2 = snapshot.val()
	
				if (data2 === null) {
	
					await db.ref('/hoststats/' + `${message.author.id}`).set({
					  bmq: 0,
					  dp1: 1
					})
				  } else {
				
					const incremented_number = data2.dp1 + 1
					await db.ref('/hoststats/' + `${message.author.id}`).update({dp1: incremented_number})
				  }
			})
	
		}	
	}
	
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;
	
var sent = false
const chaid = "805721136217849897"
var lmt = 20

     if(interaction.values[0] === 'nem'){
		const per = interaction.message.content.toLowerCase()

    interaction.client.channels.cache.get(chaid).messages.fetch({ limit: lmt })
     .then(messages => {
      var ee = messages.filter(function(message){
		if(message.content.toLowerCase() === `${per}`){

        message.reply('Background check declined for not enough messages (250).')
	message.react('❌')
		sent = true

      }
      })
    })
	} else if(interaction.values[0] === 'bled'){
		const per = interaction.message.content.toLowerCase()


		interaction.client.channels.cache.get(chaid).messages.fetch({ limit: lmt })
		 .then(messages => {
		  var ee = messages.filter(function(message){
			if(message.content.toLowerCase() === `${per}`){

			message.reply('Background check declined. User is blacklisted from the CAF.')
			sent = true
	message.react('❌')
		  }
		  })
		})
	} else if(interaction.values[0] === 'nef1'){
		const per = interaction.message.content.toLowerCase()


		interaction.client.channels.cache.get(chaid).messages.fetch({ limit: lmt })
		 .then(messages => {
		  var ee = messages.filter(function(message){
			if(message.content.toLowerCase() === `${per}`){

			message.reply('Background check declined for not meeting the minimum 15 friends requirement.')
			sent = true
	message.react('❌')
		  }
		  })
		})
	} else if(interaction.values[0] === 'neg1'){
		const per = interaction.message.content.toLowerCase()


		interaction.client.channels.cache.get(chaid).messages.fetch({ limit: lmt })
		 .then(messages => {
		  var ee = messages.filter(function(message){
			if(message.content.toLowerCase() === `${per}`){

			message.reply('Background check declined for not meeting the minimum 5 groups requirement.')
			sent = true
	message.react('❌')
		  }
		  })
		})
	} else if(interaction.values[0] === 'aaty1'){
		const per = interaction.message.content.toLowerCase()


		interaction.client.channels.cache.get(chaid).messages.fetch({ limit: lmt })
		 .then(messages => {
		  var ee = messages.filter(function(message){
			if(message.content.toLowerCase() === `${per}`){

			message.reply('Background check declined: user account age is too low. (minimum 60 days).')
			sent = true
	message.react('❌')
		  }
		  })
		})
	} else if(interaction.values[0] === 'wtca'){
		const per = interaction.message.content.toLowerCase()


		interaction.client.channels.cache.get(chaid).messages.fetch({ limit: lmt })
		 .then(messages => {
		  var ee = messages.filter(function(message){
			if(message.content.toLowerCase() === `${per}`){

			message.reply('Background check declined: worrying/too much CFMP arrests.')
			sent = true
	message.react('❌')
		  }
		  })
		})
	} else if(interaction.values[0] === 'nimg'){
		const per = interaction.message.content.toLowerCase()


		interaction.client.channels.cache.get(chaid).messages.fetch({ limit: lmt })
		 .then(messages => {
		  var ee = messages.filter(function(message){
		  if(message.content.toLowerCase() === `${per}`){
			message.reply('Background check declined: user is not in main group.')
			sent = true
	message.react('❌')
		  }
		  })
		})
	} else if(interaction.values[0] === 'kawg'){
		const per = interaction.message.content.toLowerCase()


		interaction.client.channels.cache.get(chaid).messages.fetch({ limit: lmt })
		 .then(messages => {
		  var ee = messages.filter(function(message){
			if(message.content.toLowerCase() === `${per}`){

			message.reply('Background check declined: known affiliation with gangs/organized crime.')
			sent = true
			  	message.react('❌')
		  }
		  })
		})
	}


let getitid = interaction.message.id	
if(sent = true){
interaction.reply({content: 'All good! I have notified the person who requested the background check!'})
}
await wait(5000)
// interaction.client.channels.cache.get(interaction.channelId).messages.fetch(interaction.message.id)
// 	.then(message => message.delete())

// await interaction.deleteReply();

  });

var db_avail = true

  var configRef = db.ref('/botconfig')


  configRef.on('child_changed', (snapshot) => {
	 var ele = snapshot.val()
	 db_avail = ele
  })
  
   db.ref('/botconfig/accessible').once('value').then(async function(snapshot){
	var data4 = snapshot.val();
	db_avail = data4
  })

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {

		if (db_avail) {
		await command.execute(interaction);
		} else {
			await interaction.reply({ content: 'The bot is currently out of serivce due to some of the required ROBLOX Endpoints being down, please wait until those endpoints are back up.', ephemeral: true})
		}
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);
