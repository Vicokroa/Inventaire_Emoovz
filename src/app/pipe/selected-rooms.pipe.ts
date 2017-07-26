import { Pipe, PipeTransform } from '@angular/core';

import { Room } from '../model/room';

@Pipe({
  name: 'selectedRooms'
})
export class SelectedRoomsPipe implements PipeTransform {

  transform(value: Room[], args?: any): Room[] {
    console.log('filtrage', value.filter(room => room.selected));

    return value.filter(room => room.selected);
  }

}
