
import { applicationState, setMineral } from TransientState.js

const handleFacilityMineralChoice = (event) => {
    if (event.target.name === "facilityMinerals") {
        setMineral(parseInt(event.target.value))
    }
}

export const getMineralForFacility = async () => {
    const response = await fetch("http://localhost:8088/facilityMineral?_expand=mineral&_expand=facility")
    const facilityMinerals = await response.json()

    const selectedFacilityId = applicationState.userChoices.facilityId

    const filteredMinerals = facilityMinerals.filter(fm => fm.miningFacilityId === selectedFacilityId)

    return filteredMinerals.map(fm => fm.mineral)
}

export const facilityMinerals = async () => {
    const minerals = await getMineralForFacility()

    document.addEventListener('change', handleFacilityMineralChoice)

    let html = `
        
      <div class="box" id="mineralOptions">
        <label class="label has-text-white">Available Minerals</label>
    `

    const facilityMineralHTML = minerals.map((mineral)=>{
        return `
            <input type="radio" name="facilityMinerals" value="${mineral.id}" /> ${mineral.name}
        `
    })
    html += facilityMineralHTML.join("")
    html += "</div>"
    return html
}