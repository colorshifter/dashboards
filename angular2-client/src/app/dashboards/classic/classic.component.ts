import { Component } from '@angular/core';
import { WidgetEvent } from './../WidgetEvent';
import { DashboardComponent } from './../DashboardComponent';

@Component({
  selector: 'app-classic',
  templateUrl: 'classic.component.html',
  styleUrls: ['classic.component.scss', '../dashboards-common.scss']
})
export class ClassicComponent implements DashboardComponent {

  private data;

  public update(event: WidgetEvent) {
    this.data = event.payload;
  }

}
