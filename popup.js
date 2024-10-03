document.getElementById('new-session').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let tab = tabs[0];
        chrome.runtime.sendMessage({action: "createSession", tabId: tab.id});
    });
});

// Update the session list in the popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action == "updateSessionList") {
        let sessionList = document.getElementById('session-list');
        sessionList.innerHTML = '';
        for (let tabId in message.sessions) {
            let li = document.createElement('li');
            li.innerText = `Tab ${tabId}: ${message.sessions[tabId].sessionId}`;
            sessionList.appendChild(li);
        }
    }
});

