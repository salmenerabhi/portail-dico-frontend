import { RequestService } from './../../services/request.service';
import { Component, OnInit } from '@angular/core';
import { RequestFile } from 'src/models/RequestFile';
import { MatTableDataSource } from '@angular/material/table';
import { StatRequestFiles } from 'src/models/StatRequestFiles';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  result: RequestFile[];
  chartOption: any;
  name: any;
  state: any;
  chart: any = [];
  dataSource: MatTableDataSource<any>;
  themeSubscription: any;
  total = 0;
  option: any = {};
  isLoading = false;
  data: any;
  constructor(private requestService: RequestService) {
    this.dataSource = new MatTableDataSource(this.result);
  }


  statistic: StatRequestFiles = new StatRequestFiles();

  ngOnInit(): void {
    this.getRequestFiles();
    this.getStatistic();

  }
  getRequestFiles() {
    this.requestService.getAlll().subscribe(data => {
      this.dataSource.data = data;
      this.name = this.dataSource.data.values;
    }
    );
  }

  getStatistic() {
    this.requestService.getStatRf().subscribe(data => {
      this.statistic = data;
      this.total = this.statistic.finished + this.statistic.in_progress + this.statistic.rejected + this.statistic.unstarted;
      this.chartOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Rejected', 'Unstarted', 'In_progress', 'Finished', 'verified', 'to_verify'],
        },
        series: [
          {
            name: 'Request Files',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: this.statistic.rejected, name: 'Rejected' },
              { value: this.statistic.unstarted, name: 'Unstarted' },
              { value: this.statistic.in_progress, name: 'In_progress' },
              { value: this.statistic.finished, name: 'Finished' },
              { value: this.statistic.verified, name: 'verified' },
              { value: this.statistic.to_verify, name: 'to_verify' },

            ],
          },
        ],
      };

    }
    );
  }
}
