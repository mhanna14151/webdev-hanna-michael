import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private sanitzer: DomSanitizer) { }

  ngOnInit() {
  }

  navigateToAssignment() {
    this.router.navigate(['login']);
  }

  cleanThisUrl(url) {
    let thisUrl = 'https://www.youtube.com/embed/';
    const end = url.split('/');
    thisUrl += end[end.length - 1];
    return this.sanitzer.bypassSecurityTrustResourceUrl(thisUrl);
  }

}
