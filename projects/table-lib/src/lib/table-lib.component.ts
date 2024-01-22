import { Component, Input, OnInit } from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import { TableLibService } from "./table-lib.service";
import { TableLoadingService } from "./table-loading.service";
import { AsyncPipe, CommonModule, TitleCasePipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ColumnPropertiesInterface, TableToolbar } from "./models";

@Component({
  selector: 'lib-table-lib',
  standalone: true,
  templateUrl: './table-lib.component.html',
  imports: [
    TitleCasePipe,
    AsyncPipe,
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  styleUrl: './table-lib.component.scss'
})

export class TableLibComponent implements OnInit {

  @Input() readonly token = 'WriteYourTokenHere';
  @Input() URL = '';
  @Input() autoLoading = true;
  @Input() header = '';
  @Input() messagePending = '';
  @Input() tableDataNotFound = '';
  @Input() columns: ColumnPropertiesInterface[] = [];
  @Input() tableToolbar:TableToolbar = {};
  public data: any[] = [];
  public currentPage = 1;
  public limit =  20;
  public limitOptions = [20, 50, 100];
  private params: Params = [];


  constructor(
    private tableLibService: TableLibService,
    public loading: TableLoadingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.params = params
      this.currentPage = isNaN(+params['page']) ? 1 : +params['page'];
      this.limit = isNaN(+params['limit']) ? 20 : +params['limit'];
      if (this.autoLoading && this.token) {
        this.loading.setLoading(true);
        this.tableLibService.getTableData(this.URL, params)
          .subscribe((data) => {
            this.loading.setLoading(false);
            this.data = Object.values(data)[0];
          });
      }
    })
  }

  onTriggerEvent(column:  {}): void {
    this.router.navigate([],
      {
        queryParams: {...column, page: this.currentPage},
        queryParamsHandling: "merge"
      })
  }

  public sortBy({ header, sorting }: ColumnPropertiesInterface): void {
    if (!sorting) {
      return;
    }
    const params = {
      order_by: header,
      order_type: this.params['order_type'] === 'desc' ? 'asc' : 'desc'
    }
    this.onTriggerEvent(params);
  }

  public setPageLimit(limit: number): void {
    const params = { limit: limit};
    this.onTriggerEvent(params);
  }

  public previousPage(): void {
    if (this.currentPage === 1) {
      return;
    }
    this.currentPage--;
    const params = {page: this.currentPage};
    this.onTriggerEvent(params);
  }

  public nextPage(): void {
    this.currentPage++;
    const params = {page: this.currentPage};
    this.onTriggerEvent(params);
  }

  public isEmptyObject(obj: {}): boolean {
    return (obj && (Object.values(obj).includes(true)));
  }

}


