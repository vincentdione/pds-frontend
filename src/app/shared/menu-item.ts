import { Injectable } from "@angular/core"

export interface  Menu {
  state: string,
  name: string,
  icon: string,
  role: string
}

const MENU_ITEMS = [
  {state : 'dashboard', name: 'Dashboard', icon: 'dashboard', role:'ROLE_ADMIN'},
  {state : 'cadres', name: 'Cadres', icon: 'people', role:'ROLE_ADMIN'},
  {state : 'localites', name: 'Localités', icon: 'people', role:'ROLE_ADMIN'},
]


@Injectable()
export class MenuItems {
  getMenuItems(): Menu[] {
     return MENU_ITEMS;
  }
}
