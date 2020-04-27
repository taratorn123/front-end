import { Component, Input, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'read-more',
  templateUrl: './readmore.component.html',
  styleUrls: ['./readmore.component.css']
})
export class ReadMoreComponent {
  isCollapsed = true;
}