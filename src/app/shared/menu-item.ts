import { Injectable } from "@angular/core"

export interface  Menu {
  state: string,
  name: string,
  icon: string,
  role: string
}

const MENU_ITEMS = [
  {state : 'dashboard', name: 'Dashboard', icon: 'dashboard', role:'ROLE_SUPER_ADMIN'},
  {state : 'users', name: 'Utilisateurs', icon: 'person', role:'ROLE_SUPER_ADMIN'},
  {state : 'cadres', name: 'Cadres', icon: 'people', role:'ROLE_SUPER_ADMIN'},
  {state : 'dashboard', name: 'Dashboard', icon: 'dashboard', role:'ROLE_ADMIN'},
  {state : 'cadres', name: 'Cadres', icon: 'people', role:'ROLE_ADMIN'},
  {state : 'regions', name: 'Régions', icon: 'house', role:'ROLE_ADMIN'},
  {state : 'departements', name: 'Départements', icon: 'domain', role:'ROLE_ADMIN'},
  {state : 'communes', name: 'Communes', icon: 'local_activity', role:'ROLE_ADMIN'},
  {state : 'langues', name: 'Langues', icon: 'language', role:'ROLE_ADMIN'},
]


@Injectable()
export class MenuItems {
  getMenuItems(): Menu[] {
     return MENU_ITEMS;
  }
}
