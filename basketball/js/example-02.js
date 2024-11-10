'use strict';
let comScore = 0;
let userScore = 0;
let isComputerTurn = true;
let shotsLeft = 15;

function showText(s) {
    let $textElem = $('#text');
    $textElem.fadeOut(300, function() {
        $textElem.html(s);
        $textElem.fadeIn();
    });

}

function updateComputerScore(score) {
    comScore += score;

    let comScoreElem = document.getElementById('computerScore');
    comScoreElem.innerHTML = comScore;
}

function updateUserScore(score) {
    userScore += score;

    let userScoreElem = document.getElementById('userScore');
    userScoreElem.innerHTML = userScore;
}

function disableComputerButtons(flag) {
    let computerButtons = document.getElementsByClassName('btn-computer');

    for (let i = 0; i < computerButtons.length; i++) {
        computerButtons[i].disabled = flag;
    }
}

function disableUserButtons(flag) {
    let userButtons = document.getElementsByClassName('btn-user');

    for (let i = 0; i < userButtons.length; i++) {
        userButtons[i].disabled = flag;
    }
}

//컴터의 슛기능 
function onComputerShoot() {
    if (!isComputerTurn)
        return;

    let shootType = Math.random() < 0.5 ? 2 : 3;

    if (shootType === 2) {
        if (Math.random() < 0.5) { //2점슛 1/2확률로 성공
            showText('컴퓨터가 2점슛을 성공시켰습니다.');
            updateComputerScore(2);

        } else { //실패시
            showText('컴퓨터가 2점슛을 실패했습니다.');
        }
    } else {
        if (Math.random() < 0.33) { //3점슛 1/3확률로 성공
            showText('컴퓨터가 3점슛을 성공시켰습니다.');

            updateComputerScore(3);

        } else { //실패시
            showText('컴퓨터가 3점슛을 실패했습니다.');
        }
    }
    isComputerTurn = false;

    disableComputerButtons(true);
    disableUserButtons(false);

}
//사용자의 슛기능

function onUserShoot(shootType) {
    if (isComputerTurn)
        return;

    if (shootType === 2) {
        if (Math.random() < 0.9) {
            showText('2점슛이 성공했습니다!');

            updateUserScore(2);

        } else {
            showText('2점슛이 실패했습니다');
        }
    } else {
        if (Math.random() < 0.5) { //3점슛 1/3확률로 성공
            showText('3점슛이 성공했습니다!');

            updateUserScore(3);

        } else { //실패시
            showText('3점슛이 실패했습니다');
        }
    }

    isComputerTurn = true;

    disableComputerButtons(false);
    disableUserButtons(true);

    shotsLeft--;

    let shotsLeftElem = document.getElementById('left');
    shotsLeftElem.innerHTML = shotsLeft;

    if (shotsLeft === 0) {
        if (userScore > comScore) {
            showText('승리했습니다');
        } else if (userScore < comScore) {
            showText('졌습니다');
        } else {
            showText('비겼습니다');
        }
        for (let i = 0; i < computerButtons.length; i++) {
            computerButtons[i].disabled = false;
        }

        for (let i = 0; i < userButtons.length; i++) {
            userButtons[i].disabled = true;
        }
    }
}

function updateAI() {

}

$(function() {
    showText(3);
    setTimeout(function() {
        showText(2);

        setTimeout(function() {
            showText(1);

            setTimeout(function() {
                showText('컴퓨터부터 시작합니다!');
                disableComputerButtons(false);
            }, 1000);
        }, 1000);
    }, 1000);
});