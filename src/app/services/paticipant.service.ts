import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Participant from '../models/participant.model';


@Injectable({
  providedIn: 'root'
})
export class PaticipantService {

  private dbPath = '/participants';

  tutorialsRef: AngularFireList<Participant>;

  constructor(private db: AngularFireDatabase) {
    this.tutorialsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Participant> {
    return this.tutorialsRef;
  }

  update(key: string, value: any): Promise<void> {
    return this.tutorialsRef.update(key, value);
  }
}
