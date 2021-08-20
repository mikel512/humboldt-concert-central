import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader-animation',
  templateUrl: './loader-animation.component.html',
  styleUrls: ['./loader-animation.component.css']
})
export class LoaderAnimationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    document.querySelector('button').addEventListener('click', function (evt) {
      this.textContent = this.textContent === 'hide' ? 'show' : 'hide';
      document.querySelector('html').classList.toggle('loading');
    }, false);


  }

}
