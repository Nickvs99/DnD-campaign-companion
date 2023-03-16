/**
 * If three items then format is date, time, description
 * If two items then format is date, description
 */
const events = [
    ["1 November 2022", "Bday"],
    ["1 November 2022", "14:00", "Cake"],
    ["2 November 2022", "17:00 - 23:00", "Party"],
    ["7 November 2022 - 12 November 2022", "Lenova games Troglo"],
    ["7 November 2022 - 9 November 2022", "14:00", "Start 1st round"],
    ["22 November 2022 - 23 November 2022", "20:00 - 02:00", "Closing ceremony"],
];

export const lenovaCalendar = {
    dayNames: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    weeksPerMonth: 4,
    
    currentYear: 2022,
    currentMonth: "November",
    events: events,
};