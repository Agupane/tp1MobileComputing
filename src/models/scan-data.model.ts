export class ScanData{

  info:string;
  type:string;

  constructor(dataScaned:string){
    this.type = dataScaned;
    this.info = dataScaned;
  }
}
