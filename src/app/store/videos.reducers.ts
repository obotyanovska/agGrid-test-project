import { Action, createReducer, on } from "@ngrx/store";

import * as videosActions from './videos.actions';
import { ITableData } from "../interfaces/interfaces";


export interface IVideosState {
  videosData: ITableData [],
  error: string | null,
}

export const initialState: IVideosState = {
  videosData: [],
  error: null,
}

export function videosReducer(state: IVideosState | undefined, action: Action): IVideosState {
  return reducer(state, action);
}

const reducer = createReducer<IVideosState>(
  initialState,

  on(videosActions.addVideoData, (state, payload) => {
    const videoData = Object.values(payload);
    videoData.pop();
    return ({
      ...state,
      videosData: [...videoData]
     })
    }
  ),

  on(videosActions.videoRequestError, (state, payload) => {
    console.log(payload);
    return ({ ...state, error: payload})
    }
  )
)
