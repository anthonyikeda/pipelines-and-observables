// Welcome to the TypeScript Playground, this is a website
// which gives you a chance to write, share and learn TypeScript.
/*
// You could think of it in three ways:
//
//  - A location to learn TypeScript where nothing can break
//  - A place to experiment with TypeScript syntax, and share the URLs with others
//  - A sandbox to experiment with different compiler features of TypeScript
import { Observable, of, map } from 'rxjs';

// To learn more about the language, click above in "Examples" or "What's New".
// Otherwise, get started by removing these comments and the world is your playground.

interface RecordVersion {
    version: string;
    active: boolean;
};

interface Record {
    id: string;
    name: string;
    versions: RecordVersion[];
}

let values: Observable<Record[]> = of([
    { id: '12345', name: 'Record1', versions: [ { version: "1234567", active: true}, {version: "123463", active: false}]},
    { id: '54236', name: 'Record2', versions: [ { version: "5433234", active: false}, { version: "5433235", active: true}]}
]);

let obs$ = values.pipe(
    map(values => {
        console.log(values);
        return values;
    })
);

obs$.subscribe(data => data);

*/

import { switchMap, map, of, Observable } from "rxjs";

interface LinkedAccount {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
}

interface User {
  id: number;
  email: string;
}

let getLinkedAccounts = (email: string): Observable<LinkedAccount> => {
  const acct: LinkedAccount = {
    id: 4092,
    email: email,
    firstname: "Joseph",
    lastname: "Matthews"
  };

  return of(acct);
};

let currUser: User = {
  id: 4000,
  email: "user@home.com"
};

let isAuthenticated$ = of(true);
let user$ = of(currUser);

let process$ = isAuthenticated$.pipe(
  switchMap((isLoggedIn) => {
    if (isLoggedIn) {
      console.log("User is logged in");
      return user$.pipe(map((item) => item?.email));
    } else {
      console.log("User is not logged in");
      return of("");
    }
  }),
  map((email) => {
    console.log(`Email is ${email}`);
    return email;
  }),
  switchMap((email) => getLinkedAccounts(email))
);

process$.subscribe((data) => {
  console.log(data);
});
