const columns = document.querySelectorAll(".column_cards")

let draggedCard;

let drag = {
    Start: (event)=>{
        draggedCard = event.target;
        event.dataTransfer.effectAllowed = "move";
    },
    Over: (event)=>{
        event.preventDefault();
    },
    Enter: ({target})=>{
        if(target.classList.contains("column_cards")){
            target.classList.add("column_highlight")
        }
        
    },
    Leave : ({target})=>{    
        target.classList.remove("column_highlight")
    },
    Drop : ({target})=>{
        if(target.classList.contains("column_cards")){
            target.classList.remove("column_highlight")
            target.append(draggedCard)
        }
        else{
            target.parentElement.append(draggedCard)
        }

    }
}


const createCard = ({target}) =>{
    if(!target.classList.contains("column_cards") || target.classList.contains("no") ) return
    
    const card = document.createElement("section")
    card.className = "card"
    card.draggable = true
    card.contentEditable = true

    card.addEventListener("dragstart",drag.Start);
    target.append(card)
    card.focus()


    card.addEventListener("keypress", (event)=>{
        if(event.key === "Enter"){
            card.contentEditable = false

        if(!card.textContent) card.remove()
        }
    })
    card.addEventListener("focusout", ()=>{
        card.contentEditable = false

        if(!card.textContent) card.remove()
    })
}


columns.forEach((column)=>{
    column.addEventListener("dragover", drag.Over);
    column.addEventListener("dragenter", drag.Enter);
    column.addEventListener("dragleave",drag.Leave)
    column.addEventListener("drop",drag.Drop)
    column.addEventListener("dblclick", createCard)

})