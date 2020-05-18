let gameCanvas = document.getElementById("GameCanvas");

let ctx = gameCanvas.getContext("2d");

document.addEventListener("DOMContentLoaded", function() {
    Setup();
});

let Stack = {};

let state = "Game";

let infoBarHeight = 40; //px

function InitGame()
{
    game = new Game(2170, 12, infoBarHeight, ctx);

    gameCanvas.onclick = e => game.HandleClick(e);

    Stack.Game = game;
}

function Setup()
{
    InitGame();

    mainLoop();
}

function HandleClick(e)
{
    Stack[state].HandleClick(e);
}

function mainLoop(DOMHRTS)
{
    Stack[state].Update();
    
    Stack[state].Draw();
 
    requestAnimationFrame(_ => mainLoop(_));
}