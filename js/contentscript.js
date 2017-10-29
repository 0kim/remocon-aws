var gStatus = {
    CTRL_PRESSED:  false,
    ALT_PRESSED:   false,
    SHIFT_PRESSED: false,
    CMD_PRESSED:   false
}

const KEYS = {
    "TAB": 9,
    "SHIFT": 16,
    "CTRL": 17,
    "ALT": 18,
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,
    "CMD": 91
}

// onkeydown
function PRESSED(key) {
    switch (key) {
        case KEYS["CTRL"]:
            gStatus["CTRL_PRESSED"] = true;
            break;
        case KEYS["ALT"]:
            gStatus["ALT_PRESSED"] = true;
            break;
        case KEYS["SHIFT"]:
            gStatus["SHIFT_PRESSED"] = true;
            break;
        case KEYS["CMD"]:
            gStatus["CMD_PRESSED"] = true;
            break;
    }
}

// onkeyup
function RELEASED(key) {
    switch (key) {
        case KEYS["CTRL"]:
            gStatus["CTRL_PRESSED"] = false
            break;
        case KEYS["ALT"]:
            gStatus["ALT_PRESSED"] = false;
            break;
        case KEYS["SHIFT"]:
            gStatus["SHIFT_PRESSED"] = false;
            break;
        case KEYS["CMD"]:
            gStatus["CMD_PRESSED"] = false;
            break;
    }
}

setTimeout( function(){
    var s = document.createElement('script');

    s.src = chrome.extension.getURL('js/remopooq.js');
    s.onload = function() {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
}, 500)


document.addEventListener('keyup', (event) => {
    var keyCode = event.keyCode;
    RELEASED(keyCode);

}, false );


function getElemById(id) {
    return document.getElementById(id);
}


document.addEventListener('keydown', (event) => {
    var keyCode = event.keyCode;
    PRESSED(keyCode);

    if ( keyCode == 83  // CTRL + S
        && gStatus["CTRL_PRESSED"]
        && !gStatus["ALT_PRESSED"]
        && !gStatus["SHIFT_PRESSED"] ) {
        getElemById("nav-servicesMenu").click();
    } else if ( keyCode == 82  // CTRL + R
                && gStatus["CTRL_PRESSED"]
                && !gStatus["ALT_PRESSED"]
                && !gStatus["SHIFT_PRESSED"] ) {
        navRegionMenu = getElemById("nav-regionMenu");
        navRegionMenu.click();
        regionMenuContent = getElemById("regionMenuContent");
        for(let node of regionMenuContent.children) {
            if (node.tagName == 'A') {
                node.focus();
                break;
            }
        }
    } else if ( keyCode == 71  // CTRL + G
                && gStatus["CTRL_PRESSED"]
                && !gStatus["ALT_PRESSED"]
                && !gStatus["SHIFT_PRESSED"] ) {
        let isRgExisted = false;

        navResourceGroupsMenu = getElemById("nav-resourceGroupsMenu");
        navResourceGroupsMenu.click();

        for(let n of getElemById("awsc-rg-column-left").children) {
            if(n.tagName == 'LI') {
                isRgExisted = true;
                break;
            }
        }

        if(isRgExisted) {
            // focus on first rg of column-left
            //   awsc-rg-column-left >> li >> a
            for(let n of getElemById("awsc-rg-column-left").firstChild.children) {
                if(n.tagName == 'A') {
                   n.focus();
                   break;
                }
            }
        } else {
            // focus on 'Create a Resource Group'
            getElemById("awsc-rg-createResourceGroup").focus();
        }
    }

}, false );
