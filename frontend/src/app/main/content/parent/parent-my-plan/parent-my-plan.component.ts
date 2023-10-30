import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CookieService } from 'ngx-cookie-service';
import { ParentService } from '../../../../service/parent.service';

@Component({
  selector: 'app-parent-my-plan',
  templateUrl: './parent-my-plan.component.html',
  styleUrls: ['./parent-my-plan.component.css']
})
export class ParentMyPlanComponent implements OnInit {
  plan = {
    isFree: '',
    userId: null,
    _id: ''
  };
  isFree: any;
  paymentHandler: any = null;
  checkout: any;
  success: boolean = false;
  failure: boolean = false;

  constructor(
    private parentService: ParentService,
    private toast: NgToastService,
    private router: Router,
    private cookieService: CookieService,
  ) {
  }

  ngOnInit(): void {
    this.getPlan();
   // this.invokeStripe();
  }

  getPlan() {
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.parentService.getPlan(JSON.parse(userJSON)).subscribe(
        (response: any) => {
          this.plan = response.plan;
          this.isFree = response.isFree;
        },
        (error) => {
          console.error('Error fetching: ', error);
        }
      );
    }
  }
//
//   makePayment(amount: number) {
//     if (this.paymentHandler) {
//       this.paymentHandler.open({
//         name: 'Cuddle Care System',
//         description: 'Premium Option',
//         // amount: amount * 100
//       });
//     }
//   }
//
//   paymentStripe(stripeToken: any) {
//     this.checkout.makePayment(stripeToken).subscribe((data: any) => {
//       console.log(data);
//
//       if (data.data === "success") {
//         this.success = true;
//       } else {
//         this.failure = true;
//       }
//     });
//   }
//
//   invokeStripe() {
//     if (!window.document.getElementById('stripe-script')) {
//       const script = window.document.createElement('script');
//       script.id = 'stripe-script';
//       script.type = 'text/javascript';
//       script.src = 'https://checkout.stripe.com/checkout.js';
//       script.onload = () => {
//         this.paymentHandler = (<any>window).StripeCheckout.configure({
//           key: 'pk_test_51MlRwNLkwnMeV4KrakhfHzMSWe8uOGMTgdxT6UBukJUP0AJB9memAAlcnkBEShf1HWwMH3wFaBV1XROZ7TQidM5y00OM0lgTax',
//           locale: 'auto',
//           token: (stripeToken: any) => {
//             console.log(stripeToken);
//             this.paymentStripe(stripeToken);
//           },
//         });
//       };
//       window.document.body.appendChild(script);
//     }
//   }
 }
