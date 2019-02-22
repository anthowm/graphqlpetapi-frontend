import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS, routeAnimations } from '@app/core/animations/route.animations';

@Component({
    selector: 'app-unauthorized',
    templateUrl: './unauthorized.component.html',
    styleUrls: ['./unauthorized.component.scss'],
    animations: [routeAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnauthorizedComponent implements OnInit {
    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
    constructor() { }

    ngOnInit() {
    }
}
