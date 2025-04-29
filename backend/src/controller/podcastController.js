const { Podcast, Episode } = require("../model/podcastModel");

const createPodcast = async (req, res) => {
	const title = req.body.title;
	try {
		// Associate the podcast with the current user
		const newPodcast = new Podcast({ 
			title,
			user: req.user._id // Get user ID from auth middleware
		});
		await newPodcast.save();
		res.status(201).json({ success: true, newPodcast });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

const getPodcasts = async (req, res) => {
	try {
		// Only return podcasts owned by the current user
		const podcasts = await Podcast.find({ user: req.user._id });
		res.status(200).json({ success: true, podcasts });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
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
		// Find podcast and verify it belongs to the current user
		const podcast = await Podcast.findOne({ _id: podcastId, user: req.user._id });
		if (!podcast) {
			return res
				.status(404)
				.json({ success: false, message: "Podcast not found or you don't have permission to access it" });
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
		// First verify the podcast belongs to the current user
		const podcast = await Podcast.findOne({ _id: podcastId, user: req.user._id });
		if (!podcast) {
			return res
				.status(404)
				.json({ success: false, message: "Podcast not found or you don't have permission to access it" });
		}
		
		const episodes = await Episode.find({ podcast: podcastId });
		if (!episodes || episodes.length === 0) {
			return res.status(200).json({ success: true, episodes: [] });
		}
		res.status(200).json({ success: true, episodes });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
};

const getAllEpisodes = async (req, res) => {
	try {
		// Find all podcasts belonging to the current user
		const userPodcasts = await Podcast.find({ user: req.user._id });
		const userPodcastIds = userPodcasts.map(podcast => podcast._id);
		
		// Find episodes that belong to the user's podcasts
		const episodes = await Episode.find({ 
			podcast: { $in: userPodcastIds } 
		}).populate("podcast", "title");
		
		if (!episodes || episodes.length === 0) {
			return res.status(200).json({ success: true, episodes: [] });
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
		// Find the episode
		const episode = await Episode.findById(episodeId);
		if (!episode) {
			return res
				.status(404)
				.json({ success: false, message: "Episode not found" });
		}
		
		// Find the podcast and verify it belongs to the current user
		const podcast = await Podcast.findOne({ 
			_id: episode.podcast, 
			user: req.user._id 
		});
		
		if (!podcast) {
			return res
				.status(403)
				.json({ success: false, message: "You don't have permission to update this episode" });
		}
		
		// Update the episode
		episode.title = title || episode.title;
		episode.transcript = transcript || episode.transcript;
		await episode.save();
		
		// Avoid duplicate episode IDs in the podcast
		if (!podcast.episodes.includes(episode._id)) {
			podcast.episodes.push(episode._id);
			await podcast.save();
		}
		
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
