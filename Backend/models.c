#include <stdio.h>
#include <stdlib.h>
#include "Extrapolation/ExtrapolationOfIndex.h"
#include "Extrapolation/HouseProfitCalculator.h"
#include "models.h"

CwebNamespace cweb;


InputData deconstruct_input_json(cJSON *json) {

    if(!json){
        return (InputData){.parsed = false, .response = cweb.response.send_text("not passed or not valid json",404)};
    }

    cJSON *house_num = cJSON_GetObjectItemCaseSensitive(json, "House Number");
    cJSON *houses = cJSON_GetObjectItemCaseSensitive(json, "Houses");


    if (!house_num){
        return (InputData){.parsed = false, .response = cweb.response.send_text("House Number not provided",404)};
    }

    if (house_num->type != cJSON_Number){
        return (InputData){.parsed = false, .response = cweb.response.send_text("House Number its not a number",404)};
    }
    if (!houses){
        return (InputData){.parsed = false, .response = cweb.response.send_text("Houses not provided",404)};
    }

    if (houses->type != cJSON_Array){
        return (InputData){.parsed = false, .response = cweb.response.send_text("Houses is not an object array",404)};
    }

    int house_num_int = house_num->valueint;

    House *houses_arr = malloc(sizeof(House) * house_num_int);

    for (int i = 0; i < house_num_int; i++) {

        cJSON *house = cJSON_GetArrayItem(houses, i);
        
        if (!house) {
            free(houses_arr);
            return (InputData){.parsed = false, .response = cweb.response.send_text("Invalid House Number",404)};
        }

        cJSON *avail_money = cJSON_GetObjectItemCaseSensitive(house, "Money Available"); 
        cJSON *house_price = cJSON_GetObjectItemCaseSensitive(house, "House Price"); 
        cJSON *tax_rate = cJSON_GetObjectItemCaseSensitive(house, "Tax Rate"); 
        cJSON *term = cJSON_GetObjectItemCaseSensitive(house, "Term");
        cJSON *initial_rent = cJSON_GetObjectItemCaseSensitive(house, "Initial Rent");
        cJSON *down_payment = cJSON_GetObjectItemCaseSensitive(house, "Down Payment");

        {
            if (!avail_money){
                free(houses_arr);
                return (InputData){.parsed = false, .response = cweb.response.send_text("Money Available not provided",404)};
            }

            if (avail_money->type != cJSON_Number){
                free(houses_arr);
                return (InputData){.parsed = false, .response = cweb.response.send_text("Money Available is not a number",404)};
            }

            if (!house_price){
                free(houses_arr);
                return (InputData){.parsed = false, .response = cweb.response.send_text("House Price not provided",404)};
            }

            if (house_price->type != cJSON_Number){
                free(houses_arr);
                return (InputData){.parsed = false, .response = cweb.response.send_text("House Price is not a number",404)};
            }

            if (!tax_rate){
                free(houses_arr);
                return (InputData){.parsed = false, .response = cweb.response.send_text("Tax Rate Available not provided",404)};
            }

            if (tax_rate->type != cJSON_Number){
                free(houses_arr);
                return (InputData){.parsed = false, .response = cweb.response.send_text("Tax Rate Available is not a number",404)};
            }

            if (!term){
                free(houses_arr);
                return (InputData){.parsed = false, .response = cweb.response.send_text("Term not provided",404)};
            }

            if (term->type != cJSON_Number){
                free(houses_arr);
                return (InputData){.parsed = false, .response = cweb.response.send_text("Term is not a number",404)};
            }
            
            if (!initial_rent){
                free(houses_arr);
                return (InputData){.parsed = false, .response = cweb.response.send_text("Initital Rent not provided",404)};
            }

            if (initial_rent->type != cJSON_Number){
                free(houses_arr);
                return (InputData){.parsed = false, .response = cweb.response.send_text("Initital Rent is not a number",404)};
            }
            
            if (!down_payment){
                free(houses_arr);
                return (InputData){.parsed = false, .response = cweb.response.send_text("Down Payment not provided",404)};
            }

            if (down_payment->type != cJSON_Number){
                free(houses_arr);
                return (InputData){.parsed = false, .response = cweb.response.send_text("Down Payment is not a number",404)};
            }
        }

        House new_house = {
            .HousePrice = house_price->valuedouble,
            .MoneyAvailable = avail_money->valuedouble,
            .TaxRate = tax_rate->valuedouble,
            .Term = term->valueint,
            .InitialRent = initial_rent->valuedouble,
            .DownPayment = down_payment->valuedouble
        };

        houses_arr[i] = new_house;
    }

    InputJSON input_json = {
        .house_num = house_num_int,
        .houses = houses_arr
    };

    // CwebHttpResponse *response = cweb_send_text("json parsed", 200);

    return (InputData){
        .response = NULL, 
        .parsed = true,
        .json = input_json
    };
}


void print_input_json(InputJSON data) {
    
    
    for (int i = 0; i < data.house_num; i++) {    
        printf(
            "House #%d\n"
            "House Number : %d\n"
            "Money Available : %lf\n"
            "House Price : %lf\n"
            "Tax Rate : %lf\n"
            "Term : %d\n"
            "Initial Rent : %lf\n"
            "Down Payment : %lf\n",
            i+1,
            data.house_num,
            data.houses[i].MoneyAvailable,
            data.houses[i].HousePrice,
            data.houses[i].TaxRate,
            data.houses[i].Term,
            data.houses[i].InitialRent,
            data.houses[i].DownPayment
            
        );

        printf("\n");
    }
    
    printf("\n");

}

OutputData calculate_output_data(InputJSON data) {

    /*
    TODO: add posibility to have prior money Don't Think its vaiable
    */
    for (int i = 0; i < data.house_num; i++) /*For now ignore MoneyAvailable*/
    {
        data.houses[i].MoneyAvailable = 0;
    }
    

    OutputData out_data = {
        .MonthlyPayment = 0,
        .ProfitRate = 0, 
        .ProfitGraph = NULL, 
        .ProfitGraph_len = 0,
        .RepaymentTime = 0, 
    };

    int longest_term = 0;

    for (int i = 0; i < data.house_num; i++) 
        longest_term = longest_term < data.houses[i].Term ? data.houses[i].Term : longest_term;

    printf("longest_term : %d\n", longest_term);

    longest_term *= 12;

    out_data.ProfitGraph = longest_term > 0 ? malloc(longest_term * sizeof(double)) : NULL;
    
    if (out_data.ProfitGraph != NULL) memset(out_data.ProfitGraph, 0, longest_term * sizeof(double));
    
    out_data.ProfitGraph_len = longest_term;
    
    double all_house_values = 0;
    
    PriceTrend trend = load_price_trend(longest_term);
    
    for (int i = 0; i < data.house_num; i++) {
        
        CalcResult res = calculate_house_profit(data.houses[i], trend);
        
        out_data.MonthlyPayment += res.Mortgage;
        all_house_values += data.houses[i].HousePrice;
        
        for (int j = 0; j < res.ProfitGraph_len; j++) {
            out_data.ProfitGraph[j] += res.ProfitGraph[j];
        }
        
        free(res.ProfitGraph);
    }
    
    free(trend.price_multipliers);

    printf("all_house_values : %lf\n", all_house_values);

    out_data.ProfitRate = (out_data.ProfitGraph[longest_term - 1] / all_house_values) * 100;

    for (int i = 0; i < out_data.ProfitGraph_len; i++) {
        if (out_data.ProfitGraph[i] >= 0) {
            out_data.RepaymentTime = i + 1;
            break;
        }
    }

    return out_data;
}

cJSON *data_to_json(OutputData data) {

    cJSON *body = cJSON_CreateObject();
 
    cJSON_AddNumberToObject(body, "Monthly Payment", data.MonthlyPayment);
    cJSON_AddNumberToObject(body, "Repayment Time", data.RepaymentTime);
    cJSON_AddNumberToObject(body, "Profit Rate", data.ProfitRate);

    cJSON *repayment_graph_arr = cJSON_AddArrayToObject(body, "Profit Graph");

    for (int i = 0; i < data.ProfitGraph_len; i++) {
        cJSON *coeff = cJSON_CreateNumber(data.ProfitGraph[i]);
        cJSON_AddItemToArray(repayment_graph_arr, coeff);
    }

    return body;
}

