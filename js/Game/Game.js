class Game
{
    constructor(TargetSpawnRate, TargetGrowSpeed, topOffset, canvasCtx)
    {
        this.gameCreationTime = performance.now();
        this.score = 0;
        this.totalClicks = 0;
        this.hits = 0;
        this.misses = 0;
        this.targets = [];
        this.topOffset = topOffset;
        this.canvasCtx = canvasCtx;
        this.lastTargetCreationTime = 0;
        this.deltaTime = 0;
        this.Drawer = new Drawer(canvasCtx);
        this.latestTick = performance.now();
        this.TargetSpawnRate = TargetSpawnRate;
        this.TargetGrowSpeed = TargetGrowSpeed;
        this.TargetMaxRadius = 20;
    }

    Update()
    {
        let currentTick = performance.now();

        this.UpdateTargets();

        this.deltaTime = currentTick - this.latestTick;
        
        if (currentTick - this.lastTargetCreationTime > this.TargetSpawnRate)
        {
            this.SpawnNewTarget();
            this.lastTargetCreationTime = currentTick;
        }

        this.latestTick = currentTick;
    }

    UpdateTargets()
    {
        
        for(let i = this.targets.length - 1; i >= 0; i--)
        {
            let target = this.targets[i];  

            target.r += (this.TargetGrowSpeed * this.deltaTime) / 500;

            if (target.r > this.TargetMaxRadius)
            {
                this.targets.splice(i,1)
            }
        }
    }

    SpawnNewTarget()
    {
        let highestY = this.topOffset + this.TargetMaxRadius; // circles shouldnt ever overlap info bar
        let lowestY = this.canvasCtx.canvas.height - this.TargetMaxRadius;
        
        let randY = Math.floor(Math.random() * (lowestY - highestY + 1)) + highestY;
        let randX = Math.floor(Math.random() * (this.canvasCtx.canvas.width - this.TargetMaxRadius * 2)) + this.TargetMaxRadius;

        this.targets.push(new Target(randX, randY, 1))
    }

    CalcFps()
    {
        return Math.round(1 / (this.deltaTime / 1000));
    }

    Draw()
    {
        this.canvasCtx.clearRect(0, 0, this.canvasCtx.canvas.width, this.canvasCtx.canvas.height);
        
        let fps = this.CalcFps()
        
        this.canvasCtx.lineWidth = 1;
        
        this.Drawer.DrawGrid();
        
        this.Drawer.DrawInfoBox();
        
        this.Drawer.DrawText("FPS: " + fps, 70);
        
        this.Drawer.DrawText("Score: " + Math.round(this.score), this.canvasCtx.canvas.width - this.canvasCtx.canvas.width / 1.6);
        
        let accPercent = 0;
        
        if (this.totalClicks > 0) accPercent = Math.round(((this.score / this.totalClicks) * 100) * 10) / 10;
        
        this.Drawer.DrawText("Accuracy: " + accPercent + "%", this.canvasCtx.canvas.width - this.canvasCtx.canvas.width / 3.2);
        
        let timeRounded = Math.round(((this.latestTick - this.gameCreationTime) / 1000) * 10) / 10;
        
        this.Drawer.DrawText("Time: " + timeRounded.toFixed(1) + "s", this.canvasCtx.canvas.width - 10);
        
        this.canvasCtx.lineWidth = 0.1;
        
        this.targets.forEach((target, i) => {
            this.canvasCtx.beginPath();
            this.canvasCtx.arc(target.x, target.y, target.r, 0, 2 * Math.PI);
            var grd = this.canvasCtx.createRadialGradient(target.x, target.y, target.r,target.x, target.y, 0);
            grd.addColorStop(0,"#0857a6");
            grd.addColorStop(1,"rgba(154, 200, 245, 0.7)");
            this.canvasCtx.fillStyle = grd;
            this.canvasCtx.fill();
            this.canvasCtx.stroke(); 
        });
    }
}

class Drawer
{
    constructor(canvasCtx)
    {
        this.canvasCtx = canvasCtx;
    }

    DrawText(text, offsetRight)
    {
        this.canvasCtx.font = "15px Arial";
        this.canvasCtx.fillStyle = "white";
        this.canvasCtx.fillText(text, this.canvasCtx.canvas.width - offsetRight, infoBarHeight / 1.6)
    }

    DrawGrid(){
        var bw = this.canvasCtx.canvas.width;
        var bh = this.canvasCtx.canvas.height;
        var p = 0;

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
        this.canvasCtx.fillRect(0, 0, this.canvasCtx.canvas.width, 40);
    }
}