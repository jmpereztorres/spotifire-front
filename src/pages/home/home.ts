import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from "@ionic-native/google-maps";
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})


export class HomePage {

  map: GoogleMap;

  constructor(public navCtrl: NavController) { }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
    };


    this.map = GoogleMaps.create('map_canvas', mapOptions);


    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      // Now you can use all methods safely.
     
    })
    .catch(error =>{
      console.log(error);
    });



       

  }
}