title Exomine User

participant User
participant DOM
participant Button.js
participant TransientState.js
participant API
participant main.js

entryspacing 1.2

User->DOM: User selects governor
DOM->TransientState.js:setGovernor() stores transient state

User->DOM: User selects facility
DOM->TransientState.js:setFacility() stores transient state

User->DOM: User selects mineral
DOM->TransientState.js:setMineral() stores transient state



User->DOM: Clicks "Purchase" button
DOM->Button.js: Trigger purchase logic

Button.js->TransientState.js: Get selected getGovernor(), getFacility(), and getMineral()
Button.js->API: check mineral availability hasMineral()
API-->Button.js: Respond with availability

alt Mineral is available
    Button.js->API: POST - Add mineral to buyer (colony) inventory - boughtMineral()
    Button.js->API: PUT - Reduce mineral from seller (facility) inventory - soldMineral()
    Button.js->main.js: Trigger DOM re-render - document.addEventListener("newOrder", render)
    main.js->DOM: Clear selections and re-render
else Mineral not available
    Button.js->DOM: Show "Out of stock" message
end