import { render } from "./Exomine.js";
import { placeOrder } from "./Button.js";

const mainContainer = document.querySelector("#container");

const renderAllHTML = async () => {
  mainContainer.innerHTML = await render();
};

// Render the app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  renderAllHTML();
  placeOrder(); // activates purchase button click listener
});

// Re-render on state changes (after purchase, etc.)
document.addEventListener("stateChanged", () => {
  console.log("State of data has changed. Regenerating HTML...");
  renderAllHTML();
});
