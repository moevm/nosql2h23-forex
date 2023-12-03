import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NavigationComponent } from './components/navigation/navigation.component'
import { SearchDialogComponent } from './components/search-dialog/search-dialog.component'
import { ArchiveComponent } from './pages/archive/archive.component'
import { MainComponent } from './pages/main/main.component'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { CardModule } from 'primeng/card'
import { ChipsModule } from 'primeng/chips'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ChartModule } from 'primeng/chart'
import { ListboxModule } from 'primeng/listbox'
import { CalendarModule } from 'primeng/calendar'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SearchDialogComponent,
    ArchiveComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    DialogModule,
    CardModule,
    BrowserAnimationsModule,
    ChipsModule,
    ReactiveFormsModule,
    ChartModule,
    ListboxModule,
    FormsModule,
    CalendarModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
