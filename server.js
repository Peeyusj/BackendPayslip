const express = require('express');
const mongoose = require('mongoose');
const server = express();
server.use(express.json());
const cors = require('cors')
server.use(cors());


const empRepo = require('./employeedetails');
const mongourl = "mongodb+srv://piyushrairai124:piyush@cluster0.gbbrsre.mongodb.net/?retryWrites=true&w=majority"
server.get('/', (req, res) => {
    res.send("hiiiiiiiiiiiiiiiiii")
})
mongoose.connect(mongourl, {
    useNewUrlParser: true
}).then(() => {
    console.log("connected");
}).catch((e) => { console.log(e); })

const jwt = require("jsonwebtoken")
const JWT_SECRET = "fwieojrwporj23)$10ujtdrpolkfmlsdmfsamasmdsldmasldsldsdkdmlkmdlsdjrw";

require("./userDetails");
const User = mongoose.model("UserInfo");
const Emp = mongoose.model("empInfo");


server.post('/register', async (req, res) => {
    const { name, email, mobileNo, password, designation, ename, empid, basicpay, HRA } = req.body;
    try {
        const olduser = await User.findOne({ email })

        if (olduser) {
            res.send({ error: "Person already Exists in Records" });
            return;
        }
        await User.create({
            uname: name,
            email: email,
            phoneno: mobileNo,
            pwd: password,
            designation: designation,
        })
        res.json({ status: "OK" })
    }
    catch (e) {
        res.send(e);
        res.send({ error: "error" })
    }
});

server.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.json({ error: "User Not found" });
        return;
    }
    if (await password == user.pwd) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET);
        return res.json({ status: "OK", data: token })
    }

    else {
        res.json({ error: "Incorect Password" });
    }

})

server.post('/userData', async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        let userEmail = user.email
        User.findOne({ email: userEmail }).then((data) => {
            return res.json({ status: "ok", data: data });
        }).catch((error) => {
            return res.json({ status: "error", data: error })
        })
    } catch (e) {
        res.json({ error: e })
    }
})

server.post('/addEmployee', async (req, res) => {
    try {
        const ename = req.body.ename;
        const basicpay = req.body.basicpay;
        const empid = req.body.empid;
        const HRA = req.body.HRA;

        const empAddResponse = await empRepo.create({
            ename: ename,
            empid: empid,
            basicpay: basicpay,
            HRA: HRA
        });

        if (empAddResponse) {
            res.json({
                status: "ok"
            })
        } else {
            res.json({ status: "Some Problem" });
        }

    } catch (error) {
        return res.json({ status: "error", data: error })
    }
})
server.get('/addEmployee', async (req, res) => {
    try {
        const data = await Emp.find();
        if (data) {
            return res.json({ data: data })
        }
    } catch (error) {
        return res.json({ status: "error", data: error })
    }
})



server.listen(5000, () => {
    console.log("server running at port 5000");
})