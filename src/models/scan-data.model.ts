export class ScanData{

  info:any;
  type:string;

  constructor(infoScan:string, typeScan:string){
    this.type = typeScan;
    /** If the information is just a string **/
    this.info = infoScan;

    /** If the information is an object **/
    if(this.type == 'food'){
      this.info = JSON.parse(infoScan);
    }
  }
}
