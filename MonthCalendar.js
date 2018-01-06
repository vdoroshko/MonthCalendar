/**
 * Copyright (c) 2016-2018 Vitaly Doroshko.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its contributors
 *    may be used to endorse or promote products derived from this software
 *    without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

var MonthCalendar = function (year, month, firstDayOfWeek) {
    if (arguments.length < 2) {
        throw new TypeError("Not enough arguments to MonthCalendar");
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

MonthCalendar.prototype.fetchRow = function () {
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

MonthCalendar.prototype.getFirstDate = function () {
    return this.firstDate;
};

MonthCalendar.prototype.getFirstDateOfMonth = function () {
    return this.firstDateOfMonth;
};

MonthCalendar.prototype.getFirstDateOfNextMonth = function () {
    return new Date(this.firstDateOfMonth.getFullYear(), this.firstDateOfMonth.getMonth() + 1);
};

MonthCalendar.prototype.getFirstDateOfPreviousMonth = function () {
    var firstDateOfPreviousMonth = new Date(this.firstDateOfMonth.getFullYear(), this.firstDateOfMonth.getMonth() - 1);

    if (isNaN(firstDateOfPreviousMonth)) {
        return null;
    }

    return firstDateOfPreviousMonth;
};

MonthCalendar.prototype.getFirstDayOfWeek = function () {
    return this.firstDayOfWeek;
};

MonthCalendar.prototype.getFullYear = function () {
    return this.firstDateOfMonth.getFullYear();
};

MonthCalendar.prototype.getLastDate = function () {
    return this.lastDate;
};

MonthCalendar.prototype.getLastDateOfMonth = function () {
    return new Date(this.firstDateOfMonth.getFullYear(), this.firstDateOfMonth.getMonth() + 1, 0);
};

MonthCalendar.prototype.getLastDateOfNextMonth = function () {
    var lastDateOfNextMonth = new Date(this.firstDateOfMonth.getFullYear(), this.firstDateOfMonth.getMonth() + 2, 0);

    if (isNaN(lastDateOfNextMonth)) {
        return null;
    }

    return lastDateOfNextMonth;
};

MonthCalendar.prototype.getLastDateOfPreviousMonth = function () {
    return new Date(this.firstDateOfMonth.getFullYear(), this.firstDateOfMonth.getMonth(), 0);
};

MonthCalendar.prototype.getMonth = function () {
    return this.firstDateOfMonth.getMonth();
};

MonthCalendar.prototype.setFirstDayOfWeek = function (firstDayOfWeek) {
    if (isNaN(firstDayOfWeek)) {
        throw new TypeError("firstDayOfWeek argument must be a number");
    }

    if (firstDayOfWeek < 0 || firstDayOfWeek > 6) {
        throw new RangeError("firstDayOfWeek argument must be between 0 and 6");
    }

    this.firstDayOfWeek = Number(firstDayOfWeek);

    this.firstDate = new Date(this.firstDateOfMonth.getTime());
    this.firstDate.setDate(this.firstDate.getDate() - this.firstDate.getDay() + this.firstDayOfWeek);

    if (this.firstDate > this.firstDateOfMonth) {
        this.firstDate.setDate(this.firstDate.getDate() - 7);
    }

    this.lastDate = new Date(this.firstDate.getTime());
    this.lastDate.setDate(this.lastDate.getDate() + 41);

    this.iterationDate = new Date(this.firstDate.getTime());
};
