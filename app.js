const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require('multer');
const fs = require('fs');
const app = express();

class Route {
    constructor(name, number, pokemon, headbutt, nationalDex, swarms, 
        surf, rockSmash, oldRod, goodRod, superRod, night,
        radio) {
            this.name = name;
            this.number = number;
            this.pokemon = pokemon;
            this.headbutt = headbutt;
            this.nationalDex = nationalDex;
            this.swarms = swarms;
            this.surf = surf;
            this.rockSmash = rockSmash;
            this.oldRod = oldRod;
            this.goodRod = goodRod;
            this.superRod = superRod;
            this.night = night;
        }

    setPokemon(pokemonPool) {
        this.pokemon = pokemonPool;
    }
}

class Pokemon {
    constructor(name, minLevel, maxLevel) {
        this.name = name;
        this.minLevel = minLevel;
        this.maxLevel = maxLevel;
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage});

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(cors());

app.get("/api", async (req, res) => {
    res.send({data: "received"});
});

app.post("/api/upload", upload.single('file'), (req, res) => {
    const uploadedFile = req.file;

    if (uploadedFile) {
        const filename = uploadedFile.originalname;
        const size = uploadedFile.size;
        const mimetype = uploadedFile.mimetype;

        console.log('filename: %s, size: %d, mimetype: %s', filename, size, mimetype);

        gatherRoute(uploadedFile);
        res.status(200).json({ message: 'File uploaded succesfully' });
    } else {
        res.status(400).json({ message: 'No file was uploaded' });
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});

function gatherRoute(file) {
    let wildPokemonSection;
    let routeCollection;
    fs.readFile(file.path, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ message: 'Error reading file' });
        } else {
            const wildPokemonTerm = '--Wild Pokemon--';
            const tmMovesTerm = '--TM Moves--';
            const wildPokemonIndex = data.indexOf(wildPokemonTerm);
            const tmMovesTermIndex = data.indexOf(tmMovesTerm);
            let routePool;

            if (wildPokemonIndex !== -1 && tmMovesTermIndex !== -1) {
                const startIndex = wildPokemonIndex + wildPokemonTerm.length;
                wildPokemonSection = data.substring(startIndex, tmMovesTermIndex);
                routeCollection = wildPokemonSection.split('Set #');
                
                routePool = routeCollection.map((route) => cleanRouteInfo(route));
            }
        }
    })
}

function cleanRouteInfo(route) {
    let lines = route.split('\n');
    let routeMetadata = new Route();
    let pokemonPool = [];

    lines = lines.filter((line) => line.trim() !== '');
    
    for (let i = 0; i < lines.length; ++i) {
        lines[i] = lines[i].split('HP')[0];
        const levelTerm = 'Lv';
        const levelIndex = lines[i].indexOf(levelTerm);
        if (levelIndex !== -1) {
            let pokemonInfo;
            let pokemon;
            const levelsTerm = 'Lvs';
            const levelsIndex = lines[i].indexOf(levelsTerm);
            if (levelsIndex !== -1) {
                pokemonInfo = lines[i].split(levelsTerm);
                const levelsInfo = pokemonInfo[1].split('-');
                pokemon = new Pokemon(pokemonInfo[0].trim(), levelsInfo[0].trim(), levelsInfo[1].trim());
            } else {
                pokemonInfo = lines[i].split(levelTerm);
                pokemon = new Pokemon(pokemonInfo[0].trim(), pokemonInfo[1].trim(), pokemonInfo[1].trim());
            } 
            pokemonPool.push(pokemon);
        } else {
            let routeInfo = lines[i].split(' - ');
            let attributeIndex = Number.MAX_SAFE_INTEGER;
            const routeAttributes = ['Headbutt', 'Swarms', 'Old Rod', 'Good Rod', 'Super Rod', 'Radio', 'Surfing', 'Night', 'Rock Smash', '(Post-National Dex'];
            const headbutt = routeInfo[1].includes('Headbutt');
            const swarm = routeInfo[1].includes('Swarms');
            const oldRod = routeInfo[1].includes('Old Rod');
            const goodRod = routeInfo[1].includes('Good Rod');
            const superRod = routeInfo[1].includes('Super Rod');
            const radio = routeInfo[1].includes('Radio');
            const surf =  routeInfo[1].includes('Surfing');
            const night = routeInfo[1].includes('Night');
            const rockSmash = routeInfo[1].includes('Rock Smash');
            const nationalDex = routeInfo[1].includes('Post-National Dex');

            routeAttributes.forEach((attribute) => {
                const index = routeInfo[1].indexOf(attribute);
                if (index < attributeIndex && index !== -1) {
                    attributeIndex = index;
                }
            });

            if (attributeIndex === Number.MAX_SAFE_INTEGER) {
                routeMetadata = new Route(routeInfo[1].trim(), routeInfo[0].trim()
                , [], headbutt, nationalDex, swarm, surf, rockSmash, oldRod
                , goodRod, superRod, night, radio);
            } else {
                const name = routeInfo[1].substring(0, attributeIndex);
                routeMetadata = new Route(name.trim(), routeInfo[0].trim(), [], headbutt,
                nationalDex, swarm, surf, rockSmash, oldRod, goodRod, superRod, night,
                radio);
            }
        }
    }
    routeMetadata.setPokemon(pokemonPool);
    return routeMetadata;
}
