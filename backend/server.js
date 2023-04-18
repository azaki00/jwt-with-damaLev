const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
// app.use(json.cors());

app.use(express.json());
let refreshTokens= [];

const users = [
    {
        id: '1',
        username: 'john',
        password: 'john0102',
        isAdmin: 'true'
    },
    {
        id: '2',
        username: 'jane',
        password: 'jane0102',
        isAdmin: 'false'
    }
];

app.get('/api/login', (req, res) => {
    res.json("worksa");
});

app.post('./api/refresh', (req, res) => {
    //take refresh token from user
    const refreshToken = req.body.token;

    //Send error if there is no token or invalidated
    if (!refreshToken) return res.status(401).json("You are not authenticated!");
    if(!refreshTokens.inculdes(refreshToken)){
        return res.status(403).json("Refresh token is not valid!")
    }
    jwt.verify(refreshToken, "myRefreshSecretKey", (error ,user)=>{
        error && console.log(error);
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        refreshTokens.push(newRefreshToken);

        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    })

    //if all is okay, create a new access token
});

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin },
        "mySecretKey",
        { expiresIn: "15m" });
}
const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin },
        "myRefreshSecretKey",
        { expiresIn: "15m" });
}


app.post('/api/login', (req, res) => {

    const { username, password } = req.body;
    const user = users.find((u) => {
        return u.username === username && u.password === password;
    });
    if (user) {
        //Generate an access token
        generateAccessToken(user);
        generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.json({
            username: user.username,
            isAdmin: user.isAdmin,
            accessToken,
            refreshToken
        });
    } else {
        res.status(400).json("Username or password is incorrect!")
    }
});



const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, 'mySecretKey', (error, user) => {
            if (error) {
                return res.statuc(401).json("Token is not valid!");
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json("You are not authenticated.")
    }
};

app.delete("/api/users/:userId", verify, (req, res) => {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
        res.status(200).json("User has been deleted.");
    } else {
        res.status(403).json("You are not allowed to delete this user.")
    }
});

app.listen(5000, () => console.log("Backend is running!"));