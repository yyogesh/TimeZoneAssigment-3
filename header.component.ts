import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    // currentUser: string = sessionStorage.getItem('currentUser');
    
    currentUser;
    pushRightClass: string = 'push-right';

    constructor(public router: Router) {
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
        if(this.getNameFromCookies() == null || this.getNameFromCookies() == ''){
            console.log('--------- user from session-------------');
            this.currentUser = sessionStorage.getItem('currentUser');
        }else{
             this.currentUser =  this.getNameFromCookies();
        }
       
    }

    ngOnInit() { }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
        sessionStorage.removeItem('currentUser');      
    }

    submitSuggestion() {
      /*
        let dialogRef = this.dialog.open(SuggestComponent);
        dialogRef.beforeClose().subscribe(result => {

            console.log('Dialog closed: ${result}');


        });
        */

    }

    getcookie =  document.cookie;
    private getNameFromCookies(): String {
        var  data  = this.getcookie;
        var  u  =  data.split("=");
        if (u[0]) {
            var  credential  =  u[1].split(",");
            return  credential[0];
        }

    }
    calcTime(offset) {
        var d = new Date();
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        var nd = new Date(utc + (3600000*offset));
        return `${nd.getHours()}:${nd.getMinutes()}`;
    
    }
}
