import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FoodItem } from '../models/FoodSupplies';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private foodPath = '/Kitchen Food Supplies';

  foodRef: AngularFirestoreCollection<FoodItem> = null;  

  constructor(private db: AngularFirestore) { 
    this.foodRef = db.collection(this.foodPath);
  }

  createEquipmentItem(item: FoodItem): void {
    this.foodRef.add({
      expirationDate: item.expirationDate,
      name: item.name,
      quantity: item.quantity,
      databaseKey: "",
    }).then(value => {
      item.databaseKey = value.id;
      this.foodRef.doc(value.id).update({...item});
    });
  }

  updateFoodItem(item: FoodItem): Promise<void> {
    return this.foodRef.doc(item.databaseKey).update(item);
  }

  deleteFoodItem(item: FoodItem) {
    return this.foodRef.doc(item.databaseKey).delete();
  }

  getFoodItem(key: string) {
    let errorMessage = "";
    
    this.foodRef.get().subscribe(
      querySnapshot => {
        querySnapshot.docs.forEach((doc) => {
          let compare = doc.data();
          if (compare.databaseKey == key) {
            return compare as FoodItem;
          }
          else
          {
            errorMessage = "Something went wrong, try again.";
          }
        }); 
      });

      return errorMessage;
  }

  getAllFoodItems() {
    return this.foodRef.snapshotChanges();
  }
}
