import {Component, ElementRef, AfterViewInit, ViewChild} from '@angular/core';
import * as io from 'socket.io-client'
import {NgToastService} from "ng-angular-popup";
import {computeMsgId} from "@angular/compiler";

interface ObjectPrediction {
  class: string;
  bbox: number[];
  score: number;
}

@Component({
  selector: 'app-live-stream',
  templateUrl: './live-stream.component.html',
  styleUrls: ['./live-stream.component.css']
})
export class LiveStreamComponent implements AfterViewInit {
  @ViewChild('videoElement', {static: true}) videoElement!: ElementRef;

  private stream!: MediaStream;
  private socket: any;

  constructor(private toast: NgToastService) {
  }

  async ngAfterViewInit(): Promise<void> {
    // @ts-ignore
    this.socket = io.connect('https://192.168.94.250:8070');

    // Handle WebSocket events
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
    this.socket.on('acknowledgment', (ack: any) => {
      console.log('Received acknowledgment for frame with ID:', ack.id);
    });
    this.socket.on('videoFrame', (video: any) => {
      console.log('Received video: ', video);
      // const videoElement = this.videoElement.nativeElement;
      const blob = new Blob([video], {type: 'image/jpeg'});
      const url = URL.createObjectURL(blob);
      // @ts-ignore
      document.getElementById('videoElement').src = url
      // if (videoElement) {
      //   const blob = new Blob([data], { type: 'image/jpeg' });
      //   const url = URL.createObjectURL(blob);
      //
      //   videoElement.src = url;
      // }
    });
    this.socket.on('BabyNotDetected', () => {
      console.log("Babynotdetected")
      this.toast.error({detail: "ERROR", summary: "Baby doesn't detect", position: 'topRight'});

    });
    //Handle disconnection
    this.socket.on('disconnect', () => {
      console.log('A client disconnected.');
    });
  }

  async viewStream() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {width: 1250, height: 600},
        audio: true
      });

    } catch (error) {
      console.error('Error accessing stream:', error);
    }
  }

  stopCamera() {
    // @ts-ignore
    this.videoElement.nativeElement.srcObject.getTracks().forEach(function (track) {
      track.stop();
    });
  }
}
