/**
* GUI for game using raphael.js
*/
function Gui(operationDiv, resultDiv) {

    this.operationDiv = operationDiv;
    this.resultDiv = resultDiv;

    this.textTimeout = null;

    this.operationPaper = Raphael(operationDiv, 320,200);
    
    this.newItem = function (item, operator) {
        attr = {font: "50px Helvetica", opacity: 0.9, fill: '#ff0'};
        if (this.textTimeout !== null) {
            this.textTimeout.attr('text', '');
        }
        var text = item.x + ' ' + operator.displayString + ' ' + item.y + ' = '/* + operator.apply(item.x,item.y)*/;
        if (this.rtext === undefined) {
            this.rtext = this.operationPaper.text(100,100, text);
        } else {
            this.rtext.attr('text', text)
        }
        this.rtext.attr(attr);
     }

     this.correctAnswer = function(ans) {
         var text = this.rtext.attrs.text + ans; 
         this.rtext.attr({fill: '#0f0', 'text': text});
     }

     this.wrongAnswer = function(ans) {
        var text = this.rtext.attrs.text + ans; 
        this.rtext.attr({fill: '#f00', text : text});
     }

     this.hasTimedOut = function() {
         console.log('GUI TIMEOUT');
        //  var text = 'Time out!';
        //  if (this.textTimeout === undefined) {
        //      this.textTimeout = this.operationPaper.text(200, 100, text);
        //      this.textTimeout.attr({fill: '#000'});
        //  }
     }
}