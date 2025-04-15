
import { getColonyMinerals, getGovernors, getMinerals, getColonies, setGovernor } from "./TransientState.js"



export const ColonyMineralsList =  () => {
   const ColonyMinerals = getColonyMinerals()
   const Minerals = getMinerals()
   const Governors = getGovernors()
   const Colonies = getColonies()

   const selectedGovernor = setGovernor()
   let html = '<div>'

   if (selectedGovernor) {
      const selectedGovernor = Governors.find(gov => gov.id === selectedGovernor.id)
      const colony = Colonies.find(colony => colony.id === selectedGovernor.colonyId)
      html += `<h2>${colony.title} Minerals</h2>`

      const colonyMineralData = ColonyMinerals.filter(colonyMineral => colonyMineral.mineralId)

      for (const colonyMineral of colonyMineralData){
         const mineral = Minerals.find(mineral => mineral.id === colonyMineral.MineralId)
         html += `<p>${colonyMineral.quantity} tons of ${mineral.name}</p>`
      }
 
   } else {
      html += "<h2><strong>Colony Minerals</strong></h2>"
   }

   html += '</div>'

   return html

}