import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PreventPage } from '../pages/prevent/prevent';
import { RecoverPage } from '../pages/recover/recover';
import { ReportPage } from '../pages/report/report';
import { MapPage } from '../pages/map/map';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GoogleMaps } from '@ionic-native/google-maps';   
import { Geolocation } from '@ionic-native/geolocation';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { HttpClientModule } from '@angular/common/http';

import { UserService } from '../providers/user-service';
import { LocationProvider } from '../providers/location';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RecoverPage,
    PreventPage,
    ReportPage,
    MapPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RecoverPage,
    PreventPage,
    ReportPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    UserService,
    LocationProvider
  ]
})
export class AppModule {}
