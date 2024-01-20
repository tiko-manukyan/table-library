import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TableLibService } from "./table-lib.service";
import { TableLoadingService } from "./table-loading.service";
import { AsyncPipe, CommonModule, TitleCasePipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
@Component({
  selector: 'lib-table-lib',
  standalone: true,
  templateUrl: './table-lib.component.html',
  imports: [
    TitleCasePipe,
    AsyncPipe,
    CommonModule,
    HttpClientModule
  ],
  styleUrl: './table-lib.component.scss'
})

export class TableLibComponent implements OnInit {

  @Input() autoLoading = true;
  @Input() messageNotFound = '';
  @Input() messagePending = '';
  @Input() header: string = '';
  @Input() columns:  any = []
  public data: any = [];
  private params: any;
  public showTool = true;
  public currentPage = 1;


  constructor(
    private tableLibService: TableLibService,
    public loading: TableLoadingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.loading.setLoading(true);
      this.tableLibService.getTableData()
        .subscribe((data: any) => {
          this.loading.setLoading(false);
          this.data = Object.values(data)[0]
        })
    })
  }

  onNavigate(column:  any) {
    this.router.navigate([],
      {
        queryParams: column,
        queryParamsHandling: "merge"
      })
  }

  public sortBy(column: string | undefined) {
    const params = {
      order_by: column,
      order_type: 'desc'
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
}


