import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TableLibService } from "./table-lib.service";
import { TableLoadingService } from "./table-loading.service";
import { AsyncPipe, CommonModule, TitleCasePipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { TableToolbar } from "./models";
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

  @Input() URL!: string
  @Input() autoLoading = true;
  @Input() messageNotFound = '';
  @Input() messagePending = '';
  @Input() header: string = '';
  @Input() columns:  any = []
  @Input() tableToolbar:TableToolbar = {}
  public data: any = [];
  public currentPage = 1;
  public limit =  20;
  public  limitOptions = [20, 50, 100]

  private params: any = [];


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
      this.loading.setLoading(true);
      this.tableLibService.getTableData(this.URL, params)
        .subscribe((data) => {
          this.loading.setLoading(false);
          this.data = Object.values(data)[0]
        })
    })
  }

  onNavigate(column:  any) {
    this.router.navigate([],
      {
        queryParams: {...column, page: this.currentPage},
        queryParamsHandling: "merge"
      })
  }

  public sortBy(column: any) {
    if (!column.sorting) {
      return;
    }
    const params = {
      order_by: column.header,
      order_type: this.params.order_type === 'desc' ? 'asc' : 'desc'
    }
    this.onNavigate(params);
  }

  public previousPage() {
    if (this.currentPage === 1) {
      return
    }
    this.currentPage--;
    const params = {page: this.currentPage}
    this.onNavigate(params)
  }

  public nextPage() {
    this.currentPage++;
    const params = {page: this.currentPage}
    this.onNavigate(params)
  }

  public isEmptyObject(obj: {}): boolean {
    return (obj && (Object.keys(obj).length === 0));
  }

  public setPageLimit(limit: number) {
    const params = { limit: limit};
    this.onNavigate(params)
  }

}


