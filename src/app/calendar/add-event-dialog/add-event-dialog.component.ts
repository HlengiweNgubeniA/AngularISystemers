import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-add-event-dialog',
  template: `
    <h1 mat-dialog-title>Add Event</h1>
    <div mat-dialog-content>
      <p>Event for {{data.day}}/{{data.month + 1}}/{{data.year}}</p>
      <mat-form-field>
      <input matInput placeholder="Event Name" [(ngModel)]="eventName" required>
      <mat-error *ngIf="!eventName">Event name is required</mat-error>
      </mat-form-field>
      <mat-form-field>
      <input matInput placeholder="Reminder Date" [(ngModel)]="reminderDate" type="date">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button (click)="onSave()">Save</button>
    </div>
  `,
 styles: ['mat-form-field { width: 100%; }']
})
export class AddEventDialogComponent {
  eventName: string = '';
  reminderDate: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.eventName) {
      this.dialogRef.close({ eventName: this.eventName, reminderDate: this.reminderDate });
    }
  }
}
