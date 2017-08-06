;
function create_view(services){

    var total_price = 0;

    var root_div = document.getElementById("car-service-app");
    var service_list_div = document.createElement("div");


    var table = document.createElement("table");
    var table_body = document.createElement("tbody");
    
    var addTableHeaderElement = function(element_type, text) {
        table_head = document.createElement(element_type);
        head_text = document.createTextNode(text);
        table_head.appendChild(head_text);
        table_body.appendChild(table_head);  
        return table_head;
    }

    //create table header
    addTableHeaderElement("th", "Part")
    addTableHeaderElement("th", "Caregory")
    addTableHeaderElement("th", "Price")
    addTableHeaderElement("th", "Add")

    var addTableRow = function(part, cat, price, add_control){
        var table_row = document.createElement("tr");
        for(var i = 0; i < arguments.length; i++ ){
            var table_d = document.createElement("td");  
            if(arguments[i].type !== "checkbox"){
                var text = document.createTextNode(arguments[i]);
                table_d.appendChild(text);
                table_row.appendChild(table_d);
            } else {
                table_d.appendChild(add_control);
                table_row.appendChild(table_d);
            }
        }
        return table_row;
    }  

    // create table rows
    services.forEach(function(service) {

        var service_select = document.createElement("input");
        service_select.setAttribute("type", "checkbox");
        service_select.setAttribute("id", service.id);

        var row = addTableRow(service.name, service.category, service.price, service_select);
        table_body.appendChild(row);
    });


    // create total row 
    var create_total = function(){

        var table_row = document.createElement("tr");

        var total_d = document.createElement("td");
        var total_t = document.createTextNode("Total price: ");
        total_d.appendChild(total_t);
        table_row.appendChild(total_d); 

        var total_d = document.createElement("td");
        table_row.appendChild(total_d); 

        var total_d = document.createElement("td");
        var total_t = document.createTextNode(total_price);
        total_d.setAttribute("id", "total_price");
        total_d.appendChild(total_t);

        table_row.appendChild(total_d); 
        table_body.appendChild(table_row);
    }();

    // add elements to div
    table.appendChild(table_body);
    service_list_div.appendChild(table); 
    root_div.appendChild(service_list_div);

    // add listners
    var addListnerToCeckBox= function(){

        services.forEach(function(service){
            
            var myFunc = function(){
                cb = document.getElementById(service.id);
                
                if(cb.checked){
                    total_price += service.price;
                    document.getElementById("total_price").innerHTML = total_price;   
                } else {
                    total_price -= service.price;
                    document.getElementById("total_price").innerHTML = total_price;
                }
                
            }    

            document.getElementById(service.id).addEventListener("click", myFunc);
        });
    }();
}
