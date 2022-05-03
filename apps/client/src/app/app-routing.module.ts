import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/checklist' },
  { path: 'checklist', loadChildren: () => import('./pages/checklist/checklist.module').then(m => m.ChecklistModule) },
  { path: 'roster', loadChildren: () => import('./pages/roster/roster.module').then(m => m.RosterModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
