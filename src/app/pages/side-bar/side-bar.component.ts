import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { routerNames } from '../../constant/router';
import { SearchService } from '../../services/search.service';
import { UserService } from '../../services/user.service';
import { IUser } from '../../types/user';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent implements OnInit {
  constructor(private router: Router, private searchService: SearchService, private userService: UserService) { }

  routerNames = routerNames
  user: IUser = {
    id: 0,
    phone: 'string',
    email: 'string',
    fullname: 'string',
    avatar: 'any',
    role: 'string',
    token: 'string',
    refreshToken: 'string'
  }

  sideDrawerVisible = false;
  currentSubMenu: string | null = null;
  textSearch: string = ""

  handleSearch(e: any) {
    this.textSearch = e
    this.searchService.setSearchInput(this.textSearch)
  }

  handleSideDrawerClose(routerLinkName?: string): void {
    this.sideDrawerVisible = false;
    this.currentSubMenu = null;
    if(routerLinkName)
    this.textSearch = "";
    this.handleSearch("")
  }

  handleLogOut(): void {
    localStorage.clear()
    this.router.navigate(['/signIn']);
  }

  ngOnInit(): void {
    this.user = this.userService.getUser()
  }
}
