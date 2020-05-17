
let infoBarHeight = 40; //px

document.addEventListener("DOMContentLoaded", function() {
 
    Init();
  });

function Init()
{
    game = new Game(2170, 12, infoBarHeight, ctx)

    mainLoop()
}

let game;

let gameCanvas = document.getElementById("GameCanvas");

let ctx = gameCanvas.getContext("2d");

function mainLoop(DOMHRTS)
{
  game.Update();
  
  game.Draw();
 
  requestAnimationFrame(_ => mainLoop(_));
}

// todo, spawn rate is now inverted by accident. seems like i need to subtract the spawn rate from the maximum as currently number acts as period to wait before spawning new