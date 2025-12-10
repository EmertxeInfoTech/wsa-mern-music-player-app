import axios from "axios";

const getSongs = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.jamendo.com/v3.0/tracks/?client_id=ea61a820&format=jsonpretty&limit=15"
    );

    const data = response.data;
    // console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getPlaylistByTag = async (req, res) => {
  try {
    console.log("hi");
    const tag = (req.params.tag || req.query.tag || "").toString().trim();
    if (!tag) return res.status(400).json({ message: "Missing tag parameter" });

    const limit = parseInt(req.query.limit ?? "10", 10) || 10;
    const clientId = "ea61a820";
    const params = {
      client_id: clientId,
      format: "jsonpretty",
      tags: tag,
      limit,
    };
    console.log(params);
    const response = await axios.get("https://api.jamendo.com/v3.0/tracks/", {
      params,
    });
    console.log(response.data);
    return res.json(response.data);
  } catch (error) {
    console.error(
      "getPlaylistByTag error:",
      error?.response?.data ?? error.message ?? error
    );
    return res.status(500).json({ message: "Failed to fetch playlist" });
  }
};

export { getSongs, getPlaylistByTag };
