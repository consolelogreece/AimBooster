function IsPointInsideRectangle(x1,y1,x2,y2,w,h)
{
    return (x1 > x2 && x1 < x2 + w && y1 > y2 && y1 < y2 + h)  ;
}