# MonthCalendar

The **MonthCalendar** object provides support for generating month calendars.

## Usage Example

Fetch arrays of weeks containing Date objects for the current month of the year:

```JavaScript
var currentDate = new Date;
var monthCalendar = new MonthCalendar(currentDate.getFullYear(), currentDate.getMonth(), 1);

var weekRow;
while (weekRow = monthCalendar.fetchRow()) {
    console.log(weekRow);
}
```
Will output:

```
[Log] [
    Mon Jan 01 2018 00:00:00 GMT+0300 (+03),
    Tue Jan 02 2018 00:00:00 GMT+0300 (+03),
    Wed Jan 03 2018 00:00:00 GMT+0300 (+03),
    Thu Jan 04 2018 00:00:00 GMT+0300 (+03),
    Fri Jan 05 2018 00:00:00 GMT+0300 (+03),
    Sat Jan 06 2018 00:00:00 GMT+0300 (+03),
    Sun Jan 07 2018 00:00:00 GMT+0300 (+03)
] (7)

[Log] [
    Mon Jan 08 2018 00:00:00 GMT+0300 (+03),
    Tue Jan 09 2018 00:00:00 GMT+0300 (+03),
    Wed Jan 10 2018 00:00:00 GMT+0300 (+03),
    Thu Jan 11 2018 00:00:00 GMT+0300 (+03),
    Fri Jan 12 2018 00:00:00 GMT+0300 (+03),
    Sat Jan 13 2018 00:00:00 GMT+0300 (+03),
    Sun Jan 14 2018 00:00:00 GMT+0300 (+03)
] (7)

[Log] [
    Mon Jan 15 2018 00:00:00 GMT+0300 (+03),
    Tue Jan 16 2018 00:00:00 GMT+0300 (+03),
    Wed Jan 17 2018 00:00:00 GMT+0300 (+03),
    Thu Jan 18 2018 00:00:00 GMT+0300 (+03),
    Fri Jan 19 2018 00:00:00 GMT+0300 (+03),
    Sat Jan 20 2018 00:00:00 GMT+0300 (+03),
    Sun Jan 21 2018 00:00:00 GMT+0300 (+03)
] (7)
```

## Syntax

<span style="color: #d73a49;">new MonthCalendar</span>();
new MonthCalendar(<i>date</i>);

## Methods

## Browser Support

* Chrome
* Opera 5+
* Firefox
* Safari
* Internet Explorer 5.5+

## License

Licensed under the [BSD 3-Clause License](http://opensource.org/licenses/BSD-3-Clause).
