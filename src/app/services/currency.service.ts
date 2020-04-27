import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService
{

  constructor(private http:HttpClient) 
  { 

  }
  getCurrency()
  {
    return this.http.get('https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=38c0e932-1e4e-4fdd-85f1-71e540748840');
  }
}
