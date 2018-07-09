import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    /**
     * pipe name
     */
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

    transform(value: any, locale?: string, format?: string): any {
        let [year, month, day, hour, minute, second, ms] = value;
        value = new Date(Date.UTC(year, month, day, hour, minute, second, ms));
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
