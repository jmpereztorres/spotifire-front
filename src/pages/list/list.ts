import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UserService } from '../../providers/user-service';
import { Geolocation } from '@ionic-native/geolocation';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


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

  constructor(public navCtrl: NavController, 
    private camera: Camera, 
    private geolocation: Geolocation, 
    public userService: UserService, 
    private transfer: FileTransfer, 
    private file: File) {}

  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    const fileTransfer: FileTransferObject = this.transfer.create();

    let imageOptions: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'name.jpg',
      headers: {
        httpMethod: 'POST'
      }
   }

    this.camera.getPicture(options).then((imageData) => {
      this.imageData = imageData;
      
      fileTransfer.upload(this.imageData, 'http://192.168.171.47:8080/api/reports/upload', imageOptions)
      .then((data) => {
        alert(JSON.stringify(data));
      }, (err) => {
        alert(JSON.stringify(err));
      })
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

    this.userService.getFires()
    .subscribe(
      (data) => { // Success
        alert(JSON.stringify(data));
      },
      (error) =>{
        alert('reviento: '+JSON.stringify(error));
        console.error(error);
      }
    )

    /*let url = 'http://192.168.171.47:8080/api/fires';
    //let url = 'https://spotifire-back.herokuapp.com/api/reports/upload';
    let headers = new Headers();
    /*headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');*/
    /*headers.append('content-type','application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers:headers});

    var upload = {
      file: this.imageData
    }

    return new Promise((resolve,reject)=>{
      this.http.get(url).toPromise().then(response{})
    });*/

    /*return new Promise((resolve,reject)=>{
      this.http.post(url,JSON.stringify(upload), options).subscribe(res => {
        alert(JSON.stringify(res)); 
        resolve(res.json());
       }, (err) => {
         alert('reviento: '+JSON.stringify(err));
         reject(err);
       });
    });*/

    /*return new Promise((resolve, reject) => {
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
    });*/
  }

}
