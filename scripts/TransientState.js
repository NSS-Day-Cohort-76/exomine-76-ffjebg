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
    quantity: 1, //possible this is coming from somewhere else so might need to delete this
  },
};

export const getTransientState = () => {
  return { ...applicationState.userChoices };
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
  const res = await fetch(`${API}/colonies`);
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
  document.dispatchEvent(new CustomEvent("facilitySelect"));
};

export const setGovernor = (id) => {
  applicationState.userChoices.governorId = id;
  //assign a colonyId based on the selected Governor
  const governor = applicationState.governors.find((gov) => gov.id === id);
  console.log("selected Gov:", governor);

  if (governor && governor.colonyId) {
    applicationState.userChoices.colonyId = governor.colonyId;
    console.log("colony id set to:", governor.colonyId);
  } else {
    applicationState.userChoices.colonyId = 0;
    console.warn(" No valid colony ID found for this Governor");
  }
  document.dispatchEvent(new CustomEvent("governorSelect"));
};
export const setMineral = (id) => {
  applicationState.userChoices.mineralId = id;
  document.dispatchEvent(new CustomEvent("mineralSelect"));
};

export const purchaseMineral = async () => {
  const state = applicationState.userChoices;

  if (
    !state.governorId ||
    !state.facilityId ||
    !state.mineralId ||
    !state.colonyId
  ) {
    alert("Please finish your selections...");
    return;
  }

  // Step 1: Subtract from facilityMinerals
  console.log("state at purchase:", state);
  console.log("facilityminerals from state", applicationState.facilityMinerals);
  const facilityMineral = applicationState.facilityMinerals.find(
    (fm) =>
      fm.miningFacilityId === state.facilityId &&
      fm.mineralId === state.mineralId
  );

  if (!facilityMineral || facilityMineral.amount <= 0) {
    alert("Facility is out of this mineral!");
    return;
  }

  const updatedFM = {
    ...facilityMineral,
    amount: facilityMineral.amount - 1,
  };

  await fetch(`${API}/facilityMinerals/${facilityMineral.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedFM),
  });

  await fetchFacilityMinerals();

  // ✅ Step 2: Add or update in colonyMinerals
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

  // Step 3: Log the purchase
  await fetch(`${API}/purchases`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...state,
      timestamp: Date.now(),
    }),
  });

  resetTransientState();
  await fetchFacilityMinerals();
  await fetchColonyMinerals(); // ← Add this
  document.dispatchEvent(new CustomEvent("facilitySelect"));
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
