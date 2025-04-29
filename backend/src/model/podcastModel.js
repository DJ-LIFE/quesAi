const mongoose = require("mongoose");

const podcastSchema = new mongoose.Schema({
	title: { type: String, required: true },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	createdAt: { type: Date, default: Date.now },
	episodes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Episode",
		},
	],
});

const episodeSchema = new mongoose.Schema({
	podcast: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Podcast",
		required: true,
	},
	title: { type: String, required: true },
	transcript: { type: String, required: true },
});

module.exports = {
	Podcast: mongoose.model("Podcast", podcastSchema),
	Episode: mongoose.model("Episode", episodeSchema),
};
