import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/checklist' },
  { path: 'checklist', loadChildren: () => import('./pages/checklist/checklist.module').then(m => m.ChecklistModule) },
  { path: 'roster', loadChildren: () => import('./pages/roster/roster.module').then(m => m.RosterModule) },
  { path: 'tasks-manager', loadChildren: () => import('./pages/tasks/tasks.module').then(m => m.TasksModule) },
  { path: 'gold-planner', loadChildren: () => import('./pages/gold-planner/gold-planner.module').then(m => m.GoldPlannerModule) },
  { path: 'friends', loadChildren: () => import('./pages/friends/friends.module').then(m => m.FriendsModule) },
  { path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
