import { Component, OnInit } from '@angular/core';

declare var animate: any;

@Component({
  selector: 'app-animate-image',
  templateUrl: './animate-image.component.html',
  styleUrls: ['./animate-image.component.css']
})
export class AnimateImageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    new animate();

  }

}
