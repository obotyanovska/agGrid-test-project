import { Injectable } from '@angular/core';
import { ITableData } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public saveToLocalStorage(dataName: string, data: ITableData): void {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(dataName, serializedData);
  }

  public loadFromLocalStorage(dataName:string): ITableData | undefined{
    const data = localStorage.getItem(dataName);
    return data === null ? undefined : JSON.parse(data);
  }

  public removeFromLocalStorage(dataName: string):void {
    localStorage.removeItem(dataName);
  }
}
