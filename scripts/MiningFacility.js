import { getFacilities } from "./TransientState.js"

export const miningFacilities = () => {
 const facilities = getFacilities()

            return `${facilities.map(  =>
            `<div>
                    <select id="facility">
                        <option value="${facility.id}">${facility.title} </option>
                     </select>
            </div>`).join(" ")
}


