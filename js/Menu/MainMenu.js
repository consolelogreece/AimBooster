class MainMenu
{
    constructor(canvasCtx, callbacks)
    {
        this.canvasCtx = canvasCtx;

        let paddingside =  canvasCtx.canvas.width / 10;

        this.Drawer = new DrawerMenu(canvasCtx);

        this.hovered = "";

        this.rects = {
            Easy: {
                x: paddingside, y: 120, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb: callbacks.Easy, text: "Easy", clickable: true
            },
            Intermediate: {
                x: paddingside, y: 180, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb: callbacks.Intermediate, text: "Intermediate", clickable: true
            },
            Hard: {
                x: paddingside, y: 240, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb: callbacks.Hard, text: "Hard", clickable: true
            },
            Insane: {
                x: paddingside, y: 300, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb: callbacks.Insane, text: "Insane", clickable: true
            },
            HighScoresMenu: {
                x: paddingside, y: 360, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb: callbacks.HighScoresMenu, text: "Your High Scores", clickable: true
            }
        };

        this.titleOffset = 50;
    }

    HandleClick(e)
    {
        let coords = GetRelativeMouseCoordsFromEvent(e, this.canvasCtx);

        let rect = GetRect(this.rects, coords);

        if (rect != undefined) {rect.item.cb()};
    }

    HandleMouseMove(e)
    {
        let coords = GetRelativeMouseCoordsFromEvent(e, this.canvasCtx);

        let rect = GetRect(this.rects, coords);

        if (rect != undefined && rect.item.clickable)
        {
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
        this.canvasCtx.fillText("Main Menu", this.canvasCtx.canvas.width / 2, this.titleOffset);

        this.canvasCtx.textBaseline = "top";
        this.canvasCtx.font = '20pt Roboto';
        
        for(let key in this.rects)
        {
            this.Drawer.DrawRect(this.rects[key], this.hovered == key);
        }
    }
}