import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-paricipant-list',
  templateUrl: './paricipant-list.component.html',
  styleUrls: ['./paricipant-list.component.css']
})
export class ParicipantListComponent implements OnInit {
  value: string;
  focusObj = {
    focusValue: false,
    date: new Date()
  };

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  public renderHeader2(): string{
    return 'Paticipants';
  }

  public onClick(): void {
    console.log('click');
  }

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
