import {Injectable, OnDestroy} from "@angular/core";
import {Subject} from "rxjs";


@Injectable()
export class ClearObservable implements OnDestroy {
  public destroy$: Subject<void> = new Subject<void>();

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete()
  }
}
