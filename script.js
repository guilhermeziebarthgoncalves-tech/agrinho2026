/* =========================================
   ELEMENTOS
========================================= */
const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");

const gameWrapper = document.getElementById("gameWrapper");
const hud = document.getElementById("hud");

const tractor = document.getElementById("tractor");

const scoreElement = document.getElementById("score");
const ecoElement = document.getElementById("eco");

const soyElements = document.querySelectorAll(".soy");
const pigElements = document.querySelectorAll(".pig");

const gameOver = document.getElementById("gameOver");
const gameOverTitle = document.getElementById("gameOverTitle");
const gameOverText = document.getElementById("gameOverText");

/* =========================================
   STATUS
========================================= */
let score = 0;
let eco = 100;

let tractorX = 100;
let tractorY = 100;

const speed = 18;

/* =========================================
   START GAME
========================================= */
startBtn.addEventListener("click", () => {

  startScreen.classList.add("hidden");
  gameWrapper.classList.remove("hidden");
  hud.classList.remove("hidden");

});

/* =========================================
   MOVIMENTO
========================================= */
document.addEventListener("keydown", (event) => {

  switch(event.key){

    case "ArrowUp":
      tractorY -= speed;
    break;

    case "ArrowDown":
      tractorY += speed;
    break;

    case "ArrowLeft":
      tractorX -= speed;
    break;

    case "ArrowRight":
      tractorX += speed;
    break;

  }

  /* limites */
  tractorX = Math.max(0, Math.min(window.innerWidth - 80, tractorX));
  tractorY = Math.max(80, Math.min(window.innerHeight - 80, tractorY));

  tractor.style.left = tractorX + "px";
  tractor.style.top = tractorY + "px";

  checkSoyCollision();
  checkPigCollision();
  checkWin();

});

/* =========================================
   COLISÃO SOJA
========================================= */
function checkSoyCollision(){

  soyElements.forEach((soy) => {

    if(soy.style.display === "none") return;

    const soyRect = soy.getBoundingClientRect();
    const tractorRect = tractor.getBoundingClientRect();

    if(
      tractorRect.left < soyRect.right &&
      tractorRect.right > soyRect.left &&
      tractorRect.top < soyRect.bottom &&
      tractorRect.bottom > soyRect.top
    ){

      soy.style.display = "none";

      score += 10;

      scoreElement.textContent = score;

    }

  });

}

/* =========================================
   COLISÃO PORCOS
========================================= */
function checkPigCollision(){

  pigElements.forEach((pig) => {

    const pigRect = pig.getBoundingClientRect();
    const tractorRect = tractor.getBoundingClientRect();

    if(
      tractorRect.left < pigRect.right &&
      tractorRect.right > pigRect.left &&
      tractorRect.top < pigRect.bottom &&
      tractorRect.bottom > pigRect.top
    ){

      eco -= 1;

      ecoElement.textContent = eco;

      if(eco <= 0){

        endGame(
          "🌎 Meio Ambiente Destruído",
          "Você assustou os porcos e prejudicou o equilíbrio sustentável da fazenda."
        );

      }

    }

  });

}

/* =========================================
   VITÓRIA
========================================= */
function checkWin(){

  if(score >= 80){

    endGame(
      "🚜 Fazenda Sustentável!",
      "Parabéns! Você colheu soja de forma sustentável e preservou o meio ambiente."
    );

  }

}

/* =========================================
   GAME OVER
========================================= */
function endGame(title, message){

  gameOver.classList.remove("hidden");

  gameOverTitle.textContent = title;
  gameOverText.textContent = message;

}