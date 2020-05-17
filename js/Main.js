let score = 0;
let totalClicks = 0;
let hits = 0;
let misses = 0;
let infoBarHeight = 40; //px
let deltaTimeDivisionConstant = 200;
let inPlay = false;
let gameCanvas = document.getElementById("GameCanvas");
let targets = [];
let last = 0;
let startTick = 0;
let creationLoop;
let settings = {
  TargetSpawnRate: 1750,
  TargetGrowSpeed:  12,
  TargetMaxRadius: 20
}

document.addEventListener("DOMContentLoaded", function() {
  DrawGrid();
  drawInfoBox();
});

function handleClick(e)
{
  totalClicks++;
  let coords = getRelativeMouseCoordsFromEvent(e);
  let target = getIntersectingTarget(coords);
  if (target != null)
  {
    score ++;//(((target.target.score() * 10000 / settings.TargetMaxRadius * 100000 / settings.TargetSpawnRate) * settings.TargetGrowSpeed) / 100) + 1;
    targets.splice(target.index, 1);
  }
}

function getIntersectingTarget(coords)
{
  for(let i = 0; i < targets.length; i++)
  {
    let target = targets[i];

    if (isPointInsideCircle(target.x, target.y, coords.x, coords.y, target.r)) return {target: target, index: i};
  }
}
// circle center, point, radius of circle
function isPointInsideCircle(x, y, x1, y1, r)
{
  return ((x - x1) ** 2) + ((y - y1) ** 2) < r ** 2;
}

function getRelativeMouseCoordsFromEvent(e)
{
  var ctx = gameCanvas.getContext("2d");
  var rect = ctx.canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function handleSettingsChange(e) 
{
  if (!inPlay) settings[e.id] = parseInt(e.value);
}

let createTarget = (x, y, r) => 
{
  let birthTime = Date.now();
}

async function mainLoop(DOMHRTS, previousTick, currentTick)
{
  if (!inPlay) return;
  
  let deltaTime = currentTick - previousTick;
  
  Update(deltaTime);
  
  Draw(deltaTime, currentTick);
 
  requestAnimationFrame((DOMHRTS) => mainLoop(DOMHRTS, currentTick, performance.now()));
}

function Update(deltaTime)
{
  updateExistingTargets(deltaTime);
}

function spawnNew()
{
  if (!inPlay) return;
  // todo pass params in. this function shouldnt rely on any outside info not passed by params
  var ctx = gameCanvas.getContext("2d");
  
  // confusing names, remember 0,0 is top left.
  let highestY = infoBarHeight + settings.TargetMaxRadius; // circles shouldnt ever overlap info bar
  let lowestY = ctx.canvas.height - settings.TargetMaxRadius;
  
  let randY = Math.floor(Math.random() * (lowestY - highestY + 1)) + highestY;
  let randX = Math.floor(Math.random() * (ctx.canvas.width - settings.TargetMaxRadius * 2)) +         settings.TargetMaxRadius;

  targets.push(new Target(randX, randY, 1))
}

function updateExistingTargets(deltaTime)
{
  for(let i = targets.length - 1; i >= 0; i--)
  {
    let target = targets[i];  
    target.r += (settings.TargetGrowSpeed * deltaTime) / 500;
    if (target.r > settings.TargetMaxRadius)
    {
      targets.splice(i,1)
    }
  }
}

function Start()
{
  if (inPlay) return;
  startTick = performance.now();
  creationLoop = setInterval(spawnNew, 1000 / (settings.TargetSpawnRate / 1000));
  requestAnimationFrame((DOMHRTS) => mainLoop(DOMHRTS, performance.now(), performance.now()));
  inPlay = true;
}

function Stop()
{
  if (!inPlay) return;
  clearInterval(creationLoop);
  targets = [];
  inPlay = false;
  score = 0;
  totalClicks = 0;
}

function Draw(deltaTime, currentTick)
{
  var ctx = gameCanvas.getContext("2d");
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  let fps = calcFps(deltaTime)
  
  ctx.lineWidth = 1;
  
  DrawGrid();
  
  drawInfoBox();
 
  DrawText("FPS: " + fps, ctx, 70);
  
  DrawText("Score: " + Math.round(score), ctx, ctx.canvas.width - ctx.canvas.width / 1.6);
  
  let accPercent = 0;
  
  if (totalClicks > 0) accPercent = Math.round(((score / totalClicks) * 100) * 10) / 10;
  
  DrawText("Accuracy: " + accPercent + "%", ctx, ctx.canvas.width - ctx.canvas.width / 3.2);
  
  let timeRounded = Math.round(((currentTick - startTick) / 1000) * 10) / 10;
  
  DrawText("Time: " + timeRounded.toFixed(1) + "s", ctx, ctx.canvas.width - 10);
  
  ctx.lineWidth = 0.1;
  
  targets.forEach((target, i) => {
    ctx.beginPath();
    ctx.arc(target.x, target.y, target.r, 0, 2 * Math.PI);
    var grd = ctx.createRadialGradient(target.x, target.y, target.r,target.x, target.y, 0);
    grd.addColorStop(0,"#0857a6");
    grd.addColorStop(1,"rgba(154, 200, 245, 0.7)");
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.stroke(); 
  });
}

function DrawText(text, canvas, offsetRight)
{
  canvas.font = "15px Arial";
  canvas.fillStyle = "white";
  canvas.fillText(text ,canvas.canvas.width - offsetRight, infoBarHeight / 1.6)
}

function DrawGrid(ctx){
  var ctx = gameCanvas.getContext("2d");
  var bw = ctx.canvas.width;
  var bh = ctx.canvas.height;
  var p = 0;
  for (var x = 0; x <= bw; x += 40) {
    ctx.moveTo(0.5 + x + p, p);
    ctx.lineTo(0.5 + x + p, bh + p);
  }

  for (var x = 0; x <= bh; x += 40) {
    ctx.moveTo(p, 0.5 + x + p);
    ctx.lineTo(bw + p, 0.5 + x + p);
  }
  ctx.strokeStyle = "#bbb";
  ctx.stroke();
}

function drawInfoBox()
{
  var ctx = gameCanvas.getContext("2d");
  ctx.fillStyle = "#222222";
  ctx.fillRect(0, 0, ctx.canvas.width, infoBarHeight);
}

function calcFps(deltaTime)
{
  return Math.round(1 / (deltaTime / 1000));
}
// consider not letting targets spawn if overlap is possible. use max radius to calc
    // possible solution, use max raius to create grid and check grid not occupied?

class Target {
  constructor(x,y,r)
  {
    this.x = x;
    this.y = y;
    this.r = r;
    
    this.birthTime = performance.now();
  }
  
  score()
  {
    return -1 / (this.birthTime - performance.now());
  }
}