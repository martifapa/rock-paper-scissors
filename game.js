const getComputerChoice = () => {
    const randomIndex = Math.trunc(Math.random() * 3);
    const choiceMap = ['rock', 'paper', 'scissors'];
    return choiceMap[randomIndex];
}

const getPlayerChoice = (e) => {
    let playerChoice = e.target.dataset.choice
    
    if (!['rock', 'paper', 'scissors'].includes(playerChoice)) {
        document.getElementById('selected-option').value = 'Invalid option';
        return false
    }
    // make choices made visible
    document.querySelector('.choices-container').style.visibility = 'visible';
    return playerChoice;
}

const showRoundWinner = (winner) => {
    if (!winner) {
        document.querySelector('#match-result').textContent = "It's a tie!";
    }
    else {
        document.querySelector('#match-result').textContent = `${winner} wins this round!`;
    }
}

const updateScores = (winner) => {
    if (winner === 'PC') {
        pcScore++;
    } else {
        playerScore++;
    }
}

const updateFinalScoreStyles = () => {
    const [winnerClass, looserClass] = pcScore > playerScore ? ['.PC-score', '.player-score'] : ['.player-score', '.PC-score'];
        
    const winner = document.querySelector(winnerClass);
    winner.classList.toggle('winner');

    const looser = document.querySelector(looserClass);
    looser.classList.toggle('looser');    
}

const updateGlobalScores = (replay) => {
    if (replay || (pcScore < 5 && playerScore < 5)) {
        document.querySelector('.player-score').textContent = playerScore;
        document.querySelector('.PC-score').textContent = pcScore;
    } else {
        // update for the last time
        document.querySelector('.player-score').textContent = playerScore;
        document.querySelector('.PC-score').textContent = pcScore;

        // update global scores styles
        updateFinalScoreStyles();
        // alert the winner (TEMP)
        pcScore > playerScore ? alert('PC wins') : alert('Player wins');
    }
}

let pcScore = 3;
let playerScore = 3;

const playGame = (e) => {

    const computer = getComputerChoice();
    const player = getPlayerChoice(e);
    if (!player) {
        return
    }

    document.querySelector('.PC-choice').textContent = `PC chose ${computer}`;
    document.querySelector('.player-choice').textContent = `Player chose ${player}`;

    if (player === computer) {
        showRoundWinner(false);
        return
    };

    if (player === 'rock') {
        if (computer === 'scissors') {
            showRoundWinner('Player');
            updateScores('Player');
        } else {
            showRoundWinner('PC');
            updateScores('PC');
        };
        updateGlobalScores();
        return
    } else if (player === 'paper') {
        if (computer === 'rock') {
            showRoundWinner('Player');
            updateScores('Player');
        } else {
            showRoundWinner('PC');
            updateScores('PC');
        }
        updateGlobalScores();
        return
    } else {
        if (computer === 'paper') {
            showRoundWinner('Player');
            updateScores('Player');
        } else {
            showRoundWinner('PC');
            updateScores('PC');
        }
        updateGlobalScores();
        return
    }
}

const replay = () => {
    // set initial global score styles
    updateFinalScoreStyles();

    // make choices made hidden
    document.querySelector('.choices-container').style.visibility = 'hidden';

    pcScore = 0;
    playerScore = 0;
    updateGlobalScores(true);
}

const playButtons = document.querySelectorAll('.play-game');
playButtons.forEach(playButton => playButton.addEventListener('click', playGame));

const replayButton = document.querySelector('#replay-btn');
replayButton.addEventListener('click', replay);