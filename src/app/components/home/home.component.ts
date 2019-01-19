import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector : 'app-home',
  templateUrl : './home.component.html',
  styleUrls : [ './home.component.css' ]
})
export class HomeComponent {

  @ViewChild('addPost') addButton: ElementRef;

  constructor(private commonService: CommonService, private _router: Router) {

    if (!localStorage.getItem('loggedInUser')) {
      this._router.navigate([ '/' ]);
    }

    this.commonService.editPost$.subscribe(() => {
      this.addButton.nativeElement.click();
    });

  }

  /**
   * Metoda służy do wylogowania użytkownika
   */
  logout() {
    localStorage.removeItem('loggedInUser');
    this._router.navigate([ '/' ]);
  }

}
