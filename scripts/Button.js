import { purchaseMineral } from "./TransientState.js";

const handleOrderSubmission = (clickEvent) => {
    if (clickEvent.target.id === "purchaseButton") {
        purchaseMineral()
        console.log("Button Clicked")
    }
}

export const placeOrder = () => {
    document.addEventListener("click", handleOrderSubmission)
}