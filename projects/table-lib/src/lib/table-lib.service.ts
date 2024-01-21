import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TableLibService {

  constructor(private http: HttpClient) { }

  public getTableData(url: string, body: {} = {}) {
    return this.http.post(url, body)
  }
}
