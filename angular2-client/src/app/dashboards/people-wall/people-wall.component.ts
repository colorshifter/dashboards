import { Component } from '@angular/core';
import { WidgetEvent } from './../WidgetEvent';
import { DashboardComponent } from './../DashboardComponent';

@Component({
  selector: 'app-people-wall',
  templateUrl: 'people-wall.component.html',
  styleUrls: ['people-wall.component.scss', '../dashboards-common.scss']
})
export class PeopleWallComponent implements DashboardComponent {

  private data;

  public update(event: WidgetEvent) {
    this.data = event.payload[0];
  }

}
