export default class Game
{
    constructor(TargetSpawnRate, TargetGrowSpeed)
    {
        this.score = 0;
        this.totalClicks = 0;
        this.hits = 0;
        this.misses = 0;
        this.targets = [];
    }
}