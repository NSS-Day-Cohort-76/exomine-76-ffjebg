
import { getColonyMinerals, getGovernors, getMinerals, getColonies } from "./TransientState.js"



export const ColonyMineralsList = () => {
   const ColonyMinerals = getColonyMinerals()
   const Minerals = getMinerals()
   const Governors = getGovernors()
   const Colonies = getColonies()


   const selectedGovernorId = applicationState.userChoices.governorId
   const selectedGovernor = governors.find(gov => gov.id === selectedGovernorId)
 
   let html = '<div>'

   if (selectedGovernor) {
      const governorColonyId = selectedGovernor.colonyId


      const colony = Colonies.find(colony => colony.id === governorColonyId)
      html += `<h2>${colony.title} Minerals</h2>`

      const colonyMineralData = ColonyMinerals.filter(colonyMineral => ColonyMinerals.mineralId)

      for (const colonyMineral of colonyMineralData){
         const mineral = Minerals.find(mineral => mineral.id === colonyMineral.MineralId)
         html += `<p>${colonyMineral.quantity} tons of ${mineral.name}</p>`
      }

   } else {
      html += "<h2>Colony Minerals</h2>"
   }

   html += '</div>'

   return html

}