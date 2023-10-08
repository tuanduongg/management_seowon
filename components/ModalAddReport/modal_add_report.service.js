export function getCurrentWeek() {
    // Get today's date
    const today = new Date();

    // Get the first day of the year
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

    // Calculate the number of milliseconds in a week
    const oneWeekMilliseconds = 7 * 24 * 60 * 60 * 1000;

    // Calculate the difference in milliseconds between today and the first day of the year
    const diffMilliseconds = today - firstDayOfYear;

    // Calculate the current week number by dividing the difference in milliseconds by the number of milliseconds in a week
    const weekNumber = Math.ceil(diffMilliseconds / oneWeekMilliseconds);

    return weekNumber;
}

export const checkShift = () => {
    const date = new Date();
    const currentHour = date.getHours();
    const currentMinus = date.getMinutes();
}


// export const getCurrentTIME = () => {
//     const hour = new Date().getHours();
//     switch (hour) {
//         case 8:
//         case 9:
//         case 10:
//             return 'A';
//         case 11:
//         case 12:
//             return 'A';

//         default:
//             break;
//     }
// }

export const getPercentNG = (sum, totalNG) => {
    if (sum && totalNG) {
        const res = (totalNG / sum) * 100;
        return res.toFixed(2);
    }
    return 0;
}

export function isPositiveInteger(number) {
    // Check if the number is a positive integer
    return Number.isInteger(number) && number >= 0;
}