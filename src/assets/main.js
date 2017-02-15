let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value == '' && attempt.value == '') {
        setHiddenFields();
    }

    if (!validateInput(input.value)) {
        return false;
    }
    value = parseInt(attempt.value) + 1;
    attempt.value = value;
    if (getResults(input.value)) {
        msg = "You Win! :)";
        showAnswer(true);
        showReplay();
    } else if (value >= 10) {
        msg = "You Lose! :(";
        showAnswer(false);
        showReplay();
    } else {
        msg = "Incorrect, try again.";
    }
    setMessage(msg);
}

//implement new functions here

function setHiddenFields() {
    temp = Math.random()*9999;
    temp = Math.floor(temp);
    value = temp.toString();
    while (value.length < 4) {
        value = '0' + value;
    }

    answer.value = value;
    attempt.value = 0;
}

function setMessage(param) {
    document.getElementById('message').innerHTML = param;
}

function validateInput(param) {
    if (param.length != 4) {
        setMessage("Guesses must be exactly 4 characters long.")
        return false;
    }
    return true;
}

function getResults(param) {
    results = document.getElementById('results');
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }

    row = document.createElement('div');
    row.className += " row";
    input = document.createElement('span');
    input.className += " cod-md-6";
    input.innerHTML = param;
    col = document.createElement('div');
    col.className += " cod-md-6";
    success = true;

    len = param.length;
    temp = document.createElement('span');
    for (var i = 0; i < len; i++) {
      if (param[i] == answer.value[i]) {
        temp.className += "glyphicon glyphicon-ok";
      } else if (answer.value.indexOf(param[i]) > -1) {
        temp.className += "glyphicon glyphicon-transfer";
        success = false;
      } else {
        temp.className += "glyphicon glyphicon-remove";
        success = false;
      }
      col.appendChild(temp);
    }
    input.appendChild(col);
    row.appendChild(input);
    results.appendChild(row);

    return success;
}

function showAnswer(param) {
    code = document.getElementById('code');
    code.innerHTML = answer.value;
    if (param) {
        code.className += " success";
    } else {
        code.className += " failure";
    }
}

function showReplay() {
    guess = document.getElementById('guessing-div');
    guess.style.display = "none";
    replay = document.getElementById('replay-div');
    replay.style.display = "block";
}
