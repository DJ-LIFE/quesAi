const { Podcast, Episode } = require("../model/podcastModel");

const createPodcast = async (req, res) => {
	const title = req.body.title;
	try {
		const newPodcast = new Podcast({ title });
		await newPodcast.save();
		res.status(201).json({ success: true, newPodcast });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

const getPodcasts = async (req, res) => {
	const podcasts = await Podcast.find();
	res.status(200).json({ success: true, podcasts });
};

const createEpisode = async (req, res) => {
	const podcastId = req.params.podcastId;
	if (!podcastId) {
		return res
			.status(400)
			.json({ success: false, message: "Podcast ID is required" });
	}
	const { title, transcript } = req.body;
	try {
		const podcast = await Podcast.findById(podcastId);
		if (!podcast) {
			return res
				.status(404)
				.json({ success: false, message: "Podcast not found" });
		}

		const newEpisode = new Episode({
			podcast: podcastId,
			title,
			transcript,
		});
		await newEpisode.save();
		podcast.episodes.push(newEpisode._id);
		await podcast.save();
		res.status(201).json({ success: true, newEpisode });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

const getEpisodes = async (req, res) => {
	const podcastId = req.params.podcastId;
	if (!podcastId) {
		return res
			.status(400)
			.json({ success: false, message: "Podcast ID is required" });
	}
	try {
		const episodes = await Episode.find({ podcast: podcastId });
		if (!episodes) {
			return res
				.status(404)
				.json({ success: false, message: "Episodes not found" });
		}
		res.status(200).json({ success: true, episodes });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

const getAllEpisodes = async (req, res) => {
	try {
		const episodes = await Episode.find().populate("podcast", "title");
		if (!episodes) {
			return res
				.status(404)
				.json({ success: false, message: "Episodes not found" });
		}
		res.status(200).json({ success: true, episodes });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

const updateEpisode = async (req, res) => {
	const episodeId = req.params.episodeId;
	const { title, transcript } = req.body;
	try {
		const episode = await Episode.findById(episodeId);
		if (!episode) {
			return res
				.status(404)
				.json({ success: false, message: "Episode not found" });
		}
		episode.title = title || episode.title;
		episode.transcript = transcript || episode.transcript;
		await episode.save();
		const podcast = await Podcast.findById(episode.podcast);
		podcast.episodes.push(episode._id);
		await podcast.save();
		res.status(200).json({ success: true, episode });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

module.exports = {
	createPodcast,
	createEpisode,
	updateEpisode,
	getEpisodes,
	getPodcasts,
    getAllEpisodes,
};
