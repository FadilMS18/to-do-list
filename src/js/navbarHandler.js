import { format } from 'date-fns'
import { makeAnElement, appendMe } from './otherModule'

// Make Navbar Dom
function makeNavbar(){
    const nav = makeAnElement('nav', 'nav')

    const h1 = makeAnElement('h1')
    h1.innerHTML = 'To-Do-List'

    const div = makeAnElement('div', 'nav-right-section')

    const p = makeAnElement('p')
    const br = makeAnElement('br')
    const span = makeAnElement('span')
    p.textContent = 'Today is'
    span.innerHTML = format(new Date(), 'EEE dd MMMM yyyy')
    appendMe(p, br, span)
    appendMe(div, p)
    appendMe(nav, h1, div)

    return nav
}

export let x = 'this is from first.js'
export {makeNavbar}

