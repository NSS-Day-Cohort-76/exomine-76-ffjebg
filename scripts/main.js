import { render } from "./Exomine.js";
import {
  fetchGovernors,
  fetchFacilities,
  fetchFacilityMinerals,
  fetchMinerals,
  fetchColonies,
  fetchColonyMinerals,
  fetchPurchases,
  applicationState,
} from "./TransientState.js";
import { placeOrder } from "./Button.js";
import { FacilityMinerals } from "./Mineral.js";

const mainContainer = document.querySelector("#container");

const renderAllHTML = async () => {
  await fetchGovernors();
  await fetchFacilities();
  await fetchFacilityMinerals();
  await fetchMinerals();
  await fetchColonies();
  await fetchColonyMinerals();
  await fetchPurchases();

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

document.addEventListener("facilitySelect", async () => {
  console.log("facility selec event recevied");
  const html = await FacilityMinerals();
  console.log("should be rendering HTML", html);

  const container = document.querySelector("#mineralOptions");
  if (container) {
    container.innerHTML = html;
  } else {
    console.warn("#mineralOptions not found!");
  }
});

document.addEventListener("mineralSelect", () => {
  // reserved for showing a cart preview later on?
});

document.addEventListener("governorSelect", renderAllHTML);
