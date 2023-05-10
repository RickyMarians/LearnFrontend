var difficulty = "";
var rows = 0;
var columns = 0;
var mines = 0;
var minesLocation = [];
var board = [];
var flagEnabled = false;
var gameOver = false;
var tilesClicked = 0; 
//#region DIFFICULTY
document.getElementById("easy").addEventListener('click',function(){
    removeClicked()
    document.getElementById("easy").classList.remove("easy");
    document.getElementById("medium").classList.add("medium");
    document.getElementById("hard").classList.add("hard");
    document.getElementById("extreme").classList.add("extreme");
    document.getElementById("easy").classList.add("clickedEasy");
    difficulty = "easy";
});
document.getElementById("medium").addEventListener('click',function(){
    removeClicked()
    document.getElementById("easy").classList.remove("medium");
    document.getElementById("easy").classList.add("easy");
    document.getElementById("hard").classList.add("hard");
    document.getElementById("extreme").classList.add("extreme");
    document.getElementById("medium").classList.add("clickedMedium");
    difficulty = "medium";
});
document.getElementById("hard").addEventListener('click',function(){
    removeClicked()
    document.getElementById("hard").classList.remove("hard");
    document.getElementById("easy").classList.add("easy");
    document.getElementById("medium").classList.add("medium");
    document.getElementById("extreme").classList.add("extreme");
    document.getElementById("hard").classList.add("clickedHard");
    difficulty = "hard";
});
document.getElementById("extreme").addEventListener('click',function(){
    removeClicked()
    document.getElementById("extreme").classList.remove("extreme");
    document.getElementById("easy").classList.add("easy");
    document.getElementById("hard").classList.add("hard");
    document.getElementById("medium").classList.add("medium");
    document.getElementById("extreme").classList.add("clickedExtreme");
    difficulty = "extreme";
});
//#endregion


//#region GAME
document.getElementById("start").addEventListener('click',function(){
    CreateBoard();
});

function CreateBoard(){
    var elem = document. getElementById("allthethings"); 
    elem. parentNode. removeChild(elem);
    var div = document.createElement("div");
    div.innerHTML ="<div id='board'></div><br><button id='flag-button'>🚩</button>";
    div.className = "game"
    document.body.appendChild(div);
    SetBoard(difficulty)
}
function SetBoard(difficulty){
    switch(difficulty){
        case "easy":
            rows = 9;
            columns = 9;
            mines = 10;
        case "medium":
            rows = 16;
            columns = 16;
            mines = 40;
        case "hard":
            rows = 30;
            columns = 16;
            mines = 99;
        case "medium":
            rows = 50;
            columns = 50;
            mines = 500;
    }
    document.getElementById("flag-button").addEventListener("click", setFlag);
    setMines();

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", clickTile);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    console.log(board);
}
function setMines() {
   

    let minesLeft = mines;
    while (minesLeft > 0) { 
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();

        if (!minesLocation.includes(id)) {
            minesLocation.push(id);
            minesLeft -= 1;
        }
    }
}
function setFlag() {
    if (flagEnabled) {
        flagEnabled = false;
        document.getElementById("flag-button").style.backgroundColor = "lightgray";
    }
    else {
        flagEnabled = true;
        document.getElementById("flag-button").style.backgroundColor = "darkgray";
    }
}

function clickTile() {
    if (gameOver || this.classList.contains("tile-clicked")) {
        return;
    }

    let tile = this;
    if (flagEnabled) {
        if (tile.innerText == "") {
            tile.innerText = "🚩";
        }
        else if (tile.innerText == "🚩") {
            tile.innerText = "";
        }
        return;
    }

    if (minesLocation.includes(tile.id)) {
        // alert("GAME OVER");
        gameOver = true;
        revealMines();
        return;
    }


    let coords = tile.id.split("-"); // "0-0" -> ["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);

}

function revealMines() {
    for (let r= 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "💣";
                tile.style.backgroundColor = "red";                
            }
        }
    }
}

function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return;
    }
    if (board[r][c].classList.contains("tile-clicked")) {
        return;
    }

    board[r][c].classList.add("tile-clicked");
    tilesClicked += 1;

    let minesFound = 0;

    //top 3
    minesFound += checkTile(r-1, c-1);      //top left
    minesFound += checkTile(r-1, c);        //top 
    minesFound += checkTile(r-1, c+1);      //top right

    //left and right
    minesFound += checkTile(r, c-1);        //left
    minesFound += checkTile(r, c+1);        //right

    //bottom 3
    minesFound += checkTile(r+1, c-1);      //bottom left
    minesFound += checkTile(r+1, c);        //bottom 
    minesFound += checkTile(r+1, c+1);      //bottom right

    if (minesFound > 0) {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toString());
    }
    else {
        //top 3
        checkMine(r-1, c-1);    //top left
        checkMine(r-1, c);      //top
        checkMine(r-1, c+1);    //top right

        //left and right
        checkMine(r, c-1);      //left
        checkMine(r, c+1);      //right

        //bottom 3
        checkMine(r+1, c-1);    //bottom left
        checkMine(r+1, c);      //bottom
        checkMine(r+1, c+1);    //bottom right
    }

    if (tilesClicked == rows * columns - minesCount) {
        document.getElementById("mines-count").innerText = "Cleared";
        gameOver = true;
    }

}


function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    }
    if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    }
    return 0;
}
//#endregion
//#region FUNCTIONS
function removeClicked(){
    var allDivs = [].slice.call(document.getElementsByTagName("div"));
    allDivs.forEach(element => {
        element.className = '';
    });
}
//#endregion