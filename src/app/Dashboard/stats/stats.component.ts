import { RequestService } from './../../services/request.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Chart, registerables } from 'chart.js';
import { RequestFile } from 'src/models/RequestFile';
import { MatTableDataSource } from '@angular/material/table';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  result: RequestFile[];

  name: any;
  state: any;
  chart: any = []
  dataSource: MatTableDataSource<any>;

  constructor(private requestService: RequestService) {
    this.dataSource = new MatTableDataSource(this.result);
  }
  ngOnInit(): void {
    this.getRequestFiles();
    console.log(this.result)
  }
  getRequestFiles() {
    this.requestService.getAlll().subscribe(data=> {
      this.dataSource.data=data;
      this.name=this.dataSource.data.values
    }
  )
}
chartOption: EChartsOption = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
    },
  ],
};
}