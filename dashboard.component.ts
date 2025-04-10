import { Component } from '@angular/core';
import { JsonService } from '../services/json.service';
import { Router, RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { LexerTokenType } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ RouterLink , NgStyle ,ReactiveFormsModule ,NgFor ,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  show:boolean=false;
  title:string="Add Customer"
  editCustomerId:string=""
  customerArr:any=[]
  fb=new FormGroup({
    fullname:new FormControl('',Validators.required),
    emailAdd:new FormControl('',Validators.required),
    dob:new FormControl('',Validators.required),
    gender:new FormControl('',Validators.required),
    mobile:new FormControl('',Validators.required),
    amount:new FormControl('0',Validators.required)
  })
  constructor( private router:Router ,private service:JsonService){
    if(localStorage.getItem('token')==null){
      router.navigate([''])
    }
    this.getCustomerList();
  }
  logout(){
    localStorage.removeItem('token')
    this.router.navigate([''])
  }
  clearForm(){
    this.fb.controls['fullname'].setValue('')
    this.fb.controls['emailAdd'].setValue('')
    this.fb.controls['dob'].setValue('')
    this.fb.controls['gender'].setValue('')
    this.fb.controls['mobile'].setValue('')
    this.fb.controls['amount'].setValue('')
  }
  getCustomerList(){
    this.service.getCustomer().subscribe({
      next:(res:any)=>{
        this.customerArr=res;
        console.log(this.customerArr)
      },error(err) {
        console.log(err)
      }
    })
  }

  addCustomer(){
    if(this.fb.valid){ 
      if(this.title=="Add Customer"){
        this.service.addCustomer(this.fb.value).subscribe({
          next:()=>{
            alert('Customer added successfully!!')
            this.clearForm();
            setTimeout(()=>{
              this.show=!this.show
            },1500)
            this.getCustomerList();
          },error:(err:any)=>{
            alert(err)
          }
        })
      }
      else{
          this.service.updateCustomer(this.editCustomerId,this.fb.value).subscribe({
            next:()=>{
              alert("Customer update Successfully!!")
              this.clearForm();
              setTimeout(()=>{
                this.show=!this.show
              },1500)
              this.getCustomerList()
            },error(err){
              alert(err)
            },
          })
      }
      
    } else{
      alert('All value requird')
    }
  }
  deleteCustomer(id:any){
    this.service.deleteCustomer(id).subscribe({
      next:()=>{
        alert("Customer deleted successfullu!!")
        this.getCustomerList();
      },error(err){
        console.log(err)
      },
    })
  }
  editCustomer(id:any){
    this.show=!this.show
    this.title="Edit Customer"
    this.editCustomerId=id
    for (let index = 0; index < this.customerArr.length;index++){
      const element = this.customerArr[index];
      if(element.id==id){
        this.fb.controls['fullname'].setValue(element.fullname);
        this.fb.controls['emailAdd'].setValue(element.emailAdd);
        this.fb.controls['dob'].setValue(element.dob);
        this.fb.controls['gender'].setValue(element.gender);
        this.fb.controls['mobile'].setValue(element.mobile);
        this.fb.controls['amount'].setValue(element.amount);
        break;
      }
    }
  }
  showForm(){
    this.show=!this.show
    this.title="Add Customer"
  }
}
