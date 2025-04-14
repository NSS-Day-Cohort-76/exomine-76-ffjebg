import { getFacilities, setFacility } from "./TransientState.js";

// 🔥 Add this ONCE globally
document.addEventListener("change", (event) => {
  if (event.target.id === "facilitySelect") {
    const facilityId = parseInt(event.target.value);
    setFacility(facilityId);
  }
});

export const FacilitiesList = async () => {
  const response = await fetch("http://localhost:8088/facilities");
  const facilities = await response.json();

  // ✅ Return ONLY option tags — Exomine.js already wraps them in <select>
  return facilities
    .map(
      (facility) => `
    <option value="${facility.id}">${facility.title}</option>
  `
    )
    .join("");
};
