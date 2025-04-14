import { GovernorsList } from "./Governors.js";
import { FacilitiesList } from "./Facilities.js";
import { CompleteButton } from "./Button.js";
// import { MineralList } from "./Mineral.js"
// import { ColonyList } from "./Colony.js"

export const render = async () => {
  const governors = await GovernorsList();
  const facilities = await FacilitiesList();
  // const minerals = MineralList()
  // const colonies = ColonyList()

  return `
  <section class="section">
    <div class="container">
      <h1 class="title has-text-light">🪐 Exomine Mineral Trade Platform</h1>

      <!-- Governor Selection -->
      <div class="box">
        <label class="label has-text-white">Select Governor</label>
        <div class="select is-fullwidth">
          <select id="governorSelect">
            <option value="">Choose a governor...</option>
            ${governors}
          </select>
        </div>
      </div>

      <!-- Facility Selection -->
      <div class="box">
        <label class="label has-text-white">Select Mining Facility</label>
        <div class="select is-fullwidth">
          <select id="facilitySelect">
            <option value="">Choose a facility...</option>
            ${facilities}
          </select>
        </div>
      </div>

      <!-- Mineral Selection -->
      <div class="box" id="mineralOptions">
        <label class="label has-text-white">Available Minerals</label>
        <!-- JS will render radio buttons here -->
      </div>

      <!-- Space Cart -->
      <div class="box" id="spaceCart">
        <h2 class="subtitle has-text-white">🛒 Space Cart</h2>
        <div id="cartContents">
          <!-- JS will show selected mineral here -->
        </div>
        ${CompleteButton()}
      </div>
    </div>
  </section>
  `;
};
