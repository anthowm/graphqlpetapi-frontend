import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { routeAnimations } from '@app/core';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetsComponent implements OnInit {
  constructor(
  ) { }

  ngOnInit() {
  }
}
