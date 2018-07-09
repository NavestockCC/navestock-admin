import {match} from "../matches/objects/match.object";


export class matchspermonth{
    month:number;
    monthName: string;
    year:number;
    matchArray:match[] = [];

    constructor(matchToAdd:match){  
        const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
        let mtchDate:Date = matchToAdd.match_date.toDate();
        this.month = mtchDate.getMonth();
        this.monthName = monthNames[this.month];
        this.year = mtchDate.getFullYear();
        this.matchArray.push(matchToAdd);
      }

    public addMatch(matchToAdd: match){
        this.matchArray.push(matchToAdd);
    }
}