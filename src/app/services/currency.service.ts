import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class CurrencyService
{

  result: any;
  option: any;
  constructor(private http:HttpClient) 
  { 

  }
  getCryptoCurrency()
  {
    return this.http.get<JSON>('https://min-api.cryptocompare.com/data/pricemulti?fsyms=XLM&tsyms=USD&api_key=9c24fbeaae03690ca51aecabdac1791ec5c0d07a662561a8651b563fb88697d4')
  }
  getCurrencyUSDBase()
  {
    return this.http.get<JSON>('https://api.exchangeratesapi.io/latest?base=USD')
  }
}
