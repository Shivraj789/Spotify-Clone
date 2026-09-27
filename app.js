const express = require("express");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
    const query = req.query.q || "";

    try {
        let url;

        if (query) {
            url =
                `https://discoveryprovider.audius.co/v1/tracks/search` +
                `?query=${encodeURIComponent(query)}` +
                `&app_name=my_music_app` +
                `&limit=20`;
        } else {
            url =
                "https://discoveryprovider.audius.co/v1/tracks/trending" +
                "?app_name=my_music_app&limit=20";
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Audius API error: ${response.status}`);
        }

        const data = await response.json();

        res.render("index", {
            tracks: data.data || [],
            query
        });

    } catch (error) {
        console.error(error);

        res.status(500).send("Failed to load music");
    }
});

app.listen(PORT, () => {
    console.log(`🎵 Music Player running at http://localhost:${PORT}`);
});