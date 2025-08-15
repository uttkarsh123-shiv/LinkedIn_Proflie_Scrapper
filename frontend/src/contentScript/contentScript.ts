chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "getTitle") {
    const title = document.title || "No title found";
    sendResponse({ title });
  }
  return true; // keep message channel open for async response
});
