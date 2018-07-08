import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

    transform(value: any, locale?: any, format?: any): any {
        let [createdYear, createdMonth, createdDay, createdHour, createdMinute, createdSecond, createdMs] = value;
        value = new Date(Date.UTC(createdYear, createdMonth, createdDay, createdHour, createdMinute, createdSecond, createdMs));
        let result;

        switch (format) {
            case 'full':
                result = value.toLocaleString(locale, {
                    year   : 'numeric',
                    month  : 'long',
                    day    : 'numeric',
                    weekday: 'long',
                    hour   : '2-digit',
                    minute : "2-digit",
                    second : "2-digit"
                });
                break;
            case 'short':
                result = value.toLocaleString(locale, {year: 'numeric', month: 'long', day: '2-digit'});
                break;
            default:
                result = value.toLocaleString(locale);
                break;
        }
        return result;
    }
}
