;
function render_shop(services_list, shopping_cart){

    var root_div = document.getElementById("car-service-app");

    var total_price_div = document.createElement("div");
    total_price_div.setAttribute("class", "total-price");
    total_price_div.innerHTML = shopping_cart.total_price;

    var service_list_div = document.createElement("div");
    service_list_div.setAttribute("class", "container");

    services_list.forEach(function(service) {
        var services_list_lot = document.createElement("div");
        services_list_lot.setAttribute("class", "service-lot");

        var car_part = document.createElement("div");
        car_part.innerHTML = service.car_part;

        var category = document.createElement("div");
        category.innerHTML = service.category;

        var price = document.createElement("div");
        price.innerHTML = service.price;
        
        var amount = document.createElement("div");
        amount.setAttribute("class", "amount");

        var adding = document.createElement("div");
        adding.setAttribute("class", "adding");
        var add_button = document.createElement("button");
        var delete_button = document.createElement("button");
        
        add_button.innerHTML = "+";
        add_button.setAttribute("service_id", service.id);
        add_button.setAttribute("func", "add_service");
        add_button.addEventListener( "click",  function() {
            shopping_cart.add(service.id, 1, service.price);
            total_price_div.innerHTML = shopping_cart.total_price;
            amount.innerHTML = shopping_cart[service.id];
            console.log(shopping_cart);
        })
        
        delete_button.innerHTML = "-";
        delete_button.setAttribute("service_id", service.id);
        delete_button.setAttribute("func", "delete_service");
        delete_button.addEventListener( "click",  function() {
            shopping_cart.delete(service.id, 1, service.price);
            total_price_div.innerHTML = shopping_cart.total_price;
            if (shopping_cart.hasOwnProperty(service.id)) {
                amount.innerHTML = shopping_cart[service.id];
            } else {
                amount.innerHTML = "";
            }
            console.log(shopping_cart);
        })

        adding.appendChild(add_button);
        adding.appendChild(delete_button);


        services_list_lot.appendChild(car_part);
        services_list_lot.appendChild(category);
        services_list_lot.appendChild(price);
        services_list_lot.appendChild(amount);
        services_list_lot.appendChild(adding);

        service_list_div.appendChild(services_list_lot);

    }, this);



    root_div.appendChild(service_list_div);
    root_div.appendChild(total_price_div);

    console.log("in render");
}
