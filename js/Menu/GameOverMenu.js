class GameOverMenu
{
    constructor(canvasCtx, callbacks, GameStats)
    {
        this.canvasCtx = canvasCtx;

        this.GameStats = GameStats;

        let paddingside =  canvasCtx.canvas.width / 10;

        this.Drawer = new DrawerMenu(canvasCtx);

        this.rects = {
            Score: {
                x: paddingside, y: 120, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb: () => {}, text: "Score:  " + GameStats.Score
            },
            Accuracy: {
                x: paddingside, y: 180, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb: () => {}, text: "Accuracy:  " + GameStats.Accuracy + "%"
            },
            CurrentHighScore: {
                x: paddingside, y: 240, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb:  () => {}, text: "Current Highest: " + GameStats.CurrentHighScore
            },
            HighScoresMenu: {
                x: paddingside, y: 300, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb: callbacks.HighScoresMenu, text: "High Scores"
            },
            MainMenu: {
                x: paddingside, y: 360, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb: callbacks.MainMenu, text: "Main Menu"
            }
        };

        this.titleOffset = 50;
    }

    HandleClick(e)
    {
        let coords = GetRelativeMouseCoordsFromEvent(e, this.canvasCtx);

        let rect = this.GetRect(coords);

        if (rect != undefined) rect.cb();
    }

    GetRect(coords)
    {
        for (var key in this.rects) 
        {
            let rect = this.rects[key];
            if (IsPointInsideRectangle(coords.x, coords.y, rect.x, rect.y, rect.w, rect.h)) return rect;
        }
    }

    Update()
    {}

    Draw()
    {
        this.Drawer.Clear();

        this.canvasCtx.font = '30pt Roboto';

        this.canvasCtx.fillStyle = '#444';
        this.canvasCtx.textAlign = "center";  
        this.canvasCtx.fillText("Training Complete", this.canvasCtx.canvas.width / 2, this.titleOffset);

        this.canvasCtx.font = '20pt Roboto';
        this.canvasCtx.textBaseline = "top";

        for(let key in this.rects)
        {
            this.Drawer.DrawRect(this.rects[key]);
        }
    }
}