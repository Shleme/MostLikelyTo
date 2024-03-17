// basic discord bot ts
import discord from "discord.js"
import dotenv from "dotenv"
import { importSlashCommands } from "./commandHandler"

dotenv.config()

const client = new discord.Client({
    intents: [],
})

client.on("ready", async () => {
    await importSlashCommands(client)

    console.log(`Logged in as ${client.user?.tag}!`)
})

client.login(process.env.DISCORD_TOKEN)