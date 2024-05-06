import { differenceInCalendarDays } from "date-fns";
import {todayTask, upcomingTask, importantTask} from './newProject'


function daysDifference(date){
    let diff = differenceInCalendarDays(date, new Date())
    return diff
}

function todayOrUpcoming(date){
    if(daysDifference(date, new Date()) === 0) {
        return 'today'
    }else if(daysDifference(date, new Date()) >= 1){
        return 'upcoming'
    }
}


console.log(daysDifference(new Date()) === 0)


function important(difMeter){
    if(difMeter === 'hard'){
        return true
    }else return false
}

function checkImportant(difMeter, task){
    if(important(difMeter)){
        importantTask.push(task)
    }
}

export {todayOrUpcoming, checkImportant}