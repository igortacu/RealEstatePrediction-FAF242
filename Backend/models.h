#ifndef MODELS
#define MODELS

#include "Dependencies/CWebStudio.h"

typedef struct {
    double MoneyAvailable;
    double HousePrice;
    double TaxRate; // R
    double YETRate;
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
    double YearlyPayment;
    double ProfitRate;
    double *RepaymentGraph;
    double RiskRate;
    int RepaymentGraph_len;
    int RepaymentTime;
    bool MoneyEnough;
} OutputData;

CwebNamespace cweb;

#endif