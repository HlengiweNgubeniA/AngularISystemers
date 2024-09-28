import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserProfileService, UserProfile} from '../../services/user-profile.service';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrl: './admin-navigation.component.css'
})
export class AdminNavigationComponent {

  userName: string | undefined;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;

   userProfile : UserProfile[] = [];

   constructor(private observer: BreakpointObserver, private router: Router, private userProfileService: UserProfileService, private snackBar: MatSnackBar){}

   ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {

      this.isMobile = screenSize.matches;
      if(this.isMobile){
        this.sidenav.mode = 'over'
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });

    this.loadUserProfile();
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

  onProfileClick(): void {
    // Logic to open the user's profile
    // This could be a navigation to a profile page or opening a dialog
    this.router.navigate(['/profile']);
  }


  loadUserProfile(): void {
    const userProfile = this.userProfileService.getMyProfile();

    
    
  }

}
