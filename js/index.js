let gameCanvas = document.getElementById("GameCanvas");

gameCanvas.onclick = e => HandleClick(e);

let ctx = gameCanvas.getContext("2d");

document.addEventListener("DOMContentLoaded", function() {
    Setup();
});

let Stack = {};

let state = "MainMenu";

let infoBarHeight = 40; //px

function InitGame(spawnrate, growspeed, difficulty)
{
    Stack.Game = new Game(spawnrate, growspeed, infoBarHeight, ctx, (score, accuracy) => GameOver(score, accuracy, difficulty), 10 * 1000);
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
        HighScoresMenu: () => {
            state = "HighScoresMenu";
        }
    };

    Stack.MainMenu = new MainMenu(ctx, mainMenuCallbacks);

    let highScoresCallbacks = {
        MainMenu: () => {
            state="MainMenu";
        }
    };

    Stack.HighScoresMenu = new HighScoresMenu(ctx, highScoresCallbacks);
}

function GameOver(score, accuracy, difficulty)
{
    let gameOverCallbacks = {
        MainMenu: () => {
            state="MainMenu";
        },
        HighScoresMenu: () => {
            state = "HighScoresMenu";
        }
    };

    SetHighScore({score, accuracy}, difficulty);

    let scores = GetHighScores();

    let currentHighScore = scores[difficulty];

    Stack.GameOverMenu = new GameOverMenu(ctx, gameOverCallbacks, {Score: score, Accuracy: accuracy, CurrentHighScore: currentHighScore.score});

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