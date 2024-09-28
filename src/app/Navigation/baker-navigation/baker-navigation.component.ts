import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { UserProfile } from '../../services/user-profile.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserProfileService } from '../../services/user-profile.service';
import { OrderProcessingService } from '../../Order-Processing/order-processing.service';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-baker-navigation',
  templateUrl: './baker-navigation.component.html',
  styleUrl: './baker-navigation.component.css'
})
export class BakerNavigationComponent implements OnInit, AfterViewInit {
orderCount: number = 0;
isFlickering: boolean = true;
userName: string | null = null;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  

   userProfile : UserProfile[] = [];


  constructor(private orderProrocessingService: OrderProcessingService,private auth: AuthService,private observer: BreakpointObserver, private router: Router, private userProfileService: UserProfileService, private snackBar: MatSnackBar){}

  ngOnInit() {
   
    this.auth.startTimer();
    this.userName = this.auth.getUserProfile();
    this.orderProrocessingService.orderCount$.subscribe(
      count =>{
        this.orderCount = count;

        
        this.isFlickering = true;
        

        setTimeout(() => {
           this.isFlickering =false;
        },60000);

      }
    );



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
