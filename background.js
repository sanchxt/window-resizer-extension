chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "resizeWindow") {
    chrome.windows.getCurrent({}, (window) => {
      if (window.state === "maximized") {
        chrome.windows.update(window.id, { state: "normal" });
      }
      resizeAndRespond(window, request.width, sendResponse);
    });
    return true;
  }

});

function resizeAndRespond(window, width, sendResponse) {
  chrome.windows.update(
    window.id,
    { width: width, height: window.height },
    () => {
      if (chrome.runtime.lastError) {
        console.error(
          `Error resizing window: ${chrome.runtime.lastError.message}`
        );
        sendResponse({
          success: false,
          error: chrome.runtime.lastError.message,
        });
      } else {
        sendResponse({ success: true });
      }
    }
  );
}
