class User {
    constructor() {
        this._lastVisitDate = new Date(2017, 7, 1);
        this._globalDiscount = 10;
        this._nightDiscount = 5;
        this._weekendDiscount = 10;
        this._ordersCount = 52;
        this._ordersTotalPrice = 5500;
        this._bonus = 100;
    }

    get lastVisitDate() {
        return this._lastVisitDate;
    }

    set lastVisitDate(value) {
        this._lastVisitDate = value;
    }

    get globalDiscount() {
        return this._globalDiscount;
    }

    set globalDiscount(value) {
        this._globalDiscount = value;
    }

    get nightDiscount() {
        return this._nightDiscount;
    }

    set nightDiscount(value) {
        this._nightDiscount = value;
    }

    get weekendDiscount() {
        return this._weekendDiscount;
    }

    set weekendDiscount(value) {
        this._weekendDiscount = value;
    }

    get ordersCount() {
        return this._ordersCount;
    }

    set ordersCount(value) {
        this._ordersCount = value;
    }

    get ordersTotalPrice() {
        return this._ordersTotalPrice;
    }

    set ordersTotalPrice(value) {
        this._ordersTotalPrice = value;
    }

    get bonus() {
        return this._bonus;
    }

    set bonus(value) {
        this._bonus = value;
    }
}

class UserDecorator extends User {
    constructor(user) {
        super();
        this._decoratedUser = user;
    }

    get lastVisitDate() {
        return this._decoratedUser.lastVisitDate;
    }

    set lastVisitDate(value) {
        this._decoratedUser.lastVisitDate = value;
    }

    get globalDiscount() {
        return this._decoratedUser.globalDiscount;
    }

    set globalDiscount(value) {
        this._decoratedUser.globalDiscount = value;
    }

    get nightDiscount() {
        return this._decoratedUser.nightDiscount;
    }

    set nightDiscount(value) {
        this._decoratedUser.nightDiscount = value;
    }

    get weekendDiscount() {
        return this._decoratedUser.weekendDiscount;
    }

    set weekendDiscount(value) {
        this._decoratedUser.weekendDiscount = value;
    }

    get ordersCount() {
        return this._decoratedUser.ordersCount;
    }

    set ordersCount(value) {
        this._decoratedUser.ordersCount = value;
    }

    get ordersTotalPrice() {
        return this._decoratedUser.ordersTotalPrice;
    }

    set ordersTotalPrice(value) {
        this._decoratedUser.ordersTotalPrice = value;
    }

    get bonus() {
        return this._decoratedUser.bonus;
    }

    set bonus(value) {
        this._decoratedUser.bonus = value;
    }
}

class DiscountDecorator extends UserDecorator {
    getDiscount() {
        let discount = this.globalDiscount;

        if (this._isNight()) {
            discount += this.nightDiscount;
        }

        if (this._isWeekend()) {
            discount += this.weekendDiscount;
        }

        return discount;
    }

    _isWeekend() {
        let date = new Date();
        return [0, 6].includes(date.getDay());
    }

    _isNight() {
        let date = new Date();
        return date.getHours() < 5 || date.getHours() >= 23;
    }
}

class BonusDecorator extends UserDecorator {
    getBonus() {
        let date = new Date();
        if (((date.getTime() - this.lastVisitDate.getTime()) / (1000 * 60 * 60)) <= 240) {
            this.bonus++;
        }
        this.ordersCount++;
        return this.bonus;
    }
}

let user = new User();
let discountUser = new DiscountDecorator(user);
let bonusUser = new BonusDecorator(user);

