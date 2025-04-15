import { GovernorsList } from "./Governors.js";
import { FacilitiesList } from "./Facilities.js";
import { CompleteButton } from "./Button.js";
import { FacilityMinerals } from "./Mineral.js"
// import { MineralList} from "./Mineral.js"
import { ColonyMineralList} from "./ColonyMinerals.js"

export const render = async () => {
  const governors = await GovernorsList();
  const facilities = await FacilitiesList();
  const facilityMineral = await FacilityMinerals()

  return `
    const governors = await GovernorsList()
    const facilities = await FacilitiesList()
    // const minerals = MineralList()
    const colonies = ColonyMineralList()
    return ` <section class="section">
    <div class="container">
      <h1 class="title has-text-light">🪐 Exomine Mineral Trade Platform</h1>

      <!-- Governor Selection -->
      <div class="box">
        <label class="label has-text-gray">Select Governor</label>
        <div class="select is-fullwidth">
          <select id="governorSelect">
            <option value="">Choose a governor...</option>
            ${governors}
          </select>
        </div>
      </div>

    <!-- Colony Inventory -->
      <div class="box" id="colonyMinerals">
        <label class="label has-text-white">Colony Minerals</label>
        ${colonies}
      </div>

      <!-- Facility Selection -->
      <div class="box">
        <label class="label has-text-gray">Select Mining Facility</label>
        <div class="select is-fullwidth">
          <select id="facilitySelect">
            <option value="">Choose a facility...</option>
            ${facilities}
          </select>
        </div>
      </div>

      <!-- Mineral Selection -->
            ${facilityMineral}
      <!-- Space Cart -->
      <div class="box" id="spaceCart">
        <h2 class="subtitle has-text-gray">🛒 Space Cart</h2>
        <div id="cartContents">
          <!-- JS will show selected mineral here -->
        </div>
        ${CompleteButton()}
      </div>
    </div>
  </section>`;
};
