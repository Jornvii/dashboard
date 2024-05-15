import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface Division {
  [x: string]: any;
  division: string;
  viewDivision: string;
}
interface Fac {
  [x: string]: any;
  Fac: string;
  viewValue: string;
}


interface usefor {
  [x: string]: any;
  usefor: string;
  viewusefor: string;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss',
})


export class RequestComponent {
  divisions: Division[] = [
    { division: '---', viewDivision: '---' },
    { division: 'GM', viewDivision: 'GM' },
    { division: 'M/A', viewDivision: 'M/A' },
    { division: 'tPMA', viewDivision: 'PMA' },
    { division: 'Medical', viewDivision: 'Medical' },
  ];

  selectedDivision: string = '---';

  Facs: Fac[] = [
    { Fac: '---', viewValue: '---' },
    { Fac: '1', viewValue: '1' },
    { Fac: '2', viewValue: '2' },
    { Fac: '3', viewValue: '3' },
    { Fac: '4', viewValue: '4' },
    { Fac: '5', viewValue: '5' },
    { Fac: 'Other', viewValue: 'Other' },
  ];

  selectedFac: string = '---';



  usefors: usefor[] = [
    { usefor: '---', viewusefor: '---' },
    { usefor: 'Sorting', viewusefor: 'Sorting' },
    { usefor: 'F/A', viewusefor: 'F/A' },
    { usefor: 'Rework', viewusefor: 'Rework' },
    { usefor: 'Mass Fac', viewusefor: 'Mass Fac' },
    { usefor: 'Pre Fac', viewusefor: 'Pre Fac' },
  ];

  selectedusefor: string = '---';

}
