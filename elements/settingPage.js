const settingPage = {
    htmlData: `
        <h2>Settings</h2>
        <div class="closePage"onclick="BacktoMenu();"title="Back to main menu">&times;</div>
        <div class="setting-option flo">
            <div class="set-left">
                <label for="sound">Sound & Effects</label>
                <small class="form-text text-muted">Adjust sound effect on click</small>
            </div>
            <div class="set-right">
                <label class="switch">
                    <input type="checkbox" checked="true" id="set1" onchange="settingToggle('set1');">
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
        <div class="setting-option flo">
            <div class="set-left">
                <label for="sound">Music & Effects</label>
                <small class="form-text text-muted">Adjust Music effect on click</small>
            </div>
            <div class="set-right">
                <label class="switch">
                    <input type="checkbox" checked="false" id="set2" onchange="settingToggle('set2');">
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
        <div class="setting-option flo">
            <div class="set-left">
                <label for="sound">Version</label>
                <small class="form-text text-muted">Display version code in main menu</small>
            </div>
            <div class="set-right">
                <label class="switch">
                    <input type="checkbox" checked disabled>
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
        <div class="setting-option flo">
            <div class="set-left">
                <label for="sound">Color Theme</label>
                <small class="form-text text-muted">Color theme code and Graphics Interface</small>
            </div>
            <div class="set-right">
                <label class="switch">
                    <input type="checkbox" checked disabled>
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
        <div class="setting-option flo">
            <div class="set-left">
                <label for="sound">Move Return</label>
                <small class="form-text text-muted">Return my current move (one by one)</small>
            </div>
            <div class="set-right">
                <label class="switch">
                    <input type="checkbox" checked id="set3" onchange="settingToggle('set3');">
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
        <div class="setting-option flo">
            <div class="set-left">
                <label for="sound">Rewards</label>
                <small class="form-text text-muted">Give me rewards for each match</small>
            </div>
            <div class="set-right">
                <label class="switch">
                    <input type="checkbox" checked id="set4" onchange="settingToggle('set4');">
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
        <div class="setting-option flo">
            <div class="set-left">
                <label for="sound">Model Traing</label>
                <small class="form-text text-muted">Use my game play to enhance AI's performance</small>
            </div>
            <div class="set-right">
                <label class="switch" onclick="invalid();">
                    <input type="checkbox" disabled>
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
        <div class="setting-option flo">
            <div class="set-left">
                <label for="sound">Screen Refresh</label>
                <small class="form-text text-muted">Always refresh screen in 30fps unit</small>
            </div>
            <div class="set-right">
                <label class="switch">
                    <input type="checkbox" checked disabled>
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
        <div class="setting-option flo">
            <div class="set-left">
                <label for="sound">My Activity</label>
                <small class="form-text text-muted">Always remember my activites</small>
            </div>
            <div class="set-right">
                <label class="switch">
                    <input type="checkbox" checked id="set5" onchange="settingToggle('set5');">
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
        <div class="setting-option flo">
            <div class="set-left">
                <label for="sound">Account</label>
                <small class="form-text text-muted">Store gaming data into my device</small>
            </div>
            <div class="set-right">
                <label class="switch">
                    <input type="checkbox" checked>
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
    `,
};