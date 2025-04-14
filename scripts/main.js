import { render } from "./Exomine.js"

const renderAllHTML = async () => {
    await render()
}
document.addEventListener("newOrderCreated", event => {
    console.log("State of data has changed. Regenerating HTML...")
    renderAllHTML()
})

renderAllHTML()