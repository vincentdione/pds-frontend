import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, AfterViewInit } from '@angular/core';


/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;

  role!:string;

  private _mobileQueryListener: () => void;


  ngOnInit(){
    const roleFromLocalStorage = localStorage.getItem('role');
    console.log("object is role from local storage "+this.role);

    if (roleFromLocalStorage !== null) {
      this.role = roleFromLocalStorage.replace(/"/g, '');
    }
  }

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() { }
}
