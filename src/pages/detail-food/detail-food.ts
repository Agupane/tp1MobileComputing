import { Component } from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {Food} from "../../models/food.model";


@IonicPage()
@Component({
  selector: 'page-detail-food',
  templateUrl: 'detail-food.html',
})
export class DetailFoodPage {

  private food:Food;
  private foodInfo;

  constructor(private params:NavParams,public viewCtrl: ViewController) {
    this.food = this.params.get('food');
  }

  ionViewDidLoad() {

  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
