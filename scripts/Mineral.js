import { applicationState, setMineral } from "./TransientState.js";

// Listen for when a mineral is selected
document.addEventListener("change", (event) => {
  if (event.target.name === "facilityMinerals") {
    const id = parseInt(event.target.value);
    console.log("mineral selected:", id);
    setMineral(id);
  }
});

export const FacilityMinerals = async () => {
  console.log("🔥 FacilityMinerals called");

  const selectedFacilityId = applicationState.userChoices.facilityId;
  const selectedMineralId = applicationState.userChoices.mineralId;
  console.log("Facility ID from state:", selectedFacilityId);

  if (!selectedFacilityId) {
    return `<div class="box"><strong>Facility Minerals</strong></div>`;
  }

  const res = await fetch(
    "http://localhost:8088/facilityMinerals?_expand=mineral"
  );
  const facilityMinerals = await res.json();
  console.log("📦 raw facilityMinerals:", facilityMinerals);

  const matching = facilityMinerals.filter(
    (fm) => fm.miningFacilityId === selectedFacilityId
  );
  console.log("🔍 matching minerals for selected facility:", matching);

  return `
    <div class="box" id="mineralOptions">
      <label class="label has-text-gray">Available Minerals</label>
      ${matching
        .map((fm) => {
          const isSelected = fm.mineral.id === selectedMineralId;
          const isOutOfStock = fm.amount <= 0;

          return `
            <div>
              <input 
                type="radio" 
                name="facilityMinerals" 
                value="${fm.mineral.id}"
                ${isSelected ? "checked" : ""}
                ${isOutOfStock ? "disabled" : ""}
              />
              ${fm.amount} tons of ${fm.mineral.name}
              ${
                isOutOfStock
                  ? "<span class='has-text-danger'>(Out of stock)</span>"
                  : ""
              }
            </div>
          `;
        })
        .join("")}
    </div>
  `;
};
