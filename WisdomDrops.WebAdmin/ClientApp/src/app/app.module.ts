import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { DashboardComponent } from './areas/dashboard/dashboard.component';
import { AffListComponent, ImportDialog } from './areas/affirmations/list/aff-list.component';
import { SubListComponent } from './areas/subscribers/list/sub-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatToolbarModule, MatSidenavModule, MatListModule, MatDatepickerModule, MatRadioModule, MatOptionModule, MatSelectModule, MatSlideToggleModule, MatNativeDateModule, MatTooltipModule, MatBadgeModule, MatDialogModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { AffirmationListResolver } from "./areas/affirmations/aff-view.resolvers";
import { SubscriberListResolver } from "./areas/subscribers/sub-view.resolvers";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    DashboardComponent,
    AffListComponent,
    SubListComponent,
    ImportDialog
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: 'subscribers', component: SubListComponent, resolve: { fetchResult: SubscriberListResolver } },
      { path: 'affirmations', component: AffListComponent, resolve: { fetchResult: AffirmationListResolver } },
//      { path: '', component: HomeComponent, pathMatch: 'full' },
//      { path: 'counter', component: CounterComponent },
//      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatBadgeModule,
    MatDialogModule
  ],
  providers: [],
  entryComponents: [ImportDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
