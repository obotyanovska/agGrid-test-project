import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { searchVideoRequest } from 'src/app/store/videos.actions';
import { IRequestVideo } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-search-block',
  templateUrl: './search-block.component.html',
  styleUrls: ['./search-block.component.scss']
})
export class SearchBlockComponent implements OnInit {

  public searchValue: string = '';
  public searchChanged: Subject<string> = new Subject<string>();
  private debounceTime: number = 1000;
  private searchVideo: IRequestVideo;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.searchChanged.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged())
      .subscribe((searchValue: string) => {
        this.searchVideo = { searchValue }
        this.store.dispatch(searchVideoRequest(this.searchVideo))
      } 
    )
  }

  public onChanged(): void {
    this.searchChanged.next(this.searchValue)
  }
}
