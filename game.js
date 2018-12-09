class game {
    constructor () {
        
    }
}

game.tables = [1,2,3,4,5,6,7,8,9,10];
game.operator = "x";
game.max = 10;

game.Levels = Object.freeze({"beginner":1, "medium":2, "expert":3, "computer":4});

game.Operators = Oject.freeze({
        addition : {
            toString : "+"
        },
        substraction : {
            toString : "-"
        },
        multiplication : {
            toString : "x"
        },
        division : {
            toString : "/"
        }
    } 
);

game.level = game.Levels.beginner;

game.responseDelay = 10;

game.setOperator = function(operator)
{
    this.operator = operator;
}

game.setLevel = function(level)
{
    this.level = level;
}

game.setMax = function(max) {
    this.max = max;
}

// set an array of tables to compute
game.setTables = function(tables) {
    this.tables = tables;
}

game.init = function() {
    switch(game.level) {
        case 1:
        case 2:
        case 3:
        case 4:
    }
}

game.handlers = [] ;

/*
* Add a GUI game handler, i.e. a component with callback functions
* that can be called from this game to display the current game
* status.
* handler must implement:
* newItem (item { x : val, y : val}, operator) -> call when a new operation is submitted to the game
*/
game.addHandler = function(guiHandler) {
    this.handlers.push(guiHandler);
}
game.removeHandler = function(guiHandler) {
    this.handlers = this.handlers.filter(
        function (item) {
            if (item !== guiHandler) {
                return item;
            }
        }
    );
}

game.items = [
    { x: 1, y: 1}, {x:1, y:2}, {x2:3, y:52}
];

game.start = function() {
    while (game.items.length) {
        var item = game.items.pop();
        this.fireNewItem(item);
        this.currentTimeout = setTimeout(this.fireTimeout(), 500);
    }
}

game.currentTimeout = null;
game.fireNewItem = function (item, thisObj) {
    var scope = thisObj || window;
    this.handlers.forEach(function(handler) {
        handler.newItem.call(scope, item, this.operator.toString);
    });
}