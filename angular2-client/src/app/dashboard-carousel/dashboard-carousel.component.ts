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
  ciWall: ExternalUrlComponent,
  gallery: GalleryComponent,
  xmasCountdown: XmasCountdownComponent,
  classic: ClassicComponent,
  slackMessage: SlackMessageComponent
};

const distinct = (elem, index, arr) => arr.indexOf(elem) === index;

function polyfillObject() {
  if (!Object['values']) {
    Object['values'] = (obj) => Object.keys(obj).map((key) => obj[key]);
  }
}
polyfillObject();

@Component({
  selector: 'app-dashboard-carousel',
  templateUrl: 'dashboard-carousel.component.html',
  styleUrls: ['dashboard-carousel.component.scss'],
  entryComponents: Object['values'](COMPONENTS).filter(distinct)
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
      return;
    }
    if (event.widgetKey === 'refresh') {
      window.location.reload();
      return;
    }
    if (event.template === 'classic') {
      this.type = ClassicComponent;
      this.event = event;
      return;
    }
    if (event.template === 'message') {
      this.type = SlackMessageComponent;
      this.event = event;
      return;
    }
    const type = COMPONENTS[event.widgetKey];
    if (type != undefined) {
      this.type = type;
      this.event = event;
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
