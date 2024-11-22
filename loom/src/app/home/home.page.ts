import { Component } from '@angular/core';
import { defineCustomElements } from '@ionic/core/loader';

import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() {
    // Define custom Ionic elements
    defineCustomElements();

    // Add icons for use within the app
    addIcons({
      library,
      'play-circle': playCircle,
    });
  }
}
