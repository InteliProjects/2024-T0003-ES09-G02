import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModalService } from '../../shared/forms-modal.service';

@Component({
  selector: 'app-canal-modal',
  templateUrl: './canal-modal.component.html',
  styleUrl: './canal-modal.component.css'
})
export class CanalModalComponent {

  constructor(private fb: FormBuilder, private service: FormsModalService){}

  researchId: string = '';
  @Output() nextPage = new EventEmitter<string>();
  @Output() formValues = new EventEmitter<FormGroup>();
  @Output() teste = new EventEmitter<string>();

  anonymous: boolean = false;
  form!: FormGroup;
  selectedChannel: string = '';

  ngOnInit(){
    this.researchId = this.service.getResearchId();
    this.form = this.fb.group({
      name: [null],
      channel: [null],
      anonymous_answer: [this.anonymous],
    })
  }

  onSubmit(){
    this.nextPage.emit('2');
    this.formValues.emit(this.form.value);
    this.service.updateData(this.form.value);
  }

  addChannel(channel: string){
    this.form.get('channel')?.setValue(channel);
  }

  selectChannel(channel: string){
    this.selectedChannel = channel;
  }

}
