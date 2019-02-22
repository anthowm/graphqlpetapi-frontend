import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { routeAnimations, ROUTE_ANIMATIONS_ELEMENTS } from '@app/core/animations/route.animations';

@Component({
    selector: 'app-notfound',
    templateUrl: './notfound.component.html',
    styleUrls: ['./notfound.component.scss'],
    animations: [routeAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent implements OnInit {
    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
    constructor() { }

    ngOnInit() {
    }
}
