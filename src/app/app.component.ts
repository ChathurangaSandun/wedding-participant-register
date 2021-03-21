import {Component, ElementRef, Renderer2} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  value: string = '美食';
  autoFocus = {
    focusValue: true
  };
  focusObj = {
    focusValue: false,
    date: new Date()
  };

  constructor(private _element: ElementRef, private _renderer: Renderer2) {}

  change($event) {
    console.log($event, 'onChange');
  }

  submit(value) {
    console.log(value, 'onSubmit');
  }

  clear(value) {
    console.log(value, 'onClear');
  }

  focus() {
    console.log('onFocus');
  }

  blur() {
    console.log('onBlur');
  }

  cancel() {
    console.log('onCancel');
  }

  handleClick() {
    this.focusObj = {
      focusValue: true,
      date: new Date()
    };
  }
}
