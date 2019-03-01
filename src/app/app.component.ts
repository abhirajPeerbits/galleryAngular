import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { RestService } from './service/rest.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { log } from 'util';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  title = 'imgslide1';
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  images: any = [];
  url: string[] = [];
  allImages: any = [];
  allUrl: any[] = [];
  counter: number = 0;


  returndata = new Object();

  ngOnInit(): void {
    this.galleryOptions = [

      { 
        "imageArrows": false, 
        "thumbnailsArrows": false, 
        "previewDownload": true ,
       
      },
      { 
        "breakpoint": 500, 
        "width": "300px", 
        "height": "300px", 
        "thumbnailsColumns": 3, 
        "previewDownload": true,
       
       },
      { 
        "breakpoint": 300, 
        "width": "100%", 
        "height": "200px", 
        "thumbnailsColumns": 2 ,
        
      },

    ];

    this.getImages();
    this.getAllImages();
  }



  constructor(private rest: RestService,
    private modalService: NgbModal,
    private router: Router,
    config: NgbModalConfig) {}


  getImages() {
    this.images = [];
    this.rest.getImages().subscribe((data) => {

      this.images = data.map((obj) => {
        let data = {};
        data['small'] = obj.url;
        data['medium'] = obj.url;
        data['big'] = obj.url;
        return data;
      })
      // returndata['small'] = pro_reg_obj.qty;
    });

  }

  getAllImages() {
    this.allImages = [];
    let returnObj = {};
    this.rest.getImages().subscribe((data) => {
      this.allImages = data;
      data.forEach(objImage => {
        var obreturnObjj = {
          url: objImage.thumbnailUrl,
          id: this.counter++
        };
        // this.allUrl.push(objImage.thumbnailUrl + "id->"+this.counter++);
        this.allUrl.push(obreturnObjj);
      });
      // console.log("-->" + this.allUrl[1].url + "-->" + this.allUrl[1].id);
    });
}


  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }


  getId(id){
    // alert(id);
    return id;
  }

  findImageById(){

  }

}


