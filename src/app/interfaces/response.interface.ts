export interface ExchangeRate {
    exchangeRate: string;
    source: string;
    date:string;
}


export interface ConversionResponse{
    minValue:number,
    maxValue:number, 
}