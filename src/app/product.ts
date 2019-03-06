export class Product {
  public static fromJson(json: Object): Product {
    return new Product(
        json['id'],
        json['idbrand'],
        json['pname'],
        json['price'],
        json['description'],
        json['isAvailable'],
        json['imgPath'],
        new Date(json['createdAt'])
    );
}

constructor(public id: string,
            public idbrand: string,
            public pname: string,
            public price: number,
            public description: string,
            public isAvailable: boolean,
            public imgPath: string,
            public createdAt: Date) {
}
}
