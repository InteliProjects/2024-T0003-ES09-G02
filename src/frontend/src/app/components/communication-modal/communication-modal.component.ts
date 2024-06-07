import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModalService } from '../../shared/forms-modal.service';
import { PesquisasService } from '../../services/PesquisasService';
import { map } from 'rxjs';

@Component({
  selector: 'app-communication-modal',
  templateUrl: './communication-modal.component.html',
  styleUrl: './communication-modal.component.css'
})
export class CommunicationModalComponent {

  constructor(private fb: FormBuilder, private service: FormsModalService){}

  items: any;
  form!: FormGroup;
  allValues: any;

  @Output() nextPage = new EventEmitter<string>();

  ngOnInit(){
    this.form = this.fb.group({
      template: [null]
    });
  }

  onFileSelected(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('template')?.setValue(reader.result);
      };
    }
    
    const input = document.getElementById('template') as HTMLInputElement;
    input.value = '';
  }

  onSubmit(){
    this.service.postData();
    this.service.updateData(this.form.value);
    this.service.closeModal();
  }

  getAllValue(){
    this.allValues = this.service.getData();

  }

  goBack(){
    this.nextPage.emit('2');
  }

}
