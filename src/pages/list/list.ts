import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient} from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  imageData: any;
  latitude: any;
  longitude: any;
  apiURL: 'https://spotifire-back.herokuapp.com/api/';

  constructor(public navCtrl: NavController, private camera: Camera, private http: HttpClient, private geolocation: Geolocation) {}

  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageData = imageData;

      //this.uploadPhoto(imageData);
     }, (err) => {
      // Handle error
     });
  }

  reportFire(){
    this.geolocation.getCurrentPosition().then((position) => {

      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

    }).catch(error => {
      alert('Error obtaining location');
      console.log(error);
    });

    var upload = {
      file: this.imageData
    }

    return new Promise((resolve, reject) => {
      this.http.post('https://192.168.171.47/api/reports/upload', JSON.stringify(upload))
        .subscribe(res => {
          resolve(res);
          alert(JSON.stringify(res));
          var report = {
            latitude: this.latitude,
            longitude: this.longitude,
            imageId: res,
            description: '',
            type: 'FIRE'
          };

          return new Promise((resolve, reject) => {
            this.http.post('https://192.168.171.47/api/report', JSON.stringify(report))
              .subscribe(res => {
                resolve(res);          
              }, (err) => {
                reject(err);
              });
          });          
        }, (err) => {
          alert('reviento' + JSON.stringify(err));
          reject(err);
        });
    });
  }

}
