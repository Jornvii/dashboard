import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource, SelectionChange, SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectionListChange } from '@angular/material/list';
import { Data } from '@angular/router';


interface ToolDetail {
  PartNo: string;
  ItemNo: string;
  MC: string;
  Process: string;
  Spec: string;
  Usage_pcs: number;
  MCNo?: string;
  Qty?: number;
  Result1?: string;
  Result2?: string;
  Result3?: string;
  Result4?: string;
  Result5?: string;
  Result6?: string;
  selectedDivision?: string;
  revPart?: string;
  selectedCase?: string;
  dateOfReq?: string;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit, AfterViewInit {
  requestForm: FormGroup;
  processOptions: string[] = [];
  MCOptions: string[] = [];
  dataSource = new MatTableDataSource<ToolDetail>();
  selection = new SelectionModel<ToolDetail>(true, []);
  displayedColumns: string[] = [
    'select',
    'PartNo',
    'ItemNo',
    'MC',
    'Process',
    'Spec',
    'Usage_pcs',
    'MCNo',
    'Qty',
    'Result1',
    'Result2',
    'Result3',
    'Result4',
    'Result5',
    'Result6',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectedDivision: string;
  selectedCase: string;

  divisions = [
    { division: '---', viewDivision: '---' },
    { division: 'GM', viewDivision: 'GM' },
    { division: 'PMA', viewDivision: 'PMA' },
  ];
  Cases = [
    { Case: '---', viewCase: '---' },
    { Case: 'BRO', viewCase: 'BRO' },
    { Case: 'BUR', viewCase: 'BUR' },
    { Case: 'USA', viewCase: 'USA' },
    { Case: 'HOL', viewCase: 'HOL' },
    { Case: 'INV', viewCase: 'INV' },
    { Case: 'MOD', viewCase: 'MOD' },
    { Case: 'NON', viewCase: 'NON' },
    { Case: 'RET', viewCase: 'RET' },
    { Case: 'SET', viewCase: 'SET' },
    { Case: 'SPA', viewCase: 'SPA' },
    { Case: 'STO', viewCase: 'STO' },
    { Case: 'CHA', viewCase: 'CHA' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.selectedDivision = this.divisions[0].division;
    this.selectedCase = this.Cases[0].Case;

    this.requestForm = this.formBuilder.group({
      PartNo: [''],
      Process: [''],
      MC: [''],
      revPart: [''],
      dateOfReq: [''],
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

  getProcess() {
    const PartNo = this.requestForm.get('PartNo')?.value;
    this.authService.Post_Process({ PartNo }).subscribe((processResponse) => {
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
      const data = { PartNo, Process, MC };
      this.authService.Post_ToolDetial(data).subscribe({
        next: (response) => {
          if (response.length > 0 && response[0].length > 0) {
            this.dataSource.data = response[0] as ToolDetail[];
          }
        },
      });
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  // toggleAllRows() {
  //   if (this.isAllSelected()) {
  //     this.selection.clear();
  //     return;
  //   }

  //   const selectedRows = this.dataSource.data.filter(row => this.selection.isSelected(row));
  //   selectedRows.forEach(row => console.log(row));
  //   this.selection.select(...this.dataSource.data);
  // }


  checkboxLabel(row?: ToolDetail): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.PartNo + 1}`;
  }




  toggleSelection(row: ToolDetail) {
    const wasSelected = this.selection.isSelected(row);
    this.selection.toggle(row);

    if (!wasSelected && this.selection.isSelected(row)) {
      console.log('Selected Row Data:',row);
    }
  }
  // insertRowIntoDatabase(rowData: any) {
  //   // Replace this with your actual database insertion logic
  //   this.authService.insertRows(rowData).subscribe(
  //     (response) => {
  //       console.log('Data inserted successfully:', response);
  //       this.requestForm.reset();
  //     },
  //     (error) => {
  //       console.error('Error inserting data into the database:', error);
  //       // Handle the error appropriately
  //     }
  //   );
  // }

///////////////////////////////////////
insertSelectedRows() {
  const selectedRows = this.selection.selected;

  if (selectedRows.length === 0) {
    console.log('No rows selected.');
    return;
  }


  selectedRows.forEach(row => {
    const rowData = {
      ...row,
      selectedDivision: this.selectedDivision,
      revPart: this.requestForm.get('revPart')?.value,
      selectedCase: this.selectedCase,
      dateOfReq: this.requestForm.get('dateOfReq')?.value
    };

    this.insertRowIntoDatabase(rowData);
  });
}

insertRowIntoDatabase(rowData: any) {

  console.log('Inserting row data into database:', rowData);
  this.authService.insertRows(rowData).subscribe(rowDataresponse => {
        console.log('Insert successful:', rowDataresponse);
      }, error => {
        console.error('Insert failed:', error);
      });


  this.authService.insertRows(rowData).subscribe(
    (insertRowsresponse) => {
      console.log('Data inserted successfully:', insertRowsresponse);
      this.requestForm.reset();
    })
}








}
  // onInsertSelectedRows() {
  //   const selectedRows = this.selection.selected;
  //   const additionalData = {
  //     selectedDivision: this.selectedDivision,
  //     revPart: this.requestForm.get('revPart')?.value,
  //     selectedCase: this.selectedCase,
  //     dateOfReq: this.requestForm.get('dateOfReq')?.value,
  //   };

  //   const dataToInsert = selectedRows.map(row => ({
  //     ...row,
  //     ...additionalData
  //   }));

  //   this.authService.insertSelectedRows(dataToInsert).subscribe(response => {
  //     console.log('Insert successful:', response);
  //   }, error => {
  //     console.error('Insert failed:', error);
  //   });
  // }
