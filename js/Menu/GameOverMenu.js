class GameOverMenu
{
    constructor(canvasCtx, callbacks, GameStats)
    {
        this.canvasCtx = canvasCtx;

        this.GameStats = GameStats;

        let paddingside =  canvasCtx.canvas.width / 10;

        this.Drawer = new DrawerMenu(canvasCtx);

        this.rects = {
            MainMenu: {
                x: paddingside, y: 325, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb: callbacks.MainMenu, text: "Main Menu"
            },
            Score: {
                x: paddingside, y: 125, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb: () => {}, text: "Score:  " + GameStats.Score
            },
            Accuracy: {
                x: paddingside, y: 225, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb: () => {}, text: "Accuracy:  " + GameStats.Accuracy + "%"
            }
        };
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

        this.canvasCtx.font = '30pt Kremlin Pro Web';
        this.canvasCtx.textBaseline = "top";

        for(let key in this.rects)
        {
            this.Drawer.DrawRect(this.rects[key]);
        }
    }
}