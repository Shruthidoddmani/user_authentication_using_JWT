const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456"

const app = express();
app.use(express.json());

const ALL_USERS = [
    {
        username : "shruthi@gmail.com",
        password : "123",
        name :" Shruthi D A"
    },
    {
        username : "dillu@gmail.com",
        password : "123",
        name :" Dilshad Sheik"
    },
    {
        username : "jayashree@gmail.com",
        password : "123",
        name :" jayashree M"
    }
]

function userExists (username, password){
    let userExists = false;
    ALL_USERS.find(user => { 
        if(user.username === username && user.password === password) userExists = true 
    });
    return userExists;
}

app.post("/signin", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    if (!userExists(username, password)) {
        return res.status(403).json({
            msg: "User doesn't exists in our memory DB"
        })
    }

    var token = jwt.sign({ username: username }, jwtPassword);
    return res.json({
        token,
    });
})

app.get("/users", function (req, res) {
    const token = req.headers.auth;
        const decoded = jwt.verify(token, jwtPassword);
        console.log(decoded);
        const username = decoded.username;
        res.json({
            users:ALL_USERS.filter(user => {
                if(user.username === username) return false
                else return true
            })
        })

})

app.listen(3000);