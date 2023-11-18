import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
import { SearchDialogComponent } from '../search-dialog/search-dialog.component'

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchDialogComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {

}
