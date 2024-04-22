import { addProjectContent } from "./first"

const projectDialog = document.querySelector('#project-dialog')

const form = document.querySelector('#project-form')
const projectName = document.querySelector('#project-name')
const projectDescription = document.querySelector('#project-description')


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

function projectModal(){
    projectDialog.showModal()
    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        let name = projectName.value
        let desc = projectDescription.value
    
        const newObj = new Project(name, desc)
        projectName.value = ''
        projectDescription.value = ''
        
        const projectContainer = document.querySelector('#projects-container')
        projectContainer.appendChild(addProjectContent(newObj.name))
        
        projectDialog.close()
    })
}

export { projectModal } 