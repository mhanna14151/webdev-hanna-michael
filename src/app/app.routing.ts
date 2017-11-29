import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ModuleWithProviders} from '@angular/core';
import {TestComponent} from './components/test/test.component';
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { WebsiteNewComponent } from './components/website/website-new/website-new.component';
import { WebsiteEditComponent } from './components/website/website-edit/website-edit.component';
import { WebsiteListComponent } from './components/website/website-list/website-list.component';
import { PageNewComponent } from './components/page/page-new/page-new.component';
import { PageEditComponent } from './components/page/page-edit/page-edit.component';
import { PageListComponent } from './components/page/page-list/page-list.component';
import { WidgetChooserComponent } from './components/widget/widget-chooser/widget-chooser.component';
import { WidgetEditComponent } from './components/widget/widget-edit/widget-edit.component';
import { WidgetListComponent } from './components/widget/widget-list/widget-list.component';
import {ExterminateComponent} from './components/exterminate/exterminate.component';
import {FlickerImageSearchComponent} from './components/widget/widget-edit/widget-image/flicker-image-search/flicker-image-search.component';
import {AuthGuard} from './services/auth-guard.service';
// import { WidgetHeaderComponent } from './components/widget/widget-edit/widget-header/widget-header.component';
// import { WidgetImageComponent } from './components/widget/widget-edit/widget-image/widget-image.component';
// import { WidgetYoutubeComponent } from './components/widget/widget-edit/widget-youtube/widget-youtube.component';


const APP_ROUTES: Routes = [
  { path: '', component : LoginComponent},
  { path: 'test', component: TestComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'user/:uid', component: ProfileComponent},
  { path: 'user/:uid/website', component: WebsiteListComponent},
  { path: 'user/:uid/website/new', component: WebsiteNewComponent},
  { path: 'user/:uid/website/:wid', component: WebsiteEditComponent},
  { path: 'user/:uid/website/:wid/page', component: PageListComponent},
  { path: 'user/:uid/website/:wid/page/new', component: PageNewComponent},
  { path: 'user/:uid/website/:wid/page/:pid', component: PageEditComponent},
  { path: 'user/:uid/website/:wid/page/:pid/widget', component: WidgetListComponent},
  { path: 'user/:uid/website/:wid/page/:pid/widget/new', component: WidgetChooserComponent},
  { path: 'user/:uid/website/:wid/page/:pid/widget/:wgid', component: WidgetEditComponent},
  { path: 'exterminate', component: ExterminateComponent},
  { path: 'user/:uid/website/:wid/page/:pid/widget/:wgid/flickr', component: FlickerImageSearchComponent}
];

// Export the routes as module providers
export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
