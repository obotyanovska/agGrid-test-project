import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { LocalStorageService } from '../services/local-storage.service';
import * as actions from './../store/videos.actions'; 
import { ITableData } from '../interfaces/interfaces';
import { LocalStorageEnum } from '../enums/localStorage.enum';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private dataFromStorage: ITableData | null | undefined;

  constructor(
    private localStorage: LocalStorageService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.dataFromStorage = this.localStorage.loadFromLocalStorage(LocalStorageEnum.videoData);
    
    if(this.dataFromStorage) {
      this.store.dispatch(actions.addVideoData(this.dataFromStorage))
    } else {
      this.store.dispatch(actions.initialVideoRequest())
    }
  }
}
