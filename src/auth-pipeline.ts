import { switchMap, map, of, Observable } from "rxjs";
import { LinkedAccount, User } from "./_model";

export class AuthValidationService {
  // constructor() {}

  getLinkedAccounts(email: string): Observable<LinkedAccount> {
    const acct: LinkedAccount = {
      id: 4092,
      email: email,
      firstname: "Joseph",
      lastname: "Matthews"
    };

    return of(acct);
  }

  validateLogin(): void {
    let currUser: User = {
      id: 4000,
      email: "user@home.com"
    };

    let isAuthenticated$: Observable<boolean> = of(true);
    let user$ = of(currUser);

    let process$ = isAuthenticated$.pipe(
      switchMap((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          console.log("User is logged in");
          return user$.pipe(map((item: User) => item?.email));
        } else {
          console.log("User is not logged in");
          return of("");
        }
      }),
      map((email: string) => {
        console.log(`Email is ${email}`);
        return email;
      }),
      switchMap((email: string) => this.getLinkedAccounts(email))
    );

    process$.subscribe((data: LinkedAccount[]) => {
      console.log(data);
    });
  }
}
