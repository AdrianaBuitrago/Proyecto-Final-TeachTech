// crear funcion numero random
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// función para conseguir posicion aleatoria del tablero
function randomPosition() {
    return randomNumber(0, 3);
}

let level = 0;

function createSequence(maxSequence) {
    const sequence = []
    for (let numeroDeVuelta = 0; numeroDeVuelta < maxSequence; numeroDeVuelta++) {
        let aleatorio = randomPosition();
        sequence.push(aleatorio)
    }
    return sequence
}

function increaseLevel() {
    level = level + 1;
    let levelNumberElement = document.getElementById("levelNumber");
    levelNumberElement.innerText = level
}

function hideStartGameButton() {
    let startButtonElement = document.getElementById("startButton");
    startButtonElement.classList.add("invisible");
}

// Inicia el juego por nivel (después de starGame)
function startLevel() {
    function showTextLevel() {
        let textLevelElement = document.getElementById("textLevel");
        textLevelElement.classList.remove("invisible");
    }
    // Muestra el Nivel
    showTextLevel();

    increaseLevel();

    function showUserTurn() {
        let userTurnElement = document.getElementById("userTurn")
        userTurnElement.classList.remove("invisible");
    }
    // Muestra secuencia 
    const sequence = createSequence(level);

    function showSequenceGame() {
        sequence.forEach((position, numeroDeVuelta) => {

            setTimeout(() => {
                activePosition(position);
                // length muestra longitud de array 
                const ultimaVuelta = sequence.length
                if (ultimaVuelta===numeroDeVuelta+1) {
                    setTimeout(showUserTurn, 1000)
                }
            }, (numeroDeVuelta + 1) * 900);
        });
    }
    showSequenceGame();
}

// Inicia startGame, oculta el botón y llama a startLevel
function startGame() {
    hideStartGameButton();
    startLevel();
}

// funciones para apagar y ecender los colores
function deactivatePosition(position) {
    let element0 = document.getElementById(position.toString());
    element0.classList.remove("active");
}

function activePosition(position) {
    let element0 = document.getElementById(position.toString());
    element0.classList.add("active");
    function deactivateCurrentPosition() {
        deactivatePosition(position)
    }

    const myTimeout = setTimeout(deactivateCurrentPosition, 500);
}

