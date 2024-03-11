"use strict";

class DatePicker {

  constructor(id, callback) {
    this.id = id; 
    this.callback = callback; 
  }
  parseDate(date) {
    this.parseDate = this.parseDate.bind(this); 

    return {
      month: date.getMonth() + 1,
      day: date.getDate(),
      year: date.getFullYear(),
    };
  }
  render(date) {
    const parent = document.getElementById(this.id);
    parent.appendChild(this.getCalendarTable(date)); 
  }

  getCalendarTable(date) {
    const table = document.createElement("table");
    table.appendChild(this.getMonthYearHeader(table, date)); 
    table.appendChild(this.getWeekHeader()); 
    this.generateDaysContent(table, date); 
    return table; 
  }

  
  getMonthYearHeader(table, date) {
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
   

    const row = document.createElement("tr");
    row.className = "calendar-header";
    const middle = row.insertCell(0);
    const pDate = this.parseDate(date);
    middle.innerHTML = months[pDate.month - 1] + "-" + pDate.year;
    middle.colSpan = "5"; 
 

    const left = row.insertCell(0);
    left.innerHTML = "<";
    left.onclick = () => this.handleArrow(table, date);
    
   
    const right = row.insertCell(-1);
    right.innerHTML = ">";
    right.onclick = () => this.handleArrow(table, date, true);

    return row;
  }

  handleArrow(table, date, rightArrow=false) {
    table.remove();
    date.setMonth(rightArrow ? date.getMonth()+1 : date.getMonth()-1);
    this.render(date); 
  }

  
  getWeekHeader() {
    this.getWeekHeader = this.getWeekHeader.bind(this); 

    const day = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const row = document.createElement("tr");

    day.forEach((day) => {
      const cell = row.insertCell(-1);
      cell.innerHTML = day;
    });

    row.className = "calendar-header";
    return row;
  }

  fillPreDays(row, date) {
    this.fillPreDays = this.fillPreDays.bind(this);

 
    const weekdayIndex = new Date(date.getFullYear(), date.getMonth(),1).getDay();

    
    const preMonthTotalDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    
    
    for (let i = 0; i < weekdayIndex; i++) {
      const cell = row.insertCell(0);
      cell.innerHTML = preMonthTotalDays - i;
      cell.className = "pre-month-cell";
    }

    return weekdayIndex; 
  }

  generateDaysContent(table, date) {
    let row = table.insertRow(-1); 
    const preMonthDays = this.fillPreDays(row, date);
    const currMonthDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    for (let day = 1; day < currMonthDays + 1; day++) {
      const cell = row.insertCell(-1);
      cell.innerHTML = day;
      cell.className = "curr-month-cell";
      cell.onclick = () => {
        date.setDate(day); 
        this.callback(table.parentNode.id, this.parseDate(date));
      };

      
      if ( ((preMonthDays + day) % 7 === 0) && (day !== currMonthDays) ) {
        row = table.insertRow(-1); 
      }
    }

    const postDays = 7 - ((preMonthDays + currMonthDays) % 7);
    if (postDays !== 7) { 
      for (let postDay = 1; postDay < postDays + 1; postDay++) {
        const cell = row.insertCell(-1);
        cell.innerHTML = postDay;
        cell.className = "post-month-cell";
      }
    }
  }

  
} 