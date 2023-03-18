export function ParseEvents(calendar) {
    
    let eventsObject = {};
    for(let evt of calendar.events) {

        let date = evt[0];

        if(date.includes("-")) {
            addEventInterval(eventsObject, evt, calendar);
        }
        else {
            addEvent(eventsObject, evt, calendar);
        }
    }

    sortEvents(eventsObject);

    return eventsObject;
};

function addEvent(eventsObject, evt, calendar) {

    let [day, month, year] = evt[0].split(" ");

    if(!isValidDate(calendar, day, month, year)) {
        throw new Error("Invalid date for " + evt);
    }

    // Makes sure that the path to the event exists
    if(!(year in eventsObject)) {
        eventsObject[year] = {};
    }
    if(!(month in eventsObject[year])) {
        eventsObject[year][month] = {};
    }
    if(!(day in eventsObject[year][month])) {
        eventsObject[year][month][day] = [];
    }

    eventsObject[year][month][day].push(evt.slice(1));
}

function addEventInterval(eventsObject, evt, calendar) {

    let [startDate, endDate] = evt[0].split("-");
    let [targetDay, targetMonth, targetYear] = endDate.trim().split(" ");
    let [dateDay, dateMonth, dateYear] = startDate.trim().split(" "); 

    [targetDay, targetYear] = [parseInt(targetDay), parseInt(targetYear)];
    [dateDay, dateYear] = [parseInt(dateDay), parseInt(dateYear)];

    // Month name to month index, january ==> 1, february ==> 2
    targetMonth = calendar.monthNames.indexOf(targetMonth) + 1;
    dateMonth = calendar.monthNames.indexOf(dateMonth) + 1;

    let [startTime, endTime] = [null, null];
    if(evt.length === 3) {
        if(evt[1].includes("-")) {
            let split = evt[1].split("-");
            startTime = split[0].trim();
            endTime = split[1].trim();
        }
        else {
            startTime = evt[1].trim();
        }
    }

    // Create the first event with possibly a start time
    let initialEvent;
    if(startTime != null) {
        initialEvent = [toDateString(dateDay, dateMonth, dateYear, calendar), startTime, evt[2]];
    }
    else {
        initialEvent = [toDateString(dateDay, dateMonth, dateYear, calendar), evt[1]];
    }

    addEvent(eventsObject, initialEvent, calendar);

    //Increment the day until the target date has been reached
    // Only add the first year of an event to reduce output
    let counter = 0;
    while(true && counter < 365) {

        [dateDay, dateMonth, dateYear] = getNextDay(dateDay, dateMonth, dateYear, calendar);

        if(dateDay === targetDay && dateMonth === targetMonth && dateYear === targetYear) {
            break;
        }

        let thisEvent = [toDateString(dateDay, dateMonth, dateYear, calendar), evt[evt.length - 1]];
        addEvent(eventsObject, thisEvent, calendar);

        counter += 1;
    }

    // Add final day with possible end time
    let finalEvent;
    if(endTime != null) {
        finalEvent = [toDateString(dateDay, dateMonth, dateYear, calendar), `00:00 - ${endTime}`, evt[evt.length - 1]];
    }
    else {
        finalEvent = [toDateString(dateDay, dateMonth, dateYear, calendar), evt[evt.length - 1]];
    }

    addEvent(eventsObject, finalEvent, calendar);
}

/**
 * Converts the day, month, year indices to a string format  
 */
function toDateString(day, month, year, calendar) {
    return `${day} ${calendar.monthNames[month - 1]} ${year}`;
}

function isValidDate(calendar, day, month, year) {

    if(!calendar.monthNames.includes(month)) {
        return false;
    }

    if(day > calendar.weeksPerMonth * calendar.dayNames.length) {
        return false;
    }

    if(year < 0) {
        return false;
    }

    return true;
}

function sortEvents(eventsObject) {

    for(const value of Object.values(eventsObject)) {

        if (value !== null && value.constructor === Object) {
            sortEvents(value);
            continue;
        }

        value.sort((a, b) => {
            // No specified time gets preference over an event with time
            if(a.length != b.length) return a.length - b.length; 

            // Don't change order if both have no time
            if(a.length === 1) return 0;

            // Time is stored at index 0 of the event, then get the start time
            // and remove any whitespace, finally split to get the hour and minute
            let [aHour, aMinute] = a[0].split("-")[0].trim().split(":");
            let [bHour, bMinute] = b[0].split("-")[0].trim().split(":");
            
            if(aHour != bHour) return aHour < bHour ? -1 : 1;
            if(aMinute != bMinute) return aMinute < bMinute? -1 : 1;

            return 0;
        });
    }
}

export function getNextDay(day, month, year, calendar) {

    let daysPerMonth = calendar.weeksPerMonth * calendar.dayNames.length;

    day += 1;
    if(day == daysPerMonth + 1) {
        day = 1;
        [month, year] = getNextMonth(month, year, calendar);
    }

    return [day, month, year];
}

export function getNextMonth(month, year, calendar) {
    
    let monthsPerYear = calendar.monthNames.length;

    month += 1;
    if(month == monthsPerYear + 1) {
        month = 1;
        year += 1;
    }

    return [month, year];
}

export function getPreviousDay(day, month, year, calendar) {
    
    let daysPerMonth = calendar.weeksPerMonth * calendar.dayNames.length;

    day -= 1;
    if(day == 0) {
        day = daysPerMonth;
        [month, year] = getPreviousMonth(month, year, calendar);
    }

    return [day, month, year];
}

export function getPreviousMonth(month, year, calendar) {

    let monthsPerYear = calendar.monthNames.length;

    month -= 1;
    if(month == 0) {
        month = monthsPerYear;
        year -= 1;
    }

    return [month, year];
}
