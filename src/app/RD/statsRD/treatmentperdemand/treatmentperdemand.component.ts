import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { requestfileUsersStat } from 'src/models/requestfileUsersStat';

@Component({
  selector: 'app-treatmentperdemand',
  templateUrl: './treatmentperdemand.component.html',
  styleUrls: ['./treatmentperdemand.component.css']
})
export class TreatmentperdemandComponent implements OnInit {
  userdatas: requestfileUsersStat[]
  chartOption8: any;

  constructor(private requestService: RequestService,) { }

  ngOnInit(): void {
    this.getTempsTraitement()
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
              tooltip: {
                valueFormatter: function (value) {
                  return value + ' jour(s)';
                }
              },
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
}
