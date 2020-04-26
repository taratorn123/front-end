import { Injectable, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators"


@Injectable({
  providedIn: 'root'
})
export class ImageService 
{
  ImageUrl : string;
  constructor(private storage:AngularFireStorage) { }
}
