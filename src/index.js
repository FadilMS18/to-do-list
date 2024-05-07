import './css/style.css'
import './css/dialog.css'
import './css/main.css'
import { makeNavbar} from './js/navbarHandler'
import {projectModal } from './js/newProject'
import { Sidebar, topSideBarEvent } from './js/sidebarHandler'

const body = document.body

const Start = (function(){
    body.insertBefore(makeNavbar(), body.firstChild)
    body.insertBefore(Sidebar.sidebarDom, document.querySelector('#main-container'))

    topSideBarEvent(Sidebar)
})()

// Sidebar left & right

Sidebar.opener.addEventListener('click', ()=>{
    if(!Sidebar.opener.classList.contains('sidebar-close')){
        const sidebar = document.querySelector('#sidebar')
        sidebar.classList.add('sidebar-container-close')
        Sidebar.opener.classList.add('sidebar-close')
        document.getElementById('main-container').classList.add('go-left')
    }else{
        const sidebar = document.querySelector('#sidebar')
        sidebar.classList.remove('sidebar-container-close')
        Sidebar.opener.classList.remove('sidebar-close')
        document.getElementById('main-container').classList.remove('go-left')
    }
})

// Add New project modal
const addNewProject = Sidebar.sidebarProjectButton
addNewProject.addEventListener('click', projectModal)
