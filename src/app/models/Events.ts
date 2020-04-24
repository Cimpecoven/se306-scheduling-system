export interface IEvent{
    databaseKey: string;
    date: string;
    startTime: string;
    endTime: string;
    room: string;
    catering: boolean;
}

export class Event{
    databaseKey: string;
    date: string;
    startTime: string;
    endTime: string;
    room: string;
    catering: boolean;
    menuItem?: string;
    description?: string;

    constructor(databaseKey: string, date: string, startTime: string, endTime: string, room: string, catering: boolean, menuItem: string, description: string){
        this.databaseKey = databaseKey;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.room = room;
        this.catering = catering;

        if(menuItem)
        this.menuItem = menuItem;

        if(description)
        this.description = description;
    }
}

export const EventConverter = {
    toFirestore(event: Event){
        return{
            date: event.date,
            startTime: event.startTime,
            endTime: event.endTime,
            room: event.room,
            catering: event.catering,
            menuItem: event.menuItem,
            description: event.description,
        }
    },
    fromFirestore(snapshot, options){
        const data = snapshot.data(options);
        return new Event(data.dadabaseKey, data.date, data.startTime, data.endTime, data.room, data.catering, data.menuItem, data.description);
    }
}