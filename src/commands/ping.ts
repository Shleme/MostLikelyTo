import { SlashCommand } from "../commandHandler";

const command = new SlashCommand("ping")
    .setDescription("Replies with Pong!")
    .setExecute((interaction) => {
        if (!interaction.isCommand()) return

        interaction.reply("pong")
    })