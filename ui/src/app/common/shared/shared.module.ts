import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [],
    imports     : [
        ReactiveFormsModule,
        FormsModule
    ],
    exports     : [
        ReactiveFormsModule,
        FormsModule
    ]
})
export class SharedModule {
}