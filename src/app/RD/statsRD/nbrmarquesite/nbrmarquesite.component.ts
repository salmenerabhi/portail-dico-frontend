import { RequestService } from 'src/app/services/request.service';
import { Component, OnInit } from '@angular/core';
import { nbrMarqueSiteStats } from 'src/models/nbrMarqueSiteStats';
import { ToggleEnum } from 'src/app/Dashboard/stats/stats.component';

@Component({
  selector: 'app-nbrmarquesite',
  templateUrl: './nbrmarquesite.component.html',
  styleUrls: ['./nbrmarquesite.component.css']
})
export class NbrmarquesiteComponent implements OnInit {
  selectedState = null;
  nbrMSdatas: nbrMarqueSiteStats[]
  chartOption9: any;
  toggleEnum = ToggleEnum;

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
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

}
