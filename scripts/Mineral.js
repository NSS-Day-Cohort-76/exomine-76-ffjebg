import { applicationState, setMineral } from "./TransientState.js";

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
          .map(
            (fm) => `
          <div>
            <input type="radio" name="facilityMinerals" value="${fm.mineral.id}" />
            ${fm.amount} tons of ${fm.mineral.name}
          </div>
        `
          )
          .join("")}
      </div>
    `;
};

/* OLD?!
// ✅ make sure we only register the event once
document.addEventListener("change", (event) => {
  if (event.target.name === "facilityMinerals") {
    setMineral(parseInt(event.target.value));
  }
});

export const getMineralForFacility = async () => {
  const response = await fetch(
    "http://localhost:8088/facilityMinerals?_expand=mineral"
  );
  const facilityMinerals = await response.json();

  console.log("raw facilityMinerals:", facilityMinerals)

  const selectedFacilityId = applicationState.userChoices.facilityId;

  return facilityMinerals.filter(
    (fm) => fm.miningFacilityId === selectedFacilityId
  );
};

export const FacilityMinerals = async () => {
  console.log("🔥 FacilityMinerals() was called");
  console.log("selected facilityId:", applicationState.userChoices.facilityId);
  const minerals = await getMineralForFacility();
  const facilityId = applicationState.userChoices.facilityId;

  if (!facilityId) {
    return `<div class="box"><strong>Facility Minerals</strong></div>`;
  }

  const facilityResponse = await fetch(
    `http://localhost:8088/facilities/${facilityId}`
  );
  const facility = await facilityResponse.json();

  let html = `
    <div class="box" id="mineralOptions">
      <label class="label has-text-white">Available Minerals at ${facility.title}</label>
  `;

  const facilityMineralHTML = minerals
    .map((fm) => {
      return `
      <div>
        <input type="radio" name="facilityMinerals" value="${fm.mineral.id}" />
        ${fm.amount} tons of ${fm.mineral.name}
      </div>
    `;
    })
    .join("");

  html += facilityMineralHTML;
  html += "</div>";

  return html;
};
*/
