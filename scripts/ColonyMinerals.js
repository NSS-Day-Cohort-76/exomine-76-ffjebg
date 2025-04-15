import {
  getColonyMinerals,
  getGovernors,
  getMinerals,
  getColonies,
  getTransientState,
} from "./TransientState.js";

export const ColonyMineralsList = () => {
  const ColonyMinerals = getColonyMinerals();
  const Minerals = getMinerals();
  const Governors = getGovernors();
  const Colonies = getColonies();

  const state = getTransientState();
  const selectedGovernor = Governors.find((gov) => gov.id === state.governorId);

  let html = "<div>";

  if (selectedGovernor) {
    const colony = Colonies.find(
      (colony) => colony.id === selectedGovernor.colonyId
    );
    html += `<h2 class="subtitle has-text-grey"><strong>${colony.title} Minerals</strong></h2>`;

    const colonyMineralData = ColonyMinerals.filter(
      (cm) => cm.colonyId === selectedGovernor.colonyId
    );

    // Group and total minerals
    const mineralTotals = {};

    for (const cm of colonyMineralData) {
      if (!mineralTotals[cm.mineralId]) {
        mineralTotals[cm.mineralId] = 0;
      }
      mineralTotals[cm.mineralId] += cm.quantity;
    }

    // Display each mineral and its total quantity
    for (const mineralId in mineralTotals) {
      const mineral = Minerals.find((m) => m.id === parseInt(mineralId));
      html += `<p>${mineralTotals[mineralId]} tons of ${mineral.name}</p>`;
    }
  } else {
    html += "<h2><strong>Colony Minerals</strong></h2>";
  }

  html += "</div>";

  return html;
};
