const player = document.getElementById('player');
const block = document.getElementById('block');
const bigblock = document.getElementById('bigblock');
const show = document.getElementById('show');
const leaderboard = document.getElementById('leaderboard');
var i = 0;
var sop = 0;

function PageLoaded() {
    LoadScores();
}
var HighScore = 0;
var playerscore = 0;
//document.body.onload = LoadScores();
let playername = sessionStorage.getItem("name");
async function LoadScores() {
    console.log('fetching ...')
    const res = await fetch('/SendScores', {
        method: 'POST',
        body: JSON.stringify({
            playername: playername
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    leaderboard.innerHTML = await data.scores;
    HighScore = await data.HighScore;
    playerscore = await data.playerscore;
    console.log(HighScore);
}


async function updatescore(score) {
    console.log('UPDATING scores...');
    const res = await fetch('/updatescore', {
        method: 'POST',
        body: JSON.stringify({
            playername,
            score,
            playerscore
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    if (data.msg == 'updated') {
        LoadScores();
    }
}


document.body.onkeyup = function(e) {
    if (e.key == "p" ||
        e.code == "KeyP" ||
        e.keyCode == 80) {
        pauseGame();
    } else if (e.key == "c" ||
        e.code == "KeyC" ||
        e.keyCode == 67) {
        startgame();
    } else if (e.key == " " ||
        e.code == "Space" ||
        e.keyCode == 32) {
        jump();
    } else if (e.key == "x" ||
        e.code == "KeyX" ||
        e.keyCode == 88) {
        Invisible();
    } else if (e.key == "s" ||
        e.code == "KeyS" ||
        e.keyCode == 83) {
        SuperPower();
    }
}

function Invisible() {
    player.style.background = "rgb(123, 105, 105)";
    setTimeout(function() {
        if (sop < 20) {
            player.style.background = "red";
        } else {
            player.style.background = "rgb(220, 20, 173)";
        }
    }, 1000)
}
var SPFlag = false;

function SuperPower() {
    if (sop > 20) {
        SPFlag = true;
        show.innerHTML = 'Super Power Activated .. will avail for 5 seconds...';
        var tmp = 0;
        var ColorChange = setInterval(function() {
            tmp++;
            time = Math.floor(tmp % 10);
            switch (time) {
                case 0:
                    player.style.backgroundColor = "aquamarine";
                    break;
                case 1:
                    player.style.backgroundColor = "rgb(226, 242, 0)";
                    break;

                case 2:
                    player.style.backgroundColor = "green";
                    break;

                case 3:
                    player.style.backgroundColor = "blue";
                    break;

                case 4:
                    player.style.backgroundColor = "aquamarine";
                    break;

                case 5:
                    player.style.backgroundColor = "antiquewhite";
                    break;

                case 6:
                    player.style.backgroundColor = "violet";
                    break;

                case 7:
                    player.style.backgroundColor = "rosybrown";
                    break;

                case 8:
                    player.style.backgroundColor = "green";
                    break;

                case 9:
                    player.style.backgroundColor = "blue";
                    break;

            }
        }, 200);
        //display
        setTimeout(function() {
            //display
            show.innerHTML = 'Power gone, you can activate at next 20 scores';
            player.style.background = "red";
            clearInterval(ColorChange);
            sop = 0;
            SPFlag = false;
            setTimeout(function() {
                show.innerHTML = "";
            }, 2000);
        }, 5000);
    } else {
        show.innerHTML = 'Not sufficient score for super power!';
        setTimeout(function() {
            show.innerHTML = "";
        }, 2000);
    }

}

var started = false;
var GamePauseInterval;

function startgame() {
    if (started == true) {
        return;
    }
    if (started == false) {
        started = true;
    }
    block.classList.add('aniamteblock');
    bigblock.classList.add('animatebigblock');
    GamePauseInterval = setInterval(CalculateScore, 1000);
    GameCheckPosition = setInterval(checkpos, 10);
}

function pauseGame() {
    if (started == false) {
        return;
    }
    if (started == true) {
        started = false;
    }
    block.classList.remove('aniamteblock');
    bigblock.classList.remove('animatebigblock');
    clearInterval(GamePauseInterval);
    clearInterval(GameCheckPosition);
}

function jump() {
    if (player.classList == 'animatejump') {
        return;
    }
    player.classList.add('animatejump');
    setTimeout(function() {
        player.classList.remove('animatejump');
    }, 500);
}
var score = document.getElementById('score');
var scoreforBig = 0;

function CalculateScore() {
    score.innerHTML = 'score: ' + i;
    scoreforBig++;
    if (scoreforBig == 5) {
        scoreforBig = 0;
        i += 5;
        sop += 5;
    }
    i++;
    sop++;
    if (sop > 20) {
        player.style.background = "rgb(220, 20, 173)";
    }
}

function checkpos() {
    var PlayerHead = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    var BlockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var BigBlockLeft = parseInt(window.getComputedStyle(bigblock).getPropertyValue("left"));
    var PlayerColor = window.getComputedStyle(player).getPropertyValue('background-color');
    var flag = false;
    if (PlayerColor == 'rgb(123, 105, 105)') {
        flag = true;

    }
    if (SPFlag == true) {
        return;
    } else if (PlayerHead >= 130 && (BlockLeft > 0 && BlockLeft < 20) && SPFlag == false) //because from top if length is greater than 130 means (130+50(player height)) then remaining length will not be sufficient for block
    {
        updatescore(i);
        alert("Its ok to lose a game , try again");
        pauseGame();
        i = 0;
        sop = 0;
    } else if ((BigBlockLeft > 0 && BigBlockLeft < 20) && (flag == false) && SPFlag == false) //because from top if length is greater than 130 means (130+50(player height)) then remaining length will not be sufficient for block
    {
        alert("Its ok to lose a game , try again");
        updatescore(i);
        pauseGame();
        i = 0;
        sop = 0;
    }


};