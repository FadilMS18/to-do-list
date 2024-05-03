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

function pushTask(dueTo, meter, task){
    let difference = differenceInCalendarDays(dueTo, new Date())

    if(difference === 0){
        todayTask.push(task)
    }else if(difference >= 1){
        upcomingTask.push(task)
    }

    pushImportant(meter, task)
}

function pushImportant(difMeter, task){
    if(difMeter === 'hard'){
        importantTask.push(task)
    }
}

export {pushTask, todayOrUpcoming}