class HighScoresMenu
{
    constructor(canvasCtx, callbacks)
    {
        this.canvasCtx = canvasCtx;

        let paddingside =  canvasCtx.canvas.width / 10;

        this.rects = {
            MainMenu: {
                x: paddingside, y: 375, w: canvasCtx.canvas.width - paddingside * 2, h: 40, cb: callbacks.MainMenu, text: "Main Menu"
            }
        };

        this.UpdateHighScores();

        // if another place needs to listen to onstorage event, set this elsewhere and have an array of delegates.
        window.onstorage = () => {
            this.UpdateHighScores();   
        };

        this.Drawer = new DrawerMenu(canvasCtx);
    }

    UpdateHighScores()
    {
        this.HighScores = GetHighScores();
    }

    HandleClick(e)
    {
        let coords = GetRelativeMouseCoordsFromEvent(e, this.canvasCtx);

        let rect = this.GetRect(coords);

        if (rect != undefined) rect.cb();
    }

    GetRect(coords)
    {
        for (var key in this.rects) 
        {
            let rect = this.rects[key];
            if (IsPointInsideRectangle(coords.x, coords.y, rect.x, rect.y, rect.w, rect.h)) return rect;
        }
    }

    Update()
    {}

    Draw()
    {
        this.Drawer.Clear();

        let offset = 40;
        this.canvasCtx.textBaseline = "bottom";

        this.DrawTable();
        this.DrawColumnNames(offset);

        this.canvasCtx.font = '20pt Kremlin Pro Web';
        this.canvasCtx.fillStyle = 'black';
        this.canvasCtx.textAlign = "center";

        let i = 1;
        for(let key in this.HighScores)
        {
            let score = this.HighScores[key];

            this.EnterScoreToTable(key, score, i, 40)
            
            i++
        }

        this.canvasCtx.font = '30pt Kremlin Pro Web';
        this.canvasCtx.textBaseline = "top";

        for(let key in this.rects)
        {
            this.Drawer.DrawRect(this.rects[key]);
        }
    }

    DrawColumnNames(offset)
    {
        this.canvasCtx.font = "30px Arial";
        this.canvasCtx.fillStyle = "black";
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
            this.canvasCtx.moveTo(0.5 + x + p, p);
            this.canvasCtx.lineTo(0.5 + x + p, bh  + p);
        }

        for (var x = 0; x <= bh; x += this.canvasCtx.canvas.height / 8) {
            this.canvasCtx.moveTo(p, 0.5 + x + p);
            this.canvasCtx.lineTo(bw + p, 0.5 + x + p);
        }
        
        this.canvasCtx.strokeStyle = "#bbb";
        this.canvasCtx.stroke();
    }
}