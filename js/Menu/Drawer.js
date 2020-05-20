class DrawerMenu
{
    constructor(canvasCtx)
    {
        this.canvasCtx = canvasCtx;
    }

    Clear()
    {
        this.canvasCtx.clearRect(0, 0, this.canvasCtx.canvas.width, this.canvasCtx.canvas.height);
    }

    DrawRect(rect, highlight)
    {
        if (rect.clickable)
        {
            this.canvasCtx.beginPath();
            this.canvasCtx.rect(rect.x, rect.y, rect.w, rect.h); 

            if (highlight)
            {
                this.canvasCtx.fillStyle = '#555';
            }
            else
            {
                this.canvasCtx.fillStyle = '#333';
            }
            this.canvasCtx.fill(); 
            this.canvasCtx.stroke();
            this.canvasCtx.closePath();
            this.canvasCtx.fillStyle = '#ebf2ff';
        }
        else
        {
            this.canvasCtx.fillStyle = '#333';
        }

        this.canvasCtx.textAlign = "center";  
        this.canvasCtx.textBaseline = "middle"; 
        this.canvasCtx.fillText(rect.text, rect.x + rect.w / 2, rect.y + (rect.h / 2));
    }
    
    DrawTable(data, width = this.canvasCtx.canvas.width, offsetLeft = 0, height = this.canvasCtx.canvas.height, offsetTop = 0)
    {
        let colWidth = width / data[0].length;
        let rowHeight = height / data.length;
        this.DrawEmptyTable(rowHeight, colWidth, width, offsetLeft, height, offsetTop);

        this.canvasCtx.textAlign = "Center";  
        this.canvasCtx.textBaseline = "middle"; 

        data.forEach((element, i) => {
            this.FillTableRow(element, i+1, colWidth, rowHeight, offsetLeft, offsetTop)
        });
    }

    DrawEmptyTable(rowHeight, colWidth, width, offsetLeft, height, offsetTop)
    {
        this.canvasCtx.beginPath()

        // data[0] is should be column names
        for (var i = 0; i <= width; i += colWidth) {
            this.canvasCtx.moveTo(0.5 + i + offsetLeft, offsetTop);
            this.canvasCtx.lineTo(0.5 + i + offsetLeft, height + offsetTop);
        }

        for (var i = 0; i <= height; i += rowHeight) {
            this.canvasCtx.moveTo(offsetLeft, 0.5 + i + offsetTop);
            this.canvasCtx.lineTo(width + offsetLeft, 0.5 + i + offsetTop);
        }

        this.canvasCtx.strokeStyle = "#bbb";
        this.canvasCtx.stroke();
    }

    FillTableRow(data, nRow, colWidth, rowHeight, offsetLeft, offsetTop)
    {
        let absoluteOffsetTop = (offsetTop + nRow * rowHeight) - rowHeight / 2;

        for(let i = 0; i < data.length; i++)
        {
            let centralCellPositionHorizontal = offsetLeft + (colWidth * i) + (colWidth / 2);
            this.canvasCtx.fillText(data[i], centralCellPositionHorizontal, absoluteOffsetTop);
        }
    }
}