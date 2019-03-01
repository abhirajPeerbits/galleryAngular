import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from '../app.component';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { RestService } from '../service/rest.service';
declare var $: any;

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class PopupComponent implements OnInit {
  allImages : any = [];
  allUrl : string[] = [];
  

  ngOnInit() {

    this.getAllImages();
  }

  constructor(private rest : RestService)
  {

  }
 
  getAllImages(){
    this.allImages=[];

    this.rest.getImages().subscribe((data) => {

      
     
      
      this.allImages = data;
      data.forEach(objImage => {
        this.allUrl.push(objImage.thumbnailUrl); 
    });
    console.log("-->" + this.allUrl);
    });
    
    

  }

  
}
