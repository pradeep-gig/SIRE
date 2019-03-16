import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'search',
  pure: true
})
@Injectable()
export class Search {
  transform(list: any[], searchTerm: string): any[] {
    if (searchTerm && searchTerm != '') {
      searchTerm = searchTerm.toUpperCase();
      let result =[]; 
      result = list.filter((item) => { return item.title.toUpperCase().indexOf(searchTerm) > -1 });
      if(result.length === 0)
      result = list.filter((item) => { return item.location.toUpperCase().indexOf(searchTerm) > -1 });
      if(result.length === 0)
      result = list.filter((item) => {  return item.area.toUpperCase().indexOf(searchTerm) > -1 });
      if(result.length === 0)
      result = list.filter((item) => { return item.landmark.toUpperCase().indexOf(searchTerm) > -1 });
      if(result.length === 0)
      result = list.filter((item) => { return item.type.toUpperCase().indexOf(searchTerm) > -1 });
      if(result.length === 0)
      result = list.filter((item) => { return item.terms.toUpperCase().indexOf(searchTerm) > -1 });
      if(result.length === 0)
      result = [{"records":0}];
      return  result;
    } else {
      return list;
    }
  }
}