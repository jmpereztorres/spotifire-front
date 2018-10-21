import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';
import { UserService } from '../../providers/user-service';
import { ReportPage } from "../../pages/report/report";
import { LoadingController } from 'ionic-angular';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})

export class HomePage {
  latitude: any;
  longitude: any;
  evidencesTyped: any;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation,
    public userService: UserService,
    private loading: LoadingController
  ) { }

  ionViewDidEnter() {
    this.getEvidencesList();
  }

  getEvidencesList(){

    let loader = this.loading.create({
      content: 'Retrieving alerts...',
    });

    // Present loader
    loader.present().then(() => {

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
            //Hide loader
            loader.dismiss();
            let response: any = data;
            this.evidencesTyped = response.evidences;
          },
          (error) => {
            alert('Error obtaining alerts: ' + JSON.stringify(error));
            //Hide loader
            loader.dismiss();
            console.error(error);
          }
        )
      }).catch(error => {
        alert('Error obtaining location');
        console.log(error);
      });

    });
  }

  toReport(){
    this.navCtrl.push(ReportPage);
  }

}
