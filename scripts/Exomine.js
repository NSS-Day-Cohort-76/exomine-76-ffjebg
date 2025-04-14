import { GovernorsList } from "./Governors.js";
import { FacilitiesList } from "./Facilities.js";
import { ColonyList} from "./Colony.js"
import { FacilityMinerals } from "./Mineral.js";

export const render = async () => {
    const governors = GovernorsList()
    const facilities = FacilitiesList()
    const colonies = ColonyList()
    const facilityMineral = await FacilityMinerals()

    return `${governors}${facilities}${facilityMineral}`
}