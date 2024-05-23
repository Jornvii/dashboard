import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  requestForm!: FormGroup;

  partNoSuggestions: string[] = [];
  processOptions: string[] = [];
  machineOptions: string[] = [];
 selectedDivision: string;
 divisions = [
  { division: '---', viewDivision: '---' },
  { division: 'GM', viewDivision: 'GM' },
  { division: 'PMA', viewDivision: 'PMA' },
];
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.selectedDivision = this.divisions[0].division;
   }

  ngOnInit(): void {
    this.requestForm = this.formBuilder.group({
      PartNo: [''],
      Process: [''],
      MC: ['']
    });
  }

  fetchPartNoSuggestions(): void {
    const partNo = this.requestForm.get('PartNo')?.value;
    this.authService.get_onlyPartNo({ PartNo: partNo }).subscribe(data => {
      this.partNoSuggestions = data.suggestions;
    });
  }

  fetchProcessOptions(): void {
    const partNo = this.requestForm.get('PartNo')?.value;
    this.authService.getProcesses({ PartNo: partNo }).subscribe(data => {
      this.processOptions = data.processes;
    });
  }

  fetchMachineOptions(): void {
    const partNo = this.requestForm.get('PartNo')?.value;
    const process = this.requestForm.get('Process')?.value;
    this.authService.getMachines({ PartNo: partNo, Process: process }).subscribe(data => {
      this.machineOptions = data.machines;
    });
  }

  onPartNoSelected(partNo: string): void {
    console.log('Selected Part No:', partNo);
    this.requestForm.patchValue({ PartNo: partNo });
    this.fetchProcessOptions();
  }

  onSubmit(): void {
    // Submit form data to backend
    const formData = this.requestForm.value;
    console.log(formData);
    // You can also call any additional service method here to submit the form data
  }
}
