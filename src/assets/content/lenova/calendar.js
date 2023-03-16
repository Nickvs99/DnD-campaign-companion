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
    ["26 December 2022 - 2 January 2023", "New year celebrations"],
    ["15 January 2023", "Drinks"],
    ["7 November 2022", "15:00 - 16:00", "Fireworks"],
    ["7 November 2022", "14:30", "First death"],
    ["7 November 2022", "14:00", "First fight"],
    ["7 November 2022", "Full moon"],
    ["7 November 2022", "1:00", "Secret"],
    ["6 November 2022 - 7 November 2022", "18:00 - 04:00", "Opening party"]
];

export const lenovaCalendar = {
    dayNames: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    weeksPerMonth: 4,
    
    currentYear: 2022,
    currentMonth: "November",
    events: events,
};