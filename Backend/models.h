#ifndef MODELS
#define MODELS

#include "Dependencies/CWebStudio.h"

typedef struct {
    double MoneyAvailable;
    double HousePrice;
    double TaxRate; // annual interest rate
    double DownPayment;
    double InitialRent;
    int Term; // N
} House;

typedef struct 
{
    int house_num;
    House *houses;
}InputJSON;

typedef struct 
{
    InputJSON json;
    bool parsed;
    CwebHttpResponse *response;
} InputData;

typedef struct 
{
    double MonthlyPayment;
    double ProfitRate;
    double *ProfitGraph;
    int ProfitGraph_len;
    int RepaymentTime;
} OutputData;

#endif