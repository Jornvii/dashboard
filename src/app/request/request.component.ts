import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { switchMap, of, catchError } from 'rxjs';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  onPartNoSelected(_t31: string) {
    throw new Error('Method not implemented.');
  }
  requestForm!: FormGroup;

  partNoSuggestions: string[] = [];
  processOptions: string[] = [];
  MCOptions: string[] = [];
  selectedDivision: string;
  divisions = [
    { division: '---', viewDivision: '---' },
    { division: 'GM', viewDivision: 'GM' },
    { division: 'PMA', viewDivision: 'PMA' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.selectedDivision = this.divisions[0].division;
  }

  ngOnInit(): void {
    this.requestForm = this.formBuilder.group({
      PartNo: [''],
      Process: [''],
      MC: [''],
    });
  }

  onSubmit() {
    if (this.requestForm.valid) {
      const PartNo = this.requestForm.get('PartNo')?.value;
      const Process = this.requestForm.get('Process')?.value;
      const MC = this.requestForm.get('MC')?.value;

      this.authService.Post_Process({ PartNo }).subscribe((processResponse) => {
        console.log(processResponse);
        if (processResponse.length > 0 && processResponse[0].length > 0) {
          this.processOptions = processResponse[0].map(
            (item: any) => item.Process
          );
        }

        // Check if both PartNo and Process have values
        if (PartNo && Process) {
          this.authService.GetMC({ PartNo, Process }).subscribe(
            (MCResponse) => {
              console.log(MCResponse);
              if (MCResponse.length > 0 && MCResponse[0].length > 0) {
                this.MCOptions = MCResponse[0].map((item: any) => item.MC);
              } else {
                console.error('MC options not found.');
              }
            },
            (MCError) => {
              console.error('Error fetching MC options:', MCError);
            }
          );
        }
        // Check if PartNo, Process, and MC are available to show Tool details
        if (PartNo && Process && MC) {
          this.authService
            .Post_ToolDetial({ PartNo, Process, MC })
            .subscribe((ToolResponse) => {
              console.log(ToolResponse);
            });
        }
      });
    }
  }
}

// onSubmit() {
//   if (this.requestForm.valid) {
//     const PartNo = this.requestForm.get('PartNo')?.value;
//     const Process = this.requestForm.get('Process')?.value;
//     const MC = this.requestForm.get('MC')?.value;

// }
