import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpComponent implements OnInit{

  showPopup: boolean = false;

  ngOnInit() {
    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
    }, 10000); // 10 seconds = 10000 milliseconds
  }

}


