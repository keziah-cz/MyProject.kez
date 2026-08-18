const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static("public"));

const moviesFile =
    path.join(__dirname, "data", "movies.json");


app.get("/api/movies", (req, res) => {

    fs.readFile(
        moviesFile,
        "utf8",
        (err, data) => {

            if (err) {

                return res.status(500).json({
                    error: "Unable to read movies"
                });

            }

            res.json(JSON.parse(data));
        }
    );
});


app.get("/api/movies/:id", (req, res) => {

    fs.readFile(
        moviesFile,
        "utf8",
        (err, data) => {

            if (err) {

                return res.status(500).json({
                    error: "Unable to read movies"
                });

            }

            const movies =
                JSON.parse(data);

            const movie =
                movies.find(
                    movie =>
                        movie.id ===
                        Number(req.params.id)
                );


            if (!movie) {

                return res.status(404).json({
                    error: "Movie not found"
                });

            }

            res.json(movie);
        }
    );
});


app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `Movietracker running on port ${PORT}`
    );

});