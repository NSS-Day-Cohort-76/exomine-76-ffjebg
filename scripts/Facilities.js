import { getFacilities, setFacility } from "./TransientState.js"
const handleFacilityChange = (changeEvent) => {
    if (changeEvent.target.id === "facilitySelect") {
        const facilityId = parseInt(changeEvent.target.value)
        setFacility(facilityId)
    }
}

export const FacilitiesList = () => {
    const Facilities = getFacilities()
    document.addEventListener("chang", handleFacilityChange)
    return `${Facilities.map(Facility => `
        <div>
        <option value="${Facility.id}">${Facility.name}</option>`).join("")}
        </div>`
}