const Discord = require('discord.js')
const moment = require('moment')
const chalk = require('chalk')
const Gamedig = require('gamedig')

const client = new Discord.Client()

const { token, AWPChannel, MirageChannel, ArenaChannel, FFAChannel, updateinterval } = require('./config.json')

client.once('ready', () => {
    const AWP = client.channels.cache.get(AWPChannel)
    const Mirage = client.channels.cache.get(MirageChannel)
    const Arena = client.channels.cache.get(ArenaChannel)
    const ffa = client.channels.cache.get(FFAChannel)

    setInterval(() => {
        const awpdig = new Gamedig({})
        const miragedig = new Gamedig({})
        const arenadig = new Gamedig({})
        const ffadig = new Gamedig({})

        awpdig.query({
            type: 'csgo',
            host: '145.239.237.135',
            port: '27015'
        }).then((state) => {
            // console.log(state.raw.numplayers)
            AWP.edit({ name: `🥈┋AWP: ${state.raw.numplayers}/${state.maxplayers}`})
        }).catch((err) => {
            // console.log("Server is offline")
            AWP.edit({ name: '🥈┋AWP: Offline' })
        })

        miragedig.query({
            type: 'csgo',
            host: '91.224.117.39',
            port: '27070'
        }).then((state) => {
            // console.log(state.raw.numplayers)
            Mirage.edit({ name: `🥇┋Mirage: ${state.raw.numplayers}/${state.maxplayers}`})
        }).catch((err) => {
            console.log(err)
            Mirage.edit({name: '🥇┋Mirage: Offline'})
        })

        arenadig.query({
            type: 'csgo',
            host: '145.239.237.104',
            port: '27060'
        }).then((state) => {
            // console.log(state.raw.numplayers)
            Arena.edit({ name: `🥉┋Areny 1v1: ${state.raw.numplayers}/${state.maxplayers}`})
        }).catch((err) => {
            // console.log("Server is offline")
            Arena.edit({name: '🥉┋Areny 1v1: Offline'})
        })

        ffadig.query({
            type: 'cs16',
            host: '147.135.199.82',
            port: '27015'
        }).then((state) => {
            // console.log(state.raw.numplayers)
            ffa.edit({ name: `🏅┋FFA: ${state.raw.numplayers}/${state.maxplayers}`})
        }).catch((err) => {
            // console.log("Server is offline")
            ffa.edit({name: '🏅┋FFA: Offline'})
        })
    }, updateinterval)

    client.user.setActivity('» Hitrow.Pl', { type: "PLAYING" })

	console.log(chalk.greenBright("[READY]"), `Logged in as ${client.user.tag} (${client.user.id}) at ${moment().format("DD MMMM YYYY, HH:mm:ss")}`);
});

client.login(token)
