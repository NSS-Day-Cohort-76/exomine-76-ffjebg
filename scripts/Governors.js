import { getGovernors, setGovernor } from "./TransientState.js"
const handleGovernorChange = (changeEvent) => {
    if (changeEvent.target.id === "governorSelect") {
        const governorId = parseInt(changeEvent.target.value)
        setGovernor(governorId)
    }
}


export const GovernorsList = async () => {
    const response = await fetch("http://localhost:8088/governors")
    const Governors = await response.json()
    // const Governors = getGovernors()
    document.addEventListener("change", handleGovernorChange)
    return `${Governors.map(gov => `
        <div>
        <option value="${gov.id}">${gov.name}</option>`).join("")}
        </div>`
}