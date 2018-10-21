import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationProvider } from '../../providers/location';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
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
import { dateValueRange } from 'ionic-angular/umd/util/datetime-util';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})

export class MapPage {

  map: GoogleMap;
  latitude: any;
  longitude: any;
  position: any;
  fireMarkers: any[] = [];
  userMarker: MarkerOptions;

  constructor(public navCtrl: NavController, 
    public geolocation: Geolocation, 
    private locationProvider: LocationProvider, 
    private loading: LoadingController,
    public userService: UserService) { }

  ionViewDidLoad() {
    this.subscribeToPosition();
    this.loadMap();
  }

  loadMap() {

    let loader = this.loading.create({
      content: 'Loading...',
    });

    // Present loader
    loader.present().then(() => {

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
          
          //Hide loader
          loader.dismiss();

          //Initialize user marker
          this.userMarker = {
            title: 'My Position',
            icon: {
              url: 'file:///android_asset/www/assets/imgs/humanFlag.png'
            },
            animation: 'DROP',
            position: new LatLng(this.latitude, this.longitude)
          };

          //Add marker to the map
          this.map.addMarker(this.userMarker);

          this.getEvidences();
        
        })
        .catch(error =>{
          alert('Error loading map');
          console.log(error);
        });

      }).catch(error => {
          alert('Error obtaining location');
          console.log(error);
      });
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

  getEvidences(){
    
    let loader = this.loading.create({
      content: 'Searching near fires...',
    });

    // Present loader
    loader.present().then(() => {

      var userLocation={
        latitude:this.latitude,
        longitude:this.longitude,
        user: '',
        imageId: '',
        description: '',
        type: 'FIRE'
      }

      this.userService.retrieveEvidences(JSON.stringify(userLocation))
        .subscribe(
          (data) => { // Success

            let response: any = data;
            let evidences: any = response.evidences;

            //Hide loader
            loader.dismiss();

            for (var _i = 0; _i < evidences.length; _i++) {
              var evidence = evidences[_i];

              let markerOptions: MarkerOptions = {
                position: new LatLng(evidence.location.latitude, evidence.location.longitude),
                icon: {
                  url: 'file:///android_asset/www/assets/imgs/fireFlag.png'
                }
              }
              
              this.map.addMarker(markerOptions);
            }

          },
          (error) => {
            alert('Error obtaining fires: ' + JSON.stringify(error));
            console.error(error);

            //Hide loader
            loader.dismiss();
          }
        )

    });
  }

}
