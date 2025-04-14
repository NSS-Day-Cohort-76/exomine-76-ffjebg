import { getFacilities } from "./TransientState.js"

const setMiningFacilityId = (changeEvent) => {
    if (changeEvent.target.name === "facility") {
        const miningFacilityId = parseInt(changeEvent.target.value)
        setMiningFacilityId(miningFacilityId)
    }

}

export const miningFacilities = () => {
 const facilities = getFacilities()
document.addEventListener("change", setMiningFacilityId)

let html = `<select id="facility">`
html += `<option value="0">Choose a facility</option>`

 const facilitiesArray = facilities.map(
    (facility) => {       
        return `<option value="${facility.id}">${facility.title} </option>`
        }    
    )

    html += facilitiesArray.join(" ")
    html += "</select>"
    return html
}