import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Event, IEvent } from '../models/Events';
import { Subject, Observable, merge } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private eventPath = 'Events';

  // private itemsCollection: AngularFirestoreCollection<IEvent>;

  // private items: Observable<IEvent[]>;

  // public currentEvent: Subject<IEvent>;

  eventRef: AngularFirestoreCollection<Event> = null;

  constructor(private db: AngularFirestore) {
    this.eventRef = db.collection(this.eventPath);
    // this.currentEvent = new Subject<IEvent>();
    // this.itemsCollection = db.collection<IEvent>('items');
    // this.items = this.itemsCollection.valueChanges();
  }

  createEvent(event: Event): void{
    this.eventRef.get().subscribe(
      querySnapshot => {
        querySnapshot.docs.forEach((doc) => {
          let compare = doc.data();
          if (compare.date == event.date && compare.startTime == event.startTime && compare.room == event.room)
            throw "There is already an event scheduled at that time and in that room.";
        });
      },
      error => {
        console.log('Error: ', error);
        return;
      });

      this.eventRef.add({
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
        room: event.room,
        catering: event.catering,
        menuItem: event.menuItem,
        description: event.description,
        databaseKey: "",
      }).then(value => {
        event.databaseKey = value.id;
        this.eventRef.doc(value.id).update({...event});
      });
  }

  updateEventInfo(event: Event): Promise<void>{
    // console.log('in updateEventInfo');
    return this.eventRef.doc(event.databaseKey).update({date: event.date,
                                                                    startTime: event.startTime,
                                                                    endTime: event.endTime,
                                                                    room: event.room,
                                                                    catering: event.catering,
                                                                    menuItem: event.menuItem,
                                                                    description: event.description,
                                                                    databaseKey: event.databaseKey});
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

  public getAllEvents(){
    //return this.eventRef.snapshotChanges();
    return this.eventRef.snapshotChanges();
  }

  deleteEvent(event: Event) {
    return this.eventRef.doc(event.databaseKey).delete();
  }
}
