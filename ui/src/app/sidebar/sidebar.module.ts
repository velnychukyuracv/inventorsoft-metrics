import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups/groups.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GroupsComponent, MenuComponent],
  exports     : [GroupsComponent, MenuComponent]
})
export class SidebarModule { }
