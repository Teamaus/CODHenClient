import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CodcodaSideBarComponent } from "./codcoda-side-bar/codcoda-side-bar.component";
import { CodcodaChatComponent } from "./codcoda-chat/codcoda-chat.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CodcodaSideBarComponent, CodcodaChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'codcoda-chat';
}
