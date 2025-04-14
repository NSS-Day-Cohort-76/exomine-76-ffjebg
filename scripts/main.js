import { render } from "./Exomine.js";
import { CompleteButton, placeOrder } from "./Button.js";

const renderAllHTML = async () => {
  await render();
};

// changed newOrderCreated to stateChanged
document.addEventListener("stateChanged", (event) => {
  console.log("State of data has changed. Regenerating HTML...");
  renderAllHTML();
});

// adding the Purchase button to the DOM right hurr and the click listener
document.querySelector("#spaceCart").innerHTML += CompleteButton();
placeOrder();
