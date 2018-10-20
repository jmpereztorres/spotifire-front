import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';
import { UserService } from '../../providers/user-service';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})

export class HomePage {
  latitude: any;
  longitude: any;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation,
    public userService: UserService
  ) { }

  getEvidencesList(){

    this.geolocation.getCurrentPosition().then((position) => {

      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      var userLocation={
        latitude:this.latitude,
        longitude:this.longitude,
        user: '',
        imageId: '',
        description: '',
        type: ''
      }

      this.userService.retrieveEvidences(JSON.stringify(userLocation))
      .subscribe(
        (data) => { // Success
          console.log("data--->"+data);
          alert('Report generated succesfully!');
        },
        (error) => {
          alert('Error: ' + JSON.stringify(error));
          console.error(error);
        }
      )
    }).catch(error => {
      alert('Error obtaining location');
      console.log(error);
    });
  }

}
