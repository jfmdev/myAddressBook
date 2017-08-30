import { Component, OnInit } from '@angular/core';
import { DalService } from './dal.service';
import { Contact } from './contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DalService]
})

export class AppComponent implements OnInit {
  friends: Contact[];

  constructor(private dalService: DalService) {
  }

  ngOnInit(): void {
    this.dalService.list().then(result => {
      this.friends = result;
    });
  }
}

