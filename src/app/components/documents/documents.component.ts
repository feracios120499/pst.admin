import { moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog, MatSort, MatTabChangeEvent, MatTable, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Document2, DocumentModel } from 'src/app/Models/document.model';
import { DocumentsService } from 'src/app/services/documents.service';

import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit, AfterViewInit {

  constructor(private documentService: DocumentsService, private router: Router, private dialog: MatDialog, private db: AngularFireDatabase) { }
  public documents: Document2[];
  public documentsMagistr: DocumentModel[];
  displayedColumns: string[] = ['Position', 'FileName', 'Description', 'Actions'];
  dataSource: any;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('table', { static: false }) table: MatTable<Document2>;
  subjects = [
    'backalavr',
    'magistr',
    'educational_program'
  ];

  ngOnInit() {
    // this.documentService.getBackalavrs().subscribe((documents) => {
    //   this.documents = documents;
    //   console.log(this.documents);
    // });
    // this.documentService.getMagistr().subscribe((documents) => {
    //   this.documentsMagistr = documents;
    //   console.log(this.documents);
    // });


  }
  ngAfterViewInit() {
    this.loadData('backalavr');
  }
  loadData(subject) {
    this.documentService.getDocuments(subject).subscribe((documents) => {
      console.log(documents);
      this.documents = documents;
      this.dataSource = new MatTableDataSource(this.documents);
      this.dataSource.sort = this.sort;
    });
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    console.log(tabChangeEvent.index);
    this.loadData(this.subjects[tabChangeEvent.index]);
  }

  async removeBackalavr(document: DocumentModel) {
    // const dialogRef = await this.dialog.open(DialogConfirmComponent, {
    //   width: '450px',
    //   data: `Ви дійсно бажаєте видалити ${document.FileName}?`
    // }).afterClosed().toPromise();
    // if (dialogRef) {
    //   this.documentService.removeDocument(document.FullPath).then((response) => {
    //     this.documentService.getBackalavrs().subscribe((documents) => {
    //       // this.documents = documents;
    //       console.log(this.documents);
    //     });
    //   });
    // }
  }
  async removeMagistr(document: DocumentModel) {
    // const dialogRef = await this.dialog.open(DialogConfirmComponent, {
    //   width: '450px',
    //   data: `Ви дійсно бажаєте видалити ${document.FileName}?`
    // }).afterClosed().toPromise();
    // if (dialogRef) {
    //   this.documentService.removeDocument(document.FullPath).then((response) => {
    //     this.documentService.getMagistr().subscribe((documents) => {
    //       this.documentsMagistr = documents;
    //       console.log(this.documents);
    //     });
    //   });
    // }
  }

  // async test() {
  //   for (let i = 0; i < this.documentsMagistr.length; i++) {
  //     console.log(i);
  //     this.documentsMagistr[i].DownloadUrl = await this.documentsMagistr[i].Reference.getDownloadURL();
  //     const document: any = {};
  //     document.FileUrl = this.documentsMagistr[i].DownloadUrl;
  //     document.FileName = this.documentsMagistr[i].FileName;
  //     document.Description = '';
  //     document.Subject = 'magistr';
  //     document.Date = new Date();
  //     document.Position = i;
  //     this.db.list('documents/').push(document);
  //   }
  // }

  dropTable(event) {
    const previousIndex = this.dataSource.data.findIndex(row => row === event.item.data);
    moveItemInArray(this.dataSource.data, previousIndex, event.currentIndex);
    this.dataSource.data = this.dataSource.data.slice();
    this.dataSource.data.forEach((item, index) => item.Position = index);
    this.documentService.updateDocument(this.documents[previousIndex]);
    this.documentService.updateDocument(this.documents[event.currentIndex]);
  }

  async removeDocument(document) {
    const dialogRef = await this.dialog.open(DialogConfirmComponent, {
      width: '450px',
      data: `Ви дійсно бажаєте видалити ${document.FileName}?`
    }).afterClosed().toPromise();
    if (dialogRef) {
      this.documentService.removeDocument(document).then((response) => {
      });
    }
  }

}
