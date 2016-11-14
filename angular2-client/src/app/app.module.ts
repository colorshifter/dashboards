import { BiggestSlackerComponent } from "./dashboards/slack/biggest-slacker/biggest-slacker.component";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContributorsDashboardComponent } from './dashboards/github-contributors/contributors-dashboard/contributors-dashboard.component';
import { TeamContributorComponent } from './dashboards/github-contributors/team-contributor/team-contributor.component';
import { ReportsClient } from './dashboards/github-contributors/reports/reports-client.service';
import { WeekCalculator } from './dashboards/github-contributors/week-calculator.service';
import { SystemClock } from './dashboards/github-contributors/system-clock';
import { routing } from './app.routes';
import { HttpModule } from '@angular/http';
import { reportsServiceProvider } from './dashboards/github-contributors/reports/reports.service.provider';
import { TeamContributorsComponent } from './dashboards/github-contributors/team-contributors/team-contributors.component';
import { ProjectContributorComponent } from './dashboards/github-contributors/project-contributor/project-contributor.component';
import { ProjectContributorsComponent } from './dashboards/github-contributors/project-contributors/project-contributors.component';
import { ConfigService } from './config.service';
import { TimezoneDetectorService } from './dashboards/github-contributors/timezone-detector.service';
import { DashboardCarouselComponent } from './dashboard-carousel/dashboard-carousel.component';
import { CarouselHeaderComponent } from './dashboard-carousel/carousel-header.component';
import { SocketService } from './dashboard-carousel/socket.service';
import { ExternalUrlComponent } from './dashboards/external-url/external-url.component';
import { SafePipe } from './dashboards/external-url/safe.pipe';
import { DynamicComponent } from './dashboard-carousel/dynamic.component';
import { GalleryComponent } from './dashboards/slack/gallery/gallery.component'
import { ThanksComponent } from './dashboards/slack/thanks/thanks.component'
import { XmasCountdownComponent } from './dashboards/xmas-countdown/xmas-countdown.component'
import { ClassicComponent } from './dashboards/classic/classic.component'

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ContributorsDashboardComponent,
    TeamContributorsComponent,
    ProjectContributorsComponent,
    TeamContributorComponent,
    ProjectContributorComponent,
    DashboardCarouselComponent,
    CarouselHeaderComponent,
    ExternalUrlComponent,
    SafePipe,
    DynamicComponent,
    BiggestSlackerComponent,
    GalleryComponent,
    ThanksComponent,
    XmasCountdownComponent,
    ClassicComponent
  ],
  providers: [
    SystemClock,
    WeekCalculator,
    ConfigService,
    reportsServiceProvider,
    ReportsClient,
    TimezoneDetectorService,
    SocketService
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
