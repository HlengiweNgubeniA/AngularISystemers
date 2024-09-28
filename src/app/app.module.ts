import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatNativeDateModule } from '@angular/material/core';

// Angular Material Modules
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSort, matSortAnimations, MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { NgFor } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { CdkTreeModule } from '@angular/cdk/tree';

// Flex Layout Module
import { FlexLayoutModule } from '@angular/flex-layout';

// NgxCharts
import { NgxChartsModule } from '@swimlane/ngx-charts';

// Components
import { AppComponent } from './app.component';

// Auth Components
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

// Navigation Components
import { AdminLayoutComponent } from './Navigation/admin-layout/admin-layout.component';
import { AdminNavigationComponent } from './Navigation/admin-navigation/admin-navigation.component';

// Courier Components
import { CourierComponent } from './Courier/courier/courier.component';
import { CreateCourierComponent } from './Courier/create-courier/create-courier.component';
import { EditCourierComponent } from './Courier/edit-courier/edit-courier.component';

// Inventory Components
import { InventoryComponent } from './Inventory/inventory/inventory.component';
import { CreateInventoryComponent } from './Inventory/create-inventory/create-inventory.component';
import { EditInventoryComponent } from './Inventory/edit-inventory/edit-inventory.component';

// Customer Components
import { CustomerComponent } from './Customer/customer/customer.component';
import { CreateCustomerComponent } from './Customer/create-customer/create-customer.component';
import { EditCustomerComponent } from './Customer/edit-customer/edit-customer.component';

// Discount Components
import { DiscountComponent } from './Discount/discount/discount.component';
import { CreateDiscountComponent } from './Discount/create-discount/create-discount.component';
import { EditDiscountComponent } from './Discount/edit-discount/edit-discount.component';

// Employee Components
import { EmployeeComponent } from './Employee/employee/employee.component';
import { EditEmployeeComponent } from './Employee/edit-employee/edit-employee.component';

// Employee Type Components
import { EmployeeTypeComponent } from './EmployeeType/employee-type/employee-type.component';
import { CreateEmployeeTypeComponent } from './EmployeeType/create-employee-type/create-employee-type.component';
import { EditEmployeeTypeComponent } from './EmployeeType/edit-employee-type/edit-employee-type.component';

// Help Components
import { ThisHelpComponent } from './Help/this-help/this-help.component';
import { EditHelpComponent } from './Help/edit-help/edit-help.component';
import { CreateHelpComponent } from './Help/create-help/create-help.component';

// Main Component
import { MainComponent } from './main/main.component';

// Occasion Type Components
import { OccasionTypeComponent } from './OccasionType/occasion-type/occasion-type.component';
import { CreateOccasionTypeComponent } from './OccasionType/create-occasion-type/create-occasion-type.component';
import { EditOccasionTypeComponent } from './OccasionType/edit-occasion-type/edit-occasion-type.component';

// Owner Components
import { OwnerComponent } from './Owner/owner/owner.component';
import { CreateOwnerComponent } from './Owner/create-owner/create-owner.component';
import { EditOwnerComponent } from './Owner/edit-owner/edit-owner.component';

// Package Components
import { PackageComponent } from './Package/package/package.component';
import { CreatePackageComponent } from './Package/create-package/create-package.component';
import { EditPackageComponent } from './Package/edit-package/edit-package.component';

// Package Type Components
import { PackageTypeComponent } from './PackageType/package-type/package-type.component';
import { CreatePackageTypeComponent } from './PackageType/create-package-type/create-package-type.component';
import { EditPackageTypeComponent } from './PackageType/edit-package-type/edit-package-type.component';

// Product Components
import { ProductComponent } from './Product/product/product.component';
import { CreateProductComponent } from './Product/create-product/create-product.component';
import { EditProductComponent } from './Product/edit-product/edit-product.component';

// Product Category Components
import { CategoryComponent } from './ProductCategory/category/category.component';
import { CreateCategoryComponent } from './ProductCategory/create-category/create-category.component';
import { EditCategoryComponent } from './ProductCategory/edit-category/edit-category.component';

// Product Package Components
import { ProductPackageComponent } from './ProductPackage/product-package/product-package.component';
import { CreateProductPackageComponent } from './ProductPackage/create-product-package/create-product-package.component';
import { EditProductPackageComponent } from './ProductPackage/edit-product-package/edit-product-package.component';

// Product Price Components
import { ProductPriceComponent } from './ProductPrice/product-price/product-price.component';
import { CreateProductPriceComponent } from './ProductPrice/create-product-price/create-product-price.component';
import { EditProductPriceComponent } from './ProductPrice/edit-product-price/edit-product-price.component';

// Product Size Components
import { SizeComponent } from './ProductSize/size/size.component';
import { CreateSizeComponent } from './ProductSize/create-size/create-size.component';
import { EditSizeComponent } from './ProductSize/edit-size/edit-size.component';

// Product Type Components
import { ProductTypeComponent } from './ProductType/product-type/product-type.component';
import { CreateProductTypeComponent } from './ProductType/create-product-type/create-product-type.component';
import { EditProductTypeComponent } from './ProductType/edit-product-type/edit-product-type.component';

// Review Components
import { ReviewComponent } from './Review/review/review.component';
import { CreateReviewComponent } from './Review/create-review/create-review.component';
import { EditReviewComponent } from './Review/edit-review/edit-review.component';

// Special Occasion Catalogue Components
import { SpecialOccasionCatalogueComponent } from './SpecialOccasionCatalogue/special-occasion-catalogue/special-occasion-catalogue.component';
import { CreateCatalogueComponent } from './SpecialOccasionCatalogue/create-catalogue/create-catalogue.component';
import { EditCatalogueComponent } from './SpecialOccasionCatalogue/edit-catalogue/edit-catalogue.component';

// Status Components
import { StatusComponent } from './Status/status/status.component';
import { CreateStatusComponent } from './Status/create-status/create-status.component';
import { EditStatusComponent } from './Status/edit-status/edit-status.component';

// Stock Components
import { StockComponent } from './Stock/stock/stock.component';
import { CreateStockComponent } from './Stock/create-stock/create-stock.component';
import { EditStockComponent } from './Stock/edit-stock/edit-stock.component';

// Stock Take Components
import { StockTakeComponent } from './StockTake/stock-take/stock-take.component';
import { CreateStockTakeComponent } from './StockTake/create-stock-take/create-stock-take.component';
import { EditStockTakeComponent } from './StockTake/edit-stock-take/edit-stock-take.component';

// Stock Type Components
import { StockTypeComponent } from './StockType/stock-type/stock-type.component';
import { CreateStockTypeComponent } from './StockType/create-stock-type/create-stock-type.component';
import { EditStockTypeComponent } from './StockType/edit-stock-type/edit-stock-type.component';

// Supplier Components
import { SupplierComponent } from './Supplier/supplier/supplier.component';
import { CreateSupplierComponent } from './Supplier/create-supplier/create-supplier.component';
import { EditSupplierComponent } from './Supplier/edit-supplier/edit-supplier.component';

// Supplier Order Components
import { SupplierOrderComponent } from './SupplierOrder/supplier-order/supplier-order.component';
import { CreateSupplierOrderComponent } from './SupplierOrder/create-supplier-order/create-supplier-order.component';
import { EditSupplierOrderComponent } from './SupplierOrder/edit-supplier-order/edit-supplier-order.component';

// User Components
import { UserComponent } from './User/user/user.component';
import { CreateUserComponent } from './User/create-user/create-user.component';
import { EditUserComponent } from './User/edit-user/edit-user.component';

// VAT Components
import { VatComponent } from './VAT/vat/vat.component';
import { CreateVatComponent } from './VAT/create-vat/create-vat.component';
import { EditVatComponent } from './VAT/edit-vat/edit-vat.component';

import { provideAnimationsAsync, provideAnimationsAsync as provideAnimationsAsync_alias } from '@angular/platform-browser/animations/async';
import { SendCatalogComponent } from './sendCatalog/send-catalog/send-catalog.component';
import { Router } from '@angular/router';
import { UnAssignRoleComponent } from './User/un-assign-role/un-assign-role.component';
import { UpdateRoleComponent } from './User/update-role/update-role.component';
import { CheckoutComponent } from './Checkout/checkout/checkout.component';

import { BakerNavigationComponent } from './Navigation/baker-navigation/baker-navigation.component';
import { CustomerNavigationComponent } from './Navigation/customer-navigation/customer-navigation.component';

import { CalendarComponent } from './calendar/calendar.component';
import { PaymentComponent } from './Payment/payment/payment.component';
import { SupplierOrderReceiptComponent } from './SupplierOrderReceipt/supplier-order-receipt/supplier-order-receipt.component';
import { ReceivedOrdersComponent } from './ReceivedOrders/received-orders/received-orders.component';
import { HelpDocumentComponent } from './HelpDocument/help-document/help-document.component';
import { CustomerReportComponent } from './Reports/CustomerReport/customer-report/customer-report.component';
import { SupplierReportComponent } from './Reports/SupplierReport/supplier-report/supplier-report.component';
import { EmployeeReportComponent } from './Reports/EmployeeReport/employee-report/employee-report.component';
import { ProductReportComponent } from './Reports/ProductReport/product-report/product-report.component';
import { ReviewReportComponent } from './Reports/ReviewReport/review-report/review-report.component';
import { SupplierOrderReportComponent } from './Reports/SupplierOrderReport/supplier-order-report/supplier-order-report.component';
import { OrdersComponent } from './Order-Processing/orders/orders.component';

import { MyOrdersComponent } from './Order-Processing/my-orders/my-orders.component';
import { CartComponent } from './Cart/cart/cart.component';
import { ShopComponent } from './Shop/shop/shop.component';
import { MatGridList } from '@angular/material/grid-list';
import { ProofOfPaymentComponent } from './Payment/proof-of-payment/proof-of-payment.component';
//import tootip
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { CustomerLayoutComponent } from './Shop/customer-layout/customer-layout.component';
import { MatTab, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MyCartComponent } from './Customer/my-cart/my-cart.component';
import { SettingsComponent } from './Customer/settings/settings.component';
import { UpdatePasswordComponent } from './Customer/update-password/update-password.component';
import { ProfileDetailsComponent } from './Customer/profile-details/profile-details.component';
import { UpdateProfileComponent } from './Customer/update-profile/update-profile.component';
import { MyOrdersComponent1 } from './Customer/my-orders/my-orders.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { EmployeeRegidtrstionComponent } from './employee-regidtrstion/employee-regidtrstion.component';
import { RolesComponent } from './Role/roles/roles.component';
import { CreateRoleComponent } from './Role/create-role/create-role.component';
import { EditRoleComponent } from './Role/edit-role/edit-role.component';
import { DeleteConfirmationComponent } from './Role/delete-confirmation/delete-confirmation.component';
import { CatalogSlideshowComponent } from './Shop/catalog-slideshow/catalog-slideshow.component';
import { CatalogueDisplayComponent } from './Shop/catalogue-display/catalogue-display.component';
import { SuccessComponent } from './Payment/success/success.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ActiveDiscountsComponent } from './Discount/active-discounts/active-discounts.component';
import { EmpTypeDeletionConfirmationComponent } from './EmployeeType/emp-type-deletion-confirmation/emp-type-deletion-confirmation.component';
import { ApplyDiscountComponent } from './Discount/apply-discount/apply-discount.component';
import { AudtiTrailReportComponent } from './AuditTail/audti-trail-report/audti-trail-report.component';
import {MatStepContent, MatStepper, MatStepperModule} from '@angular/material/stepper';
import { PopUpComponent } from './Pop-up/pop-up/pop-up.component';
import { PriceComponent } from './Price/price/price.component';
import { AddPriceComponent } from './Price/add-price/add-price.component';
import { EditPriceComponent } from './Price/edit-price/edit-price.component';
import { DeletePriceConfirmationComponent } from './Price/delete-price-confirmation/delete-price-confirmation.component';
import { CapitalizeDirective } from './Cap/capitalize.directive';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { MonthlySalesReportComponent } from './Dashboard/monthly-sales-report/monthly-sales-report.component';
import { AddEventDialogComponent } from './calendar/add-event-dialog/add-event-dialog.component';
import { NgModel } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddEventDialogComponent,
    ForgotPasswordComponent,
    AdminLayoutComponent,
    AdminNavigationComponent,
    CourierComponent,
    CreateCourierComponent,
    EditCourierComponent,
    CustomerComponent,
    CreateCustomerComponent,
    EditCustomerComponent,
    DiscountComponent,
    CreateDiscountComponent,
    EditDiscountComponent,
    EmployeeComponent,
    EditEmployeeComponent,
    EmployeeTypeComponent,
    CreateEmployeeTypeComponent,
    EditEmployeeTypeComponent,
    ThisHelpComponent,
    CreateHelpComponent,
    EditHelpComponent,
    OccasionTypeComponent,
    CreateOccasionTypeComponent,
    EditOccasionTypeComponent,
    OwnerComponent,
    CreateOwnerComponent,
    EditOwnerComponent,
    PackageComponent,
    CreatePackageComponent,
    EditPackageComponent,
    PackageTypeComponent,
    CreatePackageTypeComponent,
    EditPackageTypeComponent,
    ProductComponent,
    CreateProductComponent,
    EditProductComponent,
    CategoryComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    ProductPackageComponent,
    CreateProductPackageComponent,
    EditProductPackageComponent,
    ProductPriceComponent,
    CreateProductPriceComponent,
    EditProductPriceComponent,
    SizeComponent,
    CreateSizeComponent,
    EditSizeComponent,
    ProductTypeComponent,
    CreateProductTypeComponent,
    EditProductTypeComponent,
    ReviewComponent,
    CreateReviewComponent,
    EditReviewComponent,
    SpecialOccasionCatalogueComponent,
    CreateCatalogueComponent,
    EditCatalogueComponent,
    StatusComponent,
    CreateStatusComponent,
    EditStatusComponent,
    StockComponent,
    CreateStockComponent,
    EditStockComponent,
    StockTakeComponent,
    CreateStockTakeComponent,
    EditStockTakeComponent,
    StockTypeComponent,
    CreateStockTypeComponent,
    EditStockTypeComponent,
    SupplierComponent,
    CreateSupplierComponent,
    EditSupplierComponent,
    SupplierOrderComponent,
    CreateSupplierOrderComponent,
    EditSupplierOrderComponent,
    UserComponent,
    CreateUserComponent,
    EditUserComponent,
    VatComponent,
    CreateVatComponent,
    EditVatComponent,
    SendCatalogComponent,
    UnAssignRoleComponent,
    UpdateRoleComponent,
    CreateInventoryComponent,
    EditInventoryComponent,
    InventoryComponent,
    CheckoutComponent,

    BakerNavigationComponent,
    CustomerNavigationComponent,

    CalendarComponent,
      PaymentComponent,
      SupplierOrderReceiptComponent,
      ReceivedOrdersComponent,
      HelpDocumentComponent,
      CustomerReportComponent,
      SupplierReportComponent,
      EmployeeReportComponent,
      ProductReportComponent,
      ReviewReportComponent,
      SupplierOrderReportComponent,
      OrdersComponent,
      MyOrdersComponent,
      MyOrdersComponent1,
      CartComponent,
      ShopComponent,
      PaymentComponent,
      ProofOfPaymentComponent,
      CustomerLayoutComponent,
      MyCartComponent,
      SettingsComponent,
      UpdatePasswordComponent,
      ProfileDetailsComponent,
      UpdateProfileComponent,
      ResetPasswordComponent,
      EmployeeRegidtrstionComponent,
      RolesComponent,
      CreateRoleComponent,
      EditRoleComponent,
      DeleteConfirmationComponent,
      CatalogSlideshowComponent,
      CatalogueDisplayComponent,
      SuccessComponent,
      ActiveDiscountsComponent,
      EmpTypeDeletionConfirmationComponent,
      ApplyDiscountComponent,
      AudtiTrailReportComponent,
      PopUpComponent,
      PriceComponent,
      AddPriceComponent,
      EditPriceComponent,
      DeletePriceConfirmationComponent,
      CapitalizeDirective,
      DashboardComponent,
      MonthlySalesReportComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MainComponent,
    FormsModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatNavList,
    MatExpansionModule,
    MatSort,
    MatPaginator,
    MatCardModule,
    MatPaginator,
    MatExpansionModule,
    MatExpansionPanel,
    MatLabel,
    MatListModule,
    MatCardModule, MatCheckboxModule, MatStepperModule, MatStepper,MatStepContent,
    MatDialogModule, MatTabsModule, MatTab, MatTabGroup,
    MatButtonModule,MatTooltip, MatToolbarModule,
    MatSnackBarModule, MatGridList, MatGridListModule,
    NgFor, RouterModule, BrowserAnimationsModule, MatSidenavModule,
    MatListModule, MatExpansionModule, MatButtonModule, FlexLayoutModule,
    MatTableModule, MatFormFieldModule, BrowserAnimationsModule
,  MatPaginatorModule, MatPaginator, FormsModule, MatSidenavContainer,
MatCardModule, MatToolbarModule, MatToolbar, MatProgressBarModule, RouterModule, MatTreeModule,
CdkTreeModule
  ],
  providers: [ provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule { }
