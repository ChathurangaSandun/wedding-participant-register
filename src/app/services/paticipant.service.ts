import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Participant from '../models/participant.model';


@Injectable({
  providedIn: 'root'
})
export class PaticipantService {

  private dbPath = '/participants';

  participantRef: AngularFireList<Participant>;

  constructor(private db: AngularFireDatabase) {
    this.participantRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Participant> {
    return this.participantRef;
  }

  update(key: string, value: any): Promise<void> {
    return this.participantRef.update(key, value);
  }
}
