import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TableLibService {

  constructor(private http: HttpClient) { }

  public getTableData(body: {} = {}) {
    return this.http
      .post(
        'https://mytable.free.mockoapp.net/all',
        body
      )
  }
}
