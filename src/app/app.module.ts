import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/test/test.component';
import {Routing} from './app.routing';
import {HttpModule} from '@angular/http';
import {TestService} from './services/test.service.client';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { WebsiteNewComponent } from './components/website/website-new/website-new.component';
import { WebsiteListComponent } from './components/website/website-list/website-list.component';
import { PageNewComponent } from './components/page/page-new/page-new.component';
import { PageEditComponent } from './components/page/page-edit/page-edit.component';
import { PageListComponent } from './components/page/page-list/page-list.component';
import { WidgetChooserComponent } from './components/widget/widget-chooser/widget-chooser.component';
import { WidgetEditComponent } from './components/widget/widget-edit/widget-edit.component';
import { WidgetListComponent } from './components/widget/widget-list/widget-list.component';
import { WidgetHeaderComponent } from './components/widget/widget-edit/widget-header/widget-header.component';
import { WidgetImageComponent } from './components/widget/widget-edit/widget-image/widget-image.component';
import { WidgetYoutubeComponent } from './components/widget/widget-edit/widget-youtube/widget-youtube.component';
import { BannerForHomePageComponent } from './components/banner-for-home-page/banner-for-home-page.component';
import { BannerForWebDevAssignmentComponent } from './components/banner-for-web-dev-assignment/banner-for-web-dev-assignment.component';
import {WebsiteEditComponent} from './components/website/website-edit/website-edit.component';
import { ExterminateComponent } from './components/exterminate/exterminate.component';
import {WebDevSortableDirective} from '../../directives/wbdv-sortable.directive';
import { WidgetHtmlComponent } from './components/widget/widget-edit/widget-html/widget-html.component';
import { QuillEditorModule } from 'ngx-quill-editor';
// import { QuillEditorModule } from '../../node_modules/ngx-quill-editor';


// services
import { UserService } from './services/user.service.client';
import {WebsiteService} from './services/website.service.client';
import { PageService } from './services/page.service.client';
import {WidgetService} from './services/widget.service.client';
import { FlickerImageSearchComponent } from './components/widget/widget-edit/widget-image/flicker-image-search/flicker-image-search.component';
import {FlickrService} from './services/flickr.service.client';
import { WidgetTextComponent } from './components/widget/widget-edit/widget-text/widget-text.component';
import {SharedService} from './services/shared.service.client';
import {AuthGuard} from './services/auth-guard.service';

@NgModule({
  // Declared components here
  declarations: [
    AppComponent,
    HomeComponent,
    TestComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    WebsiteNewComponent,
    WebsiteEditComponent,
    WebsiteListComponent,
    PageNewComponent,
    PageEditComponent,
    PageListComponent,
    WidgetChooserComponent,
    WidgetEditComponent,
    WidgetListComponent,
    WidgetHeaderComponent,
    WidgetImageComponent,
    WidgetYoutubeComponent,
    BannerForHomePageComponent,
    BannerForWebDevAssignmentComponent,
    ExterminateComponent,
    WebDevSortableDirective,
    WidgetHtmlComponent,
    FlickerImageSearchComponent,
    WidgetTextComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    Routing,
    QuillEditorModule
  ],
  // Client Side services here
  providers: [
    UserService,
    WebsiteService,
    PageService,
    TestService,
    WidgetService,
    FlickrService,
    SharedService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

