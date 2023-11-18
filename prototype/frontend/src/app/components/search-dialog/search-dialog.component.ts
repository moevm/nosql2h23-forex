import { Component, Inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TuiDialogFormService, TuiInputModule } from '@taiga-ui/kit'
import { TuiButtonModule, TuiDialogService } from '@taiga-ui/core'
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-search-dialog',
  standalone: true,
  imports: [CommonModule, TuiButtonModule, TuiInputModule, FormsModule],
  templateUrl: './search-dialog.component.html',
  styleUrl: './search-dialog.component.scss',
  providers: [TuiDialogFormService],
})
export class SearchDialogComponent {
  searchSymbols = ''

  constructor(
    @Inject(TuiDialogFormService) private readonly dialogForm: TuiDialogFormService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
  ) {
  }

  onModelChange(value: string): void {
    this.searchSymbols = value
    this.dialogForm.markAsDirty()
  }

  onClick(content: PolymorpheusContent): void {
    this.dialogs.open(content).subscribe({
      complete: () => {
        this.searchSymbols = ''
        this.dialogForm.markAsPristine()
      },
    })
  }
}
