import { Injectable } from '@angular/core';
import { IResponseVideoData, ITableData, IItem } from '../interfaces/interfaces';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public selectedCount$ = new Subject<number>();

  public makeTableData (videos: IResponseVideoData): ITableData [] {
    return videos.items.map((item: IItem) => ({
      id: item.id.videoId,
      preview: item.snippet.thumbnails.default.url,
      publishedOn: item.snippet.publishedAt,
      videoTitle: item.snippet.title,
      description: item.snippet.description,
      })
    )
  }

  public changeCount(count: number) {
    this.selectedCount$.next(count);
  }
}
