#include <stdio.h>
#include <stdlib.h>
#include "Dependencies/CWebStudio.h"
#include "Extrapolation/ExtrapolationOfIndex.h"

typedef struct {
    double MoneyAvailable;
    double HousePrice;
    double TaxRate;
    double YETRate;
    int Term;
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

InputData deconstruct_input_json(cJSON *json) {

    if(!json){
        return (InputData){.parsed = 0, .response = cweb.response.send_text("not passed or not valid json",404)};
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
        cJSON *yetRate = cJSON_GetObjectItemCaseSensitive(house, "Yearly Effective Tax Rate");
        cJSON *term = cJSON_GetObjectItemCaseSensitive(house, "Term");

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

            if (!yetRate){
                free(houses_arr);
                return (InputData){.parsed = false, .response = cweb.response.send_text("Yearly Effective Tax Rate not provided",404)};
            }

            if (yetRate->type != cJSON_Number){
                free(houses_arr);
                return (InputData){.parsed = false, .response = cweb.response.send_text("Yearly Effective Tax Rate is not a number",404)};
            }

            if (!term){
                free(houses_arr);
                return (InputData){.parsed = false, .response = cweb.response.send_text("Term not provided",404)};
            }

            if (term->type != cJSON_Number){
                free(houses_arr);
                return (InputData){.parsed = false, .response = cweb.response.send_text("Term is not a number",404)};
            }
        }

        House new_house = {
            .HousePrice = house_price->valuedouble,
            .MoneyAvailable = avail_money->valuedouble,
            .TaxRate = tax_rate->valuedouble,
            .Term = term->valueint,
            .YETRate = yetRate->valuedouble
        };

        houses_arr[i] = new_house;
    }

    InputJSON input_json = {
        .house_num = house_num_int,
        .houses = houses_arr
    };

    CwebHttpResponse *response = cweb_send_text("json parsed", 200);

    return (InputData){
        .response = response, 
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
            "YETRate : %lf\n"
            "Term : %d\n",
            i+1,
            data.house_num,
            data.houses[i].MoneyAvailable,
            data.houses[i].HousePrice,
            data.houses[i].TaxRate,
            data.houses[i].YETRate,
            data.houses[i].Term
        );

        printf("\n");
    }
    
    printf("\n");

}

OutputData calculate_output_data(InputData data) {

    /*To be Implemented*/
    OutputData out_data = {
        /*The data to be replaced*/
        .MoneyEnough = true,
        .MonthlyPayment = 550.78,
        .ProfitRate = 30.5,
        .RepaymentGraph = malloc(sizeof(double)),
        .RepaymentGraph_len = 1,
        .RepaymentTime = 10,
        .RiskRate = 12.4,
        .YearlyPayment = 6609.36
    };

    return out_data;
}

cJSON *data_to_json(OutputData data) {

    cJSON *root = cJSON_CreateObject();
    cJSON *body = cJSON_AddObjectToObject(root, NULL);
 
    cJSON_AddNumberToObject(body, "Monthly Payment", data.MonthlyPayment);
    cJSON_AddNumberToObject(body, "Yearly Payment", data.YearlyPayment);
    cJSON_AddNumberToObject(body, "Repayment Time", data.RepaymentTime);
    cJSON_AddNumberToObject(body, "Profit Rate", data.ProfitRate);
    cJSON_AddNumberToObject(body, "Risk Rate", data.RiskRate);
    cJSON_AddBoolToObject(body, "Money Enough", data.MoneyEnough);

    cJSON *repayment_graph_arr = cJSON_AddArrayToObject(body, "Repayment Graph");

    for (int i = 0; i < data.RepaymentGraph_len; i++) {
        cJSON *coeff = cJSON_CreateNumber(data.RepaymentGraph[i]);
        cJSON_AddItemToArray(repayment_graph_arr, coeff);
    }

    return root;
}

