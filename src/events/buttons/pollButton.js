const { ButtonInteraction } = require("discord.js");
const fs = require("fs");
const path = require("path");

const votesFilePath = path.join(__dirname, "..", "..", "data", "votes.json");

const loadVotes = () => {
  const data = fs.readFileSync(votesFilePath, "utf8");
  return new Map(JSON.parse(data));
};

const saveVotes = (votes) => {
  fs.writeFileSync(votesFilePath, JSON.stringify([...votes]), "utf8");
};

const votes = loadVotes();

module.exports = {
  data: {
    name: "poll",
    description: "handles poll buttons",
  },
  async execute(interaction) {
    if (!interaction.isButton()) return;

    const arr = interaction.customId.split("-");
    if (arr[0] != "poll") return;

    const userVoteId = `${interaction.user.id}-${interaction.message.id}`;
    const userVoted = votes.get(userVoteId);
    const newVote = arr[1];

    const embed = interaction.message.embeds[0];
    if (!embed) {
      return interaction.reply({
        content:
          "Something went wrong while executing this command, please inform Doc about it thank you!",
        ephemeral: true,
      });
    }

    const yes = embed.fields[0];
    const no = embed.fields[1];

    if (userVoted) {
      if (userVoted == newVote) {
        return interaction.reply({
          content: `You already voted for ${newVote}`,
          ephemeral: true,
        });
      } else {
        if (newVote == "yes") {
          yes.value = (parseInt(yes.value) + 1).toString();
          no.value = (parseInt(no.value) - 1).toString();
        } else {
          yes.value = (parseInt(yes.value) - 1).toString();
          no.value = (parseInt(no.value) + 1).toString();
        }
      }
    } else {
      if (newVote == "yes") {
        yes.value = (parseInt(yes.value) + 1).toString();
      } else {
        no.value = (parseInt(no.value) + 1).toString();
      }
    }

    votes.set(userVoteId, newVote);
    saveVotes(votes);

    interaction.message.edit({ embeds: [embed] });
    interaction.reply({
      content: `You voted for ${newVote}`,
      ephemeral: true,
    });
  },
};
