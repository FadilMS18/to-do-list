let b = 'this is from local storage'

class Project {
    constructor(projectName, projectDescription, icon){
        this._projectName = projectName
        this._projectDescription = projectDescription
        this._icon = icon
        this._tasks = []
    }

    get name(){
        let capitalizedName = this._projectName.charAt(0).toUpperCase() + this._projectName.slice(1)
        return capitalizedName
    }
    get desc(){
        return this._projectDescription
    }
    get tasks(){
        return this._tasks
    }
    get icon(){
        return this._icon
    }
}

class Chest{
    static projectPrototype = new Project(null, null, null)

    static get todoProjects(){
        return ToDo.projects
    }
    
    static getItem(name){
        let item = JSON.parse(localStorage.getItem(name))
        return item        
    }

    static setItemsToStorage(storageName ,project){
        localStorage.setItem(storageName, JSON.stringify(project))
    }

    static getFromStorage(storageName){
        let object = Chest.getItem(storageName)
        if(object.length){
            object.forEach(obj=>{
                Object.setPrototypeOf(obj, Chest.projectPrototype)
            })
        }
        return object
    }

}

export{ b, Chest}