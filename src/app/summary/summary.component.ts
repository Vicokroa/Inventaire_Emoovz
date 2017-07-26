import { Component, OnInit, Input } from '@angular/core';

import { Room } from '../model/room';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.styl']
})
export class SummaryComponent implements OnInit {
  @Input() roomCollection: Room[];
  get volume(): number {
    let totalVolume = 0;
    this.roomCollection.forEach(_room => totalVolume += (+_room.volume));
    return totalVolume;
  }
  constructor() { }

  ngOnInit() {
  }

}
