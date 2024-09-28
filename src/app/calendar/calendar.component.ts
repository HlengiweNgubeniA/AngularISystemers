import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentMonth: number;
  currentYear: number;
  daysInMonth: number[];
  weeks: (number | null)[][];
  currentDay: number | null = null;

  constructor(private dialog: MatDialog) {
    const now = new Date();
    this.currentMonth = now.getMonth();
    this.currentYear = now.getFullYear();
    this.currentDay = now.getDate();
    this.daysInMonth = [];
    this.weeks = [];
  }

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar() {
    this.daysInMonth = this.getDaysInMonth(this.currentMonth, this.currentYear);
    this.weeks = this.getCalendarWeeks(this.currentMonth, this.currentYear);
  }

  getDaysInMonth(month: number, year: number): number[] {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  getCalendarWeeks(month: number, year: number): (number | null)[][] {
    const weeks: (number | null)[][] = [];
    const daysInMonth = this.getDaysInMonth(month, year);
    
    // Get the weekday of the first day of the month (0 = Sunday, 6 = Saturday)
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Initialize the first week with null values until the first day starts
    let week: (number | null)[] = new Array(firstDayOfMonth).fill(null);
  
    daysInMonth.forEach(day => {
      week.push(day); // Add the current day to the week
  
      // If the week has 7 days, push it to weeks and start a new week
      if (week.length === 7) {
        weeks.push(week);
        week = []; // Start a new week
      }
    });
  
    // If there are any remaining days in the week, fill with nulls
    if (week.length) {
      while (week.length < 7) {
        week.push(null); // Fill the rest of the week with nulls
      }
      weeks.push(week); // Push the last week
    }
  
    return weeks;
  }  
  

  changeMonth(offset: number) {
    this.currentMonth += offset;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }

  openEventDialog(day: number | null) {
    if (day) {
      const dialogRef = this.dialog.open(AddEventDialogComponent, {
        width: '400px',
        data: { day, month: this.currentMonth, year: this.currentYear }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Handle event creation here (e.g., save event)
          console.log('Event saved:', result);
        }
      });
    }
  }
}



