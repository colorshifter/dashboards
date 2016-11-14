import { Routes, RouterModule } from '@angular/router';
import { ContributorsDashboardComponent } from './dashboards/github-contributors/contributors-dashboard/contributors-dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardCarouselComponent } from './dashboard-carousel/dashboard-carousel.component';

const appRoutes: Routes = [
  {path: 'dashboards', component: DashboardCarouselComponent},
  {path: 'dashboards/github-contributors', component: ContributorsDashboardComponent},
  {path: '**', component: PageNotFoundComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
