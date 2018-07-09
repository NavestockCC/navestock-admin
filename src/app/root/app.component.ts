import { Component } from '@angular/core';
import { style } from '@angular/animations';
import {BannerComponent} from '../banner/banner.component';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
}
