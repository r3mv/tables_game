/**
 * 
 * @param {
 * operator : the operator,
 * tables : [ list of tables to study]
 * max : int, tables up to max
 * level : game level} context 
 */

function Game(context) {

    this.Levels = Object.freeze({ "beginner": 1, "medium": 2, "expert": 3, "computer": 4 });
    this.Operators = Object.freeze({
        addition: {
            toString: "+"
        },
        substraction: {
            toString: "-"
        },
        multiplication: {
            toString: "x"
        },
        division: {
            toString: "/"
        }
    }
    );

    this.tables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.operator = "x";
    this.max = 10;
    this.level = this.Levels.beginner;
    this.responseDelay_ms = 1000;
    this.handlers = [];
    this.items = [
        { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 3, y: 52 }
    ];
    this.currentTimeout = null;

    if (context !== undefined) {
        this.init(context);
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

    this.init = function (context) {

        switch (game.level) {
            case 1:
            case 2:
            case 3:
            case 4:
        }
    }

    /*
    * Add a GUI game handler, i.e. a component with callback functions
    * that can be called from this game to display the current game
    * status.
    * handler must implement:
    * newItem: (item { x : val, y : val}, operator) -> call when a new operation is submitted to the game
    * hasTimedOut: function called when timeout is reached for giving an answer
    * endofgame: function calld when the game is finished
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
       this.loop();
    }

    this.loop = function (item) {
        var item = this.items.pop();
        if (item !== undefined) {
            this.fireNewItem(item, this);
            if (this.currentTimeout !== null) {
                console.log("Clearing timeout")
                window.clearTimeout(this.currentTimeout);
                this.currentTimeout = null;
            }
            this.currentTimeout = window.setTimeout(this.fireTimeout, 5000, this);
            console.log("Setting timeout for " + item + " to 1000 ms");
        } else {
            this.fireEndOfGame(this);
        }
    }

    this.fireNewItem = function (item, thisObj) {
        var scope = thisObj || window;
        var operator = this.operator.toString();
        scope.handlers.forEach(function (handler) {
            if (handler.newItem !== undefined) {
                handler.newItem.call(scope, item, operator);
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

}
