import { differenceInCalendarDays } from "date-fns";
import {importantTask} from './newProject'

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

function diffMeterValue(ele, meter, finishStatus){
    switch (meter){
        case 'easy':
            ele.classList.value = 'easy'
            break;
        case 'medium':
            ele.classList.value = 'medium'
            break;
        case 'hard':
            ele.classList.value = 'hard'
            break;    
        default:
            break;
    }
    if(finishStatus){
        ele.classList.add('complete')
        ele.parentNode.classList.add('complete')
    }else{
        ele.classList.remove('complete')
        ele.parentNode.classList.remove('complete')
    }
}

function dateRange(ele, comparison){
    if(comparison < 0){
        ele.classList.value = 'past-day'
    }else if(comparison >= 0 && comparison <= 1){
        ele.classList.value = 'deadline'
    }else if(comparison >= 2 && comparison <= 7){
        ele.classList.value = 'one-week'
    }else { ele.classList.value = 'more-than-a-week' }
}

export {todayOrUpcoming, checkImportant, diffMeterValue, dateRange}