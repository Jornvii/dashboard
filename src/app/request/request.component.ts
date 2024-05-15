import { Component } from '@angular/core';



@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss',
})


export class RequestComponent {
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
}
