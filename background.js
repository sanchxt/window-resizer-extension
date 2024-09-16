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

  if (request.action === "maximizeWindow") {
    chrome.windows.getCurrent({}, (window) => {
      chrome.windows.update(window.id, { state: "maximized" }, () => {
        if (chrome.runtime.lastError) {
          console.error(
            `Error maximizing window: ${chrome.runtime.lastError.message}`
          );
          sendResponse({
            success: false,
            error: chrome.runtime.lastError.message,
          });
        } else {
          sendResponse({ success: true });
        }
      });
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
