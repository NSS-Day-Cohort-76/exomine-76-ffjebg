import { render } from "./Exomine.js"

const mainContainer = document.querySelector("#container")
const renderAllHTML = async () => {
    mainContainer.innerHTML = await render()
}
document.addEventListener("newOrderCreated", event => {
    console.log("State of data has changed. Regenerating HTML...")
    renderAllHTML()
})

renderAllHTML()