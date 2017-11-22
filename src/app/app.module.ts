import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { RecordPage, TabsPage } from '../pages/index.pages'

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ScanRecordsProvider } from '../providers/scan-records/scan-records';

let pages = [
  MyApp,
  HomePage,
  RecordPage,
  TabsPage
];

export function getPages(){
  return pages;
}

export function providers(){
  return [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ];
}

@NgModule({
  declarations: getPages(),
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: getPages(),
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ScanRecordsProvider
  ]
})
export class AppModule {}
