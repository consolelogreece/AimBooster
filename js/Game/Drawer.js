class DrawerGame
{
    constructor(canvasCtx, topOffset)
    {
        this.canvasCtx = canvasCtx;

        this.topOffset = topOffset;
    }

    Clear()
    {
        this.canvasCtx.clearRect(0, 0, this.canvasCtx.canvas.width, this.canvasCtx.canvas.height);
    }

    DrawText(text, offsetRight)
    {
        this.canvasCtx.font = "15px Arial";
        this.canvasCtx.fillStyle = "white";
        this.canvasCtx.textBaseline = "middle";
        this.canvasCtx.fillText(text, this.canvasCtx.canvas.width - offsetRight, infoBarHeight / 1.6)
    }

    DrawGrid()
    {
        var bw = this.canvasCtx.canvas.width;
        var bh = this.canvasCtx.canvas.height;
        var p = 0;

        this.canvasCtx.beginPath()

        for (var x = 0; x <= bw; x += 40) {
            this.canvasCtx.moveTo(0.5 + x + p, p);
            this.canvasCtx.lineTo(0.5 + x + p, bh + p);
        }

        for (var x = 0; x <= bh; x += 40) {
            this.canvasCtx.moveTo(p, 0.5 + x + p);
            this.canvasCtx.lineTo(bw + p, 0.5 + x + p);
        }
        
        this.canvasCtx.strokeStyle = "#bbb";
        this.canvasCtx.stroke();
    }

    DrawInfoBox()
    {
        this.canvasCtx.fillStyle = "#222222";
        this.canvasCtx.fillRect(0, 0, this.canvasCtx.canvas.width, this.topOffset);
    }

    DrawTarget(target)
    {
        var grd = this.canvasCtx.createRadialGradient(target.x, target.y, target.r,target.x, target.y, 0);
        grd.addColorStop(0,"#0857a6");
        grd.addColorStop(1,"rgba(154, 200, 245, 0.7)");
        this.canvasCtx.fillStyle = grd;
        this.canvasCtx.beginPath();
        this.canvasCtx.arc(target.x, target.y, target.r, 0, 2 * Math.PI);
        this.canvasCtx.fill();
    }
}