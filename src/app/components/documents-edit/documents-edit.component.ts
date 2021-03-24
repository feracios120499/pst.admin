import { Component, OnInit } from '@angular/core';
import { DocumentModel } from 'src/app/Models/document.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentsService } from 'src/app/services/documents.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-documents-edit',
  templateUrl: './documents-edit.component.html',
  styleUrls: ['./documents-edit.component.css']
})
export class DocumentsEditComponent implements OnInit {

  constructor(private route: ActivatedRoute, private documentsService: DocumentsService, private toastr: ToastrService, private http: HttpClient, private router: Router) { }
  public document: DocumentModel = new DocumentModel();
  public documentOriginal;
  public IsCreate: boolean;
  public FileExist: boolean;
  public Types = [{
    name: 'Бакалавр',
    type: 'backalavr'
  },
  {
    name: 'Магістратура',
    type: 'magistr'
  }
  ]
  public Type = this.Types[0];
  ngOnInit() {
    this.IsCreate = true;
  }

  onSelectDocument($event, files) {
    this.document = new DocumentModel();
    var file = files[0];
    this.document.FileName = file.name;
    this.documentOriginal = file;
    this.FileExist = true;
  }
  save() {
    this.AddModelData(this.document, this.documentOriginal).subscribe((response) => {
      this.toastr.success("Документ додано")
      this.router.navigate(['dashboard/documents']);
    },
      (error) => {
        this.toastr.error(error.Message, "Помилка");
      })
  }

  AddModelData(modelData: DocumentModel, document: any): Observable<any> {
    return from(this.documentsService.addDocument(document, this.Type.type));
  }
  EditModelData(modelData: DocumentModel): Observable<any> {
    let urlPath = '/documents';
    return this.http.put(urlPath, modelData);
  }
}
