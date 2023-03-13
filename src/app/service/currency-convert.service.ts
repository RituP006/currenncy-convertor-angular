import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConvertService {

  constructor(private httpClient:HttpClient) { }

  private serverUrl:string = environment.baseUrl;

  fetchLatestExchangeRates(from:string,to:string){
    return this.httpClient.get(this.serverUrl + '/exchange?from=' + from + '&to=' + to).pipe(tap((response)=>{return response}));
  }

  convert(from:string,to:string,amount:number){
    return this.httpClient.get(this.serverUrl + '/convert?from=' + from + '&to=' + to + '&amount=' + amount).pipe(tap((response)=>{return response}));
  }
}
