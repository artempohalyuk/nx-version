import { Pipe, PipeTransform } from '@angular/core';

import { IPlayer } from 'src/app/shared/models';

@Pipe({
  name: 'positionFilter',
  standalone: true
})
export class PositionFilterPipe implements PipeTransform {
  transform(players: IPlayer[], selectedPosition: string): IPlayer[] {
    if (!selectedPosition) {
      return players;
    }

    const filteredPlayers = players.filter(player => player.position === selectedPosition);

    return filteredPlayers;
  }
}