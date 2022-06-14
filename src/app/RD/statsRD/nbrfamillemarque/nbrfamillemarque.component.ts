import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { nbrMarqueFamilleStats } from 'src/models/nbrMarqueFamilleStats';

@Component({
  selector: 'app-nbrfamillemarque',
  templateUrl: './nbrfamillemarque.component.html',
  styleUrls: ['./nbrfamillemarque.component.css']
})
export class NbrfamillemarqueComponent implements OnInit {

  nbrMFdatas: nbrMarqueFamilleStats[]
  chartOption7: any;

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.getNbrMarquefamillestats()

  }

  getNbrMarquefamillestats() {

    this.requestService.getStatnbrMarqueFamille().subscribe(data => {
      this.nbrMFdatas = data
      let xAxisData = ['famille'];
      let data3 = [];
      let data4 = [];
      let c = "";

      let i = 0
      let map = new Map();
      for (let s of this.nbrMFdatas) {
        if (c != s.famille) {

          data3.push(mapToObj(map));
          map = new Map();
          map.set("famille", s.famille)
          map.set(s.marque, s.nbr)
          xAxisData.push(s.marque)
          data4.push({ type: 'bar', stack: " " })
        } else {
          map.set(s.marque, s.nbr)
          xAxisData.push(s.marque)
          data4.push({ type: 'bar', stack: " " })

        }

        c = s.famille
      }
      data3.push(mapToObj(map));
      data3.shift()


      function mapToObj(inputMap) {
        let obj = {};

        inputMap.forEach(function (value, key) {
          obj[key] = value
        });

        return obj;
      }
      this.chartOption7 = {
        legend: {},
        title: {
          text: 'nombre/marque/famille',
          left: '5%',
          top: '3%'
        },
  toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'center',
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: [ 'stack'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
        tooltip: {},
        dataset: {
          dimensions: xAxisData,
          source: data3
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: data4,
        label:{
          show: true
        }
      };
    })
  }
}
