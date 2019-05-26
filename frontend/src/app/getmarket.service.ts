import { Injectable } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { HttpParams }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';
//import { User } from '../models/user.model';



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

//@Injectable({
//  providedIn: 'root'
//})
//@Injectable()
@Injectable({
  providedIn: 'root'
})

export class GetmarketService {
  //private serviceUrl = 'https://api.bittrex.com/api/v1.1/public/getmarketsummaries';
  //'http://localhost:3000'//
  //private serviceUrl = 'http://localhost:4200/api';
  private serviceUrl = 'http://localhost:3000/marketapi';
  
  constructor(private http: HttpClient) { }
  
  getMarketResponse(hostname, sortActive, sortDirection): Observable<MarketResponse> {
    const params = new HttpParams()
    .set('act', sortActive)
    .set('dir',sortDirection);

    this.serviceUrl = 'http://'+hostname+':3000/marketapi';
    return this.http.get<MarketResponse>(this.serviceUrl,{params});// + '/result'
  }
  
  //getResult(): Observable<MarketResult[]> {
  //  return this.http.get<MarketData>(this.serviceUrl.result);
  //}  
}

