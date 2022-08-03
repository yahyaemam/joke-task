import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'jokes',
    loadChildren: () => import('../jokes/jokes.module').then(m => m.JokesModule)
  },
  {
    path: '',
    redirectTo: 'jokes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
