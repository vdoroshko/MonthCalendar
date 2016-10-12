/**
 * Copyright 2016 Vitaly Doroshko <vdoroshko@mail.ru>
 * You may use this code under the terms of the BSD 3-clause license
 */

var Calendar = function (year, month, firstDayOfWeek) {
    if (arguments.length < 2) {
        throw new TypeError("Not enough arguments to Calendar");
    }

    if (isNaN(year)) {
        throw new TypeError("year argument must be a number");
    }

    if (isNaN(month)) {
        throw new TypeError("month argument must be a number");
    }

    this.firstDayOfMonthDate = new Date(year, month);
    if (isNaN(this.firstDayOfMonthDate)) {
        throw new RangeError("year and month arguments results in an invalid combination");
    }

    if (arguments.length > 2) {
        this.setFirstDayOfWeek(firstDayOfWeek);
    } else {
        this.setFirstDayOfWeek(0);
    }
};

Calendar.prototype.fetchRow = function () {
    if (this.iterationDate > this.lastDayDate) {
        return null;
    }

    var row = [];
    for (var i = 0; i < 7; i++) {
        row.push(new Date(this.iterationDate.getTime()));
        this.iterationDate.setDate(this.iterationDate.getDate() + 1);
    }

    return row;
};

Calendar.prototype.getFirstDay = function () {
    return this.firstDayDate;
};

Calendar.prototype.getFirstDayOfMonth = function () {
    return this.firstDayOfMonthDate;
};

Calendar.prototype.getFirstDayOfNextMonth = function () {
    return new Date(this.firstDayOfMonthDate.getFullYear(), this.firstDayOfMonthDate.getMonth() + 1, 1);
};

Calendar.prototype.getFirstDayOfPreviousMonth = function () {
    return new Date(this.firstDayOfMonthDate.getFullYear(), this.firstDayOfMonthDate.getMonth() - 1, 1);
};

Calendar.prototype.getFirstDayOfWeek = function () {
    return this.firstDayOfWeek;
};

Calendar.prototype.getFullYear = function () {
    return this.firstDayOfMonthDate.getFullYear();
};

Calendar.prototype.getLastDay = function () {
    return this.lastDayDate;
};

Calendar.prototype.getLastDayOfMonth = function () {
    return new Date(this.firstDayOfMonthDate.getFullYear(), this.firstDayOfMonthDate.getMonth() + 1, 0);
};

Calendar.prototype.getLastDayOfNextMonth = function () {
    return new Date(this.firstDayOfMonthDate.getFullYear(), this.firstDayOfMonthDate.getMonth() + 2, 0);
};

Calendar.prototype.getLastDayOfPreviousMonth = function () {
    return new Date(this.firstDayOfMonthDate.getFullYear(), this.firstDayOfMonthDate.getMonth(), 0);
};

Calendar.prototype.getMonth = function () {
    return this.firstDayOfMonthDate.getMonth();
};

Calendar.prototype.setFirstDayOfWeek = function (firstDayOfWeek) {
    if (isNaN(firstDayOfWeek)) {
        throw new TypeError("firstDayOfWeek argument must be a number");
    }

    if (firstDayOfWeek < 0 || firstDayOfWeek > 6) {
        throw new RangeError("firstDayOfWeek argument must be between 0 and 6");
    }

    this.firstDayOfWeek = firstDayOfWeek;

    var firstSundayDate = new Date(this.firstDayOfMonthDate.getTime());
    firstSundayDate.setDate(this.firstDayOfMonthDate.getDate() - this.firstDayOfMonthDate.getDay());

    this.firstDayDate = new Date(firstSundayDate.getTime());
    this.firstDayDate.setDate(firstSundayDate.getDate() + this.firstDayOfWeek);

    if (this.firstDayDate > this.firstDayOfMonthDate) {
        this.firstDayDate.setDate(this.firstDayDate.getDate() - 7);
    }

    this.lastDayDate = new Date(this.firstDayDate.getTime());
    this.lastDayDate.setDate(this.firstDayDate.getDate() + 41);

    this.iterationDate = new Date(this.firstDayDate.getTime());
};
