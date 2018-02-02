import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, ToastController} from 'ionic-angular';
import {ScanData} from "../../models/scan-data.model";
import {ScanRecordsProvider} from "../../providers/scan-records/scan-records.provider";
import {DetailFoodPage} from "../detail-food/detail-food";
import {Food} from "../../models/food.model";
import {FoodProvider} from "../../providers/food/food.provider";
import { Dialogs } from '@ionic-native/dialogs';

@IonicPage()
@Component({
  selector: 'page-record',
  templateUrl: 'scanRecords.html',
})
export class RecordPage {

  records: ScanData[] = [];

  constructor(private scanRecordsService: ScanRecordsProvider,
              private modalCtrl: ModalController,
              private foodProvider:FoodProvider,
              private dialogs: Dialogs,
              private toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    this.records = this.scanRecordsService.getScanRecords();
    console.log("Mostrando un record");
    console.log(this.records[0]);

  }

  showDetailedFood(index:number){
    console.log("Showing detailed food info");
    let foodSelected:ScanData = this.records[index];
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

  confirmMenu(){
    console.log("Displaying confirmation menu");
    this.dialogs.
    confirm('Do you want to confirm this menu?','Confirm Menu',['Confirm','Cancel'])
      .then(
        ( data) => {
          switch (data){
            case 1: {
              /** Button Accept, We send a msg **/
              this.presentToast("Thank you, in a few minutes the waiter is going to bring your food");
              break;
            }
            case 2:{
              /** Button Cancel **/
              break;
            }
            default:{
              /** Default **/
              break;
            }
          }
          console.log('Dialog dismissed ', data);
        }
      )
      .catch(
        e => console.log('Error displaying dialog', e)
      );
  }

  presentToast(msgToast: string) {
    let toast = this.toastCtrl.create({
      message: msgToast,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  };


}
