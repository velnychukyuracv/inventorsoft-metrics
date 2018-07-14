import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from '../../common/services/auth.service'
import { Router } from '@angular/router';

@Component({
    selector   : 'app-header',
    templateUrl: './header.component.html',
    styleUrls  : ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @ViewChild('header') header: ElementRef;

    constructor(public  auth: AuthService, public router: Router, private renderer: Renderer2) {

    }

    ngOnInit() {
        this.renderer.setStyle(this.header.nativeElement, 'background-color', localStorage.getItem('header-bg'))
    }

    set colorValue(value) {
        localStorage.setItem('header-bg', value);
        this.renderer.setStyle(this.header.nativeElement, 'background-color', value);
    }

    /**
     * exit the app
     */
    logout() {
        localStorage.removeItem('header-bg');
        this.renderer.setStyle(this.header.nativeElement, 'background-color', '#2f333e');
        this.auth.logout();
    }
}
