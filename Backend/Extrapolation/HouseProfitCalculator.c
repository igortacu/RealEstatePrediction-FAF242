#include <stdlib.h>
#include <math.h>
#include "ExtrapolationOfIndex.h"
#include "HouseProfitCalculator.h"

// double calculate_monthly_payment(double loan_amount, double annual_rate, int years) {
//     double monthly_rate = annual_rate / 100.0 / 12.0;
//     int months = years * 12;
//     return loan_amount * (monthly_rate * pow(1 + monthly_rate, months)) /
//            (pow(1 + monthly_rate, months) - 1);
// } Nikita Mortgage Calculator

/*Calculates the monthly mortgage*/
double mortgage_calculator(House data){
    double monthly_interest_rate = data.TaxRate / 12 / 100;
    int number_of_payments = data.Term * 12;
    double monthly_payment = (data.HousePrice *monthly_interest_rate) / (1 - pow(1 + monthly_interest_rate, -number_of_payments));
    return monthly_payment;
}

/*years(term): How far do you want to get the data*/
PriceTrend load_price_trend(int years) {
    // Extrapolated data for a few trimesters
    //we should link that to the extrpolation program
    int nr_extr = years * 4;

    double extr_data[nr_extr];
    Polynomial poly = compute_polynomial(nr_extr);

    for (int i = 0; i < nr_extr; i++) {
        extr_data[i] = evaluate_polynomial(poly,CURRENT_TRIMESTER + i);
    }

    PriceTrend trend;
    trend.trimesters_count = nr_extr;
    trend.price_multipliers = malloc(nr_extr * sizeof(double));

    /* 118.9 is initial price, we compute how much the price
     * increased knowing the next trimester data*/
    double base = extr_data[0];

    for (int i = 0; i < nr_extr; i++) {
        trend.price_multipliers[i] = extr_data[i] / base;
    }

    free(poly.coeffs);

    return trend;
}

double get_price_multiplier(PriceTrend trend, int month) {
    int trimester = month / MONTHS_PER_TRIMESTER;
    //if we extrapolated not enough data just take the last value
    if (trimester >= trend.trimesters_count) {
        return trend.price_multipliers[trend.trimesters_count - 1];
    }
    return trend.price_multipliers[trimester];
}

double* simulate_sales(House house_data, double monthly_payment, PriceTrend trend) {
    double loan_amount = house_data.HousePrice - house_data.DownPayment;//pre payment
    //mort calc
    // double monthly_payment = mortgage_calculator(house_data);
    int total_months = house_data.Term * 12;

    double current_balance = house_data.MoneyAvailable;
    double* balance_history = malloc(total_months * sizeof(double));
    double remaining_loan = loan_amount;
    double current_sales_price = house_data.InitialRent;

    
    for (int month = 0; month < total_months; month++) {
        // Get current price multiplier
        double current_multiplier = get_price_multiplier(trend, month);

        // Calculate current property value
        // double current_value = house_data.HousePrice * current_multiplier;

        // Calculate current sales price (scales with property value)
        current_sales_price = house_data.InitialRent * current_multiplier;

        // Make mortgage payment
        double interest_payment = remaining_loan * (house_data.TaxRate / 100.0 / 12.0);
        double principal_payment = monthly_payment - interest_payment;
        remaining_loan -= principal_payment;

        // Update balance
        current_balance += current_sales_price - monthly_payment;
        balance_history[month] = current_balance;

    }

    return balance_history;
}


CalcResult calculate_house_profit(House data, PriceTrend trend) {
    
    // Run simulation
    double mortgage = mortgage_calculator(data);
    double *profit = simulate_sales(data, mortgage, trend);
    int profit_lenght = data.Term*12;

    // Cleanup

    return (CalcResult){
        .Mortgage = mortgage,
        .ProfitGraph = profit,
        .ProfitGraph_len = profit_lenght
    };
}
