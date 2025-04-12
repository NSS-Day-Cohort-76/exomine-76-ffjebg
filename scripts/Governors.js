import { getGovernors } from "./TransientState.js"


export const GovernorsList = () => {
    const Governors = getGovernors()
    return `${Governors.map(gov => `
        <div>
        <option value="${gov.id}">${gov.name}</option>`).join("")}
        </div>`
}