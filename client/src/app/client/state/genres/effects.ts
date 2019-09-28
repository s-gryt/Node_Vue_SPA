import {Injectable} from '@angular/core';
import {Actions, Effect, ofType, createEffect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {State} from '../index';
import {GenreService} from '../../services/genre.service';
import * as GenreActions from './actions';

@Injectable()
export class GenresEffects {
    constructor(private action$: Actions, private store$: Store<State>,
                private genreService: GenreService) {
    }

    @Effect()
    loadGenres$ = createEffect(() =>
        this.action$.pipe(
            ofType(GenreActions.loadAllGenres),
            mergeMap(() => {
                return this.genreService.getAllGenres().pipe(
                    map((payload) => GenreActions.loadAllGenresSuccess({payload})),
                    catchError(error => of(GenreActions.loadAllGenresFail({error}))));
            })
        ));
}