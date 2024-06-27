const popups = {
    htmlData: `
        
        <div class="bg_White" id="choose">
            <h2>Select Opener</h2>
            <p>Select an option to push the person, Which person get first move/turn on the game, by</p>
            <div class="btnHolder">
                <span class="start-btn" onclick="tose();"title="Tose a coin and select opener">Tose</span>
                <span class="start-btn" onclick="vote();"title="Direct choose an opener">Vote</span>
            </div>
        </div>
        <div class="bg_White" id="tose">
            <h2>Tose</h2>
            <p>Using Random tose with a fare coin, and winer is</p>
            <div id="tosingCoin">♔</div>
            <div id="toseName">None</div>
            <div class="btnHolder">
                <span class="btn" onclick="BacktoChoose();"title="Back to choose option">&#x25C0;</span>
                <span class="btn" onclick="toseCoin();"title="Once again">Refresh</span>
                <span class="btn"onclick="toseOk();"title="Next">&#x25B6;</span>
            </div>
        </div>
        <div class="bg_White" id="vote">
            <h2><span onclick="BacktoChoose();"title="Back to choose option">&#x25C0;</span>Vote</h2>
            <p>Direct select an option to choose the opener of this game, via self-settlement</p>
            <div class="btnHolder">
                <span class="start-btn" onclick="voting(1);"title="Upper Team in respect of device">Upper Team</span>
                <span class="start-btn" onclick="voting(0);"title="Lower Team in respect of device">Lower Team</span>
            </div>
        </div>
        <div class="bg_White" id="gameOver">
            <h2>Game Over!</h2>
            <p>Checkmate, your KING is down, now I am the winer</p>
            <div id="winIcon">♔</div>
            <div id="winName">None</div>
            <div class="btnHolder">
                <span class="btn" onclick="overCancel();BacktoMenu();"title="Back to main menu">&#x25C0;</span>
                <span class="btn" title="Write a feedback about this game">FeedBack</span>
                <span class="btn" onclick="overCancel();startGame();"title="Play Again!">&#x25B6;</span>
            </div>
        </div>
        <div class="bg_White" id="pawnChange">
            <h2>Change Pawn</h2>
            <p>your pawn get a chance to change it self to a high rank pieces, change it to,</p>
            <div class="flo">
            	<div class="winIcon"onclick="promoted(4);">♕</div>
                <div class="winIcon"onclick="promoted(2);">♗</div>
                <div class="winIcon"onclick="promoted(3);">♖</div>
                <div class="winIcon"onclick="promoted(1);">♘</div>
            </div>
            <div class="flo">
            	<div class="winName"onclick="promoted(4);">Queen</div>
                <div class="winName"onclick="promoted(2);">Bishop</div>
                <div class="winName"onclick="promoted(3);">Rook</div>
                <div class="winName"onclick="promoted(1);">Knight</div>
            </div>
            <div class="btnHolder">
            	_
                <span class="btn" onclick="overCancel();BacktoMenu();"title="Just avoid this one and clear this pawn">No Thanks</span>
                _
            </div>
        </div>
    `,
};