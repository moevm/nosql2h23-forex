import { Routes } from '@angular/router'
import { MainComponent } from './pages/main/main.component'
import { ArchiveComponent } from './pages/archive/archive.component'

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'archive', component: ArchiveComponent },
]
