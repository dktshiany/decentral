import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export interface MarketResult {
  MarketName: string;
  High: number;
  Low: number;
  Volume: number;
  Last: number;
  BaseVolume: number;
  TimeStamp: string;
  Bid: number;
  Ask: number;
  OpenBuyOrders: number;
  OpenSellOrders: number;
  PrevDay: number;
  Created: string;
  GainInPercentage: number
}

export interface MarketResponse {
  success: boolean;
  message: string;
  result: MarketResult[];
}

@Injectable({
  providedIn: 'root'
})

export class GetmarketService {
  constructor(private http: HttpClient) {
  }
  getMarketResponse(hostname, sortActive, sortDirection): Observable<MarketResponse> {
    const params = new HttpParams()
      .set('act', sortActive)
      .set('dir', sortDirection);
    var serviceUrl = 'http://' + hostname + ':3000/marketapi';// e.g 'http://localhost:3000/marketapi';
    return this.http.get<MarketResponse>(serviceUrl, { params });
  }
}

