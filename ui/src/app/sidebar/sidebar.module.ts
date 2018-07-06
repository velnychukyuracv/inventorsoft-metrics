import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGroupComponent } from './create-group/create-group.component';
import { MenuComponent } from './menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../common/shared/shared.module';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from '../app.routes';

@NgModule({
    imports     : [
        CommonModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forRoot(
            APP_ROUTES
        )
    ],
    declarations: [CreateGroupComponent, EditGroupComponent, MenuComponent],
    exports     : [CreateGroupComponent, EditGroupComponent, MenuComponent],
    entryComponents: [CreateGroupComponent, EditGroupComponent]
})
export class SidebarModule {
}
