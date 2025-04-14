import { GovernorsList } from "./Governors.js";
import { FacilitiesList } from "./Facilities.js";
import { MineralList} from "./Mineral.js"
import { ColonyList} from "./Colony.js"

export const render = async () => {
    const governors = GovernorsList()
    const facilities = FacilitiesList()
    const minerals = MineralList()
    const colonies = ColonyList()

    return `${governors}${facilities}${minerals}${colonies}`
}