import {
  AfterViewInit,
  ChangeDetectorRef,
  Compiler,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnChanges,
  ViewChild,
  ViewContainerRef,
  animate, state, style, transition, trigger
} from '@angular/core';
import { DashboardComponent } from './../dashboards/DashboardComponent';
import { WidgetEvent } from './../dashboards/WidgetEvent';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-dynamic',
  templateUrl: 'dynamic.component.html',
  styleUrls: ['dynamic.component.scss'],
  animations: [trigger("transition", [
    state('visible',   style({opacity: 1})),
    state('gone', style({opacity: 0})),
    transition('visible => gone', animate('1000ms ease-out')),
    transition('gone => visible', animate('1000ms ease-in'))
  ])]
})
export class DynamicComponent implements OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('target', { read: ViewContainerRef }) target;
  @Input() type;
  @Input() event: WidgetEvent;
  private componentRef: ComponentRef<DashboardComponent>;
  private isViewInitialized: boolean = false;
  private transitionState: string;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  private updateComponent() {
    if (this.type === undefined || !this.isViewInitialized) {
      return;
    }
    this.animateTo("gone");
    setTimeout(() => this.swap(), 1000);
  }

  private animateTo(state: string): void {
    console.log(state);
    this.transitionState = state;
  }

  private swap(): void {
    if (this.componentRef != null) {
      this.componentRef.destroy();
    }
    const factory = this.componentFactoryResolver.resolveComponentFactory(this.type);
    this.componentRef = this.target.createComponent(factory);
    this.componentRef.instance.update(this.event);
    this.animateTo("visible");
  }

  ngOnChanges() {
    this.updateComponent();
  }

  ngAfterViewInit() {
    this.isViewInitialized = true;
    this.updateComponent();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
