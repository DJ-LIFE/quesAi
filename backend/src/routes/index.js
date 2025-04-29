const express = require("express");
const {
	signup,
	signin,
	getProfile,
	logout,
} = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");
const {
	createPodcast,
	createEpisode,
	updateEpisode,
	getEpisodes,
	getPodcasts,
} = require("../controller/podcastController");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", authMiddleware, getProfile);
router.post("/logout", authMiddleware, logout);

// Podcast routes
router.post("/podcast", authMiddleware, createPodcast);
router.get("/podcast", authMiddleware, getPodcasts);

// Episode Routes
router.post("/podcast/:podcastId/episode", authMiddleware, createEpisode);
router.put(
	"/podcast/:podcastId/episode/:episodeId",
	authMiddleware,
	updateEpisode
);
router.get("/podcast/:podcastId/episode", authMiddleware, getEpisodes);
router.get("/podcast/episodes", authMiddleware, getEpisodes);

module.exports = router;
