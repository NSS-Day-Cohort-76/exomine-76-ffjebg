import { purchaseMineral } from "./TransientState.js";

export const CompleteButton = () => {
  return `
        <button class="button is-success mt-3" id="purchaseButton">
        Purchase Mineral </button>

    `;
};

const handleOrderSubmission = (clickEvent) => {
  if (clickEvent.target.id === "purchaseButton") {
    purchaseMineral();
    console.log("Button Clicked");
  }
};

export const placeOrder = () => {
  document.addEventListener("click", handleOrderSubmission);
};
