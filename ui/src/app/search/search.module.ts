import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SharedModule } from '../common/shared/shared.module';
import { SearchDirective} from './search.directive';

@NgModule({
    imports     : [
        CommonModule,
        SharedModule
    ],
    declarations: [SearchBarComponent, SearchDirective],
    exports     : [SearchBarComponent, SearchDirective]
})
export class SearchModule {
}
