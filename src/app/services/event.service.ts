import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Event } from '../models/Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventPath = '/Events';

  eventRef: AngularFirestoreCollection<Event> = null;  

  constructor(private db: AngularFirestore) { 
    this.eventRef = db.collection(this.eventPath);
  }

  createEvent(event: Event): void {
    this.eventRef.get().subscribe(
      querySnapshot => {
        querySnapshot.docs.forEach((doc) => {
          let compare = doc.data();
          if (compare.date == event.date && compare.startTime == event.startTime && compare.room == event.room)
            {
              // error for if the event has the same date, time, and room as another the event.
            }
        });
      });

    this.eventRef.add({
      catering: event.catering,
      date: event.date,
      description: event.description,
      startTime: event.startTime,
      endTime: event.endTime,
      menuItem: event.menuItem,
      room: event.room,
      databaseKey: "",
      approved: false,
    }).then(value => {
      event.databaseKey = value.id;
      this.eventRef.doc(value.id).update({...event});
    });
  }

  updateEvent(event: Event): Promise<void> {
    return this.eventRef.doc(event.databaseKey).update(event);
  }

  deleteEvent(event: Event) {
    return this.eventRef.doc(event.databaseKey).delete();
  }

  getEventInfo(key: string) {
    let errorMessage = "";
    
    this.eventRef.get().subscribe(
      querySnapshot => {
        querySnapshot.docs.forEach((doc) => {
          let compare = doc.data();
          if (compare.databaseKey == key) {
            return compare as Event;
          }
          else
          {
            errorMessage = "Something went wrong, try again.";
          }
        }); 
      });

      return errorMessage;
  }

  getAllEvents() {
    return this.eventRef.snapshotChanges();
  }
}
