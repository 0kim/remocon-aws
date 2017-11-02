function getElemById(id) {
    return document.getElementById(id);
}

// Services Menu callback
function clickNavServicesMenu() {
    getElemById("nav-servicesMenu").click();
}

// Region Menu callback
function clickNavRegionMenu() {
    let navRegionMenu = getElemById("nav-regionMenu");
    navRegionMenu.click();
    let regionMenuContent = getElemById("regionMenuContent");
    for(let node of regionMenuContent.children) {
        if (node.tagName == 'A') {
            node.focus();
            break;
        }
    }
}

// Resource Groups callback
function clickNavResourceGroupsMenu() {
    let isRgExisted = false;
    let navResourceGroupsMenu = getElemById("nav-resourceGroupsMenu");
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

// Username callback
function clickNavUsernameMenu() {
    let navUsernameMenu = getElemById("nav-usernameMenu");
    navUsernameMenu.click();

    for(let n of getElemById("awsc-username-menu-optional-items").children) {
        if(n.tagName == 'A') {
            n.focus();
            break;
        }
    }
}

/////////
// the length of MODIFIER_KEYS name must be longer than 2
const MODIFIER_KEYS = [ "SHIFT", "CTRL", "ALT", "CMD"];
const MODIFIER_KEYS_CODE = [16, 17, 18, 91];

class Remo {
    constructor() {
        this.shortcutList = new Map();
        this.modifierKeysStatus = new Map();
        for( let i in MODIFIER_KEYS ) {
            this.modifierKeysStatus.set(i, false);
        }
    }

    _createComboKey( shortcutKeys ) {
        // e.g., key of 'Ctrl+S' = "0100S"
        var comboKey;
        let keyVal = 0;
        let keyChar = '';
        for(let i in shortcutKeys) {
            if (shortcutKeys[i].length > 1) {
                // modifier key
                let idx = MODIFIER_KEYS.indexOf( shortcutKeys[i] );
                keyVal += Math.pow(10,(MODIFIER_KEYS.length - idx - 1));
            } else if ( shortcutKeys[i].length == 1 ) {
                // normal key
                keyChar = shortcutKeys[i];
                // todo: check multiple keys
            } else {
                alert("ASSERT");
                return;
            }
        }

        comboKey = "0".repeat(MODIFIER_KEYS.length - String(keyVal).length)
            .concat(keyVal, keyChar);

        return comboKey
    }

    _createComboKeyWithKey( key ) {
        let comboKey = "";
        for( let i = 0; i < this.modifierKeysStatus.size; i++ ) {
            if( this.modifierKeysStatus.get(String(i)) == true ) {
                comboKey = comboKey.concat("1")
            } else {
                comboKey = comboKey.concat("0")
            }
        }
        comboKey = comboKey.concat(String.fromCharCode(key));
        return comboKey;
    }

    keyPressed(key) {
        // == modifier key --> change status of modifier keys
        let idx = MODIFIER_KEYS_CODE.indexOf(key);
        if ( idx > -1) {
            this.modifierKeysStatus.set(String(idx), true);
        } else {
            // != modifier key --> find listener and invoke relevant listener
            // 1. create key with current status and key.
            let comboKey = this._createComboKeyWithKey(key);

            // 2. lookup listener and invoke it
            let f = this.shortcutList.get( comboKey );
            if (f) {
                f(this.context);
            }
        }
    }

    keyReleased(key) {
        // == modifier key --> change status of modifier keys
        let idx = MODIFIER_KEYS_CODE.indexOf(key);
        if ( idx > -1) {
            this.modifierKeysStatus.set(String(idx), false);
        } else {
            // != modifier key --> do nothing
        }
    }

    addShortcutListener( shortcutKeys, f) {
        let key = this._createComboKey(shortcutKeys);
        this.shortcutList.set( key, f )
    }
}

////
var remo = new Remo();

remo.addShortcutListener(["ALT", "S"], clickNavServicesMenu );
remo.addShortcutListener(["ALT", "R"], clickNavRegionMenu );
remo.addShortcutListener(["ALT", "G"], clickNavResourceGroupsMenu );
remo.addShortcutListener(["ALT", "A"], clickNavUsernameMenu );

// Add event listeners for key down/up to Document
document.addEventListener('keydown', (event) => {
    remo.keyPressed(event.keyCode);
})

document.addEventListener('keyup', (event) => {
    remo.keyReleased(event.keyCode);
}, false );

