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
  @ViewChild('liveView', { static: true }) liveView!: ElementRef;
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
    const liveView = this.liveView.nativeElement as HTMLElement;

    if (video.readyState === 4 && video.videoWidth > 0 && video.videoHeight > 0) {
      const predictions: ObjectPrediction[] = await this.model.detect(video);

      // Clear previous highlighting
      for (const child of this.children) {
        this.renderer.removeChild(this.liveView.nativeElement, child);
      }
      this.children.splice(0);

      // Loop through predictions and draw bounding boxes
      for (let n = 0; n < predictions.length; n++) {
        if (predictions[n].score > 0.66) {
          const p = this.renderer.createElement('p');
          this.renderer.setProperty(p, 'innerText', predictions[n].class + ' - with ' + Math.round(parseFloat(String(predictions[n].score)) * 100) + '% confidence.');
          this.renderer.setStyle(p, 'margin-left', predictions[n].bbox[0] + 'px');
          this.renderer.setStyle(p, 'margin-top', (predictions[n].bbox[1] - 10) + 'px');
          this.renderer.setStyle(p, 'width', (predictions[n].bbox[2] - 10) + 'px');
          // You can continue setting other styles for the paragraph element

          const highlighter = this.renderer.createElement('div');
          this.renderer.setAttribute(highlighter, 'class', 'highlighter');
          this.renderer.setStyle(highlighter, 'left', predictions[n].bbox[0] + 'px');
          this.renderer.setStyle(highlighter, 'top', predictions[n].bbox[1] + 'px');
          this.renderer.setStyle(highlighter, 'width', predictions[n].bbox[2] + 'px');
          this.renderer.setStyle(highlighter, 'height', predictions[n].bbox[3] + 'px');
          // You can continue setting other styles for the highlighter element

          this.renderer.appendChild(this.liveView.nativeElement, highlighter);
          this.renderer.appendChild(this.liveView.nativeElement, p);
          this.children.push(highlighter);
          this.children.push(p);
        }
      }
    }

    requestAnimationFrame(() => this.analyzeCameraFrames());
  }

}
