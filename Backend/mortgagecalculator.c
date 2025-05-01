
#include <math.h>
#include <models.h>

double mortgage_calculator(House data){
    double monthly_interest_rate = data.TaxRate / 12 / 100;
    int number_of_payments = data.Term * 12;
    double monthly_payment = (data.HousePrice *monthly_interest_rate) / (1 - pow(1 + monthly_interest_rate, -number_of_payments));
    return monthly_payment;
}