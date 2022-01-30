import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/products.service';
import { ProductDTO } from '@crypto-shop/services-shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'crypto-shop-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  @Input() product: ProductDTO | undefined;
  @Input() isNewProduct: boolean = false;
  saveForm: FormGroup = new FormGroup({});

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.isNewProduct =
      this.router.getCurrentNavigation()!.extras.state!['isNewProduct'];
    this.product = this.router.getCurrentNavigation()!.extras.state!['product'];
  }

  async onSave() {
    if (!this.saveForm) {
      return;
    }
    const payload: ProductDTO = this.saveForm.value;
    await this.productService.saveProduct(payload);
    await this.router.navigateByUrl('/home');
  }

  ngOnInit(): void {
    if (this.isNewProduct) {
      this.saveForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: [''],
        basePrice: ['', Validators.required],
        currency: ['', Validators.required],
        quantity: ['', Validators.required],
      });
    } else if (this.product) {
      this.saveForm = this.formBuilder.group({
        id: [this.product.id],
        name: [this.product.name, Validators.required],
        description: [this.product.description],
        basePrice: [this.product.basePrice, Validators.required],
        currency: [this.product.currency, Validators.required],
        quantity: [this.product.quantity, Validators.required],
      });
    }
  }
}
