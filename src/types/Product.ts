export interface Product {
    id: number,
    title: string,
    pricenew: number,
    priceold: number,
    description: string, 
    category: string,
    image: string,
    starRating: number,
}
export type Createproduct = {
    title:string;
    image:string;
    description:string;
    pricenew: number;
    priceold: number,
    category:string ;
    starRating: number;
    showproduct:boolean ;
}