import { purchaseMineral } from "./TransientState.js"

const handleOrderSubmission = (clickEvent) => {
    if(clickEvent.target.id === "purchaseButton"){
        purchaseMineral()
        console.log("Button Clicked!")
    }
}

export const Sales = async () => {
    document.addEventListener("click", handleOrderSubmission)
    const sales = await fetch("http://localhost:8088/purchases?_expand=mineral&&_expand=facilityMineral&&_expand=governor&&_expand=colony&&_expand=facility&&_expand=colonyMineral").then(res => res.json())
    let salesDivs = sales.map((sale) => {
        
        
        return `<div>${sale.facilityMineral.quantity} tons of ${sale.mineral.name}</div>`
    })

    salesDivs = salesDivs.join("")

    return salesDivs
}