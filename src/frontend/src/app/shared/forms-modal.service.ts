import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import axios from 'axios';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormsModalService {

  researchId: string = '';
  showModal = new Subject<any>;
  showModal$ = this.showModal.asObservable();

  // status = new Subject<any>;
  // status$ = this.status.asObservable();

  private formData!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formData = this.fb.group({
      name: [null],
      channel: [null],
      anonymous_answer: [null],
      csv_file: [null],
      template: ['DataTeste.xlsx'],
      research_id: ['teste'],
    })
  }

  getData(){
    console.log(this.formData.value);
    return this.formData.value;
  }

  postData(){
    console.log(this.formData.value);
    try{
      const response = axios.post('http://localhost:8080/distribuitions/', this.formData.value);
      return response;      
    }
    catch (error){
      console.log('Erro ao criar distribuição!');
      return error;
    }
  }

  updateData(data: FormData){
    this.formData.patchValue(data);
    console.log(this.formData.value);
  }

  closeModal(){
    this.showModal.next(false);
    // if(this.formData.get('name')?.value == null){
    //   this.status.next('error');
    // }
    // else {
    //   this.status.next('success');
    // }
  }

  setResearchId(id: string){
    this.researchId = id;
  }

  getResearchId(){
    return this.researchId;
  }
}