var
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    md5 = require('md5'),
    fs = require('fs'),
    http = require('http');

const CONFIG = JSON.parse(fs.readFileSync('./config/config.json'));
const PORT = process.env.PORT || 1337;
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const Codes = require('./schema/schemaCodes');
const Users = require('./schema/schemaUser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
mongoose.connect(CONFIG.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

function randString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
function getToken(log, pwd) {
    return md5(`${log}//${pwd}//Secret:NotReallyNodeJSDEV`)
}

app.get("/", async(req,res) => res.redirect('http://panel.doshort.tk'))
app.get("/:code", async(req, res) => {
    const link = await Codes.findOne({code: req.params.code});
    if(link) {
        res.redirect(link.longUri)
    } else {
        res.redirect('http://panel.doshort.tk')
    }
});
app.get("/server/status", async(req,res) => res.json({status: "work", users: await Users.collection.countDocuments()}))

io.on('connection', (socket) => {
    console.log(`Server: [DEBUG] - user ${socket.id} connected!`);
    socket.on('createLink', async(data, callback) => {
        const { token, long } = data;
        const user = await Users.findOne({token});
        if(!user) {callback({success:false,message:`User not found`}); return}
        const isClone = await Codes.findOne({longUri: long});
        if(isClone) {callback({success: true, shortCode: isClone.code, long: isClone.longUri}); return}
        const shortCode = randString(6);
        Codes.create({owner: token,code: shortCode,longUri: long});
        callback({success: true,message: `Url shorted!`,shortCode: shortCode,long: long})
    })
    socket.on('register', async(data, callback) => {
        const { username, password } = data;
        if(await Users.findOne({username})) {callback({success:false, message: `Login busy`}); return};
        Users.create({username, password:md5(password), token:getToken(username, password)});
        callback({success:true, token:getToken(username, password)});
    })
    socket.on('login', async(data, callback) => {
        const { username, password } = data;
        console.log(`Request to login:\n`,username,password)
        const user = await Users.findOne({username});
        if(!user) {callback({success:false,message:`User not found`}); return};
        if(user.password === md5(password)) {callback({success:true, token:user.token});return};
        callback({success:false,message:`Incorrect password`});
    })
    socket.on('allLinks', async(data, callback) => {
        const { token } = data;
        const user = await Users.findOne({token});
        if(!user) {callback({success:false,message:`FATAL ERROR: INVALID TOKEN`});return};
        callback({success:true, links:await Codes.find({owner:token})});
    })
})

server.listen(PORT, () => {
    console.log(`Success start!`)
});
