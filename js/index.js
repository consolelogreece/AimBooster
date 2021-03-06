let gameCanvas = document.getElementById("GameCanvas");

gameCanvas.onclick = e => HandleEvent("HandleClick", e);

gameCanvas.onmousemove = e => HandleEvent("HandleMouseMove", e)

window.onkeydown = e => HandleEvent("HandleKeyPress", e);

let ctx = gameCanvas.getContext("2d");

document.addEventListener("DOMContentLoaded", function() {
    Setup();
});

let Stack = {};

let state = "MainMenu";

let infoBarHeight = 40; //px

function InitGame(spawnrate, growspeed, difficulty)
{
    Stack.Game = new Game(spawnrate, growspeed, infoBarHeight, ctx, (score, accuracy) => GameOver(score, accuracy, difficulty), () => {state = "MainMenu"}, 30 * 1000);
}

function InitMenus()
{
    let mainMenuCallbacks = {
        Easy: () =>
        {
            InitGame(1200, 10, "Easy")
            state = "Game";
        },
        Intermediate: () => {
            InitGame(500, 10, "Intermediate")
            state = "Game";
        },
        Hard: () => {
            InitGame(300, 12, "Hard")
            state = "Game";
        },
        Insane: () => {
            InitGame(200, 16, "Insane")
            state = "Game";
        },
        HighScoresMenu: ShowHighScores
    };

    Stack.MainMenu = new MainMenu(ctx, mainMenuCallbacks);
}

function GameOver(score, accuracy, difficulty)
{
    let gameOverCallbacks = {
        MainMenu: () => {
            state="MainMenu";
        },
        HighScoresMenu: ShowHighScores
    };

    SetHighScore({score, accuracy}, difficulty);

    let scores = GetHighScores();

    let currentHighScore = scores[difficulty];

    Stack.GameOverMenu = new GameOverMenu(ctx, gameOverCallbacks, {Score: score, Accuracy: accuracy, CurrentHighScore: currentHighScore.score});

    state = "GameOverMenu";
}

function ShowHighScores()
{
    let highScoresCallbacks = {
        MainMenu: () => {
            state="MainMenu";
        }
    };

    Stack.HighScoresMenu = new HighScoresMenu(ctx, highScoresCallbacks);

    state = "HighScoresMenu";
}

function Setup()
{
    InitGame();

    InitMenus();

    mainLoop();
}

function HandleEvent(eventHandlerName, event)
{
    if (typeof Stack[state][eventHandlerName] === "function") { 
        Stack[state][eventHandlerName](event);
    }
}

function mainLoop(DOMHRTS)
{
    Stack[state].Update();
    
    Stack[state].Draw();
 
    requestAnimationFrame(_ => mainLoop(_));
}