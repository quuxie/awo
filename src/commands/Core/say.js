import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Make the bot send a message')
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('Message to send')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const message = interaction.options.getString('message');

        await interaction.channel.send(message);

        await interaction.reply({
            content: 'Message sent.',
            ephemeral: true
        });
    },

    async prefixExecute(interaction) {
        const args = interaction.args || [];
        const message = args.join(' ');

        if (!message) {
            return interaction.reply('Provide a message.');
        }

        await interaction.channel.send(message);
    }
};
