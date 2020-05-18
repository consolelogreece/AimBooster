class ShotHandler
{
    GetIntersectingTarget(coords, targets)
    {
        for(let i = 0; i < targets.length; i++)
        {
            let target = targets[i];

            if (this.IsPointInsideCircle(target.x, target.y, coords.x, coords.y, target.r)) return {target: target, index: i};
        }
    }

    IsPointInsideCircle(x, y, x1, y1, r)
    {
        return ((x - x1) ** 2) + ((y - y1) ** 2) < r ** 2;
    }
}