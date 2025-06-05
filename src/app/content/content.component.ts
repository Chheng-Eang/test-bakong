import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../shared-imports';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [ SHARED_IMPORTS ],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
