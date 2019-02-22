import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatGridListModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatTooltipModule,
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faBars,
    faUserCircle,
    faPowerOff,
    faCog,
    faPlayCircle,
    faRocket,
    faBook,
    faLanguage,
    faPaintBrush,
    faLightbulb,
    faWindowMaximize,
    faStream,
    faSearch
} from '@fortawesome/free-solid-svg-icons';
import {
    faGithub,
    faMediumM,
    faTwitter,
    faInstagram,
    faYoutube
} from '@fortawesome/free-brands-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { GallerizeModule } from '@ngx-gallery/gallerize';

library.add(
    faGithub,
    faMediumM,
    faTwitter,
    faInstagram,
    faYoutube,
    faBars,
    faUserCircle,
    faPowerOff,
    faCog,
    faPlayCircle,
    faRocket,
    faBook,
    faLanguage,
    faPaintBrush,
    faLightbulb,
    faWindowMaximize,
    faStream,
    faSearch
);


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        TranslateModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatTabsModule,
        MatCardModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatSnackBarModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSlideToggleModule,
        MatTooltipModule,
        HttpClientModule,
        ReactiveFormsModule,
        MaterialFileInputModule,
        FontAwesomeModule,
        GalleryModule.withConfig({
            imageSize: 'cover'
        }),
        LightboxModule,
        GallerizeModule
    ],
    exports: [
        FormsModule,
        CommonModule,
        TranslateModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatTabsModule,
        MatCardModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatSnackBarModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSlideToggleModule,
        MatTooltipModule,
        HttpClientModule,
        ReactiveFormsModule,
        MaterialFileInputModule,
        FontAwesomeModule,
        GalleryModule,
        LightboxModule,
        GallerizeModule
    ]
})
export class MaterialModule { }
