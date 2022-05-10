// Welcome to the TypeScript Playground, this is a website
// which gives you a chance to write, share and learn TypeScript.

// You could think of it in three ways:
//
//  - A location to learn TypeScript where nothing can break
//  - A place to experiment with TypeScript syntax, and share the URLs with others
//  - A sandbox to experiment with different compiler features of TypeScript
import { Observable, of, map } from "rxjs";
import { Record } from "./_model";
import { AuthValidationService } from "./auth-pipeline";

// To learn more about the language, click above in "Examples" or "What's New".
// Otherwise, get started by removing these comments and the world is your playground.

let values: Observable<Record[]> = of([
  {
    id: "12345",
    name: "Record1",
    versions: [
      { version: "1234567", active: true },
      { version: "123463", active: false }
    ]
  },
  {
    id: "54236",
    name: "Record2",
    versions: [
      { version: "5433234", active: false },
      { version: "5433235", active: true }
    ]
  }
]);

let obs$ = values.pipe(
  map((values: Record[]) => {
    console.log(values);
    return values;
  })
);

obs$.subscribe((data: Record[]) => data);

let service = new AuthValidationService();

service.validateLogin();
