import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ToastController, Platform } from "ionic-angular";
import {ScanRecordsProvider} from "../../providers/scan-records/scan-records";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private barcodeScanner: BarcodeScanner, private toastCtrl: ToastController, private platform: Platform, private scanRecordsService: ScanRecordsProvider) {

  }

  scan(){
    console.log("Scaning");

    /** We use this only if we are in the mobile **/
    if(this.platform.is("cordova")){
      this.barcodeScanner.scan().then(
        (barcodeData) => {
          // Success! Barcode data is here
          console.log("Data scaned:");
          console.log("Result text: ", barcodeData.text);
          console.log("Result format: ", barcodeData.format);
          console.log("Result Cancelled: ", barcodeData.cancelled);

          if( barcodeData.cancelled == 0 && barcodeData.text != null){
            scanRecordsService.addNewScan(barcodeData.text);
            console.log("Information of the scan added to the records");
          }
        },
        (err) => {
          // An error occurred
          console.error("Scan problem", err);
          this.presentToast("There was a problem in the QR Scan, please try again");

        });
    }
    /** Otherwise we are making test on the browser **/
    else{

    }


  };

  presentToast(msgToast: string) {
    let toast = this.toastCtrl.create({
      message: msgToast,
      duration: 1500,
      position: 'middle'
    });
    toast.present();
  };
}
