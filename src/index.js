const express = require("express");
const app = express();
const databaseService = require('./database_service.js')
const cors = require('cors');


// Middleware
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false} ));
global.picturesToDownload = 0


// Accepting new Pictures via Post
app.post("/addPictures", async (req, res) => {
        const body = req.body;
        console.log(`Post for Id: ${body['_id']}`)
        console.log(`Waiting Que: ${picturesToDownload}`)
        res.json((await databaseService.handlePictures(body)));
        res.status(200);
    });

app.get("/", async (res) => {
    console.log(`Client asked for Status: ${picturesToDownload}`)
    res.json({
        "picturesToDownload" : picturesToDownload
    });
    res.status(200);
});


const port = process.env.PORT || 8083;
app.listen(port, () => {
    console.log(`#############################################`);
    console.log(`smart-dating-api: listening on port ${port}`);
    console.log(`#############################################`);
});

