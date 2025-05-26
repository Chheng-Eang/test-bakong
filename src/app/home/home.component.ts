import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  AbstractControl,
  Validators, // Import Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { BakongKHQR, IndividualInfo } from 'bakong-khqr';
import { KHQR, CURRENCY, COUNTRY, TAG, ResponseResult, ReturnType } from 'ts-khqr';
import { QrCodeModule } from 'ng-qrcode';
// For JavaScript libraries without TypeScript definitions
// Alternative: Import as any type
// import * as BakongKHQR from 'bakong-khqr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, QrCodeModule], // Add CommonModule here
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  phone: AbstractControl;
  // Amount control removed as it's not in the specified HTML and KHQR data is static

  // Properties for displaying KHQR card
  khqrCodeDataUrl: string | null = null;
  displayMerchantName: string | null = null;
  displayAmount: string | null = null; // Storing as string for formatted display
  displayCurrency: string | null = null;


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''], // Kept for the form, but not used in static KHQR
      email: [''], // Kept for the form, but not used in static KHQR
      phone: [''], // Kept for the form, but not used in static KHQR
    });
    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.phone = this.form.controls['phone'];
  }

  ngOnInit(): void {
    // Initialization if needed
  }

  onSubmit() {
    // Using the static objectKHQR as requested
    const staticObjectKHQR = {
      tag: TAG.INDIVIDUAL,
      accountID: 'rattanak_keo3@aclb',
      merchantName: 'RATTANAK KEO',
      acquiringBank: 'Dev Bank',
      merchantCity: 'Phnom Penh',
      currency: CURRENCY.USD,
      amount: 0.01,
      countryCode: COUNTRY.KH,
      additionalData: {
        mobileNumber: '855962826514',
        billNumber: 'INV-2022-12-25',
        storeLabel: 'Ishin Shop',
        terminalLabel: '012345',
        purposeOfTransaction: 'Payment',
      },
      languageData: {
        languagePreference: 'ZH',
        merchantNameAlternateLanguage: '文山',
        merchantCityAlternateLanguage: '金边',
      },
      upiMerchantAccount: '',
    };

    try {
      const result: any = KHQR.generate(staticObjectKHQR);

      if (result && result?.data?.qr) {
        this.khqrCodeDataUrl = result?.data?.qr;
        this.displayMerchantName = staticObjectKHQR.merchantName;
        // Format amount with commas and two decimal places
        this.displayAmount = staticObjectKHQR.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        if (staticObjectKHQR.currency === CURRENCY.KHR) {
          this.displayCurrency = 'KHR';
        } else if (staticObjectKHQR.currency === CURRENCY.USD) {
          this.displayCurrency = 'USD';
        } else {
          this.displayCurrency = String(staticObjectKHQR.currency);
        }
        console.log('KHQR Generated successfully with static data.');
      } else {
        console.error('KHQR generation failed or QR data not found in result:', result);
        this.khqrCodeDataUrl = null;
        this.displayMerchantName = null;
        this.displayAmount = null;
        this.displayCurrency = null;
      }
    } catch (error) {
      console.error('Exception during KHQR generation:', error);
      this.khqrCodeDataUrl = null;
      this.displayMerchantName = null;
      this.displayAmount = null;
      this.displayCurrency = null;
    }
  }
}
