import { SlashCommand } from "../commandHandler";
import { getRandomQuestionFromTxt } from "../questionGetter"

const command = new SlashCommand("most-likely-to")
    .setDescription("Creates a most likely to question")
    .setExecute(async (interaction) => {
        if (!interaction.isCommand()) return

        const question = await getRandomQuestionFromTxt()

        interaction.reply(question)
    })