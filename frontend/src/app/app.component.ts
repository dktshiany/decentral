import { Component } from '@angular/core';
import { OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource} from '@angular/material';
import { Sort } from '@angular/material';

import { MarketResult } from './getmarket.service';
import { MarketResponse } from './getmarket.service';
import { GetmarketService } from './getmarket.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';

import {MatSidenavModule} from '@angular/material/sidenav'

import 'rxjs/add/observable/of';
import { DataSource} from '@angular/cdk/collections';
//import { User } from '../../models/user.model';

// import { HttpClient} from '@angular/common/http';
// import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//export class AppComponent {
//  title = 'decentral-frontend';
//}




export class AppComponent implements AfterViewInit, OnInit {
  //title = 'decentral-frontend';
  innerItemsSize =72+46+74+56+56;
 matHearedRowSize =56;
	title = 'frontend';
  marketResult: MarketResult[];
  //marketRow: MarketRow[];

  sortActive = ''

  displayedColumns: string[] = ['MarketName', 'GainInPercentage', 'PrevDay', 'Created','Volume' ];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<MarketResult>(this.marketResult);

  //let dataSource = any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  testMap = new Map([
    ['', 'Map Value 2']
  ]);

  minCount = window.innerWidth;
  
  
  @HostListener('window:resize', ['$event'])
onResize(event){
   //console.log("Width: " + event.target.innerHeight);


   //var innerItemsSize =72+46+74+56+56;
    // matHearedRowSize =56;
    this.minCount = Math.floor((window.innerHeight-this.innerItemsSize)/this.matHearedRowSize);
    //(window.innerHeight-innerItemsSize)/matHearedRowSize;

  

    this.dataSource.paginator.pageSizeOptions = [this.minCount];
    if (this.minCount != 10)
    this.dataSource.paginator.pageSizeOptions.push(10);// = [this.minCount,2,4];
    if (this.minCount != 20)
    this.dataSource.paginator.pageSizeOptions.push(20);
    
    this.dataSource.paginator.pageSize = this.minCount;
    this.dataSource.paginator._changePageSize(this.paginator.pageSize);
}


  //var otherObject: MarketRow[];
  

  constructor(
    private marketService: GetmarketService,
    //private http: HttpClient,
    //private router: Router
  ) { }

  ngOnInit() {	  
    
    this.minCount = Math.floor((window.innerHeight-this.innerItemsSize)/this.matHearedRowSize);
	  
	  this.reloadData('','');
	  
	  

  // this.http.get((req, res) => {
  //   res.send('Hello World!');
  // });
  
  // this.http.get('/api',data).subscribe((data:any) => {
  //   this.router.navigate(['/api']);

  // });
	
	
	
	  
	  
  }

  reloadData(sortActive, sortDirection){

    //var host = window.location.host();

    var hostname = window.location.hostname;

    //console.log(host);

    this.marketService.getMarketResponse(hostname, sortActive, sortDirection)//.subscribe(countries => this.countries = countries);;
    .subscribe((data: MarketResponse) => 
    {
      //alert(JSON.stringify(data['result'][0]));
      this.marketResult = data['result'];
      
      
      
      this.dataSource = new MatTableDataSource<MarketResult>(this.marketResult);
      //this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      
      //this.dataSource.data.PercentGain = "ee";
      this.dataSource.paginator = this.paginator;
  
      this.dataSource.paginator.pageSizeOptions = [this.minCount];
      if (this.minCount != 10)
      this.dataSource.paginator.pageSizeOptions.push(10);// = [this.minCount,2,4];
      if (this.minCount != 20)
      this.dataSource.paginator.pageSizeOptions.push(20);
  
    
      
  
      this.dataSource.paginator.pageSize = this.minCount;
      this.dataSource.paginator._changePageSize(this.paginator.pageSize);
      
  
      this.dataSource.sort = this.sort;
      //this.dataSource.paginator.pageSizeOptions = [2,4]
    
    }
    //{
      //    heroesUrl: data['heroesUrl'],
      //    textfile:  data['textfile']
      //
    ,(error) => {  
      console.log(JSON.stringify(error));
          //alert('Error was an error while retrieving Posts !!!' + JSON.stringify(error));  
        }
    );
  }
  
  ngAfterViewInit() {
	  
	  
  }


  sortData(sort: Sort) {
    //const data = this.desserts.slice();
    if (!sort.active || sort.direction === '') {
      //this.sortedData = data;
      return;
    }

    if (this.sortActive == 'GainInPercentage' || sort.active == 'GainInPercentage')

    this.reloadData(sort.active, sort.direction);


    this.sortActive = sort.active;
    //console.log(sort.active +" - "+ sort.direction);

    // console.log(sort.active);

    // // this.sortedData = data.sort((a, b) => {
    // //   const isAsc = sort.direction === 'asc';
    // //   switch (sort.active) {
    // //     case 'name': return compare(a.name, b.name, isAsc);
    // //     case 'calories': return compare(a.calories, b.calories, isAsc);
    // //     case 'fat': return compare(a.fat, b.fat, isAsc);
    // //     case 'carbs': return compare(a.carbs, b.carbs, isAsc);
    // //     case 'protein': return compare(a.protein, b.protein, isAsc);
    // //     default: return 0;
    // //   }
    // // });
  }


  
  getRecord(mDrawer, tDrawer, rec){
	 console.log(rec); 
	 
	 this.testMap = new Map([
		['MarketName    ', rec.MarketName],
		['High          ', rec.High],
		['Low           ', rec.Low],
		['Volume        ', rec.Volume],
		['BaseVolume    ', rec.BaseVolume],
		['TimeStamp     ', rec.TimeStamp],
		['Bid           ', rec.Bid],
		['Ask           ', rec.Ask],
		['OpenBuyOrders ', rec.OpenBuyOrders],
		['OpenSellOrders', rec.OpenSellOrders],
		['PrevDay       ', rec.PrevDay],
    ['Created       ', rec.Created],
    ['Gain (%)      ', rec.GainInPercentage]
    ]);
    
    //tDrawer.text('Voila');
    //mDrawer.find(tDrawer).html('Voila');
    document.getElementById("tdrawer").innerText = 'Trading Pair: '+rec.MarketName;
  
	 mDrawer.toggle();
	  
  }
	  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
	
  }

}




