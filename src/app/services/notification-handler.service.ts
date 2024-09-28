import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationHandlerService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(type: string, title: string, message: string) {
 
    this.snackBar.open(`${title}: ${message}`, 'Close', {
      duration: 3000,
      panelClass: [type]
    });
  }
}
