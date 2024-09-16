document
  .getElementById("btn-320")
  .addEventListener("click", () => resizeWindow(320));
document
  .getElementById("btn-768")
  .addEventListener("click", () => resizeWindow(768));
document
  .getElementById("btn-1024")
  .addEventListener("click", () => resizeWindow(1024));
document
  .getElementById("btn-1280")
  .addEventListener("click", () => resizeWindow(1280));

document
  .getElementById("btn-maximize")
  .addEventListener("click", maximizeWindow);

function resizeWindow(width) {
  console.log(`Attempting to resize window to ${width}px`);
  chrome.runtime.sendMessage(
    { action: "resizeWindow", width: width },
    (response) => {
      if (response.success) {
        console.log(`Window resized to ${width}px successfully`);
      } else {
        console.error(`Failed to resize window: ${response.error}`);
      }
    }
  );
}

function maximizeWindow() {
  console.log("Attempting to maximize window");
  chrome.runtime.sendMessage({ action: "maximizeWindow" }, (response) => {
    if (response.success) {
      console.log("Window maximized successfully");
    } else {
      console.error(`Failed to maximize window: ${response.error}`);
    }
  });
}

console.log("Popup script loaded");
