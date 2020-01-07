import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RefreshTableService } from 'src/app/services/refreshTable.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _hubConnection: HubConnection;
  title = 'LogApp Dashboard';

  constructor(private _snackBar: MatSnackBar, private _refreshService: RefreshTableService) {
  }

  ngOnInit() {
    const builder = new HubConnectionBuilder();
    this._hubConnection = builder.withUrl('https://localhost:5001/notifyNewRecords').build();
    this._hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));

    this._hubConnection.on('RecordsAdded', (amount: number) => {
      this._snackBar.open(amount + ' new records has been added', 'Refresh', {
        duration: 10000
      }).onAction()
      .subscribe(
        () => {
          this._refreshService.refreshRecords.emit();
        }
      );
    });
  }
}
