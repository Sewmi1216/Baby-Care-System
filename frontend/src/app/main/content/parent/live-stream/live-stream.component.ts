import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-live-stream',
  templateUrl: './live-stream.component.html',
  styleUrls: ['./live-stream.component.css']
})
export class LiveStreamComponent implements OnInit{

  constructor() {
  }

  videoRef: any;

  ngOnInit():void{
    this.videoRef =document.getElementById('video');
    console.log(this.videoRef);
    this.setupCamera();
  }
  setupCamera(){
    navigator.mediaDevices.getUserMedia({
      video:{width:1100, height:500},
      audio:true
    }).then(stram=>{
      console.log(stram);
      this.videoRef.srcObject=stram;
    })
  }
}
