import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector : 'app-home',
  templateUrl : './home.component.html',
  styleUrls : [ './home.component.css' ]
})
export class HomeComponent {

  @ViewChild('addPost') addButton: ElementRef;

  constructor(private _commonService: CommonService) {
    this._commonService.editPost$.subscribe(() => {
      this.addButton.nativeElement.click();
    });
  }

}
