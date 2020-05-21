import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalConstantsService 
{
  public static readonly apiURL : String = 'http://localhost:8080/';
  constructor() 
  { 
  }
}
