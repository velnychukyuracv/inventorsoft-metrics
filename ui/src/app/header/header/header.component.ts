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
    isArrowRotate: boolean = false;
    imageUrl: string;
    selectedFile: File = null;

    constructor(public  auth: AuthService, public router: Router, private renderer: Renderer2) {

    }

    ngOnInit() {
        this.renderer.setStyle(this.header.nativeElement, 'background-color', localStorage.getItem('header-bg'))
        this.imageUrl = localStorage.getItem('image-url');
    }

    /**
     * Handle image upload
     * @param file: uploaded img
     */
    handleImgUpload(file: FileList) {
        this.selectedFile = file.item(0);
        let reader = new FileReader();
        reader.onload = (event: any) => {
            this.imageUrl = event.target.result;
            localStorage.setItem('image-url', this.imageUrl);
        };
        reader.readAsDataURL(this.selectedFile);
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
