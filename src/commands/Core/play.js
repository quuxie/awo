import { SlashCommandBuilder } from 'discord.js';
import { joinVoiceChannel, getVoiceConnection } from '@discordjs/voice';

export default {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Join your voice channel and stay connected'),

    async execute(interaction) {
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply({
                content: 'You must be in a voice channel first.',
                ephemeral: true
            });
        }

        const existing = getVoiceConnection(interaction.guild.id);
        if (existing) {
            existing.destroy();
        }

        joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
            selfDeaf: true
        });

        await interaction.reply({
            content: `Joined ${voiceChannel.name} and will stay connected.`,
            ephemeral: true
        });
    }
};
