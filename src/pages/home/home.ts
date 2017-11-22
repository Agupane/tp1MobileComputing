import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ToastController, Platform } from "ionic-angular";
import { ScanRecordsProvider } from "../../providers/scan-records/scan-records.provider";

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
      console.log("Using mobile scan");
      this.barcodeScanner.scan().then(
        (barcodeData) => {
          // Success! Barcode data is here
          console.log("Text scaned: ");
          console.log(barcodeData.text);

          if( !barcodeData.cancelled && barcodeData.text != null){
            this.scanRecordsService.addNewScan(barcodeData.text);
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
      /** We add a hardcoded scan for test **/
      let tacoString:string =  '{ "name":"Taco","photoUrl":"../assets/imgs/foods/taco.jpg"}' ;
      let spaguettiString:string = ' { "name":"Spaguetti","photoUrl":"../assets/imgs/foods/spaguetti.jpg" } ';
      this.scanRecordsService.addNewScan(tacoString);
      this.scanRecordsService.addNewScan(spaguettiString);
    //  this.scanRecordsService.addNewScan("Test scan");
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
