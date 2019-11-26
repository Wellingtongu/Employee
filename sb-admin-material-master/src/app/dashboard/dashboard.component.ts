import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cadastrar(){
    // this.router.navigate(['cadastro']);
    this.router.navigateByUrl('/cadastro')
  }

  lista(){
    this.router.navigateByUrl('/lista')
  }

}
