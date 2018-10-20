import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PreventPage } from '../pages/prevent/prevent';
import { RecoverPage } from '../pages/recover/recover';
import { ReportPage } from '../pages/report/report';
import { MapPage } from '../pages/map/map';
import { HelpPage } from '../pages/help/help';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GoogleMaps } from '@ionic-native/google-maps';   


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RecoverPage,
    PreventPage,
    ReportPage,
    MapPage,
    HelpPage  
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RecoverPage,
    PreventPage,
    ReportPage,
    MapPage,
    HelpPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
