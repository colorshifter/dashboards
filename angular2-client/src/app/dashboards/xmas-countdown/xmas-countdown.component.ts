import { DashboardComponent } from "../DashboardComponent";
import { Component, OnInit } from '@angular/core';
import { WidgetEvent } from '../WidgetEvent';

@Component({
    selector: 'app-xmas-countdown',
    templateUrl: 'xmas-countdown.component.html',
    styleUrls: ['xmas-countdown.component.scss', '../dashboards-common.scss']
})
export class XmasCountdownComponent implements DashboardComponent {

    private daysUntilChristmas: number;

    public update(event: WidgetEvent) {
        this.daysUntilChristmas = event.payload.daysUntilChristmas;
    }

}
