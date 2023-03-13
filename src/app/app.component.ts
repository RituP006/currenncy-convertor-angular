import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { APP_CONSTANTS, CURRENCY_LIST } from './constants/app.constants';
import { ConversionResponse, ExchangeRate } from './interfaces/response.interface';
import { CurrencyConvertService } from './service/currency-convert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private appService :  CurrencyConvertService,private _snackBar: MatSnackBar){}

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  fromCurrencyList:any = [APP_CONSTANTS.FROM_PLACEHOLDER, ...CURRENCY_LIST];
  toCurrencyList:any = [APP_CONSTANTS.TO_PLACEHOLDER,...CURRENCY_LIST];
  fromCurrency:string = this.fromCurrencyList[0] ;
  toCurrency:string = this.toCurrencyList[0];
  amount:number = 0.0;
  convertedResult?:ConversionResponse;
  exchangeRateList:ExchangeRate[]=[];
  loading:boolean =false;


  filterTo= (currency:string) => this.toCurrencyList = this.toCurrencyList.filter((curr:string) => curr!=currency);
  filterFrom= (currency:string) => this.fromCurrencyList=this.fromCurrencyList.filter((curr:string) => curr!=currency);
  
  disableExchange = () => (this.toCurrency === APP_CONSTANTS.TO_PLACEHOLDER || this.fromCurrency === APP_CONSTANTS.FROM_PLACEHOLDER);

  disableConvert = () => this.disableExchange() || this.amount <= 0 || this.exchangeRateList.length == 0;

  reset(){
    this.fromCurrencyList= [APP_CONSTANTS.FROM_PLACEHOLDER, ...CURRENCY_LIST];
  this.toCurrencyList=[APP_CONSTANTS.TO_PLACEHOLDER,...CURRENCY_LIST];
  this.fromCurrency= this.fromCurrencyList[0] ;
  this.toCurrency= this.toCurrencyList[0];
  this.amount= 0.0;
  this.convertedResult=undefined;
  this.exchangeRateList=[];
  }
  ngOnInit(): void {
  }

  
  getExchangeRate(){
    this.loading=true;
    this.appService.fetchLatestExchangeRates(this.fromCurrency,this.toCurrency).subscribe({
      next: (responseList:any) => {
        this.loading=false;
        this.exchangeRateList = responseList;

    },
    error: err=>{
      this.loading=false;
      this._snackBar.open("Server error, please try again later.",'',{horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,duration: 2 * 1000});
    }})
  }

  
  convertAmount(){
    this.loading=true;

    this.appService.convert(this.fromCurrency,this.toCurrency,this.amount).subscribe({
      next: (response:any) => {
        this.loading=false;
       this.convertedResult = response;

    },
    error: err=>{
      this.loading=false;

      this._snackBar.open("Server error, please try again later.",'',{horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,duration: 2 * 1000});
    }})
  }
  

}
