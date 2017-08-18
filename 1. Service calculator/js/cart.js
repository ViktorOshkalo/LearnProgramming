
Cart =  {
    add: function(service_id, amount, price){
        if (!this.hasOwnProperty(service_id)){
            this[service_id] = amount
        } else {
            this[service_id] += amount
        }
        
        this.total_price += amount * price
    },

    delete: function(service_id, amount, price){
        if (this.hasOwnProperty(service_id)){
            this[service_id] > amount ? this[service_id] -= amount : delete this[service_id]
            this.total_price -= amount * price
        }   
    },

    total_price: 0

}
