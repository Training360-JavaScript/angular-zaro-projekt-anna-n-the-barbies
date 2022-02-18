import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/model/product';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DateService } from 'src/app/service/date.service';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  product!: Product;
  newProduct: Product = new Product();
  id!: string;

  constructor(
    private ar: ActivatedRoute,
    private productService: ProductService,
    private dateService: DateService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.ar.params.pipe(
      switchMap(params => this.id = params['id'])).subscribe(
        () => {
          if (this.id === '0') {
            this.product = this.newProduct;
          } else {
            this.productService.getOne(Number(this.id)).subscribe(
              (result) => this.product = result
            )
          }
        }
      );
  }

  onUpdate(product: Product): void {
    // const product: Product = productForm.value;

    if (product.id === 0) {
      this.productService.create(product).subscribe(
        () => {
        this.router.navigate(['/', 'product']);
        this.toastr.success('A termék hozzáadása sikeres volt!', 'Hozzáadás');
        this.dateService.setToLocalStorage('product')
     });
    } else {
      this.productService.update(product).subscribe(
        product => {
        this.router.navigate(['/', 'product']);
        this.toastr.info('A módosítás megtörtént!', 'Módosítás');
        this.dateService.setToLocalStorage('product')
    });
   }
  }

  onRemove(product: Product): void {
    this.productService.delete(product.id).subscribe(
      product => {
        this.router.navigate(['/', 'product']);
        this.toastr.error('A törlés megtörtént!', 'Törlés');
        this.dateService.setToLocalStorage('product')
      });
  }
  // onUpdate(productForm: NgForm): void {
  //   if(productForm.invalid) {
  //     alert('Kérjük, töltsön ki minden mezőt!');
  //   }

  //   const product: Product = productForm.value;

  //   this.productService.update(product).subscribe(
  //     product => this.router.navigate(['/', 'product']),
  //     err => console.error(err),
  //   )
  // }
}

