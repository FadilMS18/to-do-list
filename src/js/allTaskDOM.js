import { parseISO, format, isAfter, isBefore } from "date-fns"
export let test = 'test'
// isAfter(isThisAfter, this)


const timeButton = Array.from(document.querySelectorAll('.due-to-button'))
timeButton.forEach(button =>{
    button.addEventListener('click', (e)=>{
        if(e.target.classList.contains('fokus')){
            return
        }
        timeButton.forEach(but =>{
            if(but.classList.contains('fokus')){but.classList.remove('fokus')}
        })
        e.target.classList.add('fokus')
    })
})

let today = new Date()
let now = format(today, 'yyyy-MM-dd')

const dateTest = document.getElementById('date-test')
const date = document.querySelector('#button-container > input')
const img = document.querySelector('#button-container > img')
date.addEventListener('change', ()=>{
    console.log(`${date.value} = ${now}`)
    console.log(isBefore(date.value, now))
})
