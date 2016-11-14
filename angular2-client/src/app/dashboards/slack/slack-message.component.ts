import { SlackUser } from './SlackUser';
import { Component, Input } from '@angular/core';
import { WidgetEvent } from './../WidgetEvent';
import { DashboardComponent } from './../DashboardComponent';

@Component({
  selector: 'app-slack-slack-message',
  templateUrl: 'slack-message.component.html',
  styleUrls: ['slack-message.component.scss', '../dashboards-common.scss']
})
export class SlackMessageComponent implements DashboardComponent {

  private username: string;
  private message: string;
  private image: string;

  public update(event: WidgetEvent) {
    this.username = event.payload.username;
    this.message = event.payload.message;
    this.image = event.payload.image;
    console.log(this.image);
  }

}
