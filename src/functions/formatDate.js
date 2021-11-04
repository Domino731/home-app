/** array with day names */
const daysInWeek = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];

/**
 * that function is formatting passed date
 * @param {*} date - date object
 */
export const formatDate = (date) => {

    // data objects   
    const today = new Date();
    const target = date.toDate();

    // calculate difference between today and target date
    const dayDifference = today.getDate() - target.getDate();

    // formated time
    const time = target.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // today
    if (dayDifference === 0) {
        return `Dzisiaj, ${time}`;
    }
    // yesterday
    else if (dayDifference > 0 && dayDifference === 1 && today.getMonth() === target.getMonth()) {
        return `Wczoraj, ${time}`;
    }
    // up to 7 days
    else if (dayDifference > 0 && dayDifference <= 6 && today.getMonth() === target.getMonth()) {
        return `${daysInWeek[target.getDay() - 1]}, ${time}`;
    }
    // else return full date
    else {
        return `${target.toLocaleDateString("pl-PL")}, ${time}`;
    }
}