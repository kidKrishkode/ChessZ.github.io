function onLoad(){
	try{
        chessCanvas = document.getElementById(`${BOARD_NAME}`);
        chessCanvas.style.display="block";
        chessCtx = chessCanvas.getContext("2d");
        chessCanvas.addEventListener("click", onClick);
        totalVictoriesText = document.getElementById("totalVictories");
        whiteVictories = 0;
        blackVictories = 0;
    }catch(error){
    	user();
        onLoad();
    }
    startGame();
}
function startGame(){
    board = new Board();
    curX = -1;
    curY = -1;
    currentTeam = WHITE;
    whiteCasualities = [0, 0, 0, 0, 0, 0];
    blackCasualities = [0, 0, 0, 0, 0, 0];
    movment = [];
    repaintBoard();
    updateWhiteCasualities();
    updateBlackCasualities();
    updateTotalVictories();
    startS.play();
    document.querySelector('#bt').innerHTML='00:00';
    document.querySelector('#wt').innerHTML='00:00';
}
function onClick(event){
    let chessCanvasX = chessCanvas.getBoundingClientRect().left;
    let chessCanvasY = chessCanvas.getBoundingClientRect().top;
    let x = Math.floor((event.clientX-chessCanvasX)/TILE_SIZE);
    let y = Math.floor((event.clientY-chessCanvasY)/TILE_SIZE);
    if(checkValidMovement(x, y) === true){
        if(checkValidCapture(x, y) === true){
            if(board.tiles[y][x].pieceType === KING){
                if(currentTeam === WHITE) whiteVictories++;
                else blackVictories++;
                gameOver(currentTeam);
            }
            if(currentTeam === WHITE){
                blackCasualities[board.tiles[y][x].pieceType]++;
                updateBlackCasualities();
                movment[movment.length-1].eating = {
                    pieceType: board.tiles[y][x].pieceType,
                    pieceTeam: board.tiles[y][x].team,
                    postion: [y,x]
                };
            }else{
                whiteCasualities[board.tiles[y][x].pieceType]++;
                updateWhiteCasualities();
                movment[movment.length-1].eating = {
                    pieceType: board.tiles[y][x].pieceType,
                    pieceTeam: board.tiles[y][x].team,
                    postion: [y,x]
                };
            }
        }
        moveSelectedPiece(x, y);
        changeCurrentTeam();
    }else{
        curX = x;
        curY = y;
    }
    repaintBoard();
}
function checkPossiblePlays(){
    if(curX < 0 || curY < 0) return;
    let tile = board.tiles[curY][curX];
    if(tile.team === EMPTY || tile.team !== currentTeam) return;
    drawTile(curX, curY, HIGHLIGHT_COLOR);
    board.resetValidMoves();
    if(tile.pieceType === PAWN) checkPossiblePlaysPawn(curX, curY);
    else if(tile.pieceType === KNIGHT) checkPossiblePlaysKnight(curX, curY);
    else if(tile.pieceType === BISHOP) checkPossiblePlaysBishop(curX, curY);
    else if(tile.pieceType === ROOK) checkPossiblePlaysRook(curX, curY);
    else if(tile.pieceType === QUEEN) checkPossiblePlaysQueen(curX, curY);
    else if(tile.pieceType === KING) checkPossiblePlaysKing(curX, curY);
}
function checkPossiblePlaysPawn(curX, curY){
    let direction;
    if(currentTeam === WHITE) direction = -1;
    else direction = 1;
    if(curY+direction < 0 || curY+direction > BOARD_HEIGHT-1) return;
    // Advance one tile
    checkPossibleMove(curX, curY+direction);
    // First double move
    if(curY === 1 || curY === 6){
        checkPossibleMove(curX, curY+2*direction);
    }
    // Check diagonal left capture
    if(curX-1 >= 0) checkPossibleCapture(curX-1, curY+direction);
    // Check diagonal right capture
    if(curX+1 <= BOARD_WIDTH-1) checkPossibleCapture(curX+1, curY+direction);
}
function checkPossiblePlaysKnight(curX, curY){
    // Far left moves
    if(curX-2 >= 0){
        // Upper move
        if(curY-1 >= 0) checkPossiblePlay(curX-2, curY-1);
        // Lower move
        if(curY+1 <= BOARD_HEIGHT-1) checkPossiblePlay(curX-2, curY+1);
    }
    // Near left moves
    if(curX-1 >= 0){
        // Upper move
        if(curY-2 >= 0) checkPossiblePlay(curX-1, curY-2);
        // Lower move
        if(curY+2 <= BOARD_HEIGHT-1) checkPossiblePlay(curX-1, curY+2);
    }
    // Near right moves
    if(curX+1 <= BOARD_WIDTH-1){
        // Upper move
        if(curY-2 >= 0) checkPossiblePlay(curX+1, curY-2);
        // Lower move
        if(curY+2 <= BOARD_HEIGHT-1) checkPossiblePlay(curX+1, curY+2);
    }
    // Far right moves
    if(curX+2 <= BOARD_WIDTH-1){
        // Upper move
        if(curY-1 >= 0) checkPossiblePlay(curX+2, curY-1);
        // Lower move
        if(curY+1 <= BOARD_HEIGHT-1) checkPossiblePlay(curX+2, curY+1);
    }
}
function checkPossiblePlaysRook(curX, curY){
    // Upper move
    for(let i = 1; curY-i >= 0; i++){
        if(checkPossiblePlay(curX, curY-i)) break;
    }
    // Right move
    for(let i = 1; curX+i <= BOARD_WIDTH-1; i++){
        if(checkPossiblePlay(curX+i, curY)) break;
    }
    // Lower move
    for(let i = 1; curY+i <= BOARD_HEIGHT-1; i++){
        if(checkPossiblePlay(curX, curY+i)) break;
    }
    // Left move
    for(let i = 1; curX-i >= 0; i++){
        if(checkPossiblePlay(curX-i, curY)) break;
    }
}
function checkPossiblePlaysBishop(curX, curY){
    // Upper-right move
    for(let i = 1; curX+i <= BOARD_WIDTH-1 && curY-i >= 0; i++){
        if(checkPossiblePlay(curX+i, curY-i)) break;
    }
    // Lower-right move
    for(let i = 1; curX+i <= BOARD_WIDTH-1 && curY+i <= BOARD_HEIGHT-1; i++){
        if(checkPossiblePlay(curX+i, curY+i)) break;
    }
    // Lower-left move
    for(let i = 1; curX-i >= 0 && curY+i <= BOARD_HEIGHT-1; i++){
        if(checkPossiblePlay(curX-i, curY+i)) break;
    }
    // Upper-left move
    for(let i = 1; curX-i >= 0 && curY-i >= 0; i++){
        if(checkPossiblePlay(curX-i, curY-i)) break;
    }
}
function checkPossiblePlaysQueen(curX, curY){
    checkPossiblePlaysBishop(curX, curY);
    checkPossiblePlaysRook(curX, curY);
}
function checkPossiblePlaysKing(curX, curY){
    for(let i = -1; i <= 1; i++){
        if(curY+i < 0 || curY+i > BOARD_HEIGHT-1) continue;
        for(let j = -1; j <= 1; j++){
            if(curX+j < 0 || curX+j > BOARD_WIDTH-1) continue;
            if(i == 0 && j == 0) continue;
            checkPossiblePlay(curX+j, curY+i);
        }
    }
}
function checkPossiblePlay(x, y){
    if(checkPossibleCapture(x, y)) return true;
    return !checkPossibleMove(x, y);
}
function checkPossibleMove(x, y){
    try{
        if(board.tiles[y][x].team !== EMPTY) return false;
        board.validMoves[y][x] = VALID;
        drawCircle(x, y, HIGHLIGHT_COLOR);
        return true;
    }catch(error){
        // if((y == 0 && board.tiles[y][x].team == BLACK)||(y == 7 && board.tiles[y][x].team == WHITE)){
        //     pawnChange();
        // }
        temp=x;
    }
}
function checkPossibleCapture(x, y){
    if(board.tiles[y][x].team !== getOppositeTeam(currentTeam)) return false;
    board.validMoves[y][x] = VALID_CAPTURE;
    drawCorners(x, y, HIGHLIGHT_COLOR);
    return true;
}
function checkValidMovement(x, y){
    if(board.validMoves[y][x] === VALID || board.validMoves[y][x] === VALID_CAPTURE) return true;
    else return false;
}
function checkValidCapture(x, y){
    if(board.validMoves[y][x] === VALID_CAPTURE) return true;
    else return false;
}
function moveSelectedPiece(x, y){
	moveS.play();
    board.tiles[y][x].pieceType = board.tiles[curY][curX].pieceType;
    board.tiles[y][x].team = board.tiles[curY][curX].team;
    if(board.tiles[y][x].pieceType==0){
        if((y === 7 && board.tiles[y][x].team === BLACK)||(y === 0 && board.tiles[y][x].team === WHITE)){
            temp=x;
            pawnChange();
        }
    }
    movment.length=movment.length+1;
    movment[movment.length-1] = {
	    pieceType: board.tiles[y][x].pieceType,
	    pieceTeam: board.tiles[y][x].team,
	    prevLocation: [curY,curX],
	    currentLocation: [y,x],
        eating: 0,
	    history: 0
    };
    board.tiles[curY][curX].pieceType = EMPTY;
    board.tiles[curY][curX].team = EMPTY;
    curX = -1;
    curY = -1;
    board.resetValidMoves();
    newCheck(currentTeam);
}
function changeCurrentTeam(){
    if(currentTeam === WHITE){
        currentTeam = BLACK;
        newClock(1);
    }else{
        currentTeam = WHITE;
        newClock(0);
    }
}
function repaintBoard(){
    drawBoard();
    checkPossiblePlays();
    drawPieces();
}
function drawBoard(){
    chessCtx.fillStyle = WHITE_TILE_COLOR;
    chessCtx.fillRect(0, 0, BOARD_WIDTH*TILE_SIZE, BOARD_HEIGHT*TILE_SIZE);   
    for(let i = 0; i < BOARD_HEIGHT; i++){
        for(let j = 0; j < BOARD_WIDTH; j++){
            if((i+j)%2 === 1){
                drawTile(j, i, BLACK_TILE_COLOR);
            }
        }
    }
}
function drawTile(x, y, fillStyle){
    chessCtx.fillStyle = fillStyle;
    chessCtx.fillRect(TILE_SIZE*x, TILE_SIZE*y, TILE_SIZE, TILE_SIZE);
}
function drawCircle(x, y, fillStyle){
    chessCtx.fillStyle = "transparent";
    chessCtx.strokeStyle = fillStyle;
    chessCtx.lineWidth = 2;
    chessCtx.beginPath();
    chessCtx.arc(TILE_SIZE * (x + 0.5), TILE_SIZE * (y + 0.5), TILE_SIZE / 5, 0, 2 * Math.PI);
    chessCtx.stroke();
    chessCtx.fill();
}
function drawCorners(x, y, fillStyle){
    chessCtx.fillStyle = fillStyle;
    chessCtx.beginPath();
    chessCtx.moveTo(TILE_SIZE*x, TILE_SIZE*y);
    chessCtx.lineTo(TILE_SIZE*x+15, TILE_SIZE*y);
    chessCtx.lineTo(TILE_SIZE*x, TILE_SIZE*y+15);
    chessCtx.fill();
    chessCtx.beginPath();
    chessCtx.moveTo(TILE_SIZE*(x+1), TILE_SIZE*y);
    chessCtx.lineTo(TILE_SIZE*(x+1)-15, TILE_SIZE*y);
    chessCtx.lineTo(TILE_SIZE*(x+1), TILE_SIZE*y+15);
    chessCtx.fill();
    chessCtx.beginPath();
    chessCtx.moveTo(TILE_SIZE*x, TILE_SIZE*(y+1));
    chessCtx.lineTo(TILE_SIZE*x+15, TILE_SIZE*(y+1));
    chessCtx.lineTo(TILE_SIZE*x, TILE_SIZE*(y+1)-15);
    chessCtx.fill();
    chessCtx.beginPath();
    chessCtx.moveTo(TILE_SIZE*(x+1), TILE_SIZE*(y+1));
    chessCtx.lineTo(TILE_SIZE*(x+1)-15, TILE_SIZE*(y+1));
    chessCtx.lineTo(TILE_SIZE*(x+1), TILE_SIZE*(y+1)-15);
    chessCtx.fill();
}
function drawPieces(){
    for(let i = 0; i < BOARD_HEIGHT; i++){
        for(let j = 0; j < BOARD_WIDTH; j++){
            if(board.tiles[i][j].team === EMPTY) continue;
            if(board.tiles[i][j].team === WHITE){
                chessCtx.fillStyle = WHITE_PIECES_COLOR;//#a7a6b3
            } else {
                chessCtx.fillStyle = BLACK_PIECES_COLOR;
            }
            chessCtx.font = FONT_SIZE;//38px
            chessCtx.textAlign = "center";
            chessCtx.textBaseline = "middle";
            let pieceType = board.tiles[i][j].pieceType;
            chessCtx.fillText(piecesCharacters[pieceType], TILE_SIZE * (j + 0.5), TILE_SIZE * (i + 0.5));
        }
    }
}
function updateWhiteCasualities(){
    let j=PAWN;
    for(let i = whiteCasualities.length; i > 0; i--){
        document.getElementById(`wb${j}`).innerHTML = whiteCasualities[i-1]*1;
        j++;
    }
    document.getElementById(`wb2`).innerHTML = whiteCasualities[2]*1;
    document.getElementById(`wb3`).innerHTML = whiteCasualities[3]*1;
}
function updateBlackCasualities(){
    let j=PAWN;
    for(let i = blackCasualities.length; i > 0; i--){
        document.getElementById(`bb${j}`).innerHTML = blackCasualities[i-1]*1;
        j++;
    }
    document.getElementById(`bb2`).innerHTML = blackCasualities[2]*1;
    document.getElementById(`bb3`).innerHTML = blackCasualities[3]*1;
}
function updateTotalVictories(){
    totalVictoriesText.textContent = "Games won: white " + whiteVictories + " - black " + blackVictories;
}
function getOppositeTeam(team){
    if(team === WHITE) return BLACK;
    else if(team === BLACK) return WHITE;
    else return EMPTY;
}
class Board{
    constructor(){
        this.tiles = [];
        this.tiles.push([
            new Tile(ROOK, BLACK),
            new Tile(KNIGHT, BLACK),
            new Tile(BISHOP, BLACK),
            new Tile(QUEEN, BLACK),
            new Tile(KING, BLACK),
            new Tile(BISHOP, BLACK),
            new Tile(KNIGHT, BLACK),
            new Tile(ROOK, BLACK)
        ]);
        this.tiles.push([
            new Tile(PAWN, BLACK),
            new Tile(PAWN, BLACK),
            new Tile(PAWN, BLACK),
            new Tile(PAWN, BLACK),
            new Tile(PAWN, BLACK),
            new Tile(PAWN, BLACK),
            new Tile(PAWN, BLACK),
            new Tile(PAWN, BLACK)
        ]);
        for(let i = 0; i < 4; i++){
            this.tiles.push([
                new Tile(EMPTY, EMPTY),
                new Tile(EMPTY, EMPTY),
                new Tile(EMPTY, EMPTY),
                new Tile(EMPTY, EMPTY),
                new Tile(EMPTY, EMPTY),
                new Tile(EMPTY, EMPTY),
                new Tile(EMPTY, EMPTY),
                new Tile(EMPTY, EMPTY),
            ]);
        }
        this.tiles.push([
            new Tile(PAWN, WHITE),
            new Tile(PAWN, WHITE),
            new Tile(PAWN, WHITE),
            new Tile(PAWN, WHITE),
            new Tile(PAWN, WHITE),
            new Tile(PAWN, WHITE),
            new Tile(PAWN, WHITE),
            new Tile(PAWN, WHITE)
        ]);
        this.tiles.push([
            new Tile(ROOK, WHITE),
            new Tile(KNIGHT, WHITE),
            new Tile(BISHOP, WHITE),
            new Tile(QUEEN, WHITE),
            new Tile(KING, WHITE),
            new Tile(BISHOP, WHITE),
            new Tile(KNIGHT, WHITE),
            new Tile(ROOK, WHITE)
        ]);
        this.validMoves = [];
        for(let i = 0; i < BOARD_HEIGHT; i++){
            this.validMoves.push([
                INVALID,
                INVALID,
                INVALID,
                INVALID,
                INVALID,
                INVALID,
                INVALID,
                INVALID
            ]);
        }
    }
    resetValidMoves(){
        for(let i = 0; i < BOARD_HEIGHT; i++){
            for(let j = 0; j < BOARD_WIDTH; j++){
                this.validMoves[i][j] = INVALID;
            }
        }
    }
}
class Tile{
    constructor(pieceType, team){
        this.pieceType = pieceType;
        this.team = team;
    }
}
function newClock(id){
    timer=[0,1];
    clearInterval(interval);
    if(id==1){
        interval = setInterval(() => {
            document.querySelector('#bt').innerHTML=`${timer[0]<10?'0'+timer[0]:timer[0]}:${timer[1]<10?'0'+timer[1]:timer[1]}`;
            timer[1]++;
            if((timer[1]>59)&&(timer[0]==23)){
                changeCurrentTeam();
            }
            if(timer[1]>59){
                timer[0]++;
                timer[1]=0;
            }
        }, 1000);
    }else{
        interval = setInterval(() => {
            document.querySelector('#wt').innerHTML=`${timer[0]<10?'0'+timer[0]:timer[0]}:${timer[1]<10?'0'+timer[1]:timer[1]}`;
            timer[1]++;
            if((timer[1]>59)&&(timer[0]==23)){
                changeCurrentTeam();
            }
            if(timer[1]>59){
                timer[0]++;
                timer[1]=0;
            }
        }, 1000);
    }
}
function gameOver(id){
	clearInterval(interval);
	timer=[0,1];
    document.querySelector(".bg_Black").style.display="block";
    document.getElementById("gameOver").style.display="block";
    if(id==1){
        document.getElementById("winIcon").style.color=BLACK_PIECES_COLOR;
        document.querySelector("#winName").textContent="Upper Team";
    }else{
        document.getElementById("winIcon").style.color=WHITE_PIECES_COLOR;
        document.querySelector("#winName").textContent="Lower Team";
    }
    currentTeam=id;
}
function overCancel(){
    document.querySelector(".bg_Black").style.display="none";
    document.getElementById("gameOver").style.display="none";
}
function isCheck(id){
    let whiteKingPosition = findKingPosition(WHITE);
    let blackKingPosition = findKingPosition(BLACK);
    attTeam=getOppositeTeam(id);
    try{
    	if(attTeam==0){
            if(underAttack(whiteKingPosition,attTeam)){
                return WHITE;
            }
        }else{
            if(underAttack(blackKingPosition,attTeam)){
                return BLACK;
            }
        }
    }catch(error){
        console.log("isCheck conatain error");
    }
    return null;
}
function findKingPosition(team){
    for(let i = 0; i < BOARD_HEIGHT; i++){
        for(let j = 0; j < BOARD_WIDTH; j++){
            if(board.tiles[i][j].team === team && board.tiles[i][j].pieceType === KING){
                return { x: j, y: i, z: 0 };
            }
        }
    }
    return { x: -1, y: -1, z: -1 }; // King not found.
}
function newCheck(id){
    let checkResult = isCheck(id);
    if(checkResult !== null){
        if(checkResult === WHITE){
            codeChess(WHITE_PIECES_COLOR);
        }else{
            codeChess(BLACK_PIECES_COLOR);
        }
    }
}
function underAttack(position, id){
    for(let i = 0; i < validMoves.length; i++){
        const moves = validMoves[i].find;
        const bot = validMoves[i].id;
        for(let j = 0; j < moves.length; j++){
            const newY = position.y + moves[j][0];
            const newX = position.x + moves[j][1];
            if(newY >= 0 && newX >= 0 && newY < BOARD_HEIGHT && newX < BOARD_WIDTH && id==0){
                const target = board.tiles[newY][newX];
                if(target.team === getOppositeTeam(id) && target.pieceType==bot){
                    return true;
                }
            }
            if(newY >= 0 && newX >= 0 && newY < BOARD_HEIGHT && newX < BOARD_WIDTH && id==1){
                const target = board.tiles[newY][newX];
                if(target.team === getOppositeTeam(id) && target.pieceType==bot){
                    return true;
                }
            }
        }
    }
    return false;
}
function botCondition(curY, curX){
    const bot=board.tiles[curY][curX];
    console.log(bot.pieceType,curY,curX);
    if(bot.pieceType === PAWN) checkPossiblePlaysPawn(curX, curY);
    else if(bot.pieceType === KNIGHT) checkPossiblePlaysKnight(curX, curY);
    else if(bot.pieceType === BISHOP) checkPossiblePlaysBishop(curX, curY);
    else if(bot.pieceType === ROOK) checkPossiblePlaysRook(curX, curY);
    else if(bot.pieceType === QUEEN) checkPossiblePlaysQueen(curX, curY);
    else if(bot.pieceType === KING) checkPossiblePlaysKing(curX, curY);
}
//checkPossibleCapture(x, y)