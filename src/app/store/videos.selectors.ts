import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IVideosState } from "./videos.reducers";

const getFeature = createFeatureSelector<IVideosState>('videos');

export const getTableData = createSelector(
  getFeature, (state: IVideosState) => state.videosData
)
