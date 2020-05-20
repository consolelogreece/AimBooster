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
        
        this.Drawer.DrawTable([["Difficulty", "Score", "Accuracy"], ...data], this.canvasCtx.canvas.width, 0, this.canvasCtx.canvas.height / 2, offset)

        this.canvasCtx.font = '20pt Roboto';
        this.canvasCtx.textBaseline = "top";

        for(let key in this.rects)
        {
            this.Drawer.DrawRect(this.rects[key], this.hovered == key);
        }
    }

    DrawColumnNames(offset)
    {
        this.canvasCtx.font = "30px Roboto";
        this.canvasCtx.fillStyle = "#333";
        this.canvasCtx.fillText("Difficulty", this.canvasCtx.canvas.width / 6, offset);
        this.canvasCtx.fillText("Score", this.canvasCtx.canvas.width / 2 , offset);
        this.canvasCtx.fillText("Accuracy", this.canvasCtx.canvas.width -  this.canvasCtx.canvas.width / 6, offset)
    }

    EnterScoreToTable(difficulty, score, row, offset)
    {
        this.canvasCtx.fillText(difficulty, this.canvasCtx.canvas.width / 6, ((this.canvasCtx.canvas.height / 8) * row) + offset);
        this.canvasCtx.fillText(score.score, this.canvasCtx.canvas.width / 2 , ((this.canvasCtx.canvas.height / 8) * row) + offset);
        this.canvasCtx.fillText(score.accuracy + "%", this.canvasCtx.canvas.width -  this.canvasCtx.canvas.width / 6, ((this.canvasCtx.canvas.height / 8) * row) + offset)
    }

    DrawTable()
    {
        var bw = this.canvasCtx.canvas.width;
        var bh = this.canvasCtx.canvas.height / 1.5;
        var p = 0;

        this.canvasCtx.beginPath()

        for (var x = 0; x <= bw; x += this.canvasCtx.canvas.width / 3) {
            this.canvasCtx.moveTo(0.5 + x + p, this.tableMarginTop);
            this.canvasCtx.lineTo(0.5 + x + p, bh + this.tableMarginTop);
        }

        for (var x = 0; x <= bh; x += this.canvasCtx.canvas.height / 8) {
            this.canvasCtx.moveTo(p, 0.5 + x + p + this.tableMarginTop);
            this.canvasCtx.lineTo(bw + p, 0.5 + x + p + this.tableMarginTop);
        }
        
        this.canvasCtx.strokeStyle = "#bbb";
        this.canvasCtx.stroke();
    }

    HandleKeyPress(e)
    {
        if (e.key === "Escape")
        {
            this.callbacks.MainMenu();
        }
    }
}