import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {PaticipantService} from '../services/paticipant.service';
import {map} from 'rxjs/operators';
import Participant from '../models/participant.model';
import {ActionSheetService, ToastService} from 'ng-zorro-antd-mobile';

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
  checked = true;
  participants?: Participant[];
  filteredParticipants?: Participant[];
  searchBy = '';
  selectedType = 'All';

  constructor(private element: ElementRef,
              private renderer: Renderer2,
              private participantSevice: PaticipantService,
              private actionSheet: ActionSheetService,
              private toast: ToastService) {
  }

  ngOnInit(): void {
    this.retrieveParticipants();
  }

  retrieveParticipants(): void {
    this.participantSevice.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({key: c.payload.key, ...c.payload.val()})
        )
      )
    ).subscribe(data => {
      this.participants = data;
      this.filteredParticipants = this.participants;
      this.filterParicipants();
    });
  }

  public renderHeader2(): string {
    return 'Paticipants';
  }

  public extra(): string {
    return 'Paticipants';
  }

  public onClick(): void {
    console.log('click');
  }

  change($event) {
    this.searchBy = $event;
    this.filterParicipants();
  }

  submit(value) {
    console.log(value, 'onSubmit');
  }

  clear(value) {
    this.searchBy = '';
    this.filteredParticipants = this.participants;
    this.filterParicipants();
  }

  focus() {
    console.log('onFocus');
  }

  blur() {
    console.log('onBlur');
  }

  cancel() {
    this.searchBy = '';
    this.filteredParticipants = this.participants;
    this.filterParicipants();
  }

  handleClick() {
    this.focusObj = {
      focusValue: true,
      date: new Date()
    };
  }

  check(event) {
    console.log(event);
  }

  onClickSwitch(event) {
    console.log(event);
  }

  choose(event) {
    this.selectedType = event.value;
    this.filterParicipants();
  }


  private filterParicipants() {
    switch (this.selectedType) {
      case 'All':
        this.filteredParticipants = this.participants
          .filter(o => o.name.toLowerCase().includes(this.searchBy.toLowerCase()) && !o.isParticipated);
        break;
      case 'Groom':
        this.filteredParticipants = this.participants
          .filter(o => o.name.toLowerCase().includes(this.searchBy.toLowerCase()) && o.isGroom && !o.isParticipated);
        break;
      case 'Bride':
        this.filteredParticipants = this.participants
          .filter(o => o.name.toLowerCase().includes(this.searchBy.toLowerCase()) && !o.isGroom && !o.isParticipated);
        break;
      case  'Participated':
        this.filteredParticipants = this.participants
          .filter(o => o.name.toLowerCase().includes(this.searchBy.toLowerCase()) && o.isParticipated);
        break;
    }
  }

  private updateParticipated(participant: Participant){
    this.participantSevice.update(participant.key, {isParticipated: true}).then((response) => {
      const toast = this.toast.info('Marked as participated', 4000, null, false, 'bottom');
    }).catch(err => {
      this.toast.fail('Load failed !!!', 1000);
    });
  }

  showActionSheet = (participant: Participant) => {
    const BUTTONS = ['Mark as Participated', 'Cancel'];
    this.actionSheet.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length - 1,
        destructiveButtonIndex: BUTTONS.length - 2,
        title: participant.name,
        message: 'This person participated',
        maskClosable: true,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this.updateParticipated(participant);
            break;
          default:
            break;
        }
      }
    );
  }
}
