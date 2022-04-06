import { createAction, props } from '@ngrx/store';

import { IRequestVideo, ITableData } from './../interfaces/interfaces';
import { ActionsEnum } from '../enums/actions.enum';

export const initialVideoRequest = createAction(
  ActionsEnum.initialVideoRequest
);

export const searchVideoRequest = createAction(
  ActionsEnum.searchVideoRequest,
  props< IRequestVideo >()
);

export const addVideoData = createAction(
  ActionsEnum.addVideoData,
  props< ITableData >()
);

export const videoRequestError = createAction(
  ActionsEnum.videoRequestError,
  props< any >()
);




