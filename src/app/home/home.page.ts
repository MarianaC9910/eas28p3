import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText } from '@ionic/angular/standalone';
import { Clipboard } from '@capacitor/clipboard';
import { TextZoom } from '@capacitor/text-zoom';
import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText],
})

export class HomePage {
  constructor() {}
  private currentZoom = 1;

  async copyText() {
    await Clipboard.write({
      string: 'Texto copiado desde Ionic + Capacitor',
    });
    this.showToast('Texto copiado al portapapeles');
  }

  async readText() {
    const { value } = await Clipboard.read();
    this.showToast(`Texto leído: ${value}`);
    console.log('Texto leído del portapapeles:', value);
  }

  async increaseZoom() {
    this.currentZoom += 0.1;
    await TextZoom.set({ value: this.currentZoom });
    this.showToast(`Zoom aumentado a ${this.currentZoom.toFixed(1)}`);
  }

  async decreaseZoom() {
    this.currentZoom = Math.max(0.5, this.currentZoom - 0.1);
    await TextZoom.set({ value: this.currentZoom });
    this.showToast(`Zoom reducido a ${this.currentZoom.toFixed(1)}`);
  }

  async showToast(message: string = 'Este es un Toast') {
    await Toast.show({
      text: message,
      duration: 'short',
      position: 'bottom',
    });
  }
}
