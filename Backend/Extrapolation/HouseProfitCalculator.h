
#ifndef HOUSEPROFITCALCULATOR_H
#define HOUSEPROFITCALCULATOR_H

#define MAX_YEARS 30
#define MONTHS_PER_TRIMESTER 4
#define CURRENT_TRIMESTER 16

#include "../models.h"


// typedef struct {
//     double initial_price;
//     double down_payment;
//     double annual_rate;
//     int loan_years;
// } MortgageInfo;

typedef struct {
    double* price_multipliers;
    int trimesters_count;
} PriceTrend;

typedef struct 
{
    double Mortgage;
    double *ProfitGraph;
    double ProfitGraph_len;
} CalcResult;


/* 
!Change Me
 computes the balance of the user each mounth
 when he pays the mortgage and sell the block
 returns the array of the balance value at each mounth

 Free ProfitGraph
 */
CalcResult calculate_house_profit(House data, PriceTrend trend);

PriceTrend load_price_trend(int years);


#endif //HOUSEPROFITCALCULATOR_H
