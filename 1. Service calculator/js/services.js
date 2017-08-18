;
function init_service_list(){

    var Car_parts = {
        engine:         { name: "Двигатель",        price_factor: 100},
        gearbox:        { name: "Коробка передач",  price_factor: 80},
        chassis:        { name: "Шасси",            price_factor: 50},
        weels:          { name: "Колеса",           price_factor: 20},
        fuel_filter:    { name: "Топливный фильтр", price_factor: 2},
        oil_filter:     { name: "Масляный фильтр",  price_factor: 3},
        oil:            { name: "Масло",            price_factor: 5}
    }

    var Categories = {
        fix:            { name: "Ремонт",           price_factor: 50},
        diagnostic:     { name: "Диагностика",      price_factor: 10},
        replace:        { name: "Замена",           price_factor: 100},
        clean:          { name: "Очистка",          price_factor: 20},
        pump:           { name: "Подкачка",         price_factor: 3}   

    }

    var counter = (function(){
        i = 0;
        return function(){
            return i++;
        }
    }()); 

    Service = function (car_part, category){
        this.id = counter();
        this.car_part = car_part.name;
        this.category = category.name;
        this.price = car_part.price_factor * category.price_factor;
    }


    var services = [       
        new Service(Car_parts.engine, Categories.fix),
        new Service(Car_parts.engine, Categories.diagnostic),
        new Service(Car_parts.engine, Categories.replace),

        new Service(Car_parts.gearbox, Categories.fix),
        new Service(Car_parts.gearbox, Categories.diagnostic),
        new Service(Car_parts.gearbox, Categories.replace),

        new Service(Car_parts.chassis, Categories.fix),
        new Service(Car_parts.chassis, Categories.diagnostic),
        new Service(Car_parts.chassis, Categories.replace),

        new Service(Car_parts.weels, Categories.fix),
        new Service(Car_parts.weels, Categories.diagnostic),
        new Service(Car_parts.weels, Categories.replace),
        new Service(Car_parts.weels, Categories.pump),

        new Service(Car_parts.fuel_filter, Categories.replace),
        new Service(Car_parts.fuel_filter, Categories.clean),

        new Service(Car_parts.oil_filter, Categories.replace),

        new Service(Car_parts.oil, Categories.replace)    
    ]

    return services;
}