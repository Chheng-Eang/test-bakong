import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, AbstractControl, } from '@angular/forms';
import {BakongKHQR, khqrData, IndividualInfo, MerchantInfo, SourceInfo} from "bakong-khqr";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent implements OnInit {
  form: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  phone: AbstractControl;

  constructor(
    private fb: FormBuilder,
  ){
    this.form = this.fb.group({
    });
  }
  
  ngOnInit(): void {
    this.buildForm(null);
    // let KHQR = BakongKHQR;
    // console.log(KHQR);
    
  }

  buildForm(item: any) {
    this.form = this.fb.group({
      name: [item?.name || ''],
      email: [item?.email || ''],
      phone: [item?.phone || ''],
    });
  }

  onSubmit() {
    const currency = {
      usd: 840,
      khr: 116
    };
    
    const optionalData = {
      currency: currency.khr,
      amount: 100,
      billNumber: "#0001",
      mobileNumber: "855962826514",
      storeLabel: "Oem Chhengeang",
      terminalLabel: "Oem Chhengeang",
      purposeOfTransaction: "Payment for goods",
      languagePreference: "en",
      merchantCityAlternateLanguage: "ភ្នំពេញ",
      expirationTimestamp: Date.now() + (1 * 60 * 1000),
    };

    const individualInfo = {
      bakongAccountID: "oem_chhengeang@aclb",
      accountInformation: "devit",
      merchantName: "Oem Chhengeang",
      merchantNameAlternateLanguage: "អ៊ឺម ឆេងអៀង",
      merchantCity: "Phnom Penh",
      acquiringBank: "Bank of Cambodia",
      ...optionalData
    };

    const khqr = new BakongKHQR();
    console.log(khqr);
    
    const response = khqr.generateIndividual(individualInfo);
    console.log(response);
  } 
}
