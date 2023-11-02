import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgToastService} from 'ng-angular-popup';
import {CookieService} from 'ngx-cookie-service';
import {ParentService} from '../../../../service/parent.service';

@Component({
  selector: 'app-parent-my-plan',
  templateUrl: './parent-my-plan.component.html',
  styleUrls: ['./parent-my-plan.component.css']
})
export class ParentMyPlanComponent implements OnInit {
  myplan: any;
  isFree: any;
  paymentHandler: any = null;
  checkout: any;
  success: boolean = false;
  failure: boolean = false;
  userData: any;
pid:any;
  parent = {
    id:'',
  };
  constructor(
    private parentService: ParentService,
    private toast: NgToastService,
    private router: Router,
    private cookieService: CookieService,
  ) {
  }

  ngOnInit(): void {
    this.getPlan();
    this.invokeStripe();
  }

  // @ts-ignore
  // getPlan() {
  //   const user = localStorage.getItem('user');
  //   // @ts-ignore
  //   this.myplan = JSON.parse(user);
  //   console.log(this.myplan.status)
  // }
  private amount: number;

  getPlan() {
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.parentService.getPlan(JSON.parse(userJSON)).subscribe(
        (response: any) => {
          this.myplan = response.plan.plan;
          console.log(response.plan.plan)
        },
        (error) => {
          console.error('Error fetching: ', error);
        }
      );
    }
  }

  activateFree() {
    const parent = localStorage.getItem('user');
    // @ts-ignore
    console.log(JSON.parse(parent).id)
    // @ts-ignore
    this.pid = JSON.parse(parent).id
    // @ts-ignore
    this.parentService.updatePlan(this.pid).subscribe(
      (response) => {
        /*this.router.navigate(['/parent/parent_my_plan'])*/
        window.location.reload();
        this.toast.success({detail:"SUCCESS",summary:'Plan updated successfully', position:'topCenter'});
        console.log("Parent updated successful:", response);


      },
      (err) => {
        this.toast.error({detail:"ERROR",summary:err.error.message, position:'topCenter'});
        console.log(`unsuccessful plan update:${err}`, err);
      }
    );
  }
  activatePremium() {
    const parent = localStorage.getItem('user');
    // @ts-ignore
    console.log(JSON.parse(parent).id)
    // @ts-ignore
    this.pid = JSON.parse(parent).id
    // @ts-ignore
    this.parentService.updateToPremium(this.pid).subscribe(
      (response) => {
        window.location.reload();
        this.toast.success({detail:"SUCCESS",summary:'Plan updated successfully', position:'topCenter'});
        console.log("Parent updated successful:", response);


      },
      (err) => {
        this.toast.error({detail:"ERROR",summary:err.error.message, position:'topCenter'});
        console.log(`unsuccessful plan update:${err}`, err);
      }
    );
  }
  upgradeToPremium(amount:number) {
    // this.activatePremium();
    this.makePayment(amount);
  }
  makePayment(amount: number) {
    if (this.paymentHandler) {
      this.paymentHandler.open({
        name: 'Cuddle Care System',
        description: 'Premium Option',
        // amount: amount * 100
      });
    }

  }

  paymentStripe(stripeToken: any) {
    // this.makePayment(stripeToken).subscribe((data: any) => {

    this.parentService.makePayment(stripeToken).subscribe((data: any) => {
      console.log(data);

      if (data.data === "success") {
        this.success = true;
      } else {
        this.failure = true;
      }
    });
    const parent = localStorage.getItem('user');
    // @ts-ignore
    console.log(JSON.parse(parent).id)
    // @ts-ignore
    this.pid = JSON.parse(parent).id
    // @ts-ignore
    this.parentService.updateToPremium(this.pid).subscribe(
      (response) => {
        window.location.reload();
        this.toast.success({detail:"SUCCESS",summary:'Plan updated successfully', position:'topCenter'});
        console.log("Parent updated successful:", response);


      },
      (err) => {
        this.toast.error({detail:"ERROR",summary:err.error.message, position:'topCenter'});
        console.log(`unsuccessful plan update:${err}`, err);
      }
    );
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51MlRwNLkwnMeV4KrakhfHzMSWe8uOGMTgdxT6UBukJUP0AJB9memAAlcnkBEShf1HWwMH3wFaBV1XROZ7TQidM5y00OM0lgTax',
          locale: 'auto',
          token: (stripeToken: any) => {
            console.log(stripeToken);
            this.paymentStripe(stripeToken);
          },
        });
      };
      window.document.body.appendChild(script);
    }

  }


}
