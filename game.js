const getComputerChoice = () => {
    const randomIndex = Math.trunc(Math.random() * 3);
    const choiceMap = ['rock', 'paper', 'scissors'];
    return choiceMap[randomIndex];
};

const getPlayerChoice = () => {
    let playerChoice = document.getElementById('selected-option').value;
    
    if (!['rock', 'paper', 'scissors'].includes(playerChoice)) {
        document.getElementById('selected-option').value = 'Invalid option';
        return false
    }
    return playerChoice;
};

const playGame = () => {

    const computer = getComputerChoice();
    const player = getPlayerChoice();
    if (!player) {
        return
    }
    
    document.getElementById('selected-option').value = '';

    document.querySelector('.PC-choice').textContent = `PC chose ${computer}`;
    document.querySelector('.player-choice').textContent = `Player chose ${player}`;

    if (player === computer) {
        console.log("It's a tie");
        return
    };

    if (player === 'rock') {
        if (computer === 'scissors') {
            console.log('Player wins!');
        } else {
            console.log('PC wins')
        };
        return
    } else if (player === 'paper') {
        if (computer === 'rock') {
            console.log('Player wins!');
        } else {
            console.log('PC wins');
        }
        return
    } else {
        if (computer === 'paper') {
            console.log('Player wins!');
        } else {
            console.log('PC wins!');
        }
        return
    }
}

const playButton = document.getElementById('play-game');
playButton.addEventListener('click', playGame);
