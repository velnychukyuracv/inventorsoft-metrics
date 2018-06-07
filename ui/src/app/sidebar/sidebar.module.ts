import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups/groups.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GroupsComponent],
  exports     : [GroupsComponent]
})
export class SidebarModule { }
