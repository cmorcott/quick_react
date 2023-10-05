function hasConflict(course1, course2) {
    const course1days = course1.meets.split(' ')[0];
    const course2days = course2.meets.split(' ')[0];
    let dayConflict = false;
    let timeConflict = false;

    for(const day1 of course1days){
        if(course2days.includes(day1)){
            dayConflict = true;
        }
    }

    if(dayConflict){
        const [c1start, c1end] = course1.meets.split(' ')[1].split('-').map(time => {
            const [hours, mins] = time.split(':');
            return parseInt(mins, 10) + 60 * parseInt(hours, 10);
        });
        const [c2start, c2end] = course2.meets.split(' ')[1].split('-').map(time => {
            const [hours, mins] = time.split(':');
            return parseInt(mins, 10) + 60 * parseInt(hours, 10);
        });

        timeConflict = (c1start <= c2start && c2start <= c1end) || (c2start <= c1start &&  c1start <= c2end);
        return (course1.term == course2.term && dayConflict && timeConflict)
    }
    return false;
}

export function allTimeConflicts(course, potentialCourses) {
    let isConflict = false;
    for(const conflictCourse of potentialCourses){
        if(course != conflictCourse && hasConflict(course, conflictCourse)){
            isConflict = true;
        }
    }
    return isConflict;
}