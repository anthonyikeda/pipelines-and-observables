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
