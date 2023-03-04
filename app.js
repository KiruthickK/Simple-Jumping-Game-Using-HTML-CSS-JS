const express = require('express');

const mysql = require('mysql');

//for db connectivity
const username = "root";
const password = "root";
const server = "localhost";
const dbname = "iwp";
// const server = "b8xrg6ejgbweieo3gdi2-mysql.services.clever-cloud.com";
// const username = "ub9yotocp6x0q56a";
// const password = "dqP0IfaKl8IsBNKuUvki";
// const dbname = "b8xrg6ejgbweieo3gdi2";
/*
    host: "b8xrg6ejgbweieo3gdi2-mysql.services.clever-cloud.com",
    user: "ub9yotocp6x0q56a",
    password: "dqP0IfaKl8IsBNKuUvki",
    database: "b8xrg6ejgbweieo3gdi2"
*/

const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.use("/scripts", express.static(__dirname + '/scripts'));

app.use(bodyParser.json());

app.use(express.static('public'));

//get requests

app.get('/', (req, res) => {
    res.render('login');
});
app.get('/game', (req, res) => {
    res.render('game');
});


//post requests
app.post('/login', (req, res) => {
    const { name, pass } = req.body;
    var con = mysql.createConnection({
        host: server,
        user: username,
        password: password,
        database: dbname
    });
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM players WHERE name='" + name + "'", function(err, result, fields) {
            if (err) {
                res.json({ msg: `Sorry try again` });
                throw err;
            }
            if (pass == result[0].password) {
                res.json({ msg: `login` });
            } else {
                console.log(pass, "  ", result[0].pass);
                res.json({ msg: `no` });
            }
        });
    });
});

app.post('/signup', (req, res) => {
    const { name, pass } = req.body;
    var con = mysql.createConnection({
        host: server,
        user: username,
        password: password,
        database: dbname
    });
    con.connect(async function(err) {
        if (err) throw err;
        console.log("Connected to database!");
        var sql = "INSERT INTO players values('" + name + "','" + pass + "',0)";
        con.query(sql, function(err, result) {
            if (err) {
                res.json({ msg: `Sorry try again` });
            }
            res.json({ msg: `Sucess` });
            console.log("User Created...");
        });
    });
});

app.post('/SendScores', (req, res) => {
    const { playername } = req.body;
    var playerscore = 0;
    var con = mysql.createConnection({
        host: server,
        user: username,
        password: password,
        database: dbname
    });
    var sql = "SELECT name, score FROM players";
    con.query(sql, function(err, result) {
        if (err) {
            console.log(err);
            res.json({ msg: `Sorry try again` });
        }
        var scores = "<h2>LeaderBoard</h2><table><tr><th>Name</th><th>Score</th></tr>";
        var HighScore = 0;
        var rows = result.length;
        for (var i = 0; i < rows; i++) {
            if (playername == result[i].name) {
                playerscore = result[i].score;
            }
            scores += "<tr><td>";
            scores += result[i].name;
            scores += "</td><td>"
            scores += result[i].score;
            if (result[i].score > HighScore) {
                HighScore = parseInt(result[i].score);
            }
            scores += "</td></tr>";
        }
        scores += "<br><strong>HighScore : " + HighScore + "</strong></table>";

        res.json({ scores, HighScore, playerscore });
    });

});


app.post('/updatescore', async(req, res) => {
    const { playername, score, playerscore } = req.body;
    var con = mysql.createConnection({
        host: server,
        user: username,
        password: password,
        database: dbname
    });
    console.log('old score', playerscore);
    if (playerscore < score) {
        con.connect(function(err) {
            if (err) throw err;
            var sql = "UPDATE players SET score = " + score + " WHERE name = '" + playername + "'";
            con.query(sql, function(err, result) {
                if (err) throw err;
                console.log('updated score:', score);
                console.log(result.affectedRows + " score record(s) updated");
                res.json({ msg: `updated` });
            });
        });
    } else {
        res.json({ msg: `updated` });
    }
});

app.listen(3000);
console.log('Listening on the port 3000');