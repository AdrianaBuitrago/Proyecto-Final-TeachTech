// 1 variables globales del juego
let level = 0;
let sequence = [];

// crear funcion numero random
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// 2 función para conseguir posicion aleatoria del tablero
function randomPosition() {
    return randomNumber(0, 3);
}

// la secuencia no tiene que ser nueva cada vez sino la misma de antes...quitar el shift
/*function createSequence(maxSequence) {
    // editar sequence aqui
    const newSequence = []
    for (let numeroDeVuelta = 0; numeroDeVuelta < maxSequence; numeroDeVuelta++) {
        let aleatorio = randomPosition();
        newSequence.push(aleatorio)
    }
    return newSequence
}*/

// addPositionToSequence añade un numero aleatorio nuevo a la secuencia que ya tenemos
function addPositionToSequence() {
    let aleatorio = randomPosition();
    sequence.push(aleatorio);
}

function increaseLevel() {
    level = level + 1;
    let levelNumberElement = document.getElementById("levelNumber");
    levelNumberElement.innerText = level;
}

function hideStartGameButton() {
    let startButtonElement = document.getElementById("startButton");
    startButtonElement.classList.add("invisible");
}

// 4 startNewLevel - Inicia el juego por nivel (después de starGame)
function startNewLevel() {
    function showTextLevel() {
        let textLevelElement = document.getElementById("textLevel");
        textLevelElement.classList.remove("invisible");
    }
    // Muestra el Nivel
    showTextLevel();

    // incrementa el nivel porque empezamos en 0
    increaseLevel();

    // sequence = [2, 3]
    // Muestra secuencia 
    addPositionToSequence();
    // sequence = [2, 3, 1]

    function showUserTurn() {
        let userTurnElement = document.getElementById("userTurn");
        userTurnElement.classList.remove("invisible");

        let diamondsElements = document.getElementsByClassName("diamond");
        for (let diamondElement of diamondsElements) {
            diamondElement.classList.add("cursorPointer");
        }
    }


    // 6 startUserTurn - Inicia el turno del usuario y verifica si es correcto
    function startUserTurn() {
        let diamondsElements = document.getElementsByClassName("diamond");
        for (let diamondElement of diamondsElements) {
            diamondElement.addEventListener("click", verifySequence);
        }
        function removeEventListener() {
            for (let diamondElement of diamondsElements) {
                diamondElement.removeEventListener("click", verifySequence);
            }
        }
        showUserTurn();

        let positionToVerify = 0
        function verifySequence(eventInfo) {
            const idPulsado = eventInfo.target.id;
            // sequence [3,2,1]
            const idCorrecto = sequence[positionToVerify]; // 3

            activePosition(idPulsado);

            if (idPulsado == idCorrecto) {
                positionToVerify++;
                // seguimos
                // si la sig position a verificar de la seq es "la nada", empieza un nuevo nivel
                if (sequence[positionToVerify] === undefined) {
                    removeEventListener();
                    setTimeout(startNewLevel, 1500);
                } //este no tiene else

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
    // 5 showSequenceGame se encarga de mostrar la seq de colores al usuario
    // cuando acaba, llama a StartUserTurn
    function showSequenceGame() {
        sequence.forEach((position, numeroDeVuelta) => {
    
            setTimeout(() => {
                activePosition(position);
                // length muestra longitud de array 
                const ultimaVuelta = sequence.length
                if (ultimaVuelta === numeroDeVuelta + 1) {
                    setTimeout(startUserTurn, 1000);
                }
            }, (numeroDeVuelta + 1) * 900);
        });
    }
    hideUserTurn();
    showSequenceGame();
}

// 3 Inicia startGame, oculta el botón y llama a startNewLevel
function startGame() {
    hideStartGameButton();
    startNewLevel();
}

function hideTextLevel() {
    let textLevelElement = document.getElementById("textLevel");
    textLevelElement.classList.add("invisible");
}

function hideUserTurn() {
    let userTurnElement = document.getElementById("userTurn"); //tu turno
    userTurnElement.classList.add("invisible");

    let diamondsElements = document.getElementsByClassName("diamond");
    for (let diamondElement of diamondsElements) {
        diamondElement.classList.remove("cursorPointer");
    }
}

function resetGame() {
    level = 0;
    sequence = [];
    hideTextLevel();
    hideUserTurn();

    function showStartButton() {
        let startButtonElement = document.getElementById("startButton");
        startButtonElement.classList.remove("invisible");
    }
    showStartButton();
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
        deactivatePosition(position);
    }

    const myTimeout = setTimeout(deactivateCurrentPosition, 500);
}