// crear funcion numero random
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// función para conseguir posicion aleatoria del tablero
function randomPosition() {
    return randomNumber(0, 3);
}

let level = 0;
let sequence

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

// startNewLevel - Inicia el juego por nivel (después de starGame)
function startNewLevel() {
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


    // startUserTurn - Inicia el usuario
    function startUserTurn() {
        let diamondsElements = document.getElementsByClassName("diamond")

        for (let diamondElement of diamondsElements) {
            diamondElement.addEventListener("click", verifySequence)
        }
        function removeEventListener (){
            for (let diamondElement of diamondsElements) {
                diamondElement.removeEventListener("click", verifySequence)
            }
        }
        showUserTurn()

        function verifySequence(eventInfo) {
            const idPulsado = eventInfo.target.id
            const idCorrecto = sequence[0]

            if (idPulsado == idCorrecto) {
                // seguimos

                // y eliminamos el 1er elemento del array sequence.shift()
                sequence.shift()
                if (sequence.length === 0) {
                    removeEventListener()
                    startNewLevel()
                }
            } else {
                // game over (confirm que diga game over y que incluya dos botones, reintentar y cancelar)
                let result = confirm("😭 Game Over! \n😏 ¿Reintentar partida?")
                removeEventListener()
                if (result == true) {
                    resetGame()
                    startGame()
                } else {
                    resetGame()
                }
            }

        }

    }

    // Muestra secuencia 
    sequence = createSequence(level);

    function showSequenceGame() {
        sequence.forEach((position, numeroDeVuelta) => {

            setTimeout(() => {
                activePosition(position);
                // length muestra longitud de array 
                const ultimaVuelta = sequence.length
                if (ultimaVuelta === numeroDeVuelta + 1) {
                    setTimeout(startUserTurn, 1000)
                }
            }, (numeroDeVuelta + 1) * 900);
        });
    }
    hideUserTurn()
    showSequenceGame();
}

// Inicia startGame, oculta el botón y llama a startNewLevel
function startGame() {
    hideStartGameButton();
    startNewLevel();
}

function hideTextLevel() {
    let textLevelElement = document.getElementById("textLevel")
    textLevelElement.classList.add("invisible");
}

function hideUserTurn() {
    let userTurnElement = document.getElementById("userTurn")
    userTurnElement.classList.add("invisible");
}

function resetGame() {
    level = 0
    hideTextLevel()
    hideUserTurn()

    function showStartButton() {
        let startButtonElement = document.getElementById("startButton")
        startButtonElement.classList.remove("invisible");
    }
    showStartButton()
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

