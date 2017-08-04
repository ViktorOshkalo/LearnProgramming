;
function create_view(services){
    var root_div = document.getElementById("car-service-app");
    
    var service_list_div = document.createElement("div");

    services.forEach(function(service) {

        var service_item =  document.createElement("ul");
        service_item.value = service.name;

        service_item.innerHTML = "Элемент: " + service["name"];

        var service_li = document.createElement("li");
        service_li.innerHTML = "Категория: " + service.category;
        service_item.appendChild(service_li);

        var service_li = document.createElement("li");
        service_li.innerHTML = "Цена: " + service.price;
        service_item.appendChild(service_li);

        var service_select = document.createElement("input");
        service_select.setAttribute("type", "checkbox");
        service_select.setAttribute("id", service.id);
        service_item.appendChild(service_select);

        service_list_div.appendChild(service_item);

    });

    root_div.appendChild(service_list_div);

}
