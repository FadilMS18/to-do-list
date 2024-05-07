function makeAnElement(eleName, id = '' , group = ''){
    const element = document.createElement(eleName)
    element.setAttribute('id', id)
    element.setAttribute('class', group)

    return element
}

function appendMe(parent, ...children){ // Append 2 or more child
    children.forEach(child =>{
        parent.appendChild(child)
    })
}

function pushArray(parent, ...array){
    array.forEach(arr =>{ parent.push(arr)})
}

export{ makeAnElement, appendMe, pushArray}