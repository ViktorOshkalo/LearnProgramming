;
(function(){
    var services_list = init_service_list()
    console.log(services_list)

    var shopping_cart = Object.create(Cart)

    render_shop(services_list, shopping_cart)
}());
