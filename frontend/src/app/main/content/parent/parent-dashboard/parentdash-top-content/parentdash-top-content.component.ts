import { Component } from '@angular/core';
import  { faBaby } from "@fortawesome/free-solid-svg-icons/faBaby";
import { faIdBadge } from "@fortawesome/free-solid-svg-icons/faIdBadge";

@Component({
  selector: 'app-parentdash-top-content',
  templateUrl: './parentdash-top-content.component.html',
  styleUrls: ['./parentdash-top-content.component.css']
})
export class ParentdashTopContentComponent {

  faBaby = faBaby;
  faIdBadge = faIdBadge

}
