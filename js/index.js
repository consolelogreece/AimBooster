let gameCanvas = document.getElementById("GameCanvas");

gameCanvas.onclick = e => HandleClick(e);

let ctx = gameCanvas.getContext("2d");

document.addEventListener("DOMContentLoaded", function() {
    Setup();
});

let Stack = {};

let state = "MainMenu";

let infoBarHeight = 40; //px

function InitGame(spawnrate, growspeed)
{
    Stack.Game = new Game(spawnrate, growspeed, infoBarHeight, ctx, GameOver, 10 * 1000);
}

function InitMenus()
{
    let mainMenuCallbacks = {
        Easy: () =>
        {
            InitGame(1200, 10)
            state = "Game";
        },
        Intermediate: () => {
            InitGame(500, 10)
            state = "Game";
        },
        Hard: () => {
            InitGame(300, 12)
            state = "Game";
        },
        Insane: () => {
            InitGame(200, 16)
            state = "Game";
        }
    };

    Stack.MainMenu = new MainMenu(ctx, mainMenuCallbacks);
}

function GameOver(score, accuracy)
{
    console.log(score, accuracy)
    let gameOverCallbacks = {
        MainMenu: () => {
            state="MainMenu";
        }
    };

    Stack.GameOverMenu = new GameOverMenu(ctx, gameOverCallbacks, {Score: score, Accuracy: accuracy});

    state = "GameOverMenu";
}

function Setup()
{
    InitGame();

    InitMenus();

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

function Start()
{
    InitGame();
}