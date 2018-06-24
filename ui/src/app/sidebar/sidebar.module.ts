import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './menu/groups/groups.component';
import { MenuComponent } from './menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports     : [
        CommonModule,
        FormsModule,
        NgbModule,
        AngularFontAwesomeModule
    ],
    declarations: [GroupsComponent, MenuComponent],
    exports     : [GroupsComponent, MenuComponent]
})
export class SidebarModule {
}
