import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as DashboardActions from './dashboard.actions';
import { DataService } from '../../../../app/modules/dashboard/services/dashboard-data.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { DashboardState } from '../../../../app/modules/dashboard/store/dashboard.reducer';
import { getProfileDataState } from '../../../../app/modules/profile/store/profile.selectors';

@Injectable()
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<DashboardState>
  ) {}

  @Effect()
  loadGames$ = this.actions$.pipe(
    ofType(DashboardActions.ActionTypes.GET_GAMES),
    switchMap(() =>
      this.dataService.getGames().pipe(
        map((data: any) => {
          console.log('[dashboard] GET success', data);

          // TODO: move this out into a transformation file that does everything and reutrns an object to put into state
          // pass the payload to it

          ///////// calculating Time Remaining /////////
          const sum = data.reduce((total, next) => {
            return next.numberOfHoursToComplete + total;
          }, 0);
          // console.log(sum);

          let hours;
          this.store.select(getProfileDataState).subscribe(val => (hours = val.averageNumberOfHoursPerDay));
          // console.log(hours);

          const timeRemaining = (sum / hours).toFixed(1);


          ///////// calculating Unfinished Games /////////
          const hoursPlayed = data.reduce((total, next) => {
            return next.numberOfHoursPlayed + total;
          }, 0);

          const hoursTotal = data.reduce((total, next) => {
            return (next.numberOfHoursToComplete + next.numberOfHoursPlayed) + total;
          }, 0);

          // console.log(hoursPlayed, hoursTotal);

          const incompletePercentage = ((1 - hoursPlayed / hoursTotal) * 100).toFixed(2);


          ///////// calculating Finished Games /////////
          const numberCompleted = data.filter(x => x.isComplete).length;
          const completedPercentage = ((numberCompleted / data.length) * 100).toFixed(2);

          // console.log(completedPercentage);

          const gamesStats = {
            timeRemaining,
            incompletePercentage,
            numberCompleted,
            completedPercentage
          };

          return new DashboardActions.GetGamesSuccess(gamesStats);
        }),
        catchError(error => of(new DashboardActions.GetGamesFail()))
        // TODO: find out why error action not dispatching
      )
    )
  );
}
