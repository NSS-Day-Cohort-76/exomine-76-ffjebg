import {
  getPurchases,
  getGovernors,
  getMinerals,
  getColonies,
} from "./TransientState.js";

export const PurchaseList = () => {
  const purchases = getPurchases();
  const governors = getGovernors();
  const minerals = getMinerals();
  const colonies = getColonies();

  const listItems = purchases
    .map((purchase) => {
      const governor = governors.find((gov) => gov.id === purchase.governorId);
      const mineral = minerals.find((min) => min.id === purchase.mineralId);
      const colony = colonies.find((col) => col.id === purchase.colonyId);

      const governorName = governor ? governor.name : "Unknown Governor";
      const mineralName = mineral ? mineral.name : "Unknown Mineral";
      const colonyName = colony ? colony.name : "Unknown Colony";
      const time = new Date(purchase.timestamp).toLocaleString();

      return `
        <li class="mb-2">
          🛒 <strong>${governorName}</strong> purchased
          <strong>1 ton</strong> of <strong>${mineralName}</strong>
          for the colony of <strong>${colonyName}</strong><br />
          <small class="has-text-grey-light">${time}</small>
        </li>
      `;
    })
    .join("");

  return `
      <section class="section">
        <h2 class="subtitle has-text-white">📜 Purchase Log</h2>
        <ul class="has-text-white is-size-6">
          ${listItems}
        </ul>
      </section>
    `;
};

/* Jake2Bake's version
import { purchaseMineral } from "./TransientState.js"

const handleOrderSubmission = (clickEvent) => {
    if(clickEvent.target.id === "purchaseButton"){
        purchaseMineral()
        console.log("Button Clicked!")
    }
}

export const Sales = async () => {
    document.addEventListener("click", handleOrderSubmission)
    const sales = await fetch("http://localhost:8088/purchases?_expand=mineral&&_expand=facilityMineral&&_expand=governor&&_expand=colony&&_expand=facility&&_expand=colonyMineral").then(res => res.json())
    let salesDivs = sales.map((sale) => {
        
        
        return `<div>${sale.facilityMineral.quantity} tons of ${sale.mineral.name}</div>`
    })

    salesDivs = salesDivs.join("")

    return salesDivs
}

*/
