var
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    md5 = require('md5'),
    fs = require('fs');

const Router = require('./router');
const CONFIG = JSON.parse(fs.readFileSync('./config/config.json'))
const PORT = process.env.PORT || 1337;
const Codes = require('./schema/schemaCodes');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/api/v1', Router)

mongoose.connect(CONFIG.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.get("/", async(req,res) => res.redirect('http://panel.doshort.tk'))
app.get("/:code", async(req, res) => {
    const link = await Codes.findOne({code: req.params.code});
    if(link) {
        res.redirect(link.longUri)
    } else {
        res.redirect('http://panel.doshort.tk')
    }
})

app.listen(PORT, () => console.log(`Server started`))