import axios from "axios";

const clientId = process.env.clientId;
const getSongs = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=jsonpretty&limit=15`
    );

    const data = response.data;

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getPlaylistByTag = async (req, res) => {
  try {
    const tag = (req.params.tag || req.query.tag || "").toString().trim();
    if (!tag) return res.status(400).json({ message: "Missing tag parameter" });

    const limit = parseInt(req.query.limit ?? "10", 10) || 10;

    const params = {
      client_id: clientId,
      format: "jsonpretty",
      tags: tag,
      limit,
    };

    const response = await axios.get("https://api.jamendo.com/v3.0/tracks/", {
      params,
    });

    return res.json(response.data);
  } catch (error) {
    console.error(
      "getPlaylistByTag error:",
      error?.response?.data ?? error.message ?? error
    );
    return res.status(500).json({ message: "Failed to fetch playlist" });
  }
};

const toggleFavourite = async (req, res) => {
  const user = req.user;

  const song = req.body.song;

  const exists = user.favourites.find((fav) => fav.id === song.id);

  if (exists) {
    user.favourites = user.favourites.filter((fav) => fav.id !== song.id);
  } else {
    user.favourites.push(song);
  }

  await user.save();
  res.json(user.favourites);
};

export { getSongs, getPlaylistByTag, toggleFavourite };
