import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartComponent } from '../../Cart/cart/cart.component';
@Component({
  selector: 'app-proof-of-payment',
  templateUrl: './proof-of-payment.component.html',
  styleUrl: './proof-of-payment.component.css'
})
export class ProofOfPaymentComponent implements OnInit{

  constructor(private http: HttpClient) {}


  selectedFile: File | null = null;
  uploadError: string | null = null;
  filePreviewUrl: string | null = null;  // To store preview URL for image or PDF
  cartDetails: any[] = [];
  apiUrl = 'https://localhost:7158/api/Order';


ngOnInit(): void {
  const storedCart = localStorage.getItem('basket');
  if(storedCart){
    this.cartDetails = JSON.parse(storedCart);
  }
}






onFileSelected(event: any): void {
  const file: File = event.target.files[0];

  if (file) {
    const fileType = file.type;

    // Validate if the file is a PDF or an image (jpg, jpeg, png)
    if (fileType === 'application/pdf' || fileType.startsWith('image/')) {
      this.selectedFile = file;
      this.uploadError = null; // Clear any previous errors

      // Preview the image or PDF
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.filePreviewUrl = e.target.result;  // Create a preview URL
      };
      reader.readAsDataURL(file);  // Read the file as Data URL for preview
    } else {
      this.uploadError = 'Only PDF and image files are allowed.';
      this.selectedFile = null;  // Clear the file if invalid
      this.filePreviewUrl = null;  // Clear the preview
    }
  }
}

isImageFile() {
  return this.selectedFile && this.selectedFile.type.startsWith('image/');
}

//--------------Placing an order-----------/
// Handle file upload
onUpload(): void {
  if (!this.selectedFile) {
    this.uploadError = 'No file selected.';
    return;
  }

  if(this.cartDetails.length === 0){
    this.uploadError = "No items in the cart to place the order.";
    return;
  }
  
const orderData = {
  Date: new Date(),
  shippingAddress: '',
  TotalAmount: this.calculateTotalAmount(),
  OrderStatus: 'Pending',
  TotalTaxAmount: this.calculateTotalTaxAmount(),
  Responsibility: '',
  OrderLines: this.cartDetails.map(item => ({
    ProductName: item.name,
    Quantity: item.quantity,
    Price: item.price
  }))
}


  const formData = new FormData();
  formData.append('file', this.selectedFile, this.selectedFile.name);
  formData.append('order', JSON.stringify(orderData));

  this.http.post(this.apiUrl, formData).subscribe(
    (response) => {
      console.log('File uploaded successfully', response);
    },
    (error) => {
      console.error('File upload failed', error);
      this.uploadError = 'File upload failed. Please try again.';
    }
  );
}


// Calculate total amount from cart
calculateTotalAmount(): number {
  return this.cartDetails.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Calculate total tax amount (example tax calculation, adjust as needed)
calculateTotalTaxAmount(): number {
  const taxRate = 0.15; // Example tax rate of 15%
  return this.calculateTotalAmount() * taxRate;
}





}
