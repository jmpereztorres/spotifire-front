import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class LocationProvider {

  position: Geoposition;

  constructor(private geolocation: Geolocation) {
  }

  watchPosition() {
    return new Observable<Geoposition>(subscribe => {
      this.geolocation.watchPosition().subscribe(
        position => {
          if (position.coords !== undefined) {
            this.position = position;
            subscribe.next(this.position);
          }
        }, (error) => {
          this.onError(error)
        });
    });
  }

  getPosition() {
    return this.position;
  }

  onError(error) {
    console.error(error.message);
    alert('code: ' + error.code + '\n' +
      'message: ' + error.message + '\n');
  }


}