import { Injectable } from '@angular/core';
import { Observable, from, shareReplay } from 'rxjs';
import { RxCollection, RxDatabase, RxDocument, createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

import { Journey, journeysSchema } from '../interfaces/journey';

type JourneyCollection = RxCollection<Journey>;
type JourneyDatabaseCollection = {
  journeys: JourneyCollection;
};

export type JourneyDatabase = RxDatabase<JourneyDatabaseCollection>;
export type JourneyDocument = RxDocument<Journey>;

@Injectable({ providedIn: 'root' })
export class JourneyStorageService {
  async initDb(): Promise<JourneyDatabase> {
    const rxdbCreator = await createRxDatabase<JourneyDatabaseCollection>({
      name: 'journeys',
      storage: getRxStorageDexie(),
    });

    await rxdbCreator.addCollections({
      journeys: {
        schema: journeysSchema,
      },
    });

    return rxdbCreator;
  }

  db$: Observable<JourneyDatabase> = from(this.initDb()).pipe(shareReplay(1));
}
