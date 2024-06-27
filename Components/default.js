function Loader(load){
    this.load = load;
}
Loader.prototype.creat = function(){
    const loaderEle = document.createElement('div');
    loaderEle.classList.add("loading");
    loaderEle.innerHTML = `<div class="centerDia"><div class="loader"></div></div>`;
    document.body.appendChild(loaderEle);
}
Loader.prototype.remove = function(time){
    if(time<100){
        return false;
    }
    setTimeout(()=>{
        document.body.removeChild(document.querySelector('.loading'));
    },time);
}
Loader.prototype.flash = function(time){
    loader = new Loader(true);
    loader.creat();
    loader.remove(time);
}
function user(){
	if(isMobileDevice()){
	    TILE_SIZE = 40;
        FONT_SIZE = "28px Arial";
        BOARD_NAME="chessCanvas";
	}else{
		TILE_SIZE = 55;
        FONT_SIZE = "30px Arial";
        BOARD_NAME="chessCanvas2";
	}
    loader = new Loader(true);
    loader.creat();
    loader.remove(2000);
    setTimeout(()=>{
        document.getElementById('maneMenu').style.display = "block";
        document.getElementById('popups').innerHTML = popups.htmlData;
    },500);
}
function isMobileDevice(){
    let regexp = /android|iphone|kindle|ipad/i;
	let MobileDevice = regexp.test(navigator.userAgent);
	return MobileDevice;
}
function PlayGame(id){
    if(id==2){
        loader = new Loader(true).flash(2000);
        document.getElementById("maneMenu").style.display="none";
        document.getElementById("field").style.display="block";
        onLoad();
        document.querySelector(".bg_Black").style.display="block";
        document.getElementById("choose").style.display="block";
        MODE = 2;
    }else if(id==1){
        loader = new Loader(true).flash(2000);
        document.getElementById("maneMenu").style.display="none";
        document.getElementById("ground").style.display="block";
        game = new Chess();
        ground = ChessBoard('board', cfg);
        setTimeout(()=>{
            startS.play();
        },2000);
        MODE = 1;
    }else{
        alert("Error!");
    }
}
function invalid(){
    alert("Sorry this feature is not avalible in this version, Try another!..");
}
function setting(){
    loader = new Loader(true).flash(2000);
    document.getElementById("settings").style.display="block";
    document.getElementById("maneMenu").style.display="none";
    document.getElementById("field").style.display="none";
    document.getElementById("ground").style.display="none";
    document.getElementById("settings").innerHTML = settingPage.htmlData;
}
function BacktoMenu(){
    document.getElementById("maneMenu").style.display="block";
    document.getElementById("field").style.display="none";
    document.getElementById("ground").style.display="none";
    document.getElementById("settings").style.display="none";
}
function tose(){
    document.getElementById("choose").style.display="none";
    document.querySelector(".bg_Black").style.display="block";
    document.getElementById("tose").style.display="block";
    toseCoin();
}
function toseOk(){
    if(toseDone!=0){
        document.querySelector(".bg_Black").style.display="none";
        document.getElementById("tose").style.display="none";
        newClock(currentTeam);
    }
}
function BacktoChoose(){
    document.getElementById("choose").style.display="block";
    document.querySelector(".bg_Black").style.display="block";
    document.getElementById("tose").style.display="none";
    document.getElementById("vote").style.display="none";
}
function toseCoin(){
    toseDone=0;
    let icon = document.getElementById("tosingCoin");
    let txt = document.getElementById("toseName");
    var puzz = new Array(1000, 1500, 2000, 2500, 3000, 3500);
    var time = puzz[Math.floor(Math.random()*puzz.length)];
    animateTose(icon,txt,0,time/100,time*2);
    setTimeout(()=>{toseDone++;},time*2);
}
function animateTose(obj1,obj2,start,end,duration){
    let startTime=null;
    const step = (timestamp) => {
        if(!startTime)startTime=timestamp;
        const progress = Math.min((timestamp - startTime)/duration, 1);
        obj1.style.color = Math.floor(progress * (end - start) + start)%2==0?BLACK_PIECES_COLOR:WHITE_PIECES_COLOR;
        obj2.innerHTML = Math.floor(progress * (end - start) + start)%2==0?'Upper Team':'Lower Team';
        currentTeam = Math.floor(progress * (end - start) + start)%2==0?1:0;
        if(progress < 1){
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
function vote(){
    document.getElementById("choose").style.display="none";
    document.querySelector(".bg_Black").style.display="block";
    document.getElementById("vote").style.display="block";
}
function voting(id){
    currentTeam=id;
    document.querySelector(".bg_Black").style.display="none";
    document.getElementById("vote").style.display="none";
    newClock(id);
}
function pawnChange(){
    document.querySelector(".bg_Black").style.display="block";
    document.getElementById("pawnChange").style.display="block";
}
function pcCancel(){
    document.querySelector(".bg_Black").style.display="none";
    document.getElementById("pawnChange").style.display="none";
}
function promoted(id){
	if((board.tiles[0][temp].pieceType==0)&&(board.tiles[0][temp].team==0)){
		board.tiles[0][temp].pieceType=id;
	}else if((board.tiles[7][temp].pieceType==0)&&(board.tiles[7][temp].team==1)){
		board.tiles[7][temp].pieceType=id;
	}else{
		alert("Unwanted error occure, report this!\nBack->Settings->Feedback");
	}
    pcCancel();
    repaintBoard();
}
function codeChess(id){
    document.getElementById("checkBox").style.display="block";
    document.getElementById("checkBox").innerHTML=`<span style="color: ${id};">♔</span> in Danger may be!`;
    const checkClose = setTimeout(()=>{
        document.getElementById("checkBox").style.display="none";
        clearTimeout(checkClose);
    },3000);
}
function themes(){
    loader = new Loader(true).flash(2000);
    document.getElementById("theme").style.display="block";
    document.getElementById("field").style.display="none";
    document.getElementById("ground").style.display="none";
    document.getElementById("theme").innerHTML = themePage.htmlData;
    clearInterval(interval);
    boardDesign();
    bgDesign();
}
function themeClose(){
    document.getElementById("theme").style.display="none";
    if(MODE==2){
        document.getElementById("field").style.display="block";
        newClock(currentTeam);
    }else{
        document.getElementById("ground").style.display="block";
    }
}
function boardDesign(){
    var board = document.getElementById("boardDesign");
    board.innerHTML='';
    var newSize;
    if(isMobileDevice()){
        newSize = 296;
    }else{
        newSize = 440;
    }
    board.style.width=`${newSize}px`;
    board.style.height=`${newSize}px`;
    var boardComponent;
    for(let i=0; i<8; i++){
        boardComponent=`<div class="flo">`;
        for(let j=0; j<8; j++){
            if((i+j)%2 == 1){
                boardComponent+=`<div style="background: ${boardColor[currentBoard].white_tile_color};width: ${Math.floor(newSize/8)}px; height: ${Math.floor(newSize/8)}px;"></div>`;
            }else{
                boardComponent+=`<div style="background: ${boardColor[currentBoard].black_tile_color};width: ${Math.floor(newSize/8)}px; height: ${Math.floor(newSize/8)}px;"></div>`;
            }
        }
        boardComponent+='</div>';
        board.innerHTML+=boardComponent;
    }
    if(boardColor[currentBoard].equiped==1){
        document.getElementById("boardBtn").style.background = "linear-gradient(46deg, green, #00ff09)";
        document.getElementById("boardBtn").innerHTML="Equiped";
        document.getElementById("boardBtn").title="I am use this board";
    }else{
        document.getElementById("boardBtn").style.background = "linear-gradient(46deg, orange, red)";
        document.getElementById("boardBtn").innerHTML="Select";
        document.getElementById("boardBtn").title="I am not use this board";
    }
    document.getElementById("boardName").textContent = boardColor[currentBoard].text;
}
function boardLeft(){
    if(currentBoard==0){
        currentBoard=boardColor.length-1;
    }else{
        currentBoard--;
    }
    boardDesign();
}
function boardRight(){
    if(currentBoard==boardColor.length-1){
        currentBoard=0;
    }else{
        currentBoard++;
    }
    boardDesign();
}
function boardSelect(){
    WHITE_TILE_COLOR = boardColor[currentBoard].white_tile_color;
    BLACK_TILE_COLOR = boardColor[currentBoard].black_tile_color;
    WHITE_PIECES_COLOR = boardColor[currentBoard].white_pieces_color;
    BLACK_PIECES_COLOR = boardColor[currentBoard].black_pieces_color;
    HIGHLIGHT_COLOR = boardColor[currentBoard].highlight_color;
    for(let i=0; i<boardColor.length; i++){
        boardColor[i].equiped=0;
        if(i==currentBoard){
            boardColor[i].equiped=1;
        }
    }
    boardDesign();
    if(MODE==2){
        repaintBoard();
    }
    document.getElementById("jsStyle").innerHTML = `.white-1e1d7{background:${boardColor[currentBoard].white_tile_color};}
    .black-3c85d{background:${boardColor[currentBoard].black_tile_color};}`;
}
function moveBack(){
	if(movment.length!=0){
		if(movment[movment.length-1].history==0){
			let j = movment.length-1;
		    board.tiles[movment[j].currentLocation[0]][movment[j].currentLocation[1]].pieceType = EMPTY;
            board.tiles[movment[j].currentLocation[0]][movment[j].currentLocation[1]].team = EMPTY;
            board.tiles[movment[j].prevLocation[0]][movment[j].prevLocation[1]].team=movment[j].pieceTeam;
            board.tiles[movment[j].prevLocation[0]][movment[j].prevLocation[1]].pieceType=movment[j].pieceType;
            if(j-1>=0){
                if(movment[j-1].eating!=0){
                    board.tiles[movment[j-1].eating.postion[0]][movment[j-1].eating.postion[1]].pieceType=movment[j-1].eating.pieceType;
                    board.tiles[movment[j-1].eating.postion[0]][movment[j-1].eating.postion[1]].team=movment[j-1].eating.pieceTeam;
                    if(movment[j-1].eating.pieceTeam==WHITE){
                        whiteCasualities[movment[j-1].eating.pieceType]--;
                        updateWhiteCasualities();
                    }else{
                        blackCasualities[movment[j-1].eating.pieceType]--;
                        updateBlackCasualities();
                    }
                }
            }
            board.resetValidMoves();
            repaintBoard();
            movment.length=j;
            currentTeam = getOppositeTeam(currentTeam);
            newClock(currentTeam);
        }
	}
}
function bgDesign(){
    var bg = document.getElementById("bgDesign");
    bg.style.backgroundImage = `url('${BgColor[currentBg].src}')`;
    document.getElementById("bgName").innerText = BgColor[currentBg].text;
    if(BgColor[currentBg].equiped==1){
        document.getElementById("bgBtn").style.background = "linear-gradient(46deg, green, #00ff09)";
        document.getElementById("bgBtn").innerHTML="Equiped";
        document.getElementById("bgBtn").title="I am use this background";
    }else{
        document.getElementById("bgBtn").style.background = "linear-gradient(46deg, orange, red)";
        document.getElementById("bgBtn").innerHTML="Select";
        document.getElementById("bgBtn").title="I am not use this background";
    }
}
function bgLeft(){
    if(currentBg==0){
        currentBg=BgColor.length-1;
    }else{
        currentBg--;
    }
    bgDesign();
}
function bgRight(){
    if(currentBg==BgColor.length-1){
        currentBg=0;
    }else{
        currentBg++;
    }
    bgDesign();
}
function bgSelect(){
    if(BgColor[currentBg].equiped!=1){
        document.getElementById("field").style.backgroundImage=`url('${BgColor[currentBg].src}')`;
        document.getElementById("ground").style.backgroundImage=`url('${BgColor[currentBg].src}')`;
        for(let i=0; i<BgColor.length; i++){
            BgColor[i].equiped=0;
        }
        BgColor[currentBg].equiped=1;
        bgDesign();
    }
}