import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/getallsongs", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.jamendo.com/v3.0/tracks/?client_id=ea61a820&format=jsonpretty&limit=10"
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching songs" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
