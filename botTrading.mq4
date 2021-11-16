//+------------------------------------------------------------------+
//|                                                   botTrading.mq4 |
//|                        Copyright 2021, MetaQuotes Software Corp. |
//|                                             https://www.mql5.com |
//+------------------------------------------------------------------+
#property copyright "Copyright 2021, MetaQuotes Software Corp."
#property link      "https://www.mql5.com"
#property version   "1.00"
#property strict
//+------------------------------------------------------------------+
//| Expert initialization function                                   |
//+------------------------------------------------------------------+
int OnInit()
  {
  Print("RSI: ",iRSI(Symbol(),1,14,PRICE_CLOSE,0));
  for(int i = 0; i<=4; i++){
  double data = iOpen(Symbol(),1,i);
  double hight = iHigh(Symbol(),1,i);
  double low = iLow(Symbol(),1,i);
  double close = iClose(Symbol(),1,i);
  Print("--------Nen so "+ IntegerToString( i, 0)+"-------");
  Print("Gia Hight:",hight);
  Print("Gia Low:",low);
  Print("---------------");
  }
  OrderSend(Symbol(),OP_BUY,0.01,Ask,20,0,0,NULL,0,0,clrNONE);

 
   return(INIT_SUCCEEDED);
  }
//+------------------------------------------------------------------+
//| Expert deinitialization function                                 |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
  {
//---
   
  }
//+------------------------------------------------------------------+
//| Expert tick function                                             |
//+------------------------------------------------------------------+
void OnTick()
  {
  }
  
//iHighest(Symbol(),0,MODE_HIGH,100,0);

   
  
//+------------------------------------------------------------------+
void getDataSymbol(){

}
