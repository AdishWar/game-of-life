var res = [80,50];
var canvasSize = 1000;
var cellSize = canvasSize/res[0];
var activeMatrix = 1;

// Defines a cell
var cell = function(x, y, size) {
    rect(x,y,size,size);
};

// generating zero matrices of size as specified by resolution
var matrix1 = [];
var matrix2 = [];
for(var i = 0; i < res[0]; i++){
    matrix1.push([]);
    matrix2.push([]);
    for(var j = 0; j < res[1]; j++){
        matrix1[i].push(0);
        matrix2[i].push(0);
    }    
}


// relocate this smwhere else
var mouseClicked = function(){
    var x = floor(mouseX / cellSize);
    var y = floor(mouseY / cellSize);
    
    if (matrix1[x][y] === 0) {matrix1[x][y] = 1;} 
    else if(matrix1[x][y] === 1) {matrix1[x][y] = 0;}
};

var analyseNeighbours = function(x,y) {
    var aliveNeighbours = 0;
    
    if (activeMatrix === 1) {
        if(matrix1[x-1][y-1] === 1) { aliveNeighbours += 1; }
        if(matrix1[x][y-1] === 1) { aliveNeighbours += 1; }
        if(matrix1[x+1][y-1] === 1) { aliveNeighbours += 1; }
        if(matrix1[x-1][y] === 1) { aliveNeighbours += 1; }
        if(matrix1[x+1][y] === 1) { aliveNeighbours += 1; }
        if(matrix1[x-1][y+1] === 1) { aliveNeighbours += 1; }
        if(matrix1[x][y+1] === 1) { aliveNeighbours += 1; }
        if(matrix1[x+1][y+1] === 1) { aliveNeighbours += 1; }
        
        if(matrix1[x][y] === 0) {
            if(aliveNeighbours === 3){return 1;}
            else{return 0;}
        } else if(matrix1[x][y] === 1) {
            if(aliveNeighbours === 2 || aliveNeighbours === 3){return 1;} 
            else{return 0;}
        }
    }
    
    if (activeMatrix === 2) {
        if(matrix2[x-1][y-1] === 1) { aliveNeighbours += 1; }
        if(matrix2[x][y-1] === 1) { aliveNeighbours += 1; }
        if(matrix2[x+1][y-1] === 1) { aliveNeighbours += 1; }
        if(matrix2[x-1][y] === 1) { aliveNeighbours += 1; }
        if(matrix2[x+1][y] === 1) { aliveNeighbours += 1; }
        if(matrix2[x-1][y+1] === 1) { aliveNeighbours += 1; }
        if(matrix2[x][y+1] === 1) { aliveNeighbours += 1; }
        if(matrix2[x+1][y+1] === 1) { aliveNeighbours += 1; }
        
        if(matrix2[x][y] === 0) {
            if(aliveNeighbours === 3){return 1;}
            else{return 0;}
        } else if(matrix2[x][y] === 1) {
            if(aliveNeighbours === 2 || aliveNeighbours === 3){return 1;} 
            else{return 0;}
        }
    }
};

var gameLogic = function() {
    
    for(var i = 1; i < res[0]-1; i++ ) {
        for(var j = 1; j < res[1]-1; j++ ) {
            
            if (activeMatrix === 1) {
                matrix2[i][j] = analyseNeighbours(i,j);
            } 
            else if (activeMatrix === 2) {
                matrix1[i][j] = analyseNeighbours(i,j);
            }
            
        }
    }
    
    if(activeMatrix === 2) {
        activeMatrix = 1;
    } else if(activeMatrix === 1) {
        activeMatrix = 2;
    }
};


var drawGrid = function(){
    stroke(117, 117, 117);
    //noStroke();
    
    var cellColor = (0,0,0);
    
    //fill(245, 245, 245);
    
    // Draws the actual grid from active Matrix data
    for(var i=0; i<res[0]; i++){
        for(var j=0; j<res[1]; j++){
            if (activeMatrix === 1) {
                if (matrix1[i][j] === 1) {
                    fill(cellColor);
                } else if (matrix1[i][j] === 0) {
                    fill(255, 255, 255);
                }
            } else if (activeMatrix === 2) {
                if (matrix2[i][j] === 1) {
                    fill(cellColor);
                } else if (matrix2[i][j] === 0) {
                    fill(255, 255, 255);
                }
            }
            
            cell(i*cellSize,j*cellSize,cellSize,cellSize);
        }
    }
};

keyTyped = function() {
  //println("typed " + (key) + " " + keyCode);
    gameLogic();
};

draw = function() {
    //background(255, 255, 255);
    drawGrid();
    
    
    //var m = millis();

    //if ( keyPressed() ) {
    //    gameLogic();
    //}
};