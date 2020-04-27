import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Equipment } from '../models/Equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private equipmentPath = '/equipment';

  equipmentRef: AngularFirestoreCollection<Equipment> = null;  

  constructor(private db: AngularFirestore) { 
    this.equipmentRef = db.collection(this.equipmentPath);
  }

  createEquipmentItem(equipment: Equipment): void {
    this.equipmentRef.add({
      condition: equipment.condition,
      location: equipment.location,
      name: equipment.name,
      quantity: equipment.quantity,
      databaseKey: "",
    }).then(value => {
      equipment.databaseKey = value.id;
      this.equipmentRef.doc(value.id).update({...equipment});
    });
  }

  updateEquipmentItem(equipment: Equipment): Promise<void> {
    return this.equipmentRef.doc(equipment.databaseKey).update({...equipment});
  }

  deleteEquipmentItem(equipment: Equipment) {
    return this.equipmentRef.doc(equipment.databaseKey).delete();
  }

  getEquipmenttInfo(key: string) {
    let errorMessage = "";
    
    this.equipmentRef.get().subscribe(
      querySnapshot => {
        querySnapshot.docs.forEach((doc) => {
          let compare = doc.data();
          if (compare.databaseKey == key) {
            return compare as Equipment;
          }
          else
          {
            errorMessage = "Something went wrong, try again.";
          }
        }); 
      });

      return errorMessage;
  }

  getAllEquipmentItems() {
    return this.equipmentRef.snapshotChanges();
  }
}
