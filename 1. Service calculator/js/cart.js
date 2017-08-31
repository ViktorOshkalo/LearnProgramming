;
function init_cart(service_list){

    Cart =  {
        total_price: 0,

        add: function(service_id, amount, price){
            if (!this.hasOwnProperty(service_id)){
                this[service_id] = amount;
            } else {
                this[service_id] += amount;
            }
            
            this.total_price += amount * price;
        },

        delete: function(service_id, amount, price){
            if (this.hasOwnProperty(service_id)){
                this[service_id] > amount ? this[service_id] -= amount : delete this[service_id];
                this.total_price -= amount * price;
            }   
        },

        getAllCategories: function() {
            let categories = [];
            for (id in this) {
                let service = service_list.filter(function(pos) { return pos.id.toString() === id } );
                if (service.length > 0) {
                    let service_categoy =  service[0].category;
                    if (categories.indexOf(service_categoy) === -1) {
                        categories.push(service_categoy);
                    }
                }
            }
            return categories;
        },

        getServiceById: function(id) {  
            return service_list.filter(function(pos) { return pos.id.toString() === id;} )[0];
        },

        getCategoryById: function(id) {
            return this.getServiceById(id).category;
        }
    }
    

    Object.defineProperties(Cart, {
        add:{enumerable: false},
        delete:{enumerable: false},
        getAllCategories:{enumerable: false},
        total_price:{enumerable: false},
        getCategoryById:{enumerable: false},
        getServiceById:{enumerable: false}
    });

    return Cart;

}
