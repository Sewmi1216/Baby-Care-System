import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../service/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, AfterViewInit {
  @ViewChild('userAccountForm', { static: true }) public userAccountForm!: NgForm;
  @ViewChild('prevBtn', { static: true }) prevBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('nextBtn', { static: true }) nextBtn!: ElementRef<HTMLButtonElement>;

  useraccount = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    nic: ''
  };
  private users: any;
  private currentTab = 0;
  private stepIndicators: HTMLElement[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // Initialize the stepIndicators array with the stepIndicator elements
    this.stepIndicators = this.el.nativeElement.getElementsByClassName('stepIndicator');

    // Show the first step by default
    this.showTab(0);
  }

  ngAfterViewInit(): void {
    this.prevBtn.nativeElement.addEventListener('click', () => this.nextPrev(-1));
    this.nextBtn.nativeElement.addEventListener('click', () => this.nextPrev(1));
  }

  showTab(n: number): void {
    const x = this.el.nativeElement.getElementsByClassName('step');
    x[n].style.display = 'block';

    if (n === 0) {
      this.renderer.setStyle(this.prevBtn.nativeElement, 'display', 'none');
    } else {
      this.renderer.setStyle(this.prevBtn.nativeElement, 'display', 'inline');
    }

    if (n === x.length - 1) {
      this.renderer.setProperty(this.nextBtn.nativeElement, 'innerHTML', 'Submit');
    } else {
      this.renderer.setProperty(this.nextBtn.nativeElement, 'innerHTML', 'Next');
    }

    this.fixStepIndicator(n);
  }

  nextPrev(n: number): void {
    const x = this.el.nativeElement.getElementsByClassName('step');

    if (n === 1 && !this.validateForm()) return;

    this.renderer.setStyle(x[this.currentTab], 'display', 'none');
    this.currentTab += n;

    if (this.currentTab >= x.length) {
      this.userAccountForm.ngSubmit.emit();
      return;
    }

    this.showTab(this.currentTab);
  }

  validateForm(): boolean {
    const x = this.el.nativeElement.getElementsByClassName('step');
    const y = x[this.currentTab].getElementsByTagName('input');
    let valid = true;

    for (let i = 0; i < y.length; i++) {
      if (y[i].value === '') {
        y[i].classList.add('invalid');
        valid = false;
      }
    }

    if (valid) {
      this.renderer.addClass(this.stepIndicators[this.currentTab], 'finish');
    }

    return valid;
  }

  fixStepIndicator(n: number): void {
    for (let i = 0; i < this.stepIndicators.length; i++) {
      this.renderer.removeClass(this.stepIndicators[i], 'active');
    }

    this.renderer.addClass(this.stepIndicators[n], 'active');
  }

  getStepClass(index: number): string {
    const classes = ['stepIndicator'];
    if (index === this.currentTab) {
      classes.push('active');
    }
    if (index <= this.currentTab) {
      classes.push('finish');
    }
    return classes.join(' ');
  }

  onSubmit() {
    console.log("Submitting form...");
    this.authService.register(this.useraccount).subscribe(
      (data) => {
        console.log("Registration successful:", data);
        console.log("Successfully");
      },
      (err) => {
        console.log('Registration failed:', err);
        console.log('Unsuccess');
      }
    );
  }
}
