import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CustomDatePipe } from './custom-date.pipe';

@NgModule({
    declarations: [CustomDatePipe],
    imports     : [
        ReactiveFormsModule,
        FormsModule
    ],
    exports     : [
        ReactiveFormsModule,
        FormsModule,
        CustomDatePipe
    ]
})
export class SharedModule {
}