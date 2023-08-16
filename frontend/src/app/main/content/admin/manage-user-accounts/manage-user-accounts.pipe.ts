//import { Pipe, PipeTransform } from '@angular/core';
import { Pipe,PipeTransform} from "@angular/core";

@Pipe({
  name: 'statusFilter'
})
export class StatusFilterPipe implements PipeTransform {
  transform(items: any[], filterActive: boolean): any[] {
    if (filterActive) {
      return items.filter(item => item.status === 'Active');
    } else {
      return items;
    }
  }
}
