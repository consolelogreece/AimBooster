class HighScoresMenu
{
    constructor(canvasCtx, callbacks)
    {
        this.canvasCtx = canvasCtx;

        let paddingside =  canvasCtx.canvas.width / 10;

        this.callbacks = callbacks;

        this.rects = {
            MainMenu: {
                x: paddingside, y: 375, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb: callbacks.MainMenu, text: "Main Menu", clickable: true
            }
        };

        this.tableMarginTop = 80;
        this.titleOffset = 45;

        this.hovered = "";

        this.UpdateHighScores();

        this.Drawer = new DrawerMenu(canvasCtx);
    }

    UpdateHighScores()
    {
        this.HighScores = GetHighScores();
    }

    HandleClick(e)
    {
        let coords = GetRelativeMouseCoordsFromEvent(e, this.canvasCtx);

        let rect = GetRect(this.rects, coords);

        if (rect != undefined) rect.item.cb();
    }

    HandleMouseMove(e)
    {
        let coords = GetRelativeMouseCoordsFromEvent(e, this.canvasCtx);

        let rect = GetRect(this.rects, coords);

        if (rect != undefined && rect.item.clickable)
        {
            this.hovered = rect.name;
        }
        else
        {
            this.hovered = "";
        }
    }

    Update()
    {}

    Draw()
    {
        this.Drawer.Clear();

        this.canvasCtx.font = '30pt Roboto';

        this.canvasCtx.fillStyle = '#333';
        this.canvasCtx.textAlign = "center";  
        this.canvasCtx.fillText("Your High Scores", this.canvasCtx.canvas.width / 2, this.titleOffset);

        this.canvasCtx.textBaseline = "bottom";
        
        this.canvasCtx.font = '20pt Roboto';
        this.canvasCtx.fillStyle = '#333';
        this.canvasCtx.textAlign = "center";
        
        let data = [];

        let offset = this.tableMarginTop + 15;

        for(let key in this.HighScores) data.push([key, this.HighScores[key].score, this.HighScores[key].accuracy + "%"]);
        
        if (data.length !== 0)
        {
            this.Drawer.DrawTable([["Difficulty", "Score", "Accuracy"], ...data], data.length+1, 3, 40, this.canvasCtx.canvas.width / 3, 0, offset)
        }
        else
        {
            this.canvasCtx.font = '25pt Roboto';
            this.canvasCtx.fillStyle = '#333';
            this.canvasCtx.textBaseline = "middle";
            this.canvasCtx.fillText("You have no highscores :(", this.canvasCtx.canvas.width / 2, this.canvasCtx.canvas.height / 2 - 20);

            this.canvasCtx.font = '10pt Roboto';
            this.canvasCtx.fillText("Play a game to set your high score", this.canvasCtx.canvas.width / 2, this.canvasCtx.canvas.height / 2 + 20);
            
        }


        this.canvasCtx.font = '20pt Roboto';
        this.canvasCtx.textBaseline = "top";

        for(let key in this.rects)
        {
            this.Drawer.DrawRect(this.rects[key], this.hovered == key);
        }
    }

    HandleKeyPress(e)
    {
        if (e.key === "Escape")
        {
            this.callbacks.MainMenu();
        }
    }
}