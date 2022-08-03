import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JokesRoutingModule } from './jokes-routing.module';
import { JokesComponent } from './jokes.component';
import { SharedModule } from 'src/shared/components/shared.module';
import { JokesRatingComponent } from './component/joke-rating/joke-rating.component';
import { JokeService } from './jokes.service';

@NgModule({
  imports: [
    CommonModule,
    JokesRoutingModule,
    SharedModule
  ],
  declarations: [JokesComponent, JokesRatingComponent],
  providers: [JokeService]
})
export class JokesModule { }
