import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { HomePage } from "../index.pages";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tabHome: any = HomePage;

  constructor() {
  }



}
