import {EventEmitter, Injectable} from '@angular/core';
import { ScanData } from "../../models/scan-data.model";

@Injectable()
export class ScanRecordsProvider {

  private _scanRecords:ScanData[] = [];
  public recordsChange:EventEmitter<ScanData[]>;

  constructor() {
    this.recordsChange = new EventEmitter<ScanData[]>();
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

    /** We add the scan to the list of scans **/
    this._scanRecords.unshift(scanData);

    /** And finally we alert the GUI controller that the records list has changed **/
    this.recordsChange.emit(this._scanRecords);
  }


  /** Add information scanned to the scanRecords if not already scanned, otherwise, just add one in the ordered Quantity **/
  addNewScanIfNotAlreadyScanned(dataScaned:string){
    console.log("Adding new scan if not already scanned: ");
    let foodScaned:any;
    let scanData;

    foodScaned = JSON.parse(dataScaned);
    //console.log(foodScaned);
    /** Then the type of the scan is food **/
    if(foodScaned.name){
      //console.log("Adding food-type record-Scan");
      scanData = new ScanData(dataScaned,'food');
    }
    /** Here we can continue parse if we have diferent types of scans **/

    /** Then we add the scan if its a new one, otherwise we just add one in the quantity **/
    let indexOfExistingRecord = this.recordAlreadyExists(scanData);
    if(indexOfExistingRecord > -1){
      //console.log("Record already exists, just adding one to the quantity ", indexOfExistingRecord);
      this._scanRecords[indexOfExistingRecord].info.quantityOrdered++;
    }
    else {
      //console.log("Record not exist, adding new one: ", indexOfExistingRecord);
      this._scanRecords.unshift(scanData);
    }

    /** And finally we alert the GUI controller that the records list has changed **/
    this.recordsChange.emit(this._scanRecords);
  }

  recordAlreadyExists(dataScaned:ScanData){
    /** Looks on the array the find the item and returns the index, otherwise false**/
    for(let i = this._scanRecords.length; i--;) {
      if(this._scanRecords[i].info.name === dataScaned.info.name) {
        return i;
      }
    }
    return -1;
  }

  getScanRecords(){
    return this._scanRecords;
  }

  /**
   * Clears the list of records
   */
  clearRecords(){
    this._scanRecords = [];
    this.recordsChange.emit(this._scanRecords);
  }
}
