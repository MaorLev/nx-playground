import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MembersComponent } from './members.component';


const routes: Routes = [
  { path: '', component: MembersComponent }
];

@NgModule({
  declarations: [
    MembersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MembersModule { }
