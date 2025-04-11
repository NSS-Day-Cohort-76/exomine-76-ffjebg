title Exomine

participant main.js
participant Exomine.js
participant Governor.js
participant MiningFacility.js
participant API
participant Mineral.js
participant Colony.js
participant User

participant DOM

participant TransientState.js

entryspacing 1.0
main.js->Exomine.js: invoke render() to fetch HTML


Exomine.js->Governor.js: getGovernor() fetch governor HTML
Governor.js->API: Fetch governor data
API-->Governor.js: Return governor data
loop 
note over MiningFacility.js: Iterate through Governor's array to gather list of Governors 
end 
Governor.js-->Exomine.js: Return governor HTML



Exomine.js->MiningFacility.js: getMiningFacility() fetch MiningFacility HTML
MiningFacility.js->API: Fetch MiningFacility data
API-->MiningFacility.js: Return MiningFacility data
loop
note over MiningFacility.js: Iterate through MiningFacilites array to generate list of facilities
end
MiningFacility.js-->Exomine.js: Return MiningFacility HTML



Exomine.js->Mineral.js: getMineral() fetch mineral HTML
Mineral.js->API: Fetch mineral data
API-->Mineral.js: Return mineral data
loop 
note over MiningFacility.js: Iterate through minerals array to gather list of minerals
end
Mineral.js-->Exomine.js: Return mineral HTML



Exomine.js->Colony.js: getColony() fetch Colony HTML
Colony.js->API: Fetch colony data
API-->Colony.js: Return colony data
loop
note over MiningFacility.js: Iterate through colony array to gather list of colonies
end
Colony.js-->Exomine.js: Return Colony HTML



Exomine.js-->main.js: Return generated HTML
