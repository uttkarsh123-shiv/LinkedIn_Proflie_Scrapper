chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "fetchTitle") {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "getTitle" }, response => {
          sendResponse(response);
        });
      }
    });
    return true; // async
  }
});
