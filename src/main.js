const { app, BrowserWindow } = require('electron');
const { globalShortcut } = require('electron');

let transparency = 0.8; // default transparency. range: 1 = fully visible, 0 = invisible
let isFrameless = true; // tracks frame state. app starts w/ frameless
let isTogglingFrame = false; // prevents infinite loop when toggling frame
let winBounds = {x:900, y:420, width:600, height:450}; // stores/tracks the position/bounds of the window
let win;

// main function
function createWindow() {
     // function to create the window
     win = new BrowserWindow({
         width: winBounds.width,
         height: winBounds.height,
         x: winBounds.x,
         y: winBounds.y,
         movable: true, // prevents dragging if set to false
         resizable: true,
         frame: !isFrameless, // launch app with no frame
         transparent: true,
         alwaysOnTop: true,
         webPreferences: {
             nodeIntegration: false,
             partition: "persist:google_calendar" // saves log-in info across sessions
             }
     });

    win.loadURL('https://calendar.google.com')
        .then(() => {
        if (win) win.setOpacity(transparency); // set initial transparency to EXISTING window
    })
        .catch(err => console.error('Error loading URL:', err));

    win.on('closed', ()=> {
        // allows for the app to be refreshed when enabling/disabling the frame
        win = null;
        if (isTogglingFrame) {
            createWindow(); // recreate the window if trying to toggle the frame
            isTogglingFrame = false; // unlock the toggle after the window is recreated; end of critical section
        }
    });

    registerShortcuts(); // registering shortcuts used in app
    //console.log("window created!");
}

// resetting the shortcuts used in app
function registerShortcuts() {
    globalShortcut.unregisterAll(); // clear existing shortcuts

    globalShortcut.register('Ctrl+Up', () => {
        // make more visible
        if (win && transparency < 1.0) {
            transparency += 0.1;
            win.setOpacity(transparency);
        }
    });

    globalShortcut.register('Ctrl+Down', () => {
        // make less visible
        if (win && transparency > 0.2) {
            transparency -= 0.1;
            win.setOpacity(transparency);
        }
    });

    globalShortcut.register('Ctrl+Right', () => {
        // show/hide frame
        //console.log("attempting to toggle frame");
        //console.log("isTogglingFrame: " + isTogglingFrame);
        if (isTogglingFrame || !win) { // prevents infinite loop
            //console.log("aborting.");
            return;
        } else {
            isTogglingFrame = true; // lock the toggle; start of critical section
            isFrameless = !isFrameless; // flip isFrameless to keep track of state
            winBounds = win.getBounds(); // preserve current window position and sizing

            win.close(); // trigger refresh event

            setTimeout(() => {
                //console.log("back inside frame toggle fn");
                if (win) win.setBounds(winBounds); // restore position in size of the window
                //console.log("inside setTimeout");
            } , 1000); // delay to ensure window is fully created

            //console.log("frame toggled!");

            //console.log("isTogglingFrame: " + isTogglingFrame + "\n");
        }
    });

}

app.whenReady().then(() => {
    // starting the app
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

});

app.on('window-all-closed', () => {
    // exiting app
    if (process.platform !== 'darwin') app.quit();
});
