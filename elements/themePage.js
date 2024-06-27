const themePage = {
    htmlData: `
        <h2>&#x1f3a8; Designs</h2>
        <div class="closePage"onclick="themeClose();"title="Go Back">&times;</div>
        <h3>Board style-</h3>
        <h2 id="boardName">{Board_name}</h2>
        <div class="flo">
            <div class="slider" onclick="boardLeft();">&#x25C0;</div>
            <div id="boardDesign"></div>
            <div class="slider" onclick="boardRight();">&#x25B6;</div>
        </div>
        <div class="btn"id="boardBtn"onclick="boardSelect();">Select</div>
        <h3>Background style-</h3>
        <h2 id="bgName">{Bg_name}</h2>
        <div class="flo">
            <div class="slider" onclick="bgLeft();">&#x25C0;</div>
            <div id="bgDesign"></div>
            <div class="slider" onclick="bgRight();">&#x25B6;</div>
        </div>
        <div class="btn"id="bgBtn"onclick="bgSelect();">Select</div>
    `,
};