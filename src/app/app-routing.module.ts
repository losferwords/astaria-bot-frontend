import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageContentGuard } from './guards/page-content.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomePageModule)
  },
  {
    path: 'team-setup',
    loadChildren: () => import('./pages/team-setup/team-setup.module').then((m) => m.TeamSetupPageModule),
    canActivate: [PageContentGuard]
  },
  {
    path: 'battle',
    loadChildren: () => import('./pages/battle/battle.module').then((m) => m.BattlePageModule),
    canActivate: [PageContentGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
