import {
  getGovernors,
  setGovernor,
  applicationState,
} from "./TransientState.js";

const handleGovernorChange = (changeEvent) => {
  if (changeEvent.target.id === "governorSelect") {
    const governorId = parseInt(changeEvent.target.value);
    setGovernor(governorId);
  }
};

export const GovernorsList = async () => {
  const response = await fetch("http://localhost:8088/governors");
  const Governors = await response.json();

  const selectedId = applicationState.userChoices.governorId;

  // ✅ Only return <option> tags — Exomine wraps it in <select>
  document.addEventListener("change", handleGovernorChange);
  return Governors.map(
    (gov) => `
    <option value="${gov.id}" ${gov.id === selectedId ? "selected" : ""}>
      ${gov.name}
    </option>
  `
  ).join("");
};
