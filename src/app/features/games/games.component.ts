import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetGames } from '../../modules/games/store/games.actions';
import { Observable } from 'rxjs';
import { getGamesDataState } from '../../../app/modules/games/store/games.selectors';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  games$: Observable<any>;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch(new GetGames());
    this.games$ = this.store.select(getGamesDataState);
    this.store.select(getGamesDataState).subscribe(val => console.log(val))
  }

}
