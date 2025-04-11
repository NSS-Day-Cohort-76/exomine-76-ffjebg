title Exomine User

participant User
participant DOM
participant Button.js
participant TransientState.js
participant API
participant main.js

User->DOM: Clicks "Purchase" button
DOM->Button.js: Trigger purchase logic

Button.js->TransientState.js: Get selected governor, facility, and mineral
Button.js->API: hasMineral(mineralId)
API-->Button.js: Respond with availability

alt Mineral is available
    Button.js->TransientState.js: POST - Add mineral to buyer (colony) inventory
    Button.js->TransientState.js: PUT - Reduce mineral from seller (facility) inventory
    Button.js->main.js: Trigger DOM re-render
    main.js->DOM: Clear selections and re-render
else Mineral not available
    Button.js->DOM: Show "Out of stock" message
end