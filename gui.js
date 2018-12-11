/**
* GUI for game using raphael.js
*/
function Gui(operationDiv, resultDiv) {

    this.operationDiv = operationDiv;
    this.resultDiv = resultDiv;

    this.operationPaper = Raphael(operationDiv, 320,200);
    
    this.newItem = function (item, operator) {
        var text = "" + item.x + operator.displayString + item.y + "=" + operator.apply(item.x,item.y);
        var font = this.operationPaper.getFont("Times");
        // if (this.rtext === undefined) {
            this.rtext = this.operationPaper.text(100,100, text);
        // } else {
                  // does not work

        //     this.rtext.html(text);
        // }
        this.rtext.attr({fill: "#000"});
     }
}