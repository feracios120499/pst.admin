import { Component, OnInit } from '@angular/core';
import { DocumentsService } from 'src/app/services/documents.service';
import { DocumentModel } from 'src/app/Models/document.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  constructor(private documentService: DocumentsService, private router: Router, private dialog: MatDialog) { }
  public documents: DocumentModel[];
  public documentsMagistr: DocumentModel[];
  ngOnInit() {
    this.documentService.getBackalavrs().subscribe((documents) => {
      this.documents = documents;
      console.log(this.documents);
    })
    this.documentService.getMagistr().subscribe((documents) => {
      this.documentsMagistr = documents;
      console.log(this.documents);
    })
  }
  async removeBackalavr(document: DocumentModel) {
    const dialogRef = await this.dialog.open(DialogConfirmComponent, {
      width: '450px',
      data: `Ви дійсно бажаєте видалити ${document.FileName}?`
    }).afterClosed().toPromise();
    if (dialogRef) {
      this.documentService.removeDocument(document.FullPath).then((response) => {
        this.documentService.getBackalavrs().subscribe((documents) => {
          this.documents = documents;
          console.log(this.documents);
        })
      })
    }
  }
  async removeMagistr(document: DocumentModel) {
    const dialogRef = await this.dialog.open(DialogConfirmComponent, {
      width: '450px',
      data: `Ви дійсно бажаєте видалити ${document.FileName}?`
    }).afterClosed().toPromise();
    if (dialogRef) {
      this.documentService.removeDocument(document.FullPath).then((response) => {
        this.documentService.getMagistr().subscribe((documents) => {
          this.documentsMagistr = documents;
          console.log(this.documents);
        })
      })
    }
  }
}
