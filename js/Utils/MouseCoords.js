function GetRelativeMouseCoordsFromEvent(e, ctx)
{
    var rect = ctx.canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}
