import { Component, ElementRef, AfterViewInit, ViewChild, Renderer2  } from '@angular/core';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

interface ObjectPrediction {
  class: string;
  bbox: [number, number, number, number];
  score: number;
}

@Component({
  selector: 'app-live-stream',
  templateUrl: './live-stream.component.html',
  styleUrls: ['./live-stream.component.css']
})
export class LiveStreamComponent implements AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef;

  // private socket!:Socket;
  private model: any; // Store the COCO-SSD model
  private stream!: MediaStream;


  constructor(private renderer: Renderer2) {

    let lastAlertTime = 0;
    const alertInterval = 10 * 60 * 1000;
  }

  async ngAfterViewInit(): Promise<void> {
    await this.loadModel();
    this.analyzeCameraFrames();
    // this.socket = io('http://localhost:3000');
  }

  async loadModel() {
    this.model = await cocoSsd.load();
  }

  async setupCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1250, height: 600 },
        audio: true
      });

      this.videoElement.nativeElement.srcObject = this.stream;

      // Play the video once the stream is set
      this.videoElement.nativeElement.play();
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }


  async analyzeCameraFrames() {
    const video = this.videoElement.nativeElement;

    if (video.readyState === 4 && video.videoWidth > 0 && video.videoHeight > 0) {
      const predictions: ObjectPrediction[] = await this.model.detect(video);
      const canvas: HTMLCanvasElement = this.renderer.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Draw the video frame on the canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Draw bounding boxes
        predictions.forEach(prediction => {
          if (prediction.class === 'person') {
            const [x, y, width, height] = prediction.bbox;
            ctx.beginPath();
            ctx.rect(x, y, width, height);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.fillStyle = 'red';
            ctx.globalAlpha = 0.2;
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = 'white';
            ctx.globalAlpha = 1;
            ctx.font = '16px Arial';
            ctx.fillText('Person', x, y - 5);
          }
        });

        // Replace the video stream with the canvas for display
        this.renderer.removeChild(video.parentNode, video);
        this.renderer.appendChild(video.parentNode, canvas);
      }

      const babyDetection = predictions.find(prediction => prediction.class === 'person');
      if (!babyDetection) {
        // Trigger alert logic and WebSocket event here
        // You can emit a WebSocket event to notify the backend
        // this.sendAlertToParent();
      }
    }

    requestAnimationFrame(() => this.analyzeCameraFrames());
  }

  sendAlertToParent(){
    console.log('no person')
  }

}
