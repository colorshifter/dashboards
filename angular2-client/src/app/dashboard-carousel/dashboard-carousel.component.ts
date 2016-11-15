import { ExternalUrlComponent } from '../dashboards/external-url/external-url.component';
import { WidgetEvent } from '../dashboards/WidgetEvent';
import { DynamicComponent } from './dynamic.component';
import { SocketService } from './socket.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConnectableObservable, Subscription, Subscriber } from 'rxjs';
import { ConfigService } from '../config.service';
import { GalleryComponent } from '../dashboards/slack/gallery/gallery.component'
import { XmasCountdownComponent } from '../dashboards/xmas-countdown/xmas-countdown.component'
import { ClassicComponent } from '../dashboards/classic/classic.component'
import { SlackMessageComponent } from '../dashboards/slack/slack-message.component'

const COMPONENTS = {
  externalUrl: ExternalUrlComponent,
  image: GalleryComponent,
  christmas: XmasCountdownComponent,
  classic: ClassicComponent,
  message: SlackMessageComponent
};

@Component({
  selector: 'app-dashboard-carousel',
  templateUrl: 'dashboard-carousel.component.html',
  styleUrls: ['dashboard-carousel.component.scss'],
  entryComponents: Object['values'](COMPONENTS)
})
export class DashboardCarouselComponent implements OnInit, OnDestroy {

  private configService: ConfigService;
  private socketService: SocketService;
  private configSubscription: Subscription;
  private connection: Subscription;
  private type: any;
  private event: WidgetEvent;

  @ViewChild(DynamicComponent) dynamicComponent: DynamicComponent;

  constructor(configService: ConfigService, socketService: SocketService) {
    this.configService = configService;
    this.socketService = socketService;
  }

  ngOnInit(): void {
    this.configSubscription = this.configService.getServerUrl()
      .map((serverUrl: string) => {
        return this.socketService.create(serverUrl);
      }).subscribe((observable: ConnectableObservable<any>) => {
        this.connection = observable.subscribe(this.onWidgetEvent);
        observable.connect();
      });
  }

  private onWidgetEvent = (event: WidgetEvent) => {
    if (event.widgetKey === undefined) {
      console.log("This widget doesn't provide a 'widgetKey'");
      return;
    }
    if (event.widgetKey === 'refresh') {
      window.location.reload();
      return;
    }
    const type = COMPONENTS[event.template];
    if (type != undefined) {
      this.type = type;
      this.event = event;
    } else {
      console.log(`The widget ${event.widgetKey} doesn't provide a 'template'`); 
      return;
    }
  };

  ngOnDestroy(): void {
    if (!this.configSubscription.closed) {
      this.configSubscription.unsubscribe();
    }
    if (!this.connection.closed) {
      this.connection.unsubscribe();
    }
  }

}
