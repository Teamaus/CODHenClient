import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MarkdownCollapsibleComponent } from './markdown-collapsible/markdown-collapsible.component';
import { MarkdownPatternsComponent } from './markdown-patterns/markdown-patterns.component';
import { MarkdownCleanComponent } from './markdown-clean/markdown-clean.component';
import { PatternsMdOrangeComponent } from './patterns-md-orange/patterns-md-orange.component';
import { MdRawStyledComponent } from './md-raw-styled/md-raw-styled.component';
import { PatternsCollapsibleComponent } from './patterns-collapsible/patterns-collapsible.component';
import { PatternsCollapsibleComponentSearch } from './patterns-collapsible-search/patterns-collapsible-search.component';
import { PatternComponent } from "./pattern/pattern.component";

@Component({
  selector: 'app-root',
  imports: [PatternsCollapsibleComponent, PatternComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test-var';
}
