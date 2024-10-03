// Create a context menu item when the extension is installed
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "openInTemporarySession",
        title: "Open link in new temporary session",
        contexts: ["link"]
    });
});

// Handle the click event on the context menu
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "openInTemporarySession") {
        // Open the link in a new temporary session
        openLinkInNewSession(info.linkUrl);
    }
});

// Function to open a link in a new session
function openLinkInNewSession(linkUrl) {
    chrome.tabs.create({url: linkUrl}, function(newTab) {
        // Create a new session for the newly opened tab
        createSession(newTab.id);
    });
}

// Reuse the existing createSession function
function createSession(tabId) {
    let sessionId = 'session_' + tabId + '_' + new Date().getTime();
    sessions[tabId] = { sessionId: sessionId, cookies: [] };
    console.log(`Session created for tab ${tabId}: ${sessionId}`);
}

