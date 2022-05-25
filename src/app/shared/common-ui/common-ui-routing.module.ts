import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonUiComponent } from './common-ui.component';
import { GridGroupingComponent } from './grid-grouping/grid-grouping.component';
import { GridMenuComponent } from './grid-menu/grid-menu.component';
import { GridIconComponent } from './grid-icon/grid-icon.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
    {
      path: '', component: CommonUiComponent,
        data: { breadcrumbs: ['Grid'] }   
    },
    {
      path: 'grid-grouping', component: GridGroupingComponent,
      data: { breadcrumbs: ['Grid', 'Grouping'] }   
    },
    {
      path: 'icon', component: GridIconComponent,
      data: { breadcrumbs: ['Grid','Icon'] }   
    },
    {
    path: 'menu', component: GridMenuComponent,
    data: { breadcrumbs: ['Grid','Menu'] }   
    },
    {
      path: 'layout', component: LayoutComponent,
      data: { breadcrumbs: ['layout'] }   
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonUiRoutingModule { }
