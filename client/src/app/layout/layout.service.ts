import { map } from 'rxjs/operators';
import { AnalyticsImage } from './layout.models';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from "@angular/core";

@Injectable()
export class LayoutService {
  constructor(private db: AngularFireDatabase) { };

  getAnalyticsImage() {
    return 
  }

  onLike(path: string) {
    this.db.list('analyticsImages').snapshotChanges()
      .pipe(map((analytics: any) => {
        const data = [];
        analytics.forEach(element => {
          data.push({
            data: element.payload.toJSON(),
            key: element.key
          })
        });
        return data;
      })).subscribe((analytics: {data: AnalyticsImage; key: string}[]) => {
        let wasLiked: {
          agent: string;
          key: string;
        } = null;
        analytics.map(item => {
          if(item.data.path === path) {
            if(item.data.likes.includes(navigator.userAgent.toString())) {
              wasLiked.agent = navigator.userAgent.toString();
              wasLiked.key = item.key;
            }
          }
        });
        if(wasLiked) {
          let newA = analytics.filter(a => {
            return a.key === wasLiked.key;
          })[0].data;
          this.db.object('analyticsImages/'+wasLiked.key).update(
            newA.likes.filter(like => like !== navigator.userAgent.toString())
          ).then(() => {
            console.log('like remove');
          })
        } else {
          let newA = analytics.filter(item => item.data.path === path)[0].data;
          this.db.object('analyticsImages/'+wasLiked.key).update(
            newA.likes.push(navigator.userAgent.toString())
          ).then(() => {
            console.log('like added');
          })
        }
      });
  }
}