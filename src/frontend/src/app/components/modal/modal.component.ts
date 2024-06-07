import { Component, EventEmitter, Input } from '@angular/core';
import { FormsModalService } from '../../shared/forms-modal.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  form!: FormGroup;

  ngOnInit(){
    console.log(this.researchId)
    this.form = this.fb.group({
      research_id: this.researchId
    })
    this.service.updateData(this.form.value);
  }

  constructor(private fb: FormBuilder, private service: FormsModalService){}

  @Input() researchId: string = '';
  page: string = '1';
  success: string = '';

  changePage(nextPage: string){
    this.page = nextPage;
  }

  // status(status: string){
  //   this.success = status;
  //   console.log(this.success);
  // }

}
