import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatComponent} from "./chat/chat.component";

const routes: Routes = [
  {
    path: '', component: ChatComponent,
    data: {
      isAdmin: true,
    }
  },
  {
    path: 'user', component: ChatComponent,
    data: {
      isAdmin: false,
    }
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
