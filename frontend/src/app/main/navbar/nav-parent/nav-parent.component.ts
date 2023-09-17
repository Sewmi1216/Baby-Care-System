// import { Component } from '@angular/core';
//
// @Component({
//   selector: 'app-nav-parent',
//   templateUrl: './nav-parent.component.html',
//   styleUrls: ['./nav-parent.component.css']
// })
// export class NavParentComponent {
//
// }


import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-parent',
  templateUrl: './nav-parent.component.html',
  styleUrls: ['./nav-parent.component.css']
})
export class NavParentComponent {
  private _isFree: boolean = false; // Initialize with a default value

  get isFree(): boolean {
    return this._isFree;
  }

  set isFree(value: boolean) {
    this._isFree = value;
  }
}
