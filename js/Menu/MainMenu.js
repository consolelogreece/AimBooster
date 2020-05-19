class MainMenu
{
    constructor(canvasCtx, callbacks)
    {
        this.canvasCtx = canvasCtx;

        let paddingside =  canvasCtx.canvas.width / 10;

        this.Drawer = new DrawerMenu(canvasCtx);

        this.rects = {
            Easy: {
                x: paddingside, y: 25, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb: callbacks.Easy, text: "Easy"
            },
            Intermediate: {
                x: paddingside, y: 125, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb: callbacks.Intermediate, text: "Intermediate"
            },
            Hard: {
                x: paddingside, y: 225, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb: callbacks.Hard, text: "Hard"
            },
            Insane: {
                x: paddingside, y: 325, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb: callbacks.Insane, text: "Insane"
            },
            HighScoresMenu: {
                x: paddingside, y: 425, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb: callbacks.HighScoresMenu, text: "High Scores"
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
    {

    }

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