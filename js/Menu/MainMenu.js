class MainMenu
{
    constructor(canvasCtx, callback)
    {
        this.canvasCtx = canvasCtx;
        this.callback = callback;
        this.rects = {
            Start: {
                x: 0, y: 0, w: 0, h: 0
            }
        };
    }

    HandleClick(e)
    {
        let coords = GetRelativeMouseCoordsFromEvent(e, this.canvasCtx);

        let rect = this.GetRect(coords);

        if (rect != undefined) this.callback();
    }

    GetRect(coords)
    {
        for (var key in this.rects) 
        {
            let rect = this.rects[key];
            if (coords.x > rect.x && coords.x < rect.x + rect.w && coords.y > rect.y && coords.y < rect.y + rect.h)
            {
                return rect;
            }
        }
    }

    Update()
    {

    }

    Draw()
    {
        let paddingside =  this.canvasCtx.canvas.width / 10;
        this.canvasCtx.clearRect(0, 0, this.canvasCtx.canvas.width, this.canvasCtx.canvas.height);
        this.canvasCtx.beginPath();
        this.canvasCtx.rect(paddingside, 100, this.canvasCtx.canvas.width - paddingside * 2, 40); 

        this.rects.Start.x = paddingside;
        this.rects.Start.y = 100;
        this.rects.Start.w = this.canvasCtx.canvas.width - paddingside * 2;
        this.rects.Start.h = 40;

        this.canvasCtx.fillStyle = '#333';
        this.canvasCtx.fill(); 
        this.canvasCtx.stroke();
        this.canvasCtx.closePath();
        this.canvasCtx.font = '30pt Kremlin Pro Web';
        this.canvasCtx.fillStyle = 'white';
        this.canvasCtx.textBaseline = "top";
        this.canvasCtx.fillText('Start', paddingside, 100);
    }
}