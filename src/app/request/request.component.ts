import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { switchMap, of, catchError } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToolDetail } from './tool-detail.model';
import { response } from 'express';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  requestForm: FormGroup;
  partNoSuggestions: string[] = [];
  processOptions: string[] = [];
  MCOptions: string[] = [];
  dataSource = new MatTableDataSource<ToolDetail[]>();
  // displayedColumns: string[] = ['CT_sec', 'Division',  'DwgNo', 'DwgRev', 'DwgUpdate', 'ItemNo','MC', 'Master_Tooling_ID','PartNo','Process', 'Spec', 'Usage_pcs'];
  public displayedColumns = [
    'PartNo',
    'Process',
    'MC',
    'ItemNo',
    'Spec',
    'Usage_pcs',
  ];

  @ViewChild(MatSort) sort!: MatSort;

  selectedDivision: string;
  divisions = [
    { division: '---', viewDivision: '---' },
    { division: 'GM', viewDivision: 'GM' },
    { division: 'PMA', viewDivision: 'PMA' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.selectedDivision = this.divisions[0].division;
    this.requestForm = this.fb.group({
      PartNo: [''],
      Process: [''],
      MC: [''],
    });
  }

  ngOnInit(): void {
    this.requestForm = this.formBuilder.group({
      PartNo: [''],
      Process: [''],
      MC: [''],
    });
    this.dataSource.sort = this.sort;
  }

  getProcess() {
    const PartNo = this.requestForm.get('PartNo')?.value;
    this.authService.Post_Process({ PartNo }).subscribe((processResponse) => {
      console.log(processResponse);
      if (processResponse.length > 0 && processResponse[0].length > 0) {
        this.processOptions = processResponse[0].map(
          (item: any) => item.Process
        );
      }
    });
  }

  getMC() {
    const PartNo = this.requestForm.get('PartNo')?.value;
    const Process = this.requestForm.get('Process')?.value;

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
  }
  onSubmit() {
    const PartNo = this.requestForm.get('PartNo')?.value;
    const Process = this.requestForm.get('Process')?.value;
    const MC = this.requestForm.get('MC')?.value;
    if (PartNo && Process && MC) {
      const data = {
        PartNo: PartNo,
        Process: Process,
        MC: MC,
      };
      console.log(PartNo, Process, MC);
      this.authService.Post_ToolDetial(data).subscribe({
        next: (response) => {
          this.dataSource = new MatTableDataSource(response);
          // this.dataSource.sort = this.sort;mater
          console.log(this.dataSource);
        },
      });
    }
  }
}
