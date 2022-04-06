import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { IVideosState } from "./videos.reducers";
import { ApiService } from "src/app/services/api.service";
import { LocalStorageService } from "../services/local-storage.service";
import { CommonService } from "../services/common.service";
import { IRequestVideo } from "../interfaces/interfaces";
import * as videosActions from './videos.actions';
import { LocalStorageEnum } from "../enums/localStorage.enum";

@Injectable()
export class VideosEffects {

  private dataFromStorage: IVideosState | undefined;

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private commonService: CommonService,
    ) { }  

  initialVideo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(videosActions.initialVideoRequest),
      mergeMap(() => 
        this.apiService.getPopularVideos()
        .pipe(
          map(videos => {
            videos = this.commonService.makeTableData(videos);
            this.localStorageService.saveToLocalStorage(LocalStorageEnum.videoData, videos);
            return videosActions.addVideoData(videos);
          }),
          catchError(error => of(videosActions.videoRequestError(error))
          )
        )
      ),
    )
  )

  searchVideo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(videosActions.searchVideoRequest),
      mergeMap((searchValue: IRequestVideo) => 
        this.apiService.getSearchVideos(searchValue)
        .pipe(
          map(videos => {
            videos = this.commonService.makeTableData(videos);
            this.localStorageService.saveToLocalStorage(LocalStorageEnum.videoData, videos);
            return videosActions.addVideoData(videos);
          }),
          catchError((error) => of(videosActions.videoRequestError(error)))
        )
      ),
    )
  )
}
