var 
    express = require('express'),
    router = express.Router(),
    md5 = require('md5');

const User = require('./schema/schemaUser');
const Codes = require('./schema/schemaCodes');

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

router.post("/short", async(req, res) => {
    const { token, long } = req.body;
    const user = await User.findOne({token: token});
    if(user) {
        if(!long) {res.json({success:false, message: `No long uri!`}); return;}
        const isClone = await Codes.findOne({longUri: long});
        if(isClone) {res.json({success: true, shortCode: isClone.code, long: isClone.longUri}); return}
        const shortCode = randString(6).toUpperCase();
        Codes.create({
            owner: token,
            code: shortCode,
            longUri: long
        })
        res.json({
            success: true,
            message: `Url shorted!`,
            shortCode: shortCode,
            long: long
        }) 
    } else {
        res.json({
            success: false,
            message: `User not found`
        })
    }
})
router.post("/short/all", async(req,res) => {
    const { token } = req.body;
    const all = await Codes.find({owner: token});
    if(all) {
        res.json({
            success: true,
            message: `Links found!`,
            links: all
        })
    } else {
        res.json({
            success: false,
            message: `Links/token not found`
        })
    }
})
router.get("/status", async(req, res) => {
    res.json({
        status: "work",
        users: User.collection.count()        
    })
})
router.post("/login", async(req, res) => {
    const { login, password } = req.body;
    const user = await User.findOne({username: login});
    if(user) {
        if(user.password == md5(password)) {
            res.json({
                success: true,
                message: `Auth ok!`,
                token: user.token
            })
        } else {
            res.json({
                success: false,
                message: `Invalid password`
            })
        }
    } else {
        res.json({
            success: false,
            message: `User not found.`
        })
    }
})

router.post("/register", async(req,res) => {
    const { login, password } = req.body;
    const users = await User.findOne({username: login});
    if(!users) {
        const token = getToken(login, password);
        User.create({
            username: login,
            password: md5(password),
            token: token,
            balance: 0
        })
        res.json({
            success: true,
            message: `Success register`
        })
    } else {
        res.json({
            success: false,
            message: `Логин занят.`
        })
    }
})

module.exports = router;