import { Component, OnInit } from '@angular/core';
import { parents , babySitters } from "./chart-data";

@Component({
  selector: 'app-admin-dasboard-income-charts',

  templateUrl: './admin-dasboard-income-charts.component.html',
  styleUrls: ['./admin-dasboard-income-charts.component.css']
})
export class AdminDasboardIncomeChartsComponent implements OnInit{



  parents:any = parents;
  babySitters:any =  babySitters;

  view: any[] = [100, 100];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  gradient: boolean = false;
  isDoughnut: boolean = true;

  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F']
  };

  constructor() { Object.assign(this, { parents, babySitters }) }

  ngOnInit(): void {
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

}
