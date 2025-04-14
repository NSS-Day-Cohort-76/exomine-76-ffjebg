import { getFacilities, setFacility } from "./TransientState.js"
const handleFacilityChange = (changeEvent) => {
    if (changeEvent.target.id === "facilitySelect") {
        const facilityId = parseInt(changeEvent.target.value)
        setFacility(facilityId)
    }
}

export const FacilitiesList = async () => {
    const response = await fetch("http://localhost:8088/facilities")
    const Facilities = await response.json()
    document.addEventListener("change", handleFacilityChange)
    return `${Facilities.map(Facility => `
        <div>
        <option value="${Facility.id}">${Facility.title}</option>`).join("")}
        </div>`
}