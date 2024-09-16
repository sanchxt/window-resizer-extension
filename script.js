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

console.log("Popup script loaded");
