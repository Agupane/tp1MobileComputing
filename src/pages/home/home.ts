import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {ToastController, Platform, ModalController, AlertController} from "ionic-angular";
import { ScanRecordsProvider } from "../../providers/scan-records/scan-records.provider";
import {ScanData} from "../../models/scan-data.model";
import {Food} from "../../models/food.model";
import {DetailFoodPage} from "../detail-food/detail-food";
import {FoodProvider} from "../../providers/food/food.provider";
import {Dialogs} from "@ionic-native/dialogs";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  foodRecords: ScanData[] = [];

  constructor(private barcodeScanner: BarcodeScanner,
              private toastCtrl: ToastController,
              private platform: Platform,
              private scanRecordsService: ScanRecordsProvider,
              private foodProvider:FoodProvider,
              private modalCtrl:ModalController,
              private dialogs:Dialogs,
              private alertCtrl: AlertController) {

  }

  ionViewDidLoad(){
    this.foodRecords = this.scanRecordsService.getScanRecords();
    console.log("Mostrando un record");
    console.log(this.foodRecords[0]);
  }

  /**
   * Opens the QR Scanner on the mobile
   */
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

  showDetailedFood(index:number){
    console.log("Showing detailed food info");
    let foodSelected:ScanData = this.foodRecords[index];
    let foodItem:Food;
    try{
      foodItem = this.foodProvider.getFoodByString(foodSelected.info);
      if(foodItem){
        let modalDetailedFood = this.modalCtrl.create(DetailFoodPage,{ food: foodItem});
        modalDetailedFood.present();
      }
      else{
        throw new Error('The food has not been found');
      }
    }
    catch(exception){
      console.error("Error while loading the details for the food");
      console.log(exception);
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

  /**
   * Displays a modal confirmation menu
   */
  public confirmMenu(){
    console.log("Displaying confirmation menu");
    let alert = this.alertCtrl.create({
      title: 'Confirm Menu',
      message: 'Do you want to confirm this menu?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () =>{
            console.log("Cancel clicked");
          }
        },
        {
          text: 'Confirm',
          handler: () =>{
            /** Button Accept, We send a msg **/
            this.presentToast("Thank you, in a few minutes the waiter is going to bring your food");
          }
        }
      ]
    });

    alert.present();
  }
}
