import { NbrRejectedRCDateStats } from './../../../models/NbrRejectedRCDateStats';
import { requestfileUsersStat } from './../../../models/requestfileUsersStat';
import { StatTarget } from './../../../models/StatTarget';
import { AccountService } from './../../services/account.service';
import { UserEntity } from './../../../models/userEntity';
import { RequestService } from './../../services/request.service';
import { Component, OnInit, QueryList } from '@angular/core';
import { RequestFile } from 'src/models/RequestFile';
import { MatTableDataSource } from '@angular/material/table';
import { StatRequestFiles } from 'src/models/StatRequestFiles';
import { TokenService } from 'src/app/Authentification/services/token.service';
import { nbrMarqueFamilleStats } from 'src/models/nbrMarqueFamilleStats';
import { nbrMarqueSiteStats } from 'src/models/nbrMarqueSiteStats';

export enum ToggleEnum {
  Option1,
  Option2,
  Option3,
  Option4,
  Option5,
  Option6,
  Option7,
  Option8,
  Option9,
}
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
  chartOption7: any;
  chartOption8: any;
  chartOption9: any;
  chartOption10: any;
  chartOption11: any;

  rejectedperUser: any;
  percentage: any;
  totalperUser: any;
  lang: any;
  toggleEnum = ToggleEnum;
  toggleEnum1 = ToggleEnum;

  selectedState = null;
  selectedState1 = null;
  selectedState2= null ;
  selectedState3: ToggleEnum.Option1;
  selectedState4: ToggleEnum.Option1;

  constructor(private requestService: RequestService,
    private userService: AccountService,
    private Token: TokenService,
  ) {
    this.dataSource = new MatTableDataSource(this.result);
  }

  nbrMFdatas: nbrMarqueFamilleStats[]
  datas: StatTarget[]
  userdatas: requestfileUsersStat[]
  nbrMSdatas: nbrMarqueSiteStats[]
  nbrRejRDdatas: NbrRejectedRCDateStats[]
  statistic: StatRequestFiles = new StatRequestFiles();
  targetStats: StatTarget = new StatTarget();
  nbrfamillemarquestatistic: nbrMarqueFamilleStats = new nbrMarqueFamilleStats();

  ngOnInit(): void {

    this.getRequestFiles();
    this.getStatistic();
    this.id = this.Token.getId();
    this.getRfPerUser(this.id);
    this.setData();
    this.rejectedUsers();
    this.finishedUsers();
    this.getNbrMarquefamillestats()
    this.getTempsTraitement()
    this.lang = localStorage.getItem('lang') || 'en';

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

  getNbrMarquefamillestats() {
    this.requestService.getStatnbrMarqueFamille().subscribe(data => {
      this.nbrMFdatas = data
      const data1 = []
      for (let s of this.nbrMFdatas) {

        data1.push(s.nbr)
      }
      this.chartOption7 = {
        title: {
          text: 'nombre/marque/famille',
          left: '5%',
          top: '3%'
        },
        dataset: [
          {
            dimensions: ['marque', 'famille', 'nbr'],
            source: this.nbrMFdatas
          },
          {
            transform: {
              type: 'sort',
              config: [
                { dimension: 'famille', order: 'asc' },
                { dimension: 'nbr', order: 'desc' }
              ]
            }
          }
        ],
        tooltip: {

        },
        xAxis: {
          type: 'category',
        },
        yAxis: {
          type: 'category',
        },
        series: {
          type: 'scatter',
          emphasis: {
            focus: 'self'
          },
          animationDelay: function (idx) {
            return idx * 10;
          },
          label: {
            show: true,
            position: 'top',
            align: 'left',
            verticalAlign: 'middle',
            color: '#91cc75'
          },
          encode: { x: 'famille', y: 'nbr', label: ['marque'] },
          datasetIndex: 0
        },
        toolbox: {
          // y: 'bottom',
          feature: {

            dataView: {},

            saveAsImage: {
              pixelRatio: 2
            }
          }
        }
      };
    })
  }

  getNbrMarquesitestats($event) {
    this.selectedState = $event.value;

    if (this.selectedState == 0) {
      this.requestService.getStatnbrMarqueSite().subscribe(data => {
        this.nbrMSdatas = data
        const nbr = []
        const date = []
        const site = []
        const marque = []
        const colors = ['#5470C6', '#91CC75', '#EE6666'];

        for (let s of this.nbrMSdatas) {
          date.push(s.date)
          nbr.push(s.nbr)
          site.push(s.famille)
          marque.push(s.marque)
        }

        this.chartOption9 = {
          title: {
            text: 'nombre/marque/Site',
            left: '5%',
            top: '1%'

          },
          color: colors,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            right: '20%'
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ['date', 'nombre', 'site']
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              // prettier-ignore
              data: marque
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'date',
              position: 'right',
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: 'nombre',
              position: 'right',
              alignTicks: true,
              offset: 80,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[1]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },

            {
              type: 'category',
              name: 'site',
              position: 'left',
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[2]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: 'date',
              type: 'bar',
              data: date
            },
            {
              name: 'nombre',
              type: 'bar',
              yAxisIndex: 1,
              data: nbr
            },

            {
              name: 'site',
              type: 'scatter',
              yAxisIndex: 2,
              data: site
            }
          ]
        };
      })
    }
    else if (this.selectedState == 2) {
      this.requestService.getStatnbrMarqueSiteyear().subscribe(data => {
        this.nbrMSdatas = data
        const nbr = []
        const date = []
        const site = []
        const marque = []

        const colors = ['#5470C6', '#91CC75', '#EE6666'];

        for (let s of this.nbrMSdatas) {
          date.push(s.date)
          nbr.push(s.nbr)
          site.push(s.famille)
          marque.push(s.marque)
        }

        this.chartOption9 = {
          title: {
            text: 'nombre/marque/Site',
            left: '5%',
            top: '1%'

          },
          color: colors,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            right: '20%'
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ['date', 'nombre', 'site']
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              // prettier-ignore
              data: marque
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'date',
              position: 'right',
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: 'nombre',
              position: 'right',
              alignTicks: true,
              offset: 80,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[1]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },

            {
              type: 'category',
              name: 'site',
              position: 'left',
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[2]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: 'date',
              type: 'bar',
              data: date
            },
            {
              name: 'nombre',
              type: 'bar',
              yAxisIndex: 1,
              data: nbr
            },

            {
              name: 'site',
              type: 'scatter',
              yAxisIndex: 2,
              data: site
            }
          ]
        };
      })
    }
    else if (this.selectedState == 3) {
      this.requestService.getStatnbrMarqueSitecible().subscribe(data => {
        this.nbrMSdatas = data
        const nbr = []
        const date = []
        const site = []
        const marque = []

        const colors = ['#5470C6', '#91CC75', '#EE6666'];

        for (let s of this.nbrMSdatas) {
          date.push(s.date)
          nbr.push(s.nbr)
          site.push(s.famille)
          marque.push(s.marque)
        }

        this.chartOption9 = {
          title: {
            text: 'nombre/marque/Site',
            left: '5%',
            top: '1%'

          },
          color: colors,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            right: '20%'
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ['date', 'nombre', 'site']
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              // prettier-ignore
              data: marque
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'date',
              position: 'right',
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: 'nombre',
              position: 'right',
              alignTicks: true,
              offset: 80,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[1]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },

            {
              type: 'category',
              name: 'site',
              position: 'left',
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[2]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: 'date',
              type: 'bar',
              data: date
            },
            {
              name: 'nombre',
              type: 'bar',
              yAxisIndex: 1,
              data: nbr
            },

            {
              name: 'site',
              type: 'scatter',
              yAxisIndex: 2,
              data: site
            }
          ]
        };
      })
    }
    else if (this.selectedState == 4) {
      this.requestService.getStatnbrMarqueSitemonth().subscribe(data => {
        this.nbrMSdatas = data
        const nbr = []
        const date = []
        const site = []
        const marque = []

        const colors = ['#5470C6', '#91CC75', '#EE6666'];

        for (let s of this.nbrMSdatas) {
          date.push(s.date)
          nbr.push(s.nbr)
          site.push(s.famille)
          marque.push(s.marque)
        }

        this.chartOption9 = {
          title: {
            text: 'nombre/marque/Site',
            left: '5%',
            top: '1%'

          },
          color: colors,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            right: '20%'
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ['date', 'nombre', 'site']
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              // prettier-ignore
              data: marque
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'date',
              position: 'right',
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: 'nombre',
              position: 'right',
              alignTicks: true,
              offset: 80,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[1]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },

            {
              type: 'category',
              name: 'site',
              position: 'left',
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[2]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: 'date',
              type: 'bar',
              data: date
            },
            {
              name: 'nombre',
              type: 'bar',
              yAxisIndex: 1,
              data: nbr
            },

            {
              name: 'site',
              type: 'scatter',
              yAxisIndex: 2,
              data: site
            }
          ]
        };
      })
    }
    else {
      this.requestService.getStatnbrMarqueSiteweek().subscribe(data => {
        this.nbrMSdatas = data
        const nbr = []
        const date = []
        const site = []
        const marque = []

        const colors = ['#5470C6', '#91CC75', '#EE6666'];

        for (let s of this.nbrMSdatas) {
          date.push(s.date)
          nbr.push(s.nbr)
          site.push(s.famille)
          marque.push(s.marque)
        }

        this.chartOption9 = {
          title: {
            text: 'nombre/marque/Site',
            left: '5%',
            top: '1%'

          },
          color: colors,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            right: '20%'
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ['date', 'nombre', 'site']
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              // prettier-ignore
              data: marque
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'date',
              position: 'right',
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: 'nombre',
              position: 'right',
              alignTicks: true,
              offset: 80,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[1]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },

            {
              type: 'category',
              name: 'site',
              position: 'left',
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[2]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: 'date',
              type: 'bar',
              data: date
            },
            {
              name: 'nombre',
              type: 'bar',
              yAxisIndex: 1,
              data: nbr
            },

            {
              name: 'site',
              type: 'scatter',
              yAxisIndex: 2,
              data: site
            }
          ]
        };
      })
    }
  }

  getTempsTraitement() {
    const data1 = [];
    const xAxisData = [];
    this.requestService.gettreatment().subscribe(data => {
      this.userdatas = data
      for (let s of this.userdatas) {
        data1.push(s.value)
        xAxisData.push(s.firstname)
        this.chartOption8 = {
          title: {
            text: 'Traitement / Demande'
          },
          grid: {
            bottom: 150,
          },
          legend: {
            data: xAxisData
          },
          toolbox: {
            // y: 'bottom',
            feature: {

              dataView: {},
              magicType: { show: true, type: ['bar', 'line'] },

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
            },
            axisLabel: {
              interval: 0,
              rotate: 30,
              fontSize: '10',
            }

          },
          yAxis: {},
          series: [
            {
              name: 'Temps de traitement par jour',
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
    })
  }

  getRejectedRCdate($event) {

    this.selectedState1 = $event.value;

    if (this.selectedState1 == 0) {
      this.requestService.getStatnbrRejectedRCday().subscribe(data => {
        this.nbrRejRDdatas = data;

        this.chartOption10 = {
          dataset: [
            {
              dimensions: ['firstname', 'date', 'value'],
              source: this.nbrRejRDdatas
            },
            {
              transform: {
                type: 'sort',
                config: [
                  { dimension: 'firstname', order: 'asc' },
                  { dimension: 'value', order: 'desc' }
                ]
              }
            }
          ],
          legend: {
            data: ['Number of rejected demands'],
            left: 'right'
          },
          tooltip: {

          },
          xAxis: {
            type: 'category',
            axisLabel: { interval: 0, rotate: 30 },
            name: 'Nom du RC',

          },
          yAxis: {
            type: 'category',
            name: 'Date',

          },
          series: {
            name: 'Number of rejected demands',
            type: 'scatter',
            label: {
              show: true,
              position: 'top',
              align: 'left',
              verticalAlign: 'middle',
              color: '#91cc75'
            },

            encode: { x: 'firstname', y: 'date', label: ['value'] },
            datasetIndex: 1
          }
        };
      }
      )
    }
    if (this.selectedState1 == 1) {
      this.requestService.getStatnbrRejectedRCweek().subscribe(data => {
        this.nbrRejRDdatas = data;
        this.chartOption10 = {
          dataset: [
            {
              dimensions: ['firstname', 'date', 'value'],
              source: this.nbrRejRDdatas
            },
            {
              transform: {
                type: 'sort',
                config: [
                  { dimension: 'firstname', order: 'asc' },
                  { dimension: 'value', order: 'desc' }
                ]
              }
            }
          ],
          legend: {
            data: ['Number of rejected demands'],
            left: 'right'
          },
          tooltip: {

          },
          xAxis: {
            type: 'category',
            axisLabel: { interval: 0, rotate: 30 },
            name: 'Nom du RC',

          },
          yAxis: {
            type: 'category',
            name: 'Date',

          },
          series: {
            name: 'Number of rejected demands',
            type: 'scatter',
            label: {
              show: true,
              position: 'top',
              align: 'left',
              verticalAlign: 'middle',
              color: '#91cc75'
            },

            encode: { x: 'firstname', y: 'date', label: ['value'] },
            datasetIndex: 1
          }
        };
      }
      )
    }
    if (this.selectedState1 == 2) {
      this.requestService.getStatnbrRejectedRCmonth().subscribe(data => {
        this.nbrRejRDdatas = data;

        this.chartOption10 = {
          dataset: [
            {
              dimensions: ['firstname', 'date', 'value'],
              source: this.nbrRejRDdatas
            },
            {
              transform: {
                type: 'sort',
                config: [
                  { dimension: 'firstname', order: 'asc' },
                  { dimension: 'value', order: 'desc' }
                ]
              }
            }
          ],
          legend: {
            data: ['Number of rejected demands'],
            left: 'right'
          },
          tooltip: {

          },
          xAxis: {
            type: 'category',
            axisLabel: { interval: 0, rotate: 30 },
            name: 'Nom du RC',

          },
          yAxis: {
            type: 'category',
            name: 'Date',

          },
          series: {
            name: 'Number of rejected demands',
            type: 'scatter',
            label: {
              show: true,
              position: 'top',
              align: 'left',
              verticalAlign: 'middle',
              color: '#91cc75'
            },

            encode: { x: 'firstname', y: 'date', label: ['value'] },
            datasetIndex: 1
          }
        };
      }
      )
    }
    if (this.selectedState1 == 3) {
      this.requestService.getStatnbrRejectedRCyear().subscribe(data => {
        this.nbrRejRDdatas = data;

        this.chartOption10 = {
          dataset: [
            {
              dimensions: ['firstname', 'date', 'value'],
              source: this.nbrRejRDdatas
            },
            {
              transform: {
                type: 'sort',
                config: [
                  { dimension: 'firstname', order: 'asc' },
                  { dimension: 'value', order: 'desc' }
                ]
              }
            }
          ],
          legend: {
            data: ['Number of rejected demands'],
            left: 'right'
          },
          tooltip: {

          },
          xAxis: {
            type: 'category',
            axisLabel: { interval: 0, rotate: 30 },
            name: 'Nom du RC',

          },
          yAxis: {
            type: 'category',
            name: 'Date',

          },
          series: {
            name: 'Number of rejected demands',
            type: 'scatter',
            label: {
              show: true,
              position: 'top',
              align: 'left',
              verticalAlign: 'middle',
              color: '#91cc75'
            },

            encode: { x: 'firstname', y: 'date', label: ['value'] },
            datasetIndex: 1
          }
        };
      }
      )
    }
    if (this.selectedState1 == 4){
      this.requestService.getStatnbrRejectedRCcible().subscribe(data => {
        this.nbrRejRDdatas = data;

        this.chartOption10 = {
          dataset: [
            {
              dimensions: ['firstname', 'date', 'value'],
              source: this.nbrRejRDdatas
            },
            {
              transform: {
                type: 'sort',
                config: [
                  { dimension: 'firstname', order: 'asc' },
                  { dimension: 'value', order: 'desc' }
                ]
              }
            }
          ],
          legend: {
            data: ['Number of rejected demands'],
            left: 'right'
          },
          tooltip: {

          },
          xAxis: {
            type: 'category',
            axisLabel: { interval: 0, rotate: 30 },
            name: 'Nom du RC',

          },
          yAxis: {
            type: 'category',
            name: 'Date',

          },
          series: {
            name: 'Number of rejected demands',
            type: 'scatter',
            label: {
              show: true,
              position: 'top',
              align: 'left',
              verticalAlign: 'middle',
              color: '#91cc75'
            },

            encode: { x: 'firstname', y: 'date', label: ['value'] },
            datasetIndex: 1
          }
        };
      }
      )
    }
  }


  getNbrMarquestats($event) {
    this.selectedState2 = $event.value;


    if (this.selectedState2 == 0) {
      this.requestService.getStatnbrMarque().subscribe(data => {
        this.userdatas = data
        const nbr = []
        const date = []
        const site = []
        const marque = []
        const colors = ['#5470C6', '#91CC75', '#EE6666'];

        for (let s of this.userdatas) {
          nbr.push(s.value)
          marque.push(s.firstname)
        }

        this.chartOption11 = {
          title: {
            text: 'stats globales',
            left: '5%',
            top: '1%'

          },
          color: colors,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            right: '20%'
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ['date', 'nombre', 'site']
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              // prettier-ignore
              data: marque
            }
          ],
          yAxis: [

            {
              type: 'value',
              name: 'nombre',
              position: 'right',
              alignTicks: true,
              offset: 80,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [

            {
              name: 'nombre',
              type: 'bar',
              yAxisIndex: 0,
              data: nbr
            }
          ]
        };
      })
    }
    else if (this.selectedState2 == 1) {
      this.requestService.getStatnbrRejectedMarque().subscribe(data => {
        this.userdatas = data
        const nbr = []
        const date = []
        const site = []
        const marque = []

        const colors = ['#5470C6', '#91CC75', '#EE6666'];

        for (let s of this.userdatas) {
          nbr.push(s.value)
          marque.push(s.firstname)
        }

        this.chartOption11 = {
          title: {
            text: 'stats globales',
            left: '5%',
            top: '1%'

          },
          color: colors,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            right: '20%'
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ['date', 'nombre', 'site']
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              // prettier-ignore
              data: marque
            }
          ],
          yAxis: [

            {
              type: 'value',
              name: 'nombre',
              position: 'right',
              alignTicks: true,
              offset: 80,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [

            {
              name: 'nombre',
              type: 'bar',
              yAxisIndex: 0,
              data: nbr
            }
          ]
        };
      })
    }
    else if (this.selectedState2 == 2) {
      this.requestService.getStatnbrMarque().subscribe(data => {
        this.userdatas = data
        const nbr = []
        const date = []
        const site = []
        const marque = []

        const colors = ['#5470C6', '#91CC75', '#EE6666'];

        for (let s of this.userdatas) {
          nbr.push(s.value)
          marque.push(s.firstname)
        }

        this.chartOption11 = {
          title: {
            text: 'nombre/marque/Site',
            left: '5%',
            top: '1%'

          },
          color: colors,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            right: '20%'
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ['date', 'nombre', 'site']
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              // prettier-ignore
              data: marque
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'date',
              position: 'right',
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: 'nombre',
              position: 'right',
              alignTicks: true,
              offset: 80,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[1]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },

            {
              type: 'category',
              name: 'site',
              position: 'left',
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[2]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: 'date',
              type: 'bar',
              data: date
            },
            {
              name: 'nombre',
              type: 'bar',
              yAxisIndex: 1,
              data: nbr
            },

            {
              name: 'site',
              type: 'scatter',
              yAxisIndex: 2,
              data: site
            }
          ]
        };
      })
    }
    else if (this.selectedState2 == 3) {
      this.requestService.getStatnbrMarque().subscribe(data => {
        this.userdatas = data
        const nbr = []
        const date = []
        const site = []
        const marque = []

        const colors = ['#5470C6', '#91CC75', '#EE6666'];

        for (let s of this.userdatas) {
          nbr.push(s.value)
          marque.push(s.firstname)
        }

        this.chartOption11 = {
          title: {
            text: 'nombre/marque/Site',
            left: '5%',
            top: '1%'

          },
          color: colors,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            right: '20%'
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ['date', 'nombre', 'site']
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              // prettier-ignore
              data: marque
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'date',
              position: 'right',
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: 'nombre',
              position: 'right',
              alignTicks: true,
              offset: 80,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[1]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },

            {
              type: 'category',
              name: 'site',
              position: 'left',
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[2]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: 'date',
              type: 'bar',
              data: date
            },
            {
              name: 'nombre',
              type: 'bar',
              yAxisIndex: 1,
              data: nbr
            },

            {
              name: 'site',
              type: 'scatter',
              yAxisIndex: 2,
              data: site
            }
          ]
        };
      })
    }
    else if (this.selectedState2 == 4) {
      this.requestService.getStatnbrMarque().subscribe(data => {
        this.userdatas = data
        const nbr = []
        const date = []
        const site = []
        const marque = []

        const colors = ['#5470C6', '#91CC75', '#EE6666'];

        for (let s of this.userdatas) {
          nbr.push(s.value)
          marque.push(s.firstname)
        }

        this.chartOption11 = {
          title: {
            text: 'nombre/marque/Site',
            left: '5%',
            top: '1%'

          },
          color: colors,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            right: '20%'
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ['date', 'nombre', 'site']
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              // prettier-ignore
              data: marque
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'date',
              position: 'right',
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: 'nombre',
              position: 'right',
              alignTicks: true,
              offset: 80,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[1]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },

            {
              type: 'category',
              name: 'site',
              position: 'left',
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[2]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: 'date',
              type: 'bar',
              data: date
            },
            {
              name: 'nombre',
              type: 'bar',
              yAxisIndex: 1,
              data: nbr
            },

            {
              name: 'site',
              type: 'scatter',
              yAxisIndex: 2,
              data: site
            }
          ]
        };
      })
    }
    else {
      this.requestService.getStatnbrMarqueSiteweek().subscribe(data => {
        this.nbrMSdatas = data
        const nbr = []
        const date = []
        const site = []
        const marque = []

        const colors = ['#5470C6', '#91CC75', '#EE6666'];

        for (let s of this.nbrMSdatas) {
          date.push(s.date)
          nbr.push(s.nbr)
          site.push(s.famille)
          marque.push(s.marque)
        }

        this.chartOption11 = {
          title: {
            text: 'nombre/marque/Site',
            left: '5%',
            top: '1%'

          },
          color: colors,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            right: '20%'
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ['date', 'nombre', 'site']
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              // prettier-ignore
              data: marque
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'date',
              position: 'right',
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: 'nombre',
              position: 'right',
              alignTicks: true,
              offset: 80,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[1]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            },

            {
              type: 'category',
              name: 'site',
              position: 'left',
              alignTicks: true,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[2]
                }
              },
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: 'date',
              type: 'bar',
              data: date
            },
            {
              name: 'nombre',
              type: 'bar',
              yAxisIndex: 1,
              data: nbr
            },

            {
              name: 'site',
              type: 'scatter',
              yAxisIndex: 2,
              data: site
            }
          ]
        };
      })
    }
  }

}