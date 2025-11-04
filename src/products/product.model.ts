export class Product {
    // id: string;
    // title: string;
    // description: string;
    // price: number;

    // constructor(id: string, title: string, desc: string, price: number) {
    //     this.id = id;
    //     this.title = title;
    //     this.description = desc;
    //     this.price = price;
    // }
    // short cut for this in ts is to add an accessor which automatically adds 
    // properties to the class

    constructor( 
        public id: string,
        public title: string,
        public description: string,
        public price: number,
    ) {}

}