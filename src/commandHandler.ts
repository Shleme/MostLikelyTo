import path from 'path'
import fs from 'fs'
import { Client, Interaction, CacheType } from 'discord.js'

let slashCommands: SlashCommand[] = []

export class SlashCommand {
    name!: string
    description!: string
    options!: any
    execute!: (interaction: Interaction<CacheType>) => void

    constructor(name: string) {
        slashCommands.push(this)
        this.name = name
        return this
    }

    setDescription(description: string) {
        this.description = description
        return this
    }

    setOptions(options: any) {
        this.options = options
        return this
    }

    setExecute(execute: (interaction: Interaction<CacheType>) => void) {
        this.execute = execute
        return this
    }
}

export async function importSlashCommands(client: Client) {
    // import all commands
    const commandsPath = path.join(__dirname, "commands")
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".ts") || file.endsWith(".js"))

    for (const file of commandFiles) {
        await import(path.join(commandsPath, file))
    }

    // register all commands
    for (const command of slashCommands) {
        console.log(`Registering command ${command.name}`)

        client.application?.commands.create({
            name: command.name,
            description: command.description,
            options: command.options,
        })
    }

    // client on interaction
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isCommand()) return

        const command = slashCommands.find(command => command.name == interaction.commandName)
        if (!command) return

        command.execute(interaction)
    })
}