class Game
{
    constructor(TargetSpawnRate, TargetGrowSpeed, topOffset, canvasCtx, GameOverCB, GameTimeLimitMS)
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
        this.Drawer = new Drawer(canvasCtx, topOffset);
        this.shotHandler = new ShotHandler();
        this.latestTick = performance.now();
        this.TargetSpawnRate = TargetSpawnRate;
        this.TargetGrowSpeed = TargetGrowSpeed;
        this.TargetMaxRadius = 20;
        this.gameOverCB = GameOverCB;
        this.GameTimeLimitMS = GameTimeLimitMS;
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

        if (this.IsGameOver()) this.gameOverCB(this.score, this.CalculateAccPercent());
    }

    IsGameOver()
    {
        return (this.latestTick > this.gameCreationTime + this.GameTimeLimitMS);
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
        this.Drawer.Clear();
        
        let fps = this.CalcFps()
        
        this.canvasCtx.lineWidth = 1;

        this.canvasCtx.textAlign = "left";
        
        this.Drawer.DrawGrid();
        
        this.Drawer.DrawInfoBox();
        
        this.Drawer.DrawText("FPS: " + fps, 70);
        
        this.Drawer.DrawText("Score: " + Math.round(this.score), this.canvasCtx.canvas.width - this.canvasCtx.canvas.width / 1.6);
        
        this.Drawer.DrawText("Accuracy: " + this.CalculateAccPercent() + "%", this.canvasCtx.canvas.width - this.canvasCtx.canvas.width / 3.2);
        
        let timeRounded = Math.round(((this.latestTick - this.gameCreationTime) / 1000) * 10) / 10;
        
        this.Drawer.DrawText("Time: " + timeRounded.toFixed(1) + "s", this.canvasCtx.canvas.width - 10);
        
        this.targets.forEach(target => this.Drawer.DrawTarget(target));
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
        if (target != null)
        {
            this.score ++;//(((target.target.score() * 10000 / settings.TargetMaxRadius * 100000 / settings.TargetSpawnRate) * settings.TargetGrowSpeed) / 100) + 1;
            this.targets.splice(target.index, 1);
        }
    }
}