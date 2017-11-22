export class Food{

  name:string;
  description: string;
  photoUrl:string;

  constructor(name:string, description:string, photo:string){
    this.name = name;
    this.description = description;
    this.photoUrl = photo;
  }
}
