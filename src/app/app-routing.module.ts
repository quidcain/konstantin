import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TestComponent } from './main/test/test.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'sample', pathMatch: 'full' },
    { path: 'test', component: TestComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: []
})
export class AppRoutingModule { }
