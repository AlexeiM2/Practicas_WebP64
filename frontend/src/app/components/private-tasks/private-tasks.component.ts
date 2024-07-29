import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrl: './private-tasks.component.css'
})
export class PrivateTasksComponent implements OnInit{

  tasks = <any>[];
  constructor (private tasksService: TasksService){}
    ngOnInit(): void {
      this.tasksService.getTasks()
        .subscribe(
          res=>{
            console.log(res)
            this.tasks = res;
          }
        )
    }
}
