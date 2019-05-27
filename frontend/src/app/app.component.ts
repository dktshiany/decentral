import { Component } from '@angular/core';
import { OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Sort } from '@angular/material';

import { MarketResult } from './getmarket.service';
import { MarketResponse } from './getmarket.service';
import { GetmarketService } from './getmarket.service';

import 'rxjs/add/observable/of';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements AfterViewInit, OnInit {

  innerItemsSize = 72 + 46 + 74 + 56 + 56;
  matHearedRowSize = 56;
  title = 'frontend';
  marketResult: MarketResult[];
  sortActive = ''
  displayedColumns: string[] = ['MarketName', 'GainInPercentage', 'PrevDay', 'Created', 'Volume'];

  dataSource = new MatTableDataSource<MarketResult>(this.marketResult);
  minCount = window.innerWidth;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  testMap = new Map([
    ['', 'Map Value 2']
  ]);

  // Reside table size to adapt to browser display
  //
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.minCount = Math.floor((window.innerHeight - this.innerItemsSize) / this.matHearedRowSize);

    this.dataSource.paginator.pageSizeOptions = [this.minCount];
    if (this.minCount != 10)
      this.dataSource.paginator.pageSizeOptions.push(10);// = [this.minCount,2,4];
    if (this.minCount != 20)
      this.dataSource.paginator.pageSizeOptions.push(20);

    this.dataSource.paginator.pageSize = this.minCount;
    this.dataSource.paginator._changePageSize(this.paginator.pageSize);
  }


  constructor(private marketService: GetmarketService) { }

  ngOnInit() {
    this.minCount = Math.floor((window.innerHeight - this.innerItemsSize) / this.matHearedRowSize);
    this.reloadData('', '');
  }

  reloadData(sortActive, sortDirection) {

    var hostname = window.location.hostname;

    this.marketService.getMarketResponse(hostname, sortActive, sortDirection)//.subscribe(countries => this.countries = countries);;
      .subscribe((data: MarketResponse) => {
        this.marketResult = data['result'];

        this.dataSource = new MatTableDataSource<MarketResult>(this.marketResult);

        this.dataSource.paginator = this.paginator;

        this.dataSource.paginator.pageSizeOptions = [this.minCount];
        if (this.minCount != 10)
          this.dataSource.paginator.pageSizeOptions.push(10);
        if (this.minCount != 20)
          this.dataSource.paginator.pageSizeOptions.push(20);

        this.dataSource.paginator.pageSize = this.minCount;
        this.dataSource.paginator._changePageSize(this.paginator.pageSize);


        this.dataSource.sort = this.sort;
      }
        , (error) => {
          console.log('Market service error: ' + JSON.stringify(error));
        }
      );
  }

  ngAfterViewInit() {
  }

  // Runs when a colum is clicked to sort
  //
  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }

    if (this.sortActive == 'GainInPercentage' || sort.active == 'GainInPercentage') {
      this.reloadData(sort.active, sort.direction);
    }

    this.sortActive = sort.active;
  }

  // Get record to display in Trading pair detail
  // when a row is pressed
  // 
  getRecord(mDrawer, tDrawer, rec) {
    //console.log(rec);

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

    document.getElementById("tdrawer").innerText = 'Trading Pair: ' + rec.MarketName;
    mDrawer.toggle();

  }


  // When filter text box is pressed up
  //
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}




