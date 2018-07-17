import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from '../../common/services/auth.service'
import { Router } from '@angular/router';
import { MenuComponent } from '../../sidebar/menu/menu.component';

@Component({
    selector   : 'app-header',
    templateUrl: './header.component.html',
    styleUrls  : ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @ViewChild('header') header: ElementRef;
    @ViewChild('arrow') arrow: ElementRef;
    @ViewChild('line1') line1: ElementRef;
    @ViewChild('line2') line2: ElementRef;
    @Input() sidebar: MenuComponent;
    isArrowRotate = false;

    constructor(public  auth: AuthService, public router: Router, private renderer: Renderer2) {

    }

    ngOnInit() {
        this.renderer.setStyle(this.header.nativeElement, 'background-color', localStorage.getItem('header-bg'))
    }

    /**
     * Set value of color
     * @param value: color
     */
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

    /**
     *toggle sidebar
     */
    collapseSidebar() {
        this.sidebar.collapseSidebar();
        if (this.isArrowRotate) {
            this.renderer.addClass(this.arrow.nativeElement, 'change-arrow');
            this.renderer.addClass(this.line1.nativeElement, 'line1');
            this.renderer.addClass(this.line2.nativeElement, 'line2');
        } else {
            this.renderer.removeClass(this.arrow.nativeElement, 'change-arrow');
            this.renderer.removeClass(this.line1.nativeElement, 'line1');
            this.renderer.removeClass(this.line2.nativeElement, 'line2');
        }
    }
}
