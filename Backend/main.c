#include "models.c"

int one_mega_byte = 1048576;

CwebHttpResponse *main_sever( CwebHttpRequest *request ) {

    if (strcmp(request->method, "OPTIONS") == 0) {
        CwebHttpResponse *pre = cweb.response.send_text("", 204);
        cweb.response.add_header(pre, "Access-Control-Allow-Origin", "*");
        cweb.response.add_header(pre, "Access-Control-Allow-Methods", "POST, OPTIONS");
        cweb.response.add_header(pre, "Access-Control-Allow-Headers", "Content-Type");
        return pre;
    }

    cJSON *json  = cweb.request.read_cJSON(request,one_mega_byte);
    
    InputData input_data;
    OutputData out;

    if ((input_data = deconstruct_input_json(json)).parsed == true) {
        /*Do some stuff*/
        out = calculate_output_data(input_data.json);

        print_input_json(input_data.json);

    } else {
        // cJSON_Delete(json); BAD IDEA
        return input_data.response;
    }

    cJSON *out_json = data_to_json(out); 

    // cJSON_Delete(json); 
    free(input_data.json.houses);
    free(out.ProfitGraph);

    // build the response object
    CwebHttpResponse *res = cweb.response.send_cJSON_cleaning_memory(out_json, 200);

    // add the CORS header
    cweb.response.add_header(res, "Access-Control-Allow-Origin", "*");

    // finally return it
    return res;
}


int main(void){
    cweb = newCwebNamespace();
    CwebServer server = newCwebSever(5000, main_sever);
    
    cweb.server.start(&server);
    return 0;
}
