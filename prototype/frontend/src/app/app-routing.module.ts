import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ArchiveComponent } from './pages/archive/archive.component'
import { MainComponent } from './pages/main/main.component'

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'archive', component: ArchiveComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
