import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RefreshTableService } from 'src/app/services/refresh-table.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private hubConnection: HubConnection;
  title = 'LogApp Dashboard';

  constructor(private snackBar: MatSnackBar, private refreshService: RefreshTableService) {
  }

  ngOnInit() {
    const builder = new HubConnectionBuilder();
    this.hubConnection = builder.withUrl(environment.newRecordsNotify).build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));

    this.hubConnection.on(environment.notifyMethodHubName, (amount: number) => {
      this.snackBar.open(amount + ' new records has been added', 'Refresh', {
        duration: 10000
      }).onAction()
      .subscribe(
        () => {
          this.refreshService.refreshRecords.emit();
        }
      );
    });
  }
}
