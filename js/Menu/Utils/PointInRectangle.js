function IsPointInsideRectangle(x1,y1,x2,y2,w,h)
{
    return (x1 > x2 && x1 < x2 + w && y1 > y2 && y1 < y2 + h)  ;
}

function GetRect(rects, coords)
{
    for (var key in rects) 
    {
        let rect = rects[key];
        if (IsPointInsideRectangle(coords.x, coords.y, rect.x, rect.y, rect.w, rect.h)) return {item: rect, name: key};
    }
}