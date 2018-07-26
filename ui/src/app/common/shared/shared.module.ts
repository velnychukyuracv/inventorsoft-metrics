import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PaginationableModule } from './pagination/paginationable.module';
import { SortableModule } from './sortable-table/sortable.module';

@NgModule({
    declarations: [],
    imports     : [
        ReactiveFormsModule,
        FormsModule,
        PaginationableModule,
        SortableModule
    ],
    exports     : [
        ReactiveFormsModule,
        FormsModule,
        PaginationableModule,
        SortableModule
    ]
})
export class SharedModule {
}