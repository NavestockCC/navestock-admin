/** Angular Imports */
import { Component, OnInit, Input } from '@angular/core';

/** Material Imports */
import {MatPaginator, MatTableDataSource} from '@angular/material';

/** Navestock Objects */
import {batting} from '../objects/batting.object';

/** Navestock Service */
import {MatchDataService} from '../matchdata-service/matchdata.service';




@Component({
    selector: 'batting-card',
    templateUrl: './batting.component.html',
    styleUrls: ['./batting.component.scss']
})
export class BattingComponent implements OnInit {

    @Input() BatTeamId:string;
    @Input() MatchId:string;

    public displayedColumns: string[];
    public dataSourceBatting: MatTableDataSource<batting> = new MatTableDataSource<batting>();

    constructor(
        private matchdataService: MatchDataService
    ) {
        
     }

    ngOnInit(): void { 
        this.displayedColumns = ['battingPlayer', 'battingHowOut', 'battingRuns', 'batting4', 'batting6'];
        this.matchdataService.getBatting(this.MatchId, this.BatTeamId).subscribe( res => (this.dataSourceBatting.data = res));
    }
}
