import {Component, ElementRef, AfterViewInit, ViewChild, Renderer2} from '@angular/core';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import {io} from 'socket.io-client'

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
  private socket: any;
  private lastAlertTime = 0;
  private alertInterval = 10 * 60 * 1000;

  constructor(private renderer: Renderer2) {
    let lastAlertTime = 0;
    const alertInterval =  60 * 1000;
    setInterval(() => {
      this.checkBabyDetectionAndAlert();
    }, this.alertInterval);
  }

  async ngAfterViewInit(): Promise<void> {
    console.log('video');
    await this.loadModel();

    // @ts-ignore
    this.socket = io("https://192.168.94.250:8070", {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });
    console.log('Connected???');
    // Handle WebSocket events
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
    this.socket.on('error', (error: any) => {
      console.error('Error connecting to WebSocket server:', error);
    });
    // this.socket.on('disconnect', () => {
    //   console.log('Disconnected from WebSocket server');
    // });
  }

  async loadModel() {
    this.model = await cocoSsd.load();
  }

  async setupfrontCamera() {
    try {
      if (this.stream) {
        this.stopCamera();
      }
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {width: 1250, height: 600},
        audio: true
      });

      // Use Renderer2 to set the srcObject
      this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', this.stream);

      // Play the video once the stream is set
      this.videoElement.nativeElement.play();
      this.sendVideoFrames();
      this.analyzeCameraFrames();
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }

  sendVideoFrames() {
    const video = this.videoElement.nativeElement;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    let frameCounter = 0;
    const sendFrame = () => {
      frameCounter++;
      if (video.readyState === 4 && video.videoWidth > 0 && video.videoHeight > 0) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // @ts-ignore
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          //this.socket.emit('videoFrame', blob);
          this.socket.emit('videoFrame', {
            id: frameCounter,
            data: blob,
            contentType: 'image/jpeg'
          });
          // Schedule the next frame
          requestAnimationFrame(sendFrame);
        }, 'image/jpeg');
      } else {
        setTimeout(sendFrame, 200);
      }
    };
    console.log('sending frame');
    sendFrame();
  }

  async setupbackCamera() {
    try {

      if (this.stream) {
        this.stopCamera();
      }
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {width: 1250, height: 600, facingMode: "environment"},
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

  async analyzeCameraFrames() {
    const video = this.videoElement.nativeElement;

    if (video.readyState === 4 && video.videoWidth > 0 && video.videoHeight > 0) {
      const predictions: ObjectPrediction[] = await this.model.detect(video);
      const babyDetection = predictions.find(prediction => prediction.class === 'person');
      console.log('Predictions: ');
      console.log(predictions);
      if (!babyDetection) {
        // Baby not detected, send an alert to the web server
        // this.lastAlertTime = Date.now();

         this.socket.emit('BabyNotDetected',{data:'Baby not detect'});
      }
    }

    requestAnimationFrame(() => this.analyzeCameraFrames());
  }
  checkBabyDetectionAndAlert() {
    const currentTime = Date.now();
    if (currentTime - this.lastAlertTime >= this.alertInterval) {
      this.socket.emit('BabyNotDetected');
      this.lastAlertTime = currentTime; // Update the last alert time
    }
  }

  stopCamera() {
    // @ts-ignore
    this.videoElement.nativeElement.srcObject.getTracks().forEach(function (track) {
      track.stop();
    });
  }
}
