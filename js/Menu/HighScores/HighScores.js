class HighScoresMenu
{
    constructor(canvasCtx, callbacks)
    {
        this.canvasCtx = canvasCtx;

        let paddingside =  canvasCtx.canvas.width / 10;

        this.rects = {
            MainMenu: {
                x: paddingside, y: 325, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb: callbacks.MainMenu, text: "Main Menu"
            }
        };

        this.UpdateHighScores();

        // if another place needs to listen to onstorage event, set this elsewhere and have an array of delegates.
        window.onstorage = () => {
            this.UpdateHighScores();   
        };

        this.Drawer = new DrawerMenu(canvasCtx);
    }

    UpdateHighScores()
    {
        this.HighScores = GetHighScores();
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

        this.canvasCtx.font = '20pt Kremlin Pro Web';
        this.canvasCtx.fillStyle = 'black';
        this.canvasCtx.textAlign = "left";

        let i = 1;
        for(let key in this.HighScores)
        {
            let score = this.HighScores[key];
            let displayString = key + " - " + score.score + " - " + score.accuracy + "%";
            this.canvasCtx.fillText(displayString, this.canvasCtx.canvas.width / 10, i * 50);
            i++
        }

        for(let key in this.rects)
        {
            this.Drawer.DrawRect(this.rects[key]);
        }
    }
}