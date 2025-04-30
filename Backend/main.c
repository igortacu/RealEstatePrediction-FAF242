#include "models.c"

int one_mega_byte = 1048576;

/*
    TODO: Implement the main logic of the program the function calculate_output_data()
*/

CwebHttpResponse *main_sever( CwebHttpRequest *request ) {

    cJSON *json  = cweb.request.read_cJSON(request,one_mega_byte);
    
    InputData input_data;
    OutputData out;

    if ((input_data = deconstruct_input_json(json)).parsed == true) {
        /*Do some stuff*/
        out = calculate_output_data(input_data);

        print_input_json(input_data.json);

    } else {
        cJSON_Delete(json);
        return input_data.response;
    }

    cJSON *out_json = data_to_json(out); 

    cJSON_Delete(json); 
    free(input_data.json.houses);
    free(out.RepaymentGraph);

    return cweb.response.send_cJSON_cleaning_memory(out_json, 200);
}


int main(int argc, char *argv[]){
    cweb = newCwebNamespace();
    CwebServer server = newCwebSever(5000, main_sever);
    
    cweb.server.start(&server);
    return 0;
}
