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

    this.firstDateOfMonth = new Date(year, month);

    if (isNaN(this.firstDateOfMonth) || isNaN(new Date(year, month + 1))) {
        throw new RangeError("year and month arguments results in an invalid combination");
    }

    if (arguments.length > 2) {
        this.setFirstDayOfWeek(firstDayOfWeek);
    } else {
        this.setFirstDayOfWeek(0);
    }
};

Calendar.prototype.fetchRow = function () {
    if (this.iterationDate > this.lastDate) {
        return null;
    }

    var row = [];

    for (var i = 0; i < 7; i++) {
        row.push(new Date(this.iterationDate.getTime()));
        this.iterationDate.setDate(this.iterationDate.getDate() + 1);
    }

    return row;
};

Calendar.prototype.getFirstDate = function () {
    return this.firstDate;
};

Calendar.prototype.getFirstDateOfMonth = function () {
    return this.firstDateOfMonth;
};

Calendar.prototype.getFirstDateOfNextMonth = function () {
    return new Date(this.firstDateOfMonth.getFullYear(), this.firstDateOfMonth.getMonth() + 1, 1);
};

Calendar.prototype.getFirstDateOfPreviousMonth = function () {
    var firstDateOfPreviousMonth = new Date(this.firstDateOfMonth.getFullYear(), this.firstDateOfMonth.getMonth() - 1, 1);

    if (isNaN(firstDateOfPreviousMonth)) {
        return null;
    }

    return firstDateOfPreviousMonth;
};

Calendar.prototype.getFirstDayOfWeek = function () {
    return this.firstDayOfWeek;
};

Calendar.prototype.getFullYear = function () {
    return this.firstDateOfMonth.getFullYear();
};

Calendar.prototype.getLastDate = function () {
    return this.lastDate;
};

Calendar.prototype.getLastDateOfMonth = function () {
    return new Date(this.firstDateOfMonth.getFullYear(), this.firstDateOfMonth.getMonth() + 1, 0);
};

Calendar.prototype.getLastDateOfNextMonth = function () {
    var lastDateOfNextMonth = new Date(this.firstDateOfMonth.getFullYear(), this.firstDateOfMonth.getMonth() + 2, 0);

    if (isNaN(lastDateOfNextMonth)) {
        return null;
    }

    return lastDateOfNextMonth;
};

Calendar.prototype.getLastDateOfPreviousMonth = function () {
    return new Date(this.firstDateOfMonth.getFullYear(), this.firstDateOfMonth.getMonth(), 0);
};

Calendar.prototype.getMonth = function () {
    return this.firstDateOfMonth.getMonth();
};

Calendar.prototype.setFirstDayOfWeek = function (firstDayOfWeek) {
    if (isNaN(firstDayOfWeek)) {
        throw new TypeError("firstDayOfWeek argument must be a number");
    }

    if (firstDayOfWeek < 0 || firstDayOfWeek > 6) {
        throw new RangeError("firstDayOfWeek argument must be between 0 and 6");
    }

    this.firstDayOfWeek = firstDayOfWeek;

    this.firstDate = new Date(this.firstDateOfMonth.getTime());
    this.firstDate.setDate(this.firstDate.getDate() - this.firstDate.getDay() + this.firstDayOfWeek);

    if (this.firstDate > this.firstDateOfMonth) {
        this.firstDate.setDate(this.firstDate.getDate() - 7);
    }

    this.lastDate = new Date(this.firstDate.getTime());
    this.lastDate.setDate(this.lastDate.getDate() + 41);

    this.iterationDate = new Date(this.firstDate.getTime());
};
