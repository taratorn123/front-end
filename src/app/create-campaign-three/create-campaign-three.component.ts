import { QuillModule } from 'ngx-quill';
import { CampaignModel } from './../../models/campaign-model';
import { UserService } from './../user-service.service';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-create-campaign-three',
  templateUrl: './create-campaign-three.component.html',
  styleUrls: ['./create-campaign-three.component.css']
})
export class CreateCampaignThreeComponent implements OnInit {

  editorForm: FormGroup;
  editorContent: String;
  // config={
  //   toolbar:['bold','italic','underline']
  // }

  editorStyle ={
    height: '300px',
    backgroundColor: '#ffffff'
  }
  // constructor() { 
  //     // this.form = fb.group({
  //     //   published : true,
  //     //   credentials : this.fb.array([]),
  //     // });
  //   }
    // addCreds() {
    //   const creds = this.form.controls.credentials as FormArray;
    //   creds.push(this.fb.group({
    //     username: '',
    //     password: '',
    //   }));
    // }
  ngOnInit() {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    })
  }
  
  onSubmit(){
    this.editorContent = this.editorForm.get('editor').value;
    console.log(this.editorForm.get('editor').value)
  }

  //Fix length (10) for text editor
  textChanged($event) {
    if ($event.editor.getLength() > 10) {
      $event.editor.deleteText(10, $event.editor.getLength());
    }
  }

}
