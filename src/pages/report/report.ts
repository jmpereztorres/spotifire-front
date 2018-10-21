import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UserService } from '../../providers/user-service';
import { Geolocation } from '@ionic-native/geolocation';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { LoadingController } from 'ionic-angular';
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
  imageUploaded: boolean;

  constructor(public navCtrl: NavController, 
    private camera: Camera, 
    private geolocation: Geolocation, 
    public userService: UserService, 
    private transfer: FileTransfer,
    private loading: LoadingController, 
    private file: File) {
  }

  ionViewDidLoad() {
    this.imageUploaded = false;
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
      
      let loader = this.loading.create({
        content: 'Uploading image...',
      });
  
      // Present loader
      loader.present().then(() => {

        fileTransfer.upload(this.imageData, 'http://192.168.171.47:8080/api/reports/upload', imageOptions)
        .then((data) => {
            this.imageUploaded = true;
            //alert('Image uploaded to the server');
            //Hide loader
            loader.dismiss();
            this.reportId = data.response;
          }, (err) => {
            //Hide loader
            loader.dismiss();
            alert(JSON.stringify(err));
          })
        }, (err) => {
          alert('Error while uploading the image to the server');
        });
    });
  }

  reportFire(){
    let loader = this.loading.create({
      content: 'Sending report...',
    });

    // Present loader
    loader.present().then(() => {

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
            //Hide loader
            loader.dismiss();
            this.imageUploaded = false;
            alert('Report generated succesfully!');
          },
          (error) =>{
            //Hide loader
            loader.dismiss();
            alert('Error: '+JSON.stringify(error));
            console.error(error);
          }
        )

      }).catch(error => {
        alert('Error obtaining location');
        console.log(error);
      });

    });
  }

}
