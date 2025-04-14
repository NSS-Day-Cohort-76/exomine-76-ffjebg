const API = "http://localhost:8088";

export const applicationState = {
  minerals: [],
  facilityMinerals: [],
  facilities: [],
  colonies: [],
  governors: [],
  colonyMinerals: [],
  purchases: [],
  userChoices: {
    governorId: 0,
    facilityId: 0,
    mineralId: 0,
    colonyId: 0,
    quantity: 0, //possible this is coming from somewhere else so might need to delete this
  },
};

export const resetTransientState = () => {
  applicationState.userChoices = {
    governorId: 0,
    facilityId: 0,
    mineralId: 0,
    colonyId: 0,
    quantity: 0,
  };
};

export const fetchMinerals = async () => {
  const res = await fetch(`${API}/minerals`);
  const data = await res.json();
  applicationState.minerals = data;
};
export const getMinerals = () => {
  return applicationState.minerals.map((minerals) => ({ ...minerals }));
};

export const fetchFacilities = async () => {
  const res = await fetch(`${API}/facilities`);
  const data = await res.json();
  applicationState.facilities = data;
};

export const getFacilities = () => {
  return applicationState.facilities.map((facility) => ({ ...facility }));
};
// its below this line
export const fetchFacilityMinerals = async () => {
  const res = await fetch(`${API}/facilityMinerals`);
  const data = await res.json();
  applicationState.facilityMinerals = data;
};
export const getFacilityMinerals = () => {
  return applicationState.facilityMinerals.map((facilityMins) => ({
    ...facilityMins,
  }));
};
export const fetchGovernors = async () => {
  const res = await fetch(`${API}/governors`);
  const data = await res.json();
  applicationState.governors = data;
};
export const getGovernors = () => {
  return applicationState.governors.map((governor) => ({ ...governor }));
};

export const fetchColonies = async () => {
  const res = await fetch(`${API}/minerals`);
  const data = await res.json();
  applicationState.colonies = data;
};
export const getColonies = () => {
  return applicationState.colonies.map((colony) => ({ ...colony }));
};

export const fetchColonyMinerals = async () => {
  const res = await fetch(`${API}/colonyMinerals`); // in case colonyMineral gets changed to plural in DB be sure to check this line.
  const data = await res.json();
  applicationState.colonyMinerals = data; // make sure colonyMineral doesn't get changed to plural
};

export const getColonyMinerals = () => {
  return applicationState.colonyMinerals.map((colonyMinerals) => ({
    ...colonyMinerals,
  }));
};

export const fetchPurchases = async () => {
  const res = await fetch(`${API}/purchases`);
  const data = await res.json();
  applicationState.purchases = data;
};
export const getPurchases = () => {
  return applicationState.purchases.map((purchase) => ({ ...purchase }));
};
/* These are all currently implemented, but are there others we might need to add?

fetchFacilityMinerals
getFacilityMinerals
fetchGovernors
getGovernors
fetchColonies
getColonies
fetchColonyMinerals
getColonyMinerals
fetchPurchases
getPurhcases

*/
// SETTERS !!!!

export const setFacility = (facilityId) => {
  applicationState.userChoices.facilityId = facilityId;
  document.dispatchEvent(new CustomEvent("stateChanged"));
};

export const setGovernor = (id) => {
  applicationState.userChoices.governorId = id;
  //assign a colonyId based on the selected Governor
  const governor = applicationState.governors.find((gov) => gov.id === id);
  if (governor && governor.colonyId) {
    applicationState.userChoices.colonyId = governor.colonyId;
  } else {
    applicationState.userChoices.colonyId = 0;
  }
  document.dispatchEvent(new CustomEvent("stateChanged"));
};
export const setMineral = (id) => {
  applicationState.userChoices.mineralId = id;
  document.dispatchEvent(new CustomEvent("stateChanged"));
};
export const purchaseMineral = async () => {
  const state = applicationState.userChoices;

  // 1. Make sure all selections are made
  if (
    !state.governorId ||
    !state.facilityId ||
    !state.mineralId ||
    !state.colonyId
  ) {
    alert("Please finish your selections...");
    return;
  }

  // 2. Find the matching facilityMineral entry
  const facilityMineral = applicationState.facilityMinerals.find(
    (fm) =>
      fm.facilityId === state.facilityId && fm.mineralId === state.mineralId
  );

  if (!facilityMineral || facilityMineral.quantity <= 0) {
    alert("Facility is out of this mineral!");
    return;
  }

  // 3. Subtract 1 from facilityMinerals
  const updatedFM = {
    ...facilityMineral,
    quantity: facilityMineral.quantity - 1,
  };

  await fetch(`${API}/facilityMinerals/${facilityMineral.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedFM),
  });

  // 4. Update or add to colonyMinerals
  const colonyMineral = applicationState.colonyMinerals.find(
    (cm) => cm.colonyId === state.colonyId && cm.mineralId === state.mineralId
  );

  if (colonyMineral) {
    const updatedCM = {
      ...colonyMineral,
      quantity: colonyMineral.quantity + 1,
    };

    await fetch(`${API}/colonyMinerals/${colonyMineral.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCM),
    });
  } else {
    await fetch(`${API}/colonyMinerals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        colonyId: state.colonyId,
        mineralId: state.mineralId,
        quantity: 1,
      }),
    });
  }

  // 5. Log the purchase in /purchases
  await fetch(`${API}/purchases`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...state,
      timestamp: Date.now(),
    }),
  });

  // 6. Reset and re-render
  resetTransientState();
  document.dispatchEvent(new CustomEvent("stateChanged"));
};

/*
        Does the chosen governor's colony already own some of this mineral?
            - If yes, what should happen?
            - If no, what should happen?

        Defining the algorithm for this method is traditionally the hardest
        task for teams during this group project. It will determine when you
        should use the method of POST, and when you should use PUT.

        Only the foolhardy try to solve this problem with code.
    */
