import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { SpecialOccasionCatalogueComponent } from './SpecialOccasionCatalogue/special-occasion-catalogue/special-occasion-catalogue.component';
import { CreateCatalogueComponent } from './SpecialOccasionCatalogue/create-catalogue/create-catalogue.component';
import { EditCatalogueComponent } from './SpecialOccasionCatalogue/edit-catalogue/edit-catalogue.component';

import { ThisHelpComponent } from './Help/this-help/this-help.component';
import { EditHelpComponent } from './Help/edit-help/edit-help.component';

import { CreateCustomerComponent } from './Customer/create-customer/create-customer.component';
import { EditCustomerComponent } from './Customer/edit-customer/edit-customer.component';
import { CustomerComponent } from './Customer/customer/customer.component';

import { EmployeeComponent } from './Employee/employee/employee.component';
import { EditEmployeeComponent } from './Employee/edit-employee/edit-employee.component';
import { EmployeeTypeComponent } from './EmployeeType/employee-type/employee-type.component';
import { CreateEmployeeTypeComponent } from './EmployeeType/create-employee-type/create-employee-type.component';
import { EditEmployeeTypeComponent } from './EmployeeType/edit-employee-type/edit-employee-type.component';
import { EmployeeRegidtrstionComponent } from './employee-regidtrstion/employee-regidtrstion.component';



import { SupplierComponent } from './Supplier/supplier/supplier.component';
import { CreateSupplierComponent } from './Supplier/create-supplier/create-supplier.component';
import { EditSupplierComponent } from './Supplier/edit-supplier/edit-supplier.component';

import { SupplierOrderComponent } from './SupplierOrder/supplier-order/supplier-order.component';
import { CreateSupplierOrderComponent } from './SupplierOrder/create-supplier-order/create-supplier-order.component';
import { EditSupplierOrderComponent } from './SupplierOrder/edit-supplier-order/edit-supplier-order.component';

import { ReviewComponent } from './Review/review/review.component';
import { CreateReviewComponent } from './Review/create-review/create-review.component';
import { EditReviewComponent } from './Review/edit-review/edit-review.component';

import { VatComponent } from './VAT/vat/vat.component';
import { CreateVatComponent } from './VAT/create-vat/create-vat.component';
import { EditVatComponent } from './VAT/edit-vat/edit-vat.component';

import { StockTakeComponent } from './StockTake/stock-take/stock-take.component';
import { CreateStockTakeComponent } from './StockTake/create-stock-take/create-stock-take.component';
import { EditStockTakeComponent } from './StockTake/edit-stock-take/edit-stock-take.component';

import { AdminLayoutComponent } from './Navigation/admin-layout/admin-layout.component';
import { AdminNavigationComponent } from './Navigation/admin-navigation/admin-navigation.component';

import { CourierComponent } from './Courier/courier/courier.component';
import { CreateCourierComponent } from './Courier/create-courier/create-courier.component';
import { EditCourierComponent } from './Courier/edit-courier/edit-courier.component';

import { SendCatalogComponent } from './sendCatalog/send-catalog/send-catalog.component';
import { authGuard } from './guard/auth.guard';
import { UserComponent } from './User/user/user.component';

import { PackageComponent } from './Package/package/package.component';
import { CreatePackageComponent } from './Package/create-package/create-package.component';
import { EditPackageComponent } from './Package/edit-package/edit-package.component';

import { DiscountComponent } from './Discount/discount/discount.component';
import { CreateDiscountComponent } from './Discount/create-discount/create-discount.component';
import { EditDiscountComponent } from './Discount/edit-discount/edit-discount.component';

import { PackageTypeComponent } from './PackageType/package-type/package-type.component';
import { CreatePackageTypeComponent } from './PackageType/create-package-type/create-package-type.component';
import { EditPackageTypeComponent } from './PackageType/edit-package-type/edit-package-type.component';

import { StockComponent } from './Stock/stock/stock.component';
import { CreateStockComponent } from './Stock/create-stock/create-stock.component';
import { EditStockComponent } from './Stock/edit-stock/edit-stock.component';

import { OccasionTypeComponent } from './OccasionType/occasion-type/occasion-type.component';
import { CreateOccasionTypeComponent } from './OccasionType/create-occasion-type/create-occasion-type.component';
import { EditOccasionTypeComponent } from './OccasionType/edit-occasion-type/edit-occasion-type.component';

import { ProductTypeComponent } from './ProductType/product-type/product-type.component';
import { CreateProductTypeComponent } from './ProductType/create-product-type/create-product-type.component';
import { EditProductTypeComponent } from './ProductType/edit-product-type/edit-product-type.component';

import { ProductComponent } from './Product/product/product.component';
import { CreateProductComponent } from './Product/create-product/create-product.component';
import { EditProductComponent } from './Product/edit-product/edit-product.component';

import { CreateCategoryComponent } from './ProductCategory/create-category/create-category.component';
import { EditCategoryComponent } from './ProductCategory/edit-category/edit-category.component';
import { CategoryComponent } from './ProductCategory/category/category.component';

import { OwnerComponent } from './Owner/owner/owner.component';
import { CreateOwnerComponent } from './Owner/create-owner/create-owner.component';
import { EditOwnerComponent } from './Owner/edit-owner/edit-owner.component';

import { CheckoutComponent } from './Checkout/checkout/checkout.component';

import { CalendarComponent } from './calendar/calendar.component';

import { InventoryComponent } from './Inventory/inventory/inventory.component';
import { CreateInventoryComponent } from './Inventory/create-inventory/create-inventory.component';
import { EditInventoryComponent } from './Inventory/edit-inventory/edit-inventory.component';

import { ProductPriceComponent } from './ProductPrice/product-price/product-price.component';
import { CreateProductPriceComponent } from './ProductPrice/create-product-price/create-product-price.component';
import { EditProductPriceComponent } from './ProductPrice/edit-product-price/edit-product-price.component';

import { SizeComponent } from './ProductSize/size/size.component';
import { CreateSizeComponent } from './ProductSize/create-size/create-size.component';
import { EditSizeComponent } from './ProductSize/edit-size/edit-size.component';

import { StockTypeComponent } from './StockType/stock-type/stock-type.component';
import { CreateStockTypeComponent } from './StockType/create-stock-type/create-stock-type.component';
import { EditStockTypeComponent } from './StockType/edit-stock-type/edit-stock-type.component';

import { BakerNavigationComponent } from './Navigation/baker-navigation/baker-navigation.component';
import { CreateStatusComponent } from './Status/create-status/create-status.component';
import { StatusComponent } from './Status/status/status.component';
import { EditStatusComponent } from './Status/edit-status/edit-status.component';

import { CartComponent } from './Cart/cart/cart.component';

import { ShopComponent } from './Shop/shop/shop.component';
import { PaymentComponent } from './Payment/payment/payment.component';
import { ProofOfPaymentComponent } from './Payment/proof-of-payment/proof-of-payment.component';
import { CustomerLayoutComponent } from './Shop/customer-layout/customer-layout.component';
import { CustomerNavigationComponent } from './Navigation/customer-navigation/customer-navigation.component';
import { MyCartComponent } from './Customer/my-cart/my-cart.component';
import { MyOrdersComponent1 } from './Customer/my-orders/my-orders.component';
import { SettingsComponent } from './Customer/settings/settings.component';
import { ProfileDetailsComponent } from './Customer/profile-details/profile-details.component';
import { UpdatePasswordComponent } from './Customer/update-password/update-password.component';
import { MyOrdersComponent } from './Order-Processing/my-orders/my-orders.component';
import { OrdersComponent } from './Order-Processing/orders/orders.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SuccessComponent } from './Payment/success/success.component';
import { RolesComponent } from './Role/roles/roles.component';
import { CreateRoleComponent } from './Role/create-role/create-role.component';
import { EditRoleComponent } from './Role/edit-role/edit-role.component';
import { CatalogueDisplayComponent } from './Shop/catalogue-display/catalogue-display.component';
import { ActiveDiscountsComponent } from './Discount/active-discounts/active-discounts.component';
import { AudtiTrailReportComponent } from './AuditTail/audti-trail-report/audti-trail-report.component';
import { UpdateProfileComponent } from './Customer/update-profile/update-profile.component';
import { PriceComponent } from './Price/price/price.component';
import { HelpDocumentComponent } from './HelpDocument/help-document/help-document.component';

const routes: Routes = [
  // { path: 'main', component: MainComponent},
   { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'create-catalogue', component: CreateCatalogueComponent },

  {path: '', component: CustomerLayoutComponent, children: [
    {path: 'Shop', component: ShopComponent},
    {path: 'Basket', component: CartComponent},
    {path: 'Catalogues', component: CatalogueDisplayComponent},
   
  ]},
  { path: 'reviews/:id', component: ReviewComponent },
  { path: 'edit-review/:id', component: EditReviewComponent },

  { path: 'login', component: LoginComponent},

  {path: 'auditTrail', component: AudtiTrailReportComponent},


  {path: 'customer-nav', component: CustomerNavigationComponent,
    //canActivate: [authGuard],
    children: [
      {path: 'my-cart', component: MyCartComponent},
      {path: 'my-orders', component: MyOrdersComponent1},
      {path: 'settings', component: SettingsComponent},
      {path: 'payment', component: PaymentComponent},
      {path: 'pop', component: ProofOfPaymentComponent},
      {path: 'payment', component: PaymentComponent},
      {path: 'pop', component: ProofOfPaymentComponent},
      {path: 'pfp', component: ProofOfPaymentComponent},
      {path: 'profile', component: ProfileDetailsComponent},
      {path: 'update-password', component: UpdatePasswordComponent},
      { path: 'checkout', component: CheckoutComponent },
      {path: 'success', component:SuccessComponent},
      {path: 'update-profile-details', component: UpdateProfileComponent}


    ]
  },
  {path:'help-document', component: HelpDocumentComponent},

  {path:'reset-password', component: ResetPasswordComponent},
  {path: 'Baker', component: BakerNavigationComponent,
    //canActivate: [authGuard],
    children: [
      {path: 'My-Orders', component: MyOrdersComponent},
      {path: 'Orders', component: OrdersComponent},



    ]
  },
  //{path: '', component: ShopComponent},
  { path: 'main', component: MainComponent},
  { path: 'register', component: RegisterComponent },
  {path: 'baker', component: BakerNavigationComponent},
  {path: 'Basket', component: CartComponent},
   { path: 'admin', 
    component: AdminLayoutComponent, 
   // canActivate: [authGuard],
  children: [
      { path: 'dashboard', component: AdminNavigationComponent},
      { path: 'send', component: SendCatalogComponent },
      { path: 'user', component: UserComponent },
      { path: 'special-occasion-catalogues', component: SpecialOccasionCatalogueComponent },
      {path: 'register-employee', component:EmployeeRegidtrstionComponent},
      { path: 'edit-catalogue/:id', component: EditCatalogueComponent },
      { path: 'create-catalogue', component: CreateCatalogueComponent },
      {path: 'active-discounts', component: ActiveDiscountsComponent},
      {path: 'roles', component: RolesComponent},
      {path: 'create-role', component: CreateRoleComponent},
      { path: 'help', component: ThisHelpComponent },
      { path: 'edit-help/:id', component: EditHelpComponent },

      { path: 'discounts', component: DiscountComponent },
      { path: 'create-discount', component: CreateDiscountComponent },
      { path: 'edit-discount/:id', component: EditDiscountComponent},
      {path: 'product-price', component: PriceComponent},
      { path: 'create-customer', component: CreateCustomerComponent },
      { path: 'edit-customer/:id', component: EditCustomerComponent },
      { path: 'customer', component: CustomerComponent },

      { path: 'employees', component: EmployeeComponent },
      { path: 'edit-employee/:id', component: EditEmployeeComponent },

      { path: 'employee-types', component: EmployeeTypeComponent },
      { path: 'create-employee-type', component: CreateEmployeeTypeComponent },
      { path: 'edit-employee-type/:id', component: EditEmployeeTypeComponent },

      { path: 'suppliers', component: SupplierComponent },
      { path: 'create-supplier', component: CreateSupplierComponent },
      { path: 'edit-supplier/:id', component: EditSupplierComponent },

      { path: 'supplier-orders', component: SupplierOrderComponent },
      { path: 'create-supplier-order', component: CreateSupplierOrderComponent },
      { path: 'edit-supplier-order/:id', component: EditSupplierOrderComponent },

     
      { path: 'vats', component: VatComponent },
      { path: 'create-vat', component: CreateVatComponent },
      { path: 'edit-vat/:id', component: EditVatComponent },

      { path: 'stock-takes', component: StockTakeComponent },
      { path: 'create-stock-take', component: CreateStockTakeComponent },
      { path: 'edit-stock-take/:id', component: EditStockTakeComponent },

      { path: 'couriers', component: CourierComponent },
      { path: 'create-courier', component: CreateCourierComponent },
      { path: 'edit-courier/:id', component: EditCourierComponent },

      { path: 'packages', component: PackageComponent },
      { path: 'create-package', component: CreatePackageComponent},
      { path: 'edit-package/:id', component: EditPackageComponent },

      { path: 'package-types', component: PackageTypeComponent },
      { path: 'create-package-type', component: CreatePackageTypeComponent},
      { path: 'edit-package-type/:id', component: EditPackageTypeComponent },

      { path: 'stocks', component: StockComponent },
      { path: 'create-stock', component: CreateStockComponent },
      { path: 'edit-stock/:id', component: EditStockComponent },

      { path: 'occasion-types', component: OccasionTypeComponent },
      { path: 'create-occasion-type', component: CreateOccasionTypeComponent },
      { path: 'edit-occasion-type/:id', component: EditOccasionTypeComponent },

      { path: 'product-types', component: ProductTypeComponent },
      { path: 'create-product-type', component: CreateProductTypeComponent },
      { path: 'edit-product-type/:id', component: EditProductTypeComponent },

      { path: 'product-categories', component: CategoryComponent },
      { path: 'create-product-category', component: CreateCategoryComponent },
      { path: 'edit-product-category/:id', component: EditCategoryComponent },

      { path: 'product-prices', component: ProductPriceComponent },
      { path: 'create-product-price', component: CreateProductPriceComponent },
      { path: 'edit-product-price/:id', component: EditProductPriceComponent },

      { path: 'sizes', component: SizeComponent },
      { path: 'create-size', component: CreateSizeComponent },
      { path: 'edit-size/:id', component: EditSizeComponent },

      { path: 'products', component: ProductComponent},
      { path: 'create-product', component: CreateProductComponent },
      { path: 'edit-product/:id', component: EditProductComponent },

      { path: 'statuses', component: StatusComponent},
      { path: 'create-status', component: CreateStatusComponent},
      { path: 'edit-status/:id', component: EditStatusComponent},

      { path: 'calendar', component: CalendarComponent },
      { path: 'checkout', component: CheckoutComponent },

      { path: 'send-catalogue', component: SendCatalogComponent},

      { path: 'checkout', component: CheckoutComponent },]},
      { path: 'create-vat', component: CreateVatComponent },

      

      { path: 'send-catalogue', component: SendCatalogComponent},]
     // { path: '', redirectTo: '/shop', pathMatch: 'full' },
      //{ path: 'create-review', component: CreateReviewComponent },

    //];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
