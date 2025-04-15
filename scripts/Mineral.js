
import { applicationState, setMineral } from './TransientState.js'

const handleFacilityMineralChoice = (event) => {
    if (event.target.name === "facilityMinerals") {
        setMineral(parseInt(event.target.value))
    }
}

export const getMineralForFacility = async () => {
    const response = await fetch("http://localhost:8088/facilityMinerals?_expand=mineral&_expand=miningFacility")
    const facilityMinerals = await response.json()

    const selectedFacilityId = applicationState.userChoices.facilityId

    
    return facilityMinerals.filter(fm => fm.miningFacilityId === selectedFacilityId)
    
}

export const FacilityMinerals = async () => {
    const minerals = await getMineralForFacility()

    // document.addEventListener('change', handleFacilityMineralChoice)

    const facilityId = applicationState.userChoices.facilityId

    if (!facilityId){
        return `<div class="box"><strong>Facility Minerals</strong></div>`
    }
    const facilityResponse = await fetch(`http://localhost:8088/facilities/${facilityId}`)
    const facility = await facilityResponse.json()
    
    let html = `
        <div class="box" id="mineralOptions">
        <input type="radio" name="facilityMinerals" value="${fm.mineral.id}"  />
            <label class="label has-text-gray">Facility Minerals for ${facility.title}</label>
    `

    const facilityMineralHTML = minerals.map((fm) => {
        return `
        ${fm.amount} tons of ${fm.mineral.name}
        `
    })
    html += facilityMineralHTML.join("")
    html += "</div>"
    return html
}

// ${fm.mineral.id === applicationState.userChoices.mineralId ? "checked" : ""}