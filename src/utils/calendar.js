function getCurrentYearAndMonth() {
    const current = new Date();
    return {
        year: current.getFullYear(),
        month: current.getMonth() + 1
    }
}

function generateMonthWeeks(year, month) {
    month--;

    const weeks = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
        const week = [];
        while (date.getDay() !== 0) {
            date.setDate(date.getDate() - 1);
        }
        do {
            if (date.getDay() !== week.length) {
                week.push(null);
            } else {
                const item = new Date(date);
                item.inMonth = date.getMonth() === month;
                week.push(item);
                date.setDate(date.getDate() + 1);
            }
        } while (week.length !== 7);
        weeks.push(week);
    }
    month++;

    return weeks;
}

export {
    getCurrentYearAndMonth,
    generateMonthWeeks
};
