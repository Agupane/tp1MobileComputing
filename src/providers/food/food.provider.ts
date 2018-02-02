import { Injectable } from '@angular/core';
import {Food} from "../../models/food.model";

/*
  Generated class for the FoodProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FoodProvider {

  private _listOfFoods:Food[];
  private _predefinedImgUrls = 'assets/imgs/foods/';

  constructor() {
    /** We create some hardcoded foods for testing **/
    let cheesecake = new Food(
      "Cheesecake",
      "Cheesecake is a sweet dessert consisting of one or more layers. The main, and thickest layer, consists of a mixture of soft, fresh cheese eggs, and sugar",
      this._predefinedImgUrls+"cheesecake.jpg");
    let chocoflan = new Food(
      "Chocoflan",
      "Chocolate cake is layered with a classic flan, then topped with caramel sauce in this fabulous dessert.",
      this._predefinedImgUrls+"chocofllan.jpg"
    );
    let schnitzel = new Food(
      "Schnitzel",
      "A schnitzel is meat, usually thinned by pounding with a meat tenderizer, that is fried in some kind of oil or fat.",
      this._predefinedImgUrls+"schnitzel.jpg"
    );
    let taco = new Food(
      "Taco",
      "A taco is a traditional Mexican dish composed of a corn or wheat tortilla folded or rolled around a filling.",
      this._predefinedImgUrls+"taco.jpg"
    );
    let spaguetti = new Food(
      "Spaguetti",
      "Spaghetti is a long, thin, cylindrical, solid pasta. It is a staple food of traditional Italian cuisine. Like other pasta, spaghetti is made of milled wheat and water. Italian spaghetti is made from durum wheat semolina, but elsewhere it may be made with other kinds of flour.",
      this._predefinedImgUrls+"spaguetti.jpg"
    );

    this._listOfFoods = [];
    this._listOfFoods.push(cheesecake);
    this._listOfFoods.push(chocoflan);
    this._listOfFoods.push(schnitzel);
    this._listOfFoods.push(taco);
    this._listOfFoods.push(spaguetti);
  };

  getAllFood(){
    return this._listOfFoods;
  };

  addNewFood(food:Food){
    this._listOfFoods.push(food);
  };

  /** From food information in the string scan, get the real food **/
  getFoodByString(foodString:Food){
    var foodIterator;

    for(var i=0; i<this._listOfFoods.length;i++){
      foodIterator = this._listOfFoods[i];
      if(foodIterator.name.toLowerCase() === foodString.name.toLowerCase()){
        return foodIterator;
      }
    }

    /** If we couldnt find that food, we return null **/
    return null;
  }
}
