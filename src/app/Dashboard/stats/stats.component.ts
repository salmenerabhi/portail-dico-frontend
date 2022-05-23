import { requestfileUsersStat } from './../../../models/requestfileUsersStat';
import { StatTarget } from './../../../models/StatTarget';
import { AccountService } from './../../services/account.service';
import { UserEntity } from './../../../models/userEntity';
import { RequestService } from './../../services/request.service';
import { Component, OnInit } from '@angular/core';
import { RequestFile } from 'src/models/RequestFile';
import { MatTableDataSource } from '@angular/material/table';
import { StatRequestFiles } from 'src/models/StatRequestFiles';
import { TokenService } from 'src/app/Authentification/services/token.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  result: RequestFile[];
  chartOption: any;
  chartoption1: any;
  name: any;
  state: any;
  chart: any = [];
  users: UserEntity[];
  user: UserEntity;
  dataSource: MatTableDataSource<any>;
  themeSubscription: any;
  total = 0;
  option: any = {};
  isLoading = false;
  data: any;
  tok: string;
  id: string;
  chartOption2: any;
  chartOption3: any;
  chartOption4: any;
  chartOption5: any;
  chartOption6: any;

  rejectedperUser: any;
  percentage: any;
  totalperUser: any;
  constructor(private requestService: RequestService,
    private userService: AccountService,
    private Token: TokenService,
  ) {
    this.dataSource = new MatTableDataSource(this.result);
  }


  datas: StatTarget[]
  userdatas: requestfileUsersStat[]

  statistic: StatRequestFiles = new StatRequestFiles();
  targetStats: StatTarget = new StatTarget();
  ngOnInit(): void {
    this.getRequestFiles();
    this.getStatistic();
    this.id = this.Token.getId();
    this.getRfPerUser(this.id);
    // this.getTargetStatistic();
    this.setData();
    this.rejectedUsers();
    this.finishedUsers();
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

      this.total = this.statistic.finished + this.statistic.in_progress + this.statistic.rejected + this.statistic.unstarted + this.statistic.to_verify + this.statistic.verified;
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

      // this.chartOption4 = {
      //   tooltip: {
      //     trigger: 'item',
      //     formatter: '{a} <br/>{b} : {c} ({d}%)',
      //   },
      //   legend: {
      //     orient: 'vertical',
      //     left: 10,
      //     top: 20,
      //     bottom: 20,
      //     type: 'scroll',
      //     data: ['Finished approximations', 'Rejected approximations','Finished requests','Rejected requests'],
      //   },
      //   series: [
      //     {
      //       name: 'Request files',
      //       type: 'pie',
      //       radius: '80%',
      //       center: ['50%', '50%'],
      //       data: [
      //         { value: this.statistic.nbrapproximationtraites, name: 'Finished approximations' },
      //         { value: this.statistic.nbrapproximationrejetes, name: 'Rejected approximations' },
      //         { value: this.statistic.nbrdemandestraites, name: 'Finished requests' },
      //         { value: this.statistic.nbrdemandesrejetes, name: 'Rejected requests' }

      //       ],
      //     },
      //   ],
      // };


      this.option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          top: 20,
          bottom: 20,
          type: 'scroll',
          data: ['Finished approximations', 'Rejected approximations', 'Finished requests', 'Rejected requests', 'Approximations', 'Requests'],
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
            label: {
              position: 'inner',
              fontSize: 14
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.statistic.nbrapproximation, name: 'Approximations' },
              { value: this.statistic.nbrdemandes, name: 'Requests' }
            ]
          },
          {
            name: 'Access From',
            type: 'pie',
            radius: ['45%', '60%'],
            labelLine: {
              length: 30
            },
            label: {
              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              backgroundColor: '#F6F8FC',
              borderColor: '#8C8D8E',
              borderWidth: 1,
              borderRadius: 4,

              rich: {
                a: {
                  color: '#6E7079',
                  lineHeight: 22,
                  align: 'center'
                },
                hr: {
                  borderColor: '#8C8D8E',
                  width: '100%',
                  borderWidth: 1,
                  height: 0
                },
                b: {
                  color: '#4C5058',
                  fontSize: 14,
                  fontWeight: 'bold',
                  lineHeight: 33
                },
                per: {
                  color: '#fff',
                  backgroundColor: '#4C5058',
                  padding: [3, 4],
                  borderRadius: 4
                }
              }
            },
            data: [
              { value: this.statistic.nbrapproximationtraites, name: 'Finished approximations' },
              { value: this.statistic.nbrapproximationrejetes, name: 'Rejected approximations' },
              { value: this.statistic.nbrdemandestraites, name: 'Finished requests' },
              { value: this.statistic.nbrdemandesrejetes, name: 'Rejected requests' }

            ]
          }
        ]
      };












      this.chartoption1 = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Rejected', 'Unstarted', 'In_progress', 'Finished', 'verified', 'to_verify'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [
              { value: this.statistic.rejected, name: 'Rejected' },
              { value: this.statistic.unstarted, name: 'Unstarted' },
              { value: this.statistic.in_progress, name: 'In_progress' },
              { value: this.statistic.finished, name: 'Finished' },
              { value: this.statistic.verified, name: 'verified' },
              { value: this.statistic.to_verify, name: 'to_verify' },
            ]
          }
        ]
      };
    }
    );
  }

  // getTargetStatistic() {
  //   this.requestService.getStattarget().subscribe(data => {
  //     this.targetStats = data;
  //     console.log(this.targetStats);

  //     this.chartOption3 = {
  //       tooltip: {
  //         trigger: 'axis',
  //         axisPointer: {
  //           type: 'shadow'
  //         }
  //       },
  //       grid: {
  //         left: '3%',
  //         right: '4%',
  //         bottom: '3%',
  //         containLabel: true
  //       },
  //       xAxis: [
  //         {
  //           type: 'category',
  //           data: ['week'],
  //           axisTick: {
  //             alignWithLabel: true
  //           }
  //         }
  //       ],
  //       yAxis: [
  //         {
  //           data: ['value'],
  //           type: 'value'
  //         }
  //       ],
  //       series: [
  //         {
  //           name: 'Direct',
  //           type: 'bar',
  //           barWidth: '60%',
  //           data: [
  //             { value: this.targetStats.value, name: 'value' },
  //             { value: this.targetStats.week, name: 'week' }

  //           ]
  //         }
  //       ]
  //     };
  //   }
  //   );
  // }


  getRfPerUser(id: string) {

    this.requestService.getRfperUser(this.id).subscribe(r => {
      this.totalperUser = r
      this.requestService.getRejectedperUser(this.id).subscribe(res => {
        this.rejectedperUser = res
      })
      this.percentage = this.rejectedperUser / this.totalperUser
      this.chartOption2 = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Rejected', 'total'],
        },
        series: [
          {
            name: 'Request Files',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: this.rejectedperUser, name: 'Rejected' },
              { value: this.totalperUser - this.rejectedperUser, name: 'total' },


            ],
          },
        ],
      }
    }
    )
  }
  setData() {
    const data1 = [];
    const xAxisData = [];
    let value = -1
    this.requestService.getStattarget(2022).subscribe(data => {
      this.datas = data
      for (let s of this.datas) {
        for (let i = 0; i < 53; i++) {
          xAxisData.push('week ' + i);
          if (s.week == i) {
            value = s.value
          }
          if (value == -1) {
            data1.push(0)
          } else data1.push(value)
          value = -1
        }
      }
      this.chartOption3 = {
        title: {
          text: 'Target per week'
        },
        legend: {
          data: xAxisData
        },
        toolbox: {
          // y: 'bottom',
          feature: {

            dataView: {},
            magicType: { show: true, type: ['line', 'bar'] },

            saveAsImage: {
              pixelRatio: 2
            }
          }
        },
        tooltip: {
        },
        dataZoom: [
          {
            show: true,
            start: 0,
            end: 33
          },
          {
            type: 'inside',
            start: 0,
            end: 10
          }
        ],
        xAxis: {
          data: xAxisData,
          splitLine: {
            show: false
          }
        },
        yAxis: {},
        series: [
          {
            name: 'number of targets',
            type: 'bar',
            data: data1,
            emphasis: {
              focus: 'series'
            },
            animationDelay: function (idx) {
              return idx * 10;
            }
          }
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
          return idx * 5;
        }
      }
    }
    )
  };


  // this.chartOption3 = {
  //   legend: {
  //     data: ['value'],
  //     align: 'left',
  //   },
  //   tooltip: {},
  //   toolbox: {
  //     show: true,
  //     feature: {
  //       mark: {show: true},
  //       dataView: {show: true, readOnly: false},
  //       magicType: {show: true, type: ['line', 'bar','pie']},
  //       restore: {show: true},
  //       saveAsImage: {show: true}
  //     }},
  //   dataZoom: [
  //     {
  //       show: true,
  //       start: 0,
  //       end: 10
  //     },
  //     {
  //       type: 'inside',
  //       start: 0,
  //       end: 10
  //     }
  //   ],
  //   xAxis: {
  //     data: xAxisData,
  //     silent: false,
  //     splitLine: {
  //       show: true,
  //     },
  //   },
  //   yAxis: {
  //     data: data1,
  //     silent: false,
  //     splitLine: {
  //       show: true,
  //     },
  //   },
  //   series: [
  //     {
  //       name: 'value',
  //       type: 'bar',
  //       data: data1,
  //       animationDelay: (idx) => idx * 10,
  //     },

  //   ],
  //   animationEasing: 'elasticOut',
  //   animationDelayUpdate: (idx) => idx * 5,
  // };


  rejectedUsers() {
    const data1 = [];
    const xAxisData = [];
    let value = -1
    this.requestService.getrejectedUsers().subscribe(data => {
      this.userdatas = data
      for (let s of this.userdatas) {
        
          xAxisData.push(s.firstname);
          data1.push(s.value)

      }
      this.chartOption5 = {
        title: {
          text: 'Rejected'
        },
        legend: {
          data: xAxisData
        },
        toolbox: {
          // y: 'bottom',
          feature: {

            dataView: {},
            magicType: { show: true, type: ['bar'] },

            saveAsImage: {
              pixelRatio: 2
            }
          }
        },
        tooltip: {
        },
        xAxis: {
          data: xAxisData,
          splitLine: {
            show: false
          }
        },
        yAxis: {},
        series: [
          {
            name: 'number of rejected files',
            type: 'bar',
            data: data1,
            emphasis: {
              focus: 'series'
            },
            animationDelay: function (idx) {
              return idx * 10;
            }
          }
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
          return idx * 5;
        }
      }
    }
    )
  };

  finishedUsers() {
    const data1 = [];
    const xAxisData = [];
    let value = -1
    this.requestService.getfinishedUsers().subscribe(data => {
      this.userdatas = data
      for (let s of this.userdatas) {
        
          xAxisData.push(s.firstname);
          data1.push(s.value)

      }
      this.chartOption6 = {
        title: {
          text: 'finished'
        },
        legend: {
          data: xAxisData
        },
        toolbox: {
          // y: 'bottom',
          feature: {

            dataView: {},
            magicType: { show: true, type: ['bar'] },

            saveAsImage: {
              pixelRatio: 2
            }
          }
        },
        tooltip: {
        },
        xAxis: {
          data: xAxisData,
          splitLine: {
            show: false
          }
        },
        yAxis: {},
        series: [
          {
            name: 'number of rejected files',
            type: 'bar',
            data: data1,
            emphasis: {
              focus: 'series'
            },
            animationDelay: function (idx) {
              return idx * 10;
            }
          }
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
          return idx * 5;
        }
      }
    }
    )
  };
}

