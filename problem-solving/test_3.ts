function test_3(s: string): string {
    const hour = parseInt(s.substring(0, 2), 10);
    const amPm = s.charAt(8);

    let militaryHour = hour;
    if (amPm === 'A') {
        if (hour === 12) {
            militaryHour = 0;
        }
    } else {
        if (hour !== 12) {
            militaryHour += 12;
        }
    }

    const militaryHourStr = militaryHour.toString().padStart(2, '0');
    return `${militaryHourStr}${s.substring(2, 8)}`;
}

const time12Hour = '07:45:54PM';
console.log(test_3(time12Hour));