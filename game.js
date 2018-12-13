/**
 *  
 * operator : the operator,
 * tables : [ list of tables to study]
 * max : int, tables up to max
 * level : game level} context 
 */

Game.Levels = Object.freeze({ "beginner": 1, "medium": 2, "expert": 3, "computer": 4 });
Game.Operators = Object.freeze({
    addition: {
        displayString: "+",
        apply : function(x, y) {
            return x + y;
        }
    },
    substraction: {
        displayString: "-",
        apply : function(x, y) {
            return x - y;
        }
    },
    multiplication: {
        displayString: "x",
        apply : function(x, y) {
            return x*y;
        }
    },
    division: {
        displayString: "/",
        apply : function(x,y) {
            return x/y;
        }
    }
}
);

function Game(context) {
   
    this.nextItemOrdered = function() {
        return this.items.pop();
    }

    this.nextFromRandomTable = function() {
        // todo
        return this.items.pop();
    }

    this.nextItemRandom = function() {
        // todo
        return this.item.pop();
    }

    this.tables = context.tables || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.operator = context.operator || Game.Operators.multiplication;
    this.max = context.max || 10;
    this.responseDelay_ms = context.responseDelay_ms || 3000 ;
    this.nextItem = context.nextItem || this.nextItemOrdered;
    this.handlers = [];
    this.items = [];
    this.currentTimeout = null;


    this.initItems = function() {
        console.log(this.tables);
        var array = [];
        for (var i = this.tables.length-1; i >=0; --i) {
            var xVal = this.tables[i];
            for (var yVal = this.max; yVal > 0 ; yVal--) {
                array.push({x : xVal, y : yVal});
            }
        }
        return array;
     }

    this.setOperator = function (operator) {
        this.operator = operator;
    }

    this.setLevel = function (level) {
        this.level = level;
    }

    this.setMax = function (max) {
        this.max = max;
    }

    // set an array of tables to compute
    this.setTables = function (tables) {
        this.tables = tables;
    }

    this.getContext = function (level) {
        var context = {};
        switch (level) {
            case 1:
            context.tables = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            context.max = 10;
            context.nextItem = this.nextItemOrdered;
            context.responseDelay_ms = 20000;
            break;
            case 2:
            context.tables = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            context.max = 10;
            context.nextItem = this.nextFromRandomTable;
            context.responseDelay_ms = 10000;
            break;
            case 3:
            context.tables = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            context.max = 12;
            context.nextItem = this.nextFromRandomTable;
            context.responseDelay_ms = 5000;
            break;
            case 4:
            context.tables = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            context.max = 12;
            context.nextItem = this.nextItemRandom;
            context.responseDelay_ms = 1000;
            break;
        }
        return context;
    }

  
    /*
    * Add a GUI game handler, i.e. a component with callback functions
    * that can be called from this game to display the current game
    * status.
    * handler must implement:
    * newItem: (item { x : val, y : val}, operator) -> call when a new operation is submitted to the game
    * hasTimedOut: function called when timeout is reached for giving an answer
    * endOfGame: function called when the game is finished
    * correctAnswer : function called when the given answer is correct
    * wrongAnswer : you guess
    */
    this.addHandler = function (guiHandler) {
        this.handlers.push(guiHandler);
    }

    this.removeHandler = function (guiHandler) {
        this.handlers = this.handlers.filter(
            function (item) {
                if (item !== guiHandler) {
                    return item;
                }
            }
        );
    }

    this.start = function () {
       this.items = this.initItems();
       this.loop();
    }

    this.loop = function () {
        var item = this.nextItem();
        if (item !== undefined) {
            this.currentItem = item;
            this.fireNewItem(item, this);
            if (this.currentTimeout !== null) {
                console.log("Clearing timeout")
                window.clearTimeout(this.currentTimeout);
                this.currentTimeout = null;
            }
            this.currentTimeout = window.setTimeout(this.fireTimeout, this.responseDelay_ms, this);
            console.log("Setting timeout for " + item + " to 1000 ms");
        } else {
            this.fireEndOfGame(this);
        }
    }

    this.submitAnswer = function(answer) {
        var expected = this.operator.apply(this.currentItem.x, this.currentItem.y);
        if (answer === expected) {
            window.clearTimeout(this.currentTimeout);
            this.currentTimeout = null;
            this.fireCorrectAnswer(this);
        } else {
            this.fireWrongAnswer(this); // shift item, or let it go to the end of timeout ?? Or let it be handled by a game parameter
        }
    }

    this.resetTimeout = function() {

    }

    this.fireNewItem = function (item, thisObj) {
        var scope = thisObj || window;
        scope.handlers.forEach(function (handler) {
            if (handler.newItem !== undefined) {
                handler.newItem.call(handler, item, thisObj.operator);
            }
        });
    }

    this.fireTimeout = function (thisObj) {
        var scope = thisObj || window.top;
        scope.handlers.forEach(function (handler) {
            var scope = thisObj || window;
            if (handler.hasTimedOut !== undefined) {
                handler.hasTimedOut.call(scope);

            }
        });
        // TODO notify handles that timeout has reached
        // TODO notify game that this item is failed
        scope.loop();
    }

    this.fireEndOfGame = function(thisObj) {
        var scope = thisObj || window.top;
        scope.handlers.forEach(function (handler) {
            var scope = thisObj || window;
            if (handler.endOfGame !== undefined) {
                handler.endOfGame.call(scope);
            }
        });
    }

    this.fireCorrectAnswer = function(thisObj) {
        var scope = thisObj || window;
        scope.handlers.forEach(function (handler) {
            if (handler.correctAnswer !== undefined) {
                handler.correctAnswer.call(handler);
            }
        });
    }

    this.fireWrongAnswer = function(thisObj) {
        var scope = thisObj || window;
        scope.handlers.forEach(function (handler) {
            if (handler.wrongAnswer !== undefined) {
                handler.wrongAnswer.call(handler);
            }
        });
    }
}
