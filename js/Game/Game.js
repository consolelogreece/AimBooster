class Game
{
    constructor(TargetSpawnRate, TargetGrowSpeed, topOffset, canvasCtx, GameOverCB, cancelGameCB, GameTimeLimitMS)
    {
        this.gameCreationTime = performance.now();
        this.gameStartTime = performance.now();
        this.score = 0;
        this.totalClicks = 0;
        this.hits = 0;
        this.misses = 0;
        this.targets = [];
        this.topOffset = topOffset;
        this.canvasCtx = canvasCtx;
        this.lastTargetCreationTime = 0;
        this.deltaTime = 0;
        this.Drawer = new DrawerGame(canvasCtx, topOffset);
        this.shotHandler = new ShotHandler();
        this.latestTick = performance.now();
        this.TargetSpawnRate = TargetSpawnRate;
        this.TargetGrowSpeed = TargetGrowSpeed;
        this.TargetMaxRadius = 20;
        this.gameOverCB = GameOverCB;
        this.GameTimeLimitMS = GameTimeLimitMS;

        this.cancelGameCB = cancelGameCB;

        this.countdownSeconds = 0;
        this.countdownEndsSeconds = 3;

        this.postLifeTimeoutMS = 300;

        this.started = false;
    }

    Update()
    {
        let timeNow = performance.now();

        if (!this.started)
        {
            this.countdownSeconds = (timeNow - this.gameCreationTime) / 1000;

            if (this.countdownSeconds > this.countdownEndsSeconds) 
            {
                this.started = true
                this.gameStartTime = timeNow;
                this.latestTick = timeNow;
            };

            return;
        }

        this.deltaTime = timeNow - this.latestTick;

        this.UpdateTargets();

        if (timeNow - this.lastTargetCreationTime > this.TargetSpawnRate)
        {
            this.SpawnNewTarget();
            this.lastTargetCreationTime = timeNow;
        }

        this.latestTick = timeNow;

        if (this.IsGameOver()) this.gameOverCB(this.score, this.CalculateAccPercent());
    }

    IsGameOver()
    {
        return (this.latestTick > this.gameStartTime + this.GameTimeLimitMS);
    }

    UpdateTargets()
    {
        let timeNow = performance.now();

        for(let i = this.targets.length - 1; i >= 0; i--)
        {
            let target = this.targets[i];  

            if (target.deathTime != null)
            {
                if (timeNow - target.deathTime > this.postLifeTimeoutMS)
                {
                    this.targets.splice(target.index, 1);
                }
            }
            else
            {
                if (target.r > this.TargetMaxRadius)
                {
                    target.deathTime = timeNow;
                }
                else
                {
                    target.r += (this.TargetGrowSpeed * this.deltaTime) / 500;
                }
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
        this.Drawer.Clear();
        
        let fps = this.CalcFps()
        
        this.canvasCtx.lineWidth = 1;

        this.canvasCtx.textAlign = "left";
        
        this.Drawer.DrawGrid();
        
        this.Drawer.DrawInfoBox();
        
        this.Drawer.DrawText("FPS: " + fps, 80);
        
        this.Drawer.DrawText("Score: " + Math.round(this.score), this.canvasCtx.canvas.width - this.canvasCtx.canvas.width / 1.6);
        
        this.Drawer.DrawText("Accuracy: " + this.CalculateAccPercent() + "%", this.canvasCtx.canvas.width - this.canvasCtx.canvas.width / 3.2);
        
        let timeRounded = Math.round(((this.latestTick - this.gameStartTime) / 1000) * 10) / 10;
        
        this.Drawer.DrawText("Time: " + timeRounded.toFixed(1) + "s", this.canvasCtx.canvas.width - 20);
        
        this.targets.forEach(target => 
        {
            if (target.deathTime == null)
            {
                this.Drawer.DrawTarget(target, "#0857a6","rgba(154, 200, 245, 0.7)");
            }
            else
            {
                if (target.r > this.TargetMaxRadius)
                {
                    this.Drawer.DrawTarget(target, "rgba(214, 0, 0, 0.7)","rgba(181, 87, 87, 0.4)");
                }
                else
                {
                    this.Drawer.DrawTarget(target, "#24a816","rgba(126, 235, 115, 0.7)");
                }
            }
        });

        "rgba(154, 200, 245, 0.7)"

        if (!this.started) 
        {
            this.canvasCtx.fillStyle = "rgba(34, 34, 34, 0.7)";
            this.canvasCtx.fillRect(0, this.topOffset, this.canvasCtx.canvas.width, this.canvasCtx.canvas.height);

            this.Drawer.OverlayText("Get Ready!", this.canvasCtx.canvas.width / 2, 100, 50);

            this.Drawer.OverlayText(Math.ceil(this.countdownEndsSeconds - this.countdownSeconds), this.canvasCtx.canvas.width / 2, this.canvasCtx.canvas.height / 2, 60);

            this.Drawer.OverlayText("(ESC) to cancel", this.canvasCtx.canvas.width / 2, this.canvasCtx.canvas.height - this.canvasCtx.canvas.height / 7, 12);
        }
    }

    CalculateAccPercent()
    {
        let accPercent = 0;
        
        if (this.totalClicks > 0) accPercent = Math.round(((this.score / this.totalClicks) * 100) * 10) / 10;

        return accPercent;
    }

    HandleClick(e)
    {
        this.totalClicks++;
        let coords = GetRelativeMouseCoordsFromEvent(e, this.canvasCtx);
        let target = this.shotHandler.GetIntersectingTarget(coords, this.targets);

        let timeNow = performance.now();

        if (target != null && target.target.deathTime === null)
        {  
            this.score ++;
            target.target.deathTime = timeNow;
        }
    }

    HandleKeyPress(e)
    {
        if (e.key === "Escape")
        {
            if (!this.started)
            {
                this.cancelGameCB();
            }
            else
            { 
                this.gameOverCB(this.score, this.CalculateAccPercent());
            }
        }
    }
}