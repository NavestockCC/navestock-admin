import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {match} from '../objects/match.object';
import {matchspermonth} from '../matchpermonth.object';
import { innings } from '../objects/innings.object';
import { batting } from '../objects/batting.object';
import { bowling } from '../objects/bowling.object';
import {navestockTeam} from '../../objects/navestock-teams.objects';


@Injectable()
export class MatchDataService {

    private matchesCollection: AngularFirestoreCollection<match>;
    private matchDetailDocument: AngularFirestoreDocument<match>;
    private inningsCollection: AngularFirestoreCollection<innings>;
    private battingCollection: AngularFirestoreCollection<batting>;
    private bowlingCollection: AngularFirestoreCollection<bowling>;
    public matchesObservable: Observable<match[]>;
    public matchesperSeason: matchspermonth[];


    constructor(
        private afs: AngularFirestore,
        private http: HttpClient
    ) { 
       
    }

    public getMatchlist(seasonYear:number, navTeamId:string): Observable<match[]> {

        if(navTeamId === 'all'){
            this.matchesCollection = this.afs.collection<match>('Fixtures', ref => ref.where('season', '==', seasonYear).orderBy('match_date', 'asc'));    
        } else{
            this.matchesCollection = this.afs.collection<match>('Fixtures', ref => ref.where('season', '==', seasonYear).where('navestock_team_id', '==', navTeamId).orderBy('match_date', 'asc'));
        }
        return this.matchesCollection.valueChanges();
    }

    public getMatchlistPerMonth(seasonYear:number, navTeamId:string):Observable<matchspermonth[]>{
        var tempYear: number = null;
        var tempMonth: number = null;
        let i:number = null;
        this.matchesperSeason = [];
        this.getMatchlist(seasonYear, navTeamId).subscribe(e => (
            e.forEach(element => {
                let dt:Date = new Date(element.match_date);
                let mntDate:number = dt.getMonth();
                let flYear: number = dt.getFullYear(); 
                if(tempMonth == mntDate && tempYear == flYear){
                    this.matchesperSeason[i-1].addMatch(element);
                } else{
                    tempYear = flYear;
                    tempMonth = mntDate;
                    this.matchesperSeason.push( new matchspermonth(element));
                    i = this.matchesperSeason.length;
                } // end if
                
            })
        ), (error => console.log(error))
    );
    return of(this.matchesperSeason);
    }

    public getSeasons():Observable<number[]>{
            let seasonsDoc:AngularFirestoreDocument<number[]> = this.afs.collection('Fixtures').doc<number[]>('seasons');
            return seasonsDoc.valueChanges();
    }

    public getMatchDetail(matchId: string):Observable<match>{
        this.matchDetailDocument = this.afs.doc<match>('Fixtures/' + matchId);
        return this.matchDetailDocument.valueChanges();
    }

    public getMatchInningsDetails(matchId: string):Observable<innings[]>{
        this.inningsCollection = this.afs.collection<innings>('Fixtures/' + matchId + '/innings');
        return this.inningsCollection.valueChanges();
    }

    public getBatting(matchId: string, teamId: string):Observable<batting[]>{
        this.battingCollection = this.afs.collection<batting>('Fixtures/' + matchId + '/innings/' + teamId + '/batting', ref => ref.orderBy('position', 'asc'));
        return this.battingCollection.valueChanges();
    }

    public getBowling(matchId: string, teamId: string):Observable<bowling[]>{
        this.bowlingCollection = this.afs.collection<bowling>('Fixtures/' + matchId + '/innings/' + teamId + '/bowling');
        return this.bowlingCollection.valueChanges();
    }

/* **** Match Widget data service. **** */

//Get fixture widget data from navestock webservice
private getMatchWidgetData_FB(teamId:string, nRecordstoreturn:number):Observable<match[]>{
    let  matchesCollection: AngularFirestoreCollection<match>;
    matchesCollection = this.afs.collection('Fixtures', ref => (ref.where('navestock_team_id', '==', teamId).where( 'match_date', ">=", new Date())).orderBy('match_date', 'asc').limit(nRecordstoreturn));
    return matchesCollection.valueChanges();
}

//Read data received from getfixturewidgetData_Http and parse into fixturewidgetdata object.
// NaveStockTeams: {tmName:string; tmId:number;}[]
getmatchWidgetData(NaveStockTeams:Observable<navestockTeam[]>, nRecordstoreturn:number):{teamName:string, teamId:string, matchList:Observable<match[]>}[]{
    let matchWidgetData: {teamName:string, teamId:string, matchList:Observable<match[]>}[] = []
    NaveStockTeams.subscribe(res => { 
        res.forEach(tm => {
       matchWidgetData.push({teamName:tm.team_name, teamId:tm.team_id, matchList:this.getMatchWidgetData_FB(tm.team_id, nRecordstoreturn)});
    });
})
    return matchWidgetData;
}

//Set the match Import matchID so that the firebase function will trigger and impor the results
    public playCricketImport(mtch: match){
        // this.afs.doc('FixtureImport/Import').update({'matchId': matchid});
        console.log('calling HTTP')

        const url = `https://us-central1-navestock-website.cloudfunctions.net/playcricketMatchDetailImport?mid=`+ mtch.id;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }

        this.http.get(url, httpOptions).subscribe( res => console.log(res))
    }
}