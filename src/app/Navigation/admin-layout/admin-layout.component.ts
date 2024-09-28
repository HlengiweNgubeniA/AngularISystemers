import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
//import { AuthService } from '../../../service/auth.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserProfileService, UserProfile} from '../../services/user-profile.service';
import { AuthService } from '../../services/auth.service';
import { HostListener } from '@angular/core';



@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit,AfterViewInit {

  @HostListener('window:resize', ['$event'])

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  //isMobile = true;
  isMobile: boolean = false;
  userName: string | null = null;

   userProfile : UserProfile[] = [];


  constructor(private auth: AuthService,private observer: BreakpointObserver, private router: Router, private userProfileService: UserProfileService, private snackBar: MatSnackBar){}

onResize(event: any){
  this.checkScreenSize();
}

  ngOnInit() {
    this.auth.startTimer();
this.checkScreenSize
this.userName = this.auth.getUserProfile();

    this.loadUserProfile();
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      this.isMobile = screenSize.matches;
      if (this.isMobile) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  isCollapsed = true;

  toggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false; // On mobile, the menu can never be collapsed
    } else {
      this.sidenav.toggle(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }
 

checkScreenSize(){
  this.isMobile = window.innerWidth <= 768;
}

  onProfileClick(): void {
    // Logic to open the user's profile
    // This could be a navigation to a profile page or opening a dialog
    this.router.navigate(['/profile']);
  }


  loadUserProfile(): void {
    const userProfile = this.userProfileService.getMyProfile();

    
      
  }

  logout(){
    this.auth.logout();
  }

 

 


}
