class MainMenu
{
    constructor(canvasCtx, callbacks)
    {
        this.canvasCtx = canvasCtx;

        let paddingside =  canvasCtx.canvas.width / 10;

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
        this.canvasCtx.font = '30pt Kremlin Pro Web';
        this.canvasCtx.textBaseline = "top";

        this.canvasCtx.clearRect(0, 0, this.canvasCtx.canvas.width, this.canvasCtx.canvas.height);

        for(let key in this.rects)
        {
            this.canvasCtx.beginPath();
            this.canvasCtx.rect(this.rects[key].x, this.rects[key].y, this.rects[key].w, this.rects[key].h); 
            this.canvasCtx.fillStyle = '#333';
            this.canvasCtx.fill(); 
            this.canvasCtx.stroke();
            this.canvasCtx.closePath();
            this.canvasCtx.fillStyle = 'white';
            this.canvasCtx.textAlign = "center";  
            this.canvasCtx.fillText(this.rects[key].text, this.rects[key].x + this.rects[key].w / 2, this.rects[key].y);
        }  
    }
}