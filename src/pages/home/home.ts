import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { LocationProvider } from '../../providers/location/location';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  LatLng
} from "@ionic-native/google-maps";
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})


export class HomePage {

  map: GoogleMap;
  latitude: any;
  longitude: any;
  position: any;
  userMarker: MarkerOptions;

  constructor(public navCtrl: NavController, public geolocation: Geolocation, private locationProvider: LocationProvider) { }

  ionViewDidLoad() {
    this.subscribeToPosition();
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {

      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      let mapOptions: GoogleMapOptions = {
        camera: {
           target: {
             lat: this.latitude,
             lng: this.longitude
           },
           zoom: 18,
           tilt: 30
         }
      };

      this.map = GoogleMaps.create('map_canvas', mapOptions);

      // Wait the MAP_READY before using any methods.
      this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        
        //Initialize user marker
        this.userMarker = {
          title: 'My Position',
          icon: 'blue',
          animation: 'DROP',
          position: new LatLng(this.latitude, this.longitude)
        };

        //Add marker to the map
        this.map.addMarker(this.userMarker);
      
      })
      .catch(error =>{
        alert('Error loading map');
        console.log(error);
      });

    }).catch(error => {
        alert('Error obtaining location');
        console.log(error);
    });
  }

  subscribeToPosition(){
    // Location watcher 
    this.locationProvider.watchPosition().subscribe(position => {
      if (position !== undefined) {
        console.debug(position);
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        //Update user marker position
        this.userMarker.setPosition({lat: this.latitude,lng: this.longitude});

      }
    }, (error) => {
      console.log(error)
    });
  }

  cameraTest(){
    alert('entro');
  }

}