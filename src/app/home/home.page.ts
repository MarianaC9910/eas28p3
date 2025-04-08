import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText } from '@ionic/angular/standalone';
import { Clipboard } from '@capacitor/clipboard';
import { TextZoom } from '@capacitor/text-zoom';
import { Toast } from '@capacitor/toast';
import { Geolocation } from '@capacitor/geolocation';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText],
  template: `
    <button (click)="takePhoto()">Tomar Foto</button>
    <button (click)="getLocation()">Obtener Ubicación</button>
    <button (click)="checkNetwork()">Verificar Red</button>
  `,
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
  
  location: { latitude: number; longitude: number } | null = null;
  networkStatus: boolean | null = null;
  async getLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    } catch (error) {
      console.error('Error al obtener ubicación:', error);
    }
  }

  async checkNetwork() {
    try {
      const status = await Network.getStatus();
      this.networkStatus = status.connected;
    } catch (error) {
      console.error('Error al verificar red:', error);
    }
  }
}
