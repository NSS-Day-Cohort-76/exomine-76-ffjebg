import { render } from "./Exomine.js";
// import { CompleteButton, placeOrder } from "./Button.js";

const mainContainer = document.querySelector("#container");

const renderAllHTML = async () => {
  mainContainer.innerHTML = await render();
};

// Hook into render cycle (use the one that matches your app's logic)
document.addEventListener("stateChanged", (event) => {
  console.log("State of data has changed. Regenerating HTML...");
  renderAllHTML();
});

// // Add purchase button + click listener
// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelector("#spaceCart").innerHTML += CompleteButton();
//   placeOrder();
// });

// Initial render
renderAllHTML();
