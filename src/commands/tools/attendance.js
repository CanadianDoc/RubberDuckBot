const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ButtonBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("attendance")
    .setDescription("Check who's coming!. . .")
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("date")
        .setDescription("The date of the event")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("event")
        .setDescription("The name of the event")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, bot) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("positive")
        .setLabel("Yes")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("negative")
        .setLabel("No")
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId("maybe")
        .setLabel("Maybe")
        .setStyle(ButtonStyle.Secondary)
    );

    const embed = new EmbedBuilder()
      .setTitle("Attendance")
      .setDescription("React to the buttons below to indicate your attendance")
      .setColor("Random")
      .setTimestamp(Date.now());

    await interaction.reply({
      embeds: [embed],
      components: [row],
    });
  },
};
