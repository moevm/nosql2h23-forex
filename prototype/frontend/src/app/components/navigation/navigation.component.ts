import { Component, ElementRef, ViewChild } from '@angular/core'
import { MessageService } from 'primeng/api'
import { CurrencyService } from '../../services/currency.service'
import { isHttpErrorResponse } from '../../../shared/utils'

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
    @ViewChild('file_import') fileImport: ElementRef

    constructor(private messageService: MessageService, private currencyService: CurrencyService) {

    }

    importFileHandler() {
        this.fileImport.nativeElement.click()
    }

    getImportFile(event: Event) {
        const fileInputEvent = (event.target as HTMLInputElement)

        const files = fileInputEvent.files

        if (files) {
            let file = files.item(0) as File

            this.currencyService.importCfg(file).subscribe({
                next: (response) => {
                    response.errors
                        ? this.messageService.add({ severity: 'error', summary: 'Error', detail: response.errors })
                        : this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File Imported' })

                },
                error: (error) => {
                    if (isHttpErrorResponse(error))
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error.status} ${error.statusText}` })
                },
            })
        }

        fileInputEvent.value = ''
    }

    exportFileHandler() {
        this.currencyService.exportCfg().subscribe(response => {
            let fileName = response.headers.get('content')
                ?.split(';')[1].split('=')[1] ?? 'config'

            const blob: Blob = response.body as Blob
            const htmlAnchorElement = document.createElement('a')
            htmlAnchorElement.download = fileName
            htmlAnchorElement.href = window.URL.createObjectURL(blob)
            htmlAnchorElement.click()
        })
    }
}
