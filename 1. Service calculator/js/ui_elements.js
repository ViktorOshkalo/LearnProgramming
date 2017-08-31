'use strict';

const UI_State = {
    state_init: function(service_list, shopping_cart) {
        this.service_list = service_list;
        this.shopping_cart = shopping_cart;
    }
}

const UI_elements = {

    elements_init: function() {

        this.root =         document.getElementById("car-service-app");

        this.header =       this.element_init("header", "CAR SERVICE");
        this.content =      this.element_init("content", "");
        this.filter_menu =  this.element_init("filter_menu", "FILTER");
        this.service_list = this.element_init("service_list", "");
        this.cart =         this.element_init("cart", "");
    },

    element_init: function(class_name, inner_html) {
        const element = document.createElement("div");
        element.setAttribute("class", class_name);
        element.innerHTML = inner_html;
        return element;
    }
}

const render_ui = function(services_list, shopping_cart){

    UI_State.state_init(services_list, shopping_cart);

    UI_elements.elements_init();
    render_header(UI_elements.root);
    render_content(UI_elements.root);

}

const render_header = function(container){
    container.appendChild(UI_elements.header);
}

const render_content = function(container) {
    const content = UI_elements.content
    render_filter_menu(content);
    render_service_list(content, render_service_lot);
    render_cart(UI_elements.cart);
    container.appendChild(content);
}

const render_filter_menu = function(container) {
    container.appendChild(UI_elements.filter_menu);
}

const render_service_list = function(container, render_func) {
    let service_list_container = UI_elements.service_list;
    
    UI_State.service_list.forEach(function(service) {
        render_func(service_list_container, service);
    }, this);

    container.appendChild(service_list_container);
}

const render_cart = function(container) {
    while (container.firstChild) {      // remove inner tags
        container.firstChild.remove();
    }

    const name = document.createElement("div");
    name.setAttribute("class", "cart_header");
    name.innerHTML = "CART";
    container.appendChild(name);
    
    const all_categories = UI_State.shopping_cart.getAllCategories();
    
    const list = document.createElement("ul");
    list.setAttribute("class", "cart_list");
    all_categories.forEach(function(category) {
        let ele_category = document.createElement("li");
        ele_category.setAttribute("class", "category");
        ele_category.setAttribute("type", category);
        ele_category.innerHTML = category;

        let lots = document.createElement("ul");
        lots.setAttribute("class", "lots");
        ele_category.appendChild(lots);        

        list.appendChild(ele_category);
    });

    let cart_lot;
    for (cart_lot in  UI_State.shopping_cart) {

        let service = UI_State.shopping_cart.getServiceById(cart_lot);
        let lots_element = list.querySelector(`li[type=${service.category}] ul[class=lots]`);
        
        let lot = document.createElement("li");
        lot.setAttribute("class", "lot");

        let car_part = document.createElement("div");;
        car_part.setAttribute("class", "cart_part_name");
        car_part.innerHTML = service.car_part;

        let lot_amount = document.createElement("div");
        lot_amount.setAttribute("class", "cart_lot_amount");
        lot_amount.innerHTML = "x" + UI_State.shopping_cart[cart_lot];     
        
        let price = document.createElement("div");
        price.setAttribute("class", "cart_lot_price");
        price.innerHTML = UI_State.shopping_cart[cart_lot] * service.price; 

        lot.appendChild(car_part);
        lot.appendChild(price);
        lot.appendChild(lot_amount);
        lots_element.appendChild(lot);

    } 
    container.appendChild(list);

    const total_price = document.createElement("div");
    total_price.setAttribute("class", "total_price");

    const total_price_mark = document.createElement("div");
    total_price_mark.setAttribute("class", "total_price_mark");
    total_price_mark.innerHTML = "TOTAL PRICE:";

    const total_price_amount = document.createElement("div");
    total_price_amount.setAttribute("class", "total_price_amount");
    total_price_amount.innerHTML = UI_State.shopping_cart.total_price;

    
    total_price.appendChild(total_price_amount);
    total_price.appendChild(total_price_mark);
    container.appendChild(total_price);

    UI_elements.content.appendChild(container);
}

let render_service_lot = function(container, service) {
        let service_lot = document.createElement("div");
        service_lot.setAttribute("class", "service_lot");

        let car_part = document.createElement("div");
        car_part.innerHTML = service.car_part;

        let category = document.createElement("div");
        category.innerHTML = service.category;

        let price = document.createElement("div");
        price.innerHTML = service.price;

        let amount = document.createElement("div");
        amount.setAttribute("class", "amount");

        let adding = document.createElement("div");
        adding.setAttribute("class", "adding");
        let add_button = document.createElement("button");
        let delete_button = document.createElement("button");
        
        add_button.innerHTML = "+";
        add_button.setAttribute("service_id", service.id);
        add_button.setAttribute("func", "add_service");
        add_button.addEventListener( "click",  function() {
            UI_State.shopping_cart.add(service.id, 1, service.price);
            amount.innerHTML = UI_State.shopping_cart[service.id];
            render_cart(UI_elements.cart);
        })
        
        delete_button.innerHTML = "-";
        delete_button.setAttribute("service_id", service.id);
        delete_button.setAttribute("func", "delete_service");
        delete_button.addEventListener( "click",  function() {
            UI_State.shopping_cart.delete(service.id, 1, service.price);
            if (UI_State.shopping_cart.hasOwnProperty(service.id)) {
                amount.innerHTML = UI_State.shopping_cart[service.id];
            } else {
                amount.innerHTML = "";
            }
            render_cart(UI_elements.cart);
        })

        adding.appendChild(add_button);
        adding.appendChild(delete_button);

        service_lot.appendChild(car_part);
        service_lot.appendChild(category);
        service_lot.appendChild(price);
        service_lot.appendChild(amount);
        service_lot.appendChild(adding);

        container.appendChild(service_lot);
}

