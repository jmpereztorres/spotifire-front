import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UserService } from '../../providers/user-service';
import { Geolocation } from '@ionic-native/geolocation';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  imageData: any;
  latitude: any;
  longitude: any;
  reportId: any;
  descriptionValue: any;

  constructor(public navCtrl: NavController, 
    private camera: Camera, 
    private geolocation: Geolocation, 
    public userService: UserService, 
    private transfer: FileTransfer, 
    private file: File) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

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
        alert('Image uploaded to the server');
        this.reportId = data.response;
      }, (err) => {
        alert(JSON.stringify(err));
      })
     }, (err) => {
      alert('Error while uploading the image to the server');
     });
  }

  reportFire(){

    this.geolocation.getCurrentPosition().then((position) => {

      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      var report = {
        latitude: this.latitude,
        longitude: this.longitude,
        user: '',
        imageId: this.reportId,
        description: this.descriptionValue,
        type: 'FIRE'
      };
  
      this.userService.reportFire(JSON.stringify(report))
      .subscribe(
        (data) => { // Success
          alert('Report generated succesfully!');
        },
        (error) =>{
          alert('Error: '+JSON.stringify(error));
          console.error(error);
        }
      )

    }).catch(error => {
      alert('Error obtaining location');
      console.log(error);
    });
  }

}
