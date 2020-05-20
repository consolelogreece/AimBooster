class Target {
    constructor(x,y,r)
    {
      this.x = x;
      this.y = y;
      this.r = r;

      this.deathTime = null;
      
      this.birthTime = performance.now();
    }
    
    score()
    {
      return -1 / (this.birthTime - performance.now());
    }
}