import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';
import { UserService } from '../../providers/user-service';
import { ReportPage } from "../../pages/report/report";

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

  ionViewDidLoad() {
    this.getEvidencesList();
  }

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
        type: 'FIRE'
      }

      this.userService.retrieveEvidencesTyped(JSON.stringify(userLocation))
      .subscribe(
        (data) => { // Success
          let response: any = data;
          let evidencesTyped: any = response.evidences;
          // let alerts: any = response.alerts;          
          // let sliceEvidences: any = evidences.slice(0, 5);
          // let sliceAlerts: any =alerts.slice(0, 5);

          // let notices: any = [...sliceEvidences,...sliceAlerts];


          // notices.sort((a, b) => a[0].distance.localeCompare(b[0].distance))
          for (var i = 0; i < evidencesTyped.length(); i++){
            alert("distance"+evidencesTyped[i].distance+"type"+evidencesTyped[i].level);
          }
          


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

  toReport(){
    this.navCtrl.push(ReportPage);
  }

}
