module.exports = {
	data: {
		name: "wtrole",
	},
	async execute(interaction, bot) {
		try {
			const role = interaction.guild.roles.cache.find(
				(r) => r.name === "War Thunder"
			);
			if (!role) {
				return interaction.reply({
					content: `Something went wrong while executing this command (No Role)`,
					ephemeral: true,
				});
			}

			return interaction.member.roles.add(role).then((member) =>
				interaction.reply({
					content: `You got the War Thunder tag!`,
					ephemeral: true,
				})
			);
		} catch (err) {
			console.log(err);
		}
	},
};
