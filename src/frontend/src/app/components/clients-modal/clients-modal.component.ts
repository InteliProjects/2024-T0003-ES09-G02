import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModalService } from '../../shared/forms-modal.service';

@Component({
  selector: 'app-clients-modal',
  templateUrl: './clients-modal.component.html',
  styleUrls: ['./clients-modal.component.css']
})
export class ClientsModalComponent {

  constructor(private fb: FormBuilder, private service: FormsModalService){}

  form!: FormGroup;

  @Output() nextPage = new EventEmitter<string>()
  @Output() formValues = new EventEmitter<FormGroup>()

  ngOnInit(){
    this.form = this.fb.group({
      csv_file: null
    })
  }

  onFileSelected(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('csv_file')?.setValue(reader.result);
      };
    }
    const input = document.getElementById('input-file') as HTMLInputElement;
    input.value = '';
  }

  goBack(){
    this.nextPage.emit('1');
  }

  onSubmit(){
    this.nextPage.emit('3');
    this.service.updateData(this.form.value);
  } 
    
}

