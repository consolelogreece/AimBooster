class DrawerMenu
{
    constructor(canvasCtx)
    {
        this.canvasCtx = canvasCtx;
    }

    Clear()
    {
        this.canvasCtx.clearRect(0, 0, this.canvasCtx.canvas.width, this.canvasCtx.canvas.height);
    }

    DrawRect(rect, highlight)
    {
        if (rect.clickable)
        {
            this.canvasCtx.beginPath();
            this.canvasCtx.rect(rect.x, rect.y, rect.w, rect.h); 

            if (highlight)
            {
                this.canvasCtx.fillStyle = '#555';
            }
            else
            {
                this.canvasCtx.fillStyle = '#333';
            }
            this.canvasCtx.fill(); 
            this.canvasCtx.stroke();
            this.canvasCtx.closePath();
            this.canvasCtx.fillStyle = '#ebf2ff';
        }
        else
        {
            this.canvasCtx.fillStyle = '#333';
        }

        this.canvasCtx.textAlign = "center";  
        this.canvasCtx.textBaseline = "middle"; 
        this.canvasCtx.fillText(rect.text, rect.x + rect.w / 2, rect.y + (rect.h / 2));
    }
}