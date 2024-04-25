import { addProjectContent } from "./first"

const projectDialog = document.querySelector('#project-dialog')

const form = document.querySelector('#project-form')
const projectName = document.querySelector('#project-name')
const projectDescription = document.querySelector('#project-description')
const projectContainer = document.querySelector('#projects-container')
const projectConfirm = document.querySelector('#project-confirm')

let array = []

class Project {
    constructor(projectName, projectDescription){
        this._projectName = projectName
        this._projectDescription = projectDescription
    }

    get name(){
        let capitalizedName = this._projectName.charAt(0).toUpperCase() + this._projectName.slice(1)
        return capitalizedName
    }
    get desc(){
        return this._projectDescription
    }
}

function submitProject(event){
    event.preventDefault()
    if(document.getElementById('testing-project')){
        projectContainer.removeChild(document.getElementById('testing-project'))
    }

    let name = projectName.value
    let desc = projectDescription.value

    let newObj = new Project(name, desc)
    projectName.value = ''
    projectDescription.value = ''
    
    projectContainer.appendChild(addProjectContent(newObj.name))
    projectDialog.close()
}


function projectModal(){
    projectDialog.showModal()
    form.addEventListener('submit', submitProject)
}

export { projectModal } 