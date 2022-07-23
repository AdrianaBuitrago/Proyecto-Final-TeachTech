// crear funcion numero random
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//   console.log(randomNumber(0,3));

// función para conseguir posicion aleatoria del tablero
function randomPosition() {
    return randomNumber(0, 3);
}

// crear funcion para guardar secuencia con parametro entrada
// donde una secuencia = array (numeros)

let level = 0;

function createSequence(maxSequence) {
    const sequence = []
    for (let index = 0; index < maxSequence; index++) {
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

function hideStartGameButton () {
    let startButtonElement = document.getElementById("startButton");
    startButtonElement.classList.add("invisible");
}

function showTextLevel(){
    let textLevelElement = document.getElementById("textLevel");
    textLevelElement.classList.remove("invisible");
}

// Crear una funcion inicializar start_game, vinculado al button y después ocultarlo.
function startGame() {
    increaseLevel();
    const sequence = createSequence(level);

    hideStartGameButton();

    showTextLevel();

    function showSequenceGame() {
        sequence.forEach((position, index) => {
            console.log(position);

            setTimeout(() => {
                activePosition(position);
            }, (index + 1) * 900);
        });
    }
    showSequenceGame();
}
// en cada vuelta llamar a setTimeout para poner los colores


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

