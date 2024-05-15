import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface RequestElement {
  id: number;
  PartNo: string;
  Rev: string;
  process: string;
  Division: string;
  Fac: string;
  MCGroup: string;
  McNo: string;
  UseFor: string;
  RequireDate: string;
  reqby: string;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'PartNo', 'Rev', 'process', 'Division', 'Fac', 'MCGroup', 'McNo', 'UseFor', 'RequireDate', 'reqby', 'setgauge'];
  dataSource: MatTableDataSource<RequestElement> = new MatTableDataSource<RequestElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectedDivision: string;
  selectedFac: string;
  selectedProcess: string;
  selectedUseFor: string;

  divisions = [
    { division: 'div1', viewDivision: 'Division 1' },
    { division: 'div2', viewDivision: 'Division 2' },
    { division: 'div3', viewDivision: 'Division 3' },
    // Add more divisions as needed
  ];

  facs = [
    { fac: 'fac1', viewValue: 'Facility 1' },
    { fac: 'fac2', viewValue: 'Facility 2' },
    { fac: 'fac3', viewValue: 'Facility 3' },
    // Add more facilities as needed
  ];

  processes = [
    { process: 'proc1', viewProcess: 'Process 1' },
    { process: 'proc2', viewProcess: 'Process 2' },
    { process: 'proc3', viewProcess: 'Process 3' },
    // Add more processes as needed
  ];

  useFors = [
    { useFor: 'use1', viewUseFor: 'Use for 1' },
    { useFor: 'use2', viewUseFor: 'Use for 2' },
    { useFor: 'use3', viewUseFor: 'Use for 3' },
    // Add more use-for options as needed
  ];

  constructor() {
    // Initialize selected values if needed
    this.selectedDivision = this.divisions[0].division;
    this.selectedFac = this.facs[0].fac;
    this.selectedProcess = this.processes[0].process;
    this.selectedUseFor = this.useFors[0].useFor;
  }

  ngAfterViewInit() {
    // Assign paginator and sort to the data source
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onDelete(element: RequestElement): void {
    // Handle delete action here
    console.log('Delete request:', element);
  }
}

const ELEMENT_DATA: RequestElement[] = [
  { id: 1, PartNo: 'PN001', Rev: 'A', process: 'Welding', Division: 'Division 1', Fac: 'Facility A', MCGroup: 'Group 1', McNo: 'MC001', UseFor: 'Production', RequireDate: '2023-05-01', reqby: 'John Doe' },
  { id: 2, PartNo: 'PN002', Rev: 'B', process: 'Assembly', Division: 'Division 2', Fac: 'Facility B', MCGroup: 'Group 2', McNo: 'MC002', UseFor: 'Quality Check', RequireDate: '2023-05-02', reqby: 'Jane Smith' },
  { id: 3, PartNo: 'PN003', Rev: 'C', process: 'Inspection', Division: 'Division 3', Fac: 'Facility C', MCGroup: 'Group 3', McNo: 'MC003', UseFor: 'Testing', RequireDate: '2023-05-03', reqby: 'Mike Johnson' },
  // Add more data as needed
];
