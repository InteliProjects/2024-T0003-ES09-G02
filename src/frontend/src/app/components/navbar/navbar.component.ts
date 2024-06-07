import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  currentPageName: string = "";
  navBarClass: string = "";

  navLinks: { path: string; label: string }[] = [
    { path: '/pesquisas', label: 'Pesquisas' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.updatePageBasedOnRoute(this.router.url);
  }

  private updatePageBasedOnRoute(url: string): void {
    if (url === "/pesquisas") {
      this.currentPageName = "Pesquisas";
      this.navBarClass = "navbar-home";
    } 
    // else if (url === "/about") {
    //   this.currentPageName = "About";
    //   this.navBarClass = "navbar-about";
    // }
  }
}
