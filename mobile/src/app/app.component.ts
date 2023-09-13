import {Component, ElementRef, AfterViewInit, ViewChild, Renderer2} from '@angular/core';
// import * as cocoSsd from '@tensorflow-models/coco-ssd';
// import '@tensorflow/tfjs';

interface ObjectPrediction {
  class: string;
  bbox: number[];
  score: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('liveView', {static: true}) liveView!: ElementRef;
  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef;

  // private socket!:Socket;
  private model: any; // Store the COCO-SSD model
  private stream!: MediaStream;
  private children: any[] = [];


  constructor(private renderer: Renderer2) {

    let lastAlertTime = 0;
    const alertInterval = 10 * 60 * 1000;
  }

  async ngAfterViewInit(): Promise<void> {
   // await this.loadModel();
    //this.analyzeCameraFrames();
    // this.socket = io('http://localhost:3000');
  }

  // async loadModel() {
  //   this.model = await cocoSsd.load();
  // }

  async setupCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1250, height: 600 },
        audio: true
      });

      // Use Renderer2 to set the srcObject
      this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', this.stream);

      // Play the video once the stream is set
      this.videoElement.nativeElement.play();
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }

  // async analyzeCameraFrames() {
  //   const video = this.videoElement.nativeElement;
  //
  //   if (video.readyState === 4 && video.videoWidth > 0 && video.videoHeight > 0) {
  //     const predictions: ObjectPrediction[] = await this.model.detect(video);
  //     const babyDetection = predictions.find(prediction => prediction.class === 'person');
  //     console.log('Predictions: ');
  //     console.log(predictions);
  //     if (!babyDetection) {
  //       // Trigger alert logic and WebSocket event here
  //       // You can emit a WebSocket event to notify the backend
  //     }
  //   }
  //
  //   requestAnimationFrame(() => this.analyzeCameraFrames());
  // }

  stopCamera() {
    // @ts-ignore
    this.videoElement.nativeElement.srcObject.getTracks().forEach(function (track) {
      track.stop();
    });
  }
}
