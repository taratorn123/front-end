import { CampaignModel } from './../../models/campaign-model';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-create-campaign-two',
  templateUrl: './create-campaign-two.component.html',
  styleUrls: ['./create-campaign-two.component.css']
})
export class CreateCampaignTwoComponent {

  campaignModel: CampaignModel;

  constructor(private httpClient: HttpClient) { 
    this.campaignModel = new CampaignModel()
  }
  
  title = 'ImageUploaderFrontEnd';
  

  public selectedFile;
  public event1;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;

  public  onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    this.campaignModel.coverImageName = "cover";

    // Below part is used to display the selected image
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
      console.log("imageURL"+this.imgURL);

  };

 }


 // This part is for uploading
 onUpload() {


  const uploadData = new FormData();
  // uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
  // this.campaignModel.campaignName = "prem";
  // uploadData.append('campaignName', this.campaignModel.campaignName)
      // this.campaignModel.imageByte = this.selectedFile.g
      // for(var key in this.campaignModel){
      //   uploadData.append(key, this.campaignModel[key])
      // }
  // uploadData.append("myFile", this.selectedFile, this.selectedFile.name);


  // this.campaignModel.imageByte = this.selectedFile;
  // console.log(this.campaignModel.imageByte)

  // this.httpClient.post('http://localhost:8080/uploadImage', uploadData)
  // .subscribe(
  //              res => {console.log(res);
  //                      this.receivedImageData = res;
  //                      this.base64Data = this.receivedImageData.pic;
  //                      this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; },
  //              err => console.log('Error Occured duringng saving: ' + err)
  //           );


 }
}
