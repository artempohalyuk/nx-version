import { Pipe, PipeTransform } from '@angular/core';

import { IPlayer } from 'src/app/shared/models';

@Pipe({
  name: 'nameFilter',
  standalone: true
})
export class NameFilterPipe implements PipeTransform {
  transform(players: IPlayer[], searchTerm: string): IPlayer[] {
    if (!searchTerm) {
      return players;
    }

    const searchTermLower = searchTerm.toLowerCase()

    const filteredPlayers = players.filter(player => {
      const fullName = `${player.firstName} ${player.lastName}`.toLowerCase();

      return fullName.includes(searchTermLower);
    });

    return filteredPlayers;
  }
}