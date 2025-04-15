import {
  getFacilities,
  setFacility,
  applicationState,
} from "./TransientState.js";

// 🔥 Register facility selection listener once
document.addEventListener("change", (event) => {
  if (event.target.id === "facilitySelect") {
    const facilityId = parseInt(event.target.value);
    setFacility(facilityId);
  }
});

export const FacilitiesList = async () => {
  const response = await fetch("http://localhost:8088/facilities");
  const facilities = await response.json();

  const selectedId = applicationState.userChoices.facilityId;

  // ✅ Return only <option> tags — Exomine wraps this in <select>
  return facilities
    .map(
      (facility) => `
        <option value="${facility.id}" ${
        facility.id === selectedId ? "selected" : ""
      }>
          ${facility.title}
        </option>
      `
    )
    .join("");
};
