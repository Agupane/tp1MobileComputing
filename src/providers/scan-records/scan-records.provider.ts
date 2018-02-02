import { Injectable } from '@angular/core';
import { ScanData } from "../../models/scan-data.model";

@Injectable()
export class ScanRecordsProvider {

  private _scanRecords:ScanData[] = [];

  constructor() {
  }

  /** Add information scaned to the scanRecords **/
  addNewScan(dataScaned:string){
    console.log("Adding new scan: ");
    console.log(dataScaned);
    let foodScaned:any;
    let scanData;

    foodScaned = JSON.parse(dataScaned);
    console.log(foodScaned);
    /** Then the type of the scan is food **/
    if(foodScaned.name){
      console.log("Adding food-type record-Scan");
      scanData = new ScanData(dataScaned,'food');
    }
    /** Here we can continue parse if we have diferent types of scans **/

    /** Finally we add the scan **/
    this._scanRecords.unshift(scanData);


  }

  getScanRecords(){
    return this._scanRecords;
  }
}
