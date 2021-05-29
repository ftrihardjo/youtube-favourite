const express = require('express');
const app = express();
const PORT = 5000;
const pool = require('./db');

app.use(express.json());

//Get every single videos according to the rank.
app.get('/videos', async (req, res) => {
    try {
        const videos = await pool.query("SELECT * FROM favourites ORDER BY rank NULLS LAST");        
        res.json(videos.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//Update rank of a video.
app.post('/video', async (req, res) => {
    try {
        const url = req.body.url;
        const title = req.body.title;
        const rank = req.body.rank;
        const videos = await pool.query("SELECT * FROM favourites WHERE url = $1",[url]);
        if (videos.rows.length === 0) {
            await pool.query("INSERT INTO favourites(url,title,rank) VALUES ($1,$2,$3)",[url,title,rank]);
        } else {
            await pool.query("UPDATE favourites SET rank = $1 WHERE url = $2",[rank,url]);
        }
    } catch (error) {
        console.error(error.message);
    }
});

app.listen(PORT,()=>console.log('Listening to port %d.',PORT));