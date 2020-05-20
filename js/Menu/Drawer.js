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
                this.canvasCtx.strokeStyle = "#555";
            }
            else
            {
                this.canvasCtx.fillStyle = '#333';
                this.canvasCtx.strokeStyle = "#333";
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

    DrawTable(data, nRows, nCols, rowHeight, colWidth, offsetLeft, offsetTop)
    {
        this.DrawEmptyTable(nRows, nCols, rowHeight, colWidth, offsetLeft, offsetTop);

        this.canvasCtx.strokeStyle = "#bbb";
        this.canvasCtx.stroke();

        this.canvasCtx.textAlign = "Center";  
        this.canvasCtx.textBaseline = "middle"; 
    
        data.forEach((element, i) => {
            this.FillTableRow(element, i+1, colWidth, rowHeight, offsetLeft, offsetTop)
        });
    }

    DrawEmptyTable(nRows, nCols, rowHeight, colWidth, offsetLeft, offsetTop)
    {
        this.canvasCtx.beginPath()

        let finalHeight = nRows * rowHeight;

        let finalWidth = nCols * colWidth;

        for (var i = 0; i <= nCols; i ++) {
            this.canvasCtx.moveTo(0.5 + (i * colWidth) + offsetLeft, offsetTop);
            this.canvasCtx.lineTo(0.5 + (i * colWidth) + offsetLeft, finalHeight + offsetTop);
        }

        for (var i = 0; i <= nRows; i ++) {
            this.canvasCtx.moveTo(offsetLeft, 0.5 + (i * rowHeight) + offsetTop);
            this.canvasCtx.lineTo(finalWidth + offsetLeft, 0.5 + (i * rowHeight) + offsetTop);
        }
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