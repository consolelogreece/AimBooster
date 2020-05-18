function GetRelativeMouseCoordsFromEvent(e, ctx)
{
    var ctx = gameCanvas.getContext("2d");
    var rect = ctx.canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}
