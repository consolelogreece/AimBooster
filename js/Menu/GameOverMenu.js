class GameOverMenu
{
    constructor(canvasCtx, callbacks, GameStats)
    {
        this.canvasCtx = canvasCtx;

        this.GameStats = GameStats;

        let paddingside =  canvasCtx.canvas.width / 10;

        this.callbacks = callbacks;

        this.Drawer = new DrawerMenu(canvasCtx);

        this.rects = {
            Score: {
                x: paddingside, y: 120, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb: () => {}, text: "Score:  " + GameStats.Score, clickable: false
            },
            Accuracy: {
                x: paddingside, y: 180, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb: () => {}, text: "Accuracy:  " + GameStats.Accuracy + "%", clickable: false
            },
            CurrentHighScore: {
                x: paddingside, y: 240, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb:  () => {}, text: "Current Highest: " + GameStats.CurrentHighScore, clickable: false
            },
            HighScoresMenu: {
                x: paddingside, y: 300, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb: callbacks.HighScoresMenu, text: "Your High Scores", clickable: true
            },
            MainMenu: {
                x: paddingside, y: 360, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb: callbacks.MainMenu, text: "Main Menu", clickable: true
            }
        };

        this.hovered = "";

        this.titleOffset = 50;
    }

    HandleClick(e)
    {
        let coords = GetRelativeMouseCoordsFromEvent(e, this.canvasCtx);

        let rect = GetRect(this.rects, coords);

        if (rect != undefined) rect.item.cb();
    }


    HandleMouseMove(e)
    {
        let coords = GetRelativeMouseCoordsFromEvent(e, this.canvasCtx);

        let rect = GetRect(this.rects, coords);

        if (rect != undefined && rect.item.clickable)
        {
            console.log("right")
            this.hovered = rect.name;
        }
        else
        {
            this.hovered = "";
        }
    }

    Update()
    {}

    Draw()
    {
        this.Drawer.Clear();

        this.canvasCtx.font = '30pt Roboto';

        this.canvasCtx.fillStyle = '#333';
        this.canvasCtx.textAlign = "center";  
        this.canvasCtx.fillText("Training Complete", this.canvasCtx.canvas.width / 2, this.titleOffset);

        this.canvasCtx.font = '20pt Roboto';
        this.canvasCtx.textBaseline = "top";

        for(let key in this.rects)
        {
            this.Drawer.DrawRect(this.rects[key], this.hovered == key);
        }
    }

    HandleKeyPress(e)
    {
        if (e.key === "Escape")
        {
            this.callbacks.MainMenu();
        }
    }
}