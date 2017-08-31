;
(function(){
    var service_list = init_service_list();
    console.log(service_list);

    var shopping_cart = init_cart(service_list);
    render_ui(service_list, shopping_cart);
    //render_ui_alt(service_list, shopping_cart);

}());
