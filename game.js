var game = game || {} ; 

game.tables = [1,2,3,4,5,6,7,8,9,10];
game.operator = "x";
game.max = 10;

game.Levels = Object.freeze({"beginner":1, "medium":2, "expert":3, "computer":4});
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
    
}