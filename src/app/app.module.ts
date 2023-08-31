import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AccordionModule} from 'primeng/accordion';
import {KeyFilterModule} from 'primeng/keyfilter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {InputTextModule} from 'primeng/inputtext';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {CheckboxModule} from 'primeng/checkbox';
import {TabMenuModule} from 'primeng/tabmenu';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {TreeModule} from 'primeng/tree';
import {DropdownModule} from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import {TabViewModule} from 'primeng/tabview';
import {ListboxModule} from 'primeng/listbox';
import {ButtonModule} from 'primeng/button';
import { DatePipe } from '@angular/common'; 
import {CardModule} from 'primeng/card';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {RadioButtonModule} from 'primeng/radiobutton';
import { ContextMenuModule} from 'primeng/contextmenu';
import {CalendarModule} from 'primeng/calendar';
import { FormsModule } from '@angular/forms';



import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { UsageInfoComponent } from './usage-info/usage-info.component';
import { LexiconCodeComponent } from './lexicon-code/lexicon-code.component';
import { IrpListComponent } from './irp-list/irp-list.component';
import { CommodityMismatchComponent } from './commodity-mismatch/commodity-mismatch.component';
import { WorkqueueComponent } from './workqueue/workqueue.component';
import { MStatusComponent } from './m-status/m-status.component';
import { WorkqueueAssignmentReportComponent } from './workqueue-assignment-report/workqueue-assignment-report.component';
import { UsageInformationComponent } from './usage-information/usage-information.component';
import { AuditConsolidateReportComponent } from './audit-consolidate-report/audit-consolidate-report.component';
import { AuditSectionViewComponent } from './audit-section-view/audit-section-view.component';
import { ContextComponent } from './context/context.component';
import { EducationusageinformationComponent } from './educationusageinformation/educationusageinformation.component';
import { IllustrationSearchComponent } from './illustration-search/illustration-search.component';
import { SectionsreportComponent } from './sectionsreport/sectionsreport.component';
import { StructuresearchComponent } from './structuresearch/structuresearch.component';
import { IllustrationCreationComponent } from './illustration-creation/illustration-creation.component';
import { IllustrationstatusComponent } from './illustrationstatus/illustrationstatus.component';
import { ClosepublicationdateRaviComponent } from './closepublicationdate-ravi/closepublicationdate-ravi.component';
import { EngineeringBaseToVendorPartComponent } from './engineering-base-to-vendor-part/engineering-base-to-vendor-part.component';
import { JobTimeChangeComponent } from './job-time-change/job-time-change.component';
import { PartWorkqueueComponent } from './part-workqueue/part-workqueue.component';
import { ProductTypeClassificationComponent } from './product-type-classification/product-type-classification.component';
import { VechileLineMaintenanceComponent } from './vechile-line-maintenance/vechile-line-maintenance.component';
import { DevelopmentCommoditySetupComponent } from './development-commodity-setup/development-commodity-setup.component';
import { LexiconfiltermaintenanceComponent } from './lexiconfiltermaintenance/lexiconfiltermaintenance.component';
import { LexiconmanagementComponent } from './lexiconmanagement/lexiconmanagement.component';
import { NewUsageExistingPartsComponent } from './new-usage-existing-parts/new-usage-existing-parts.component';
import { CalibrationListSetupComponent } from './calibration-list-setup/calibration-list-setup.component';
import { PartInfoComponent } from './part-info/part-info.component';
import { InactiveRecoverComponent } from './inactive-recover/inactive-recover.component';
import { IllustrationStatusTableComponent } from './illustration-status-table/illustration-status-table.component';
import { IllustrationStatusRejtableComponent } from './illustration-status-rejtable/illustration-status-rejtable.component';
import { IllustrationStatusCoortableComponent } from './illustration-status-coortable/illustration-status-coortable.component';
import { IllustrationStatusArttableComponent } from './illustration-status-arttable/illustration-status-arttable.component';
import { IllustrationStatusAnalystableComponent } from './illustration-status-analystable/illustration-status-analystable.component';
import { IllustrationStatusWitoutableComponent } from './illustration-status-witoutable/illustration-status-witoutable.component';
import { IllustrationStatusOprnirpsComponent } from './illustration-status-oprnirps/illustration-status-oprnirps.component';
import { IllusSearchResultComponent} from './illus-search-result/illus-search-result.component';
import { VehicleworkloadreportComponent} from './vehicleworkloadreport/vehicleworkloadreport.component';
import { IllusWqreportComponent} from './illus-wqreport/illus-wqreport.component';
import { IllustratorWqComponent} from './illustrator-wq/illustrator-wq.component';
import { IrpReviewComponent} from './irp-review/irp-review.component';
import { OpenSectionAnalystcodeComponent} from './open-section-analystcode/open-section-analystcode.component';
import { AuditSectionDetailsComponent } from './audit-section-details/audit-section-details.component';

import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';

import {ToastModule} from 'primeng/toast';
import { LoadingIndicatorComponent } from './shared/components/loading-indicator/loading-indicator.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {WbsManagementComponent} from './wbs-management/wbs-management.component';
import { DialogBoxComponent} from './dialog-box/dialog-box.component';
import { RequestANewCommodityPropertyComponent} from './request-anew-commodity-property/request-anew-commodity-property.component';
import { CommoditySuffixComponent} from './commodity-suffix/commodity-suffix.component';
import { CommoditySetupComponent} from './commodity-setup/commodity-setup.component';
import {CommodityBaseDetailsComponent} from './commodity-base-details/commodity-base-details.component';
import { ChangeCommodityComponent} from './change-commodity/change-commodity.component';
import {ButtonScreenComponent} from './button-screen/button-screen.component';
import {AssignCommodityToUsageComponent} from './assign-commodity-to-usage/assign-commodity-to-usage.component';
import {ArtHouseComponent} from './art-house/art-house.component';
import {LexiconSearchComponent} from './lexicon-search/lexicon-search.component';
import {SupplierInformationComponent} from './supplier-information/supplier-information.component';
import { WorkqueuetableComponent} from './workqueuetable/workqueuetable.component';
import { SampleappComponent } from './sampleapp/sampleapp.component';
import { SectionPrefixManagementComponent } from './section-prefix-management/section-prefix-management.component';
import { WorkBreakdownStructureComponent } from './work-breakdown-structure/work-breakdown-structure.component'
import { UsageFeatureChangesComponent } from './usage-feature-changes/usage-feature-changes.component';
import { SectionCopyComponent } from './section-copy/section-copy.component';
import { CatalogSectionSetupComponent } from './catalog-section-setup/catalog-section-setup.component';
import { UnassignedCommoditiesDetailsComponent } from './unassigned-commodities-details/unassigned-commodities-details.component';
import { UnassignedCommoditiesComponent } from './unassigned-commodities/unassigned-commodities.component';
import { TemplateDataComponent } from './template-data/template-data.component';
import { MismatchReportDetailComponent } from './mismatch-report-detail/mismatch-report-detail.component';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsageInfoComponent,
    LexiconCodeComponent,
    IrpListComponent,
    CommodityMismatchComponent,
    WorkqueueComponent,
    MStatusComponent,
    WorkqueueAssignmentReportComponent,
    UsageInformationComponent,
    AuditConsolidateReportComponent,
    AuditSectionViewComponent,
    ContextComponent,
    EducationusageinformationComponent,
    IllustrationSearchComponent,
    SectionsreportComponent,
    StructuresearchComponent,
    UnassignedCommoditiesComponent,
    IllustrationCreationComponent,
    IllustrationstatusComponent,
    ClosepublicationdateRaviComponent,
    DevelopmentCommoditySetupComponent,
    EngineeringBaseToVendorPartComponent,
    JobTimeChangeComponent,
    PartWorkqueueComponent,
    ProductTypeClassificationComponent,
    VechileLineMaintenanceComponent,
    LexiconfiltermaintenanceComponent,
    LexiconmanagementComponent,
    NewUsageExistingPartsComponent,
    CalibrationListSetupComponent,
    PartInfoComponent,
    InactiveRecoverComponent,
    LoadingIndicatorComponent,
    WbsManagementComponent,
    DialogBoxComponent,
    RequestANewCommodityPropertyComponent,
    CommoditySuffixComponent,
    CommoditySetupComponent,
    CommodityBaseDetailsComponent,
    ChangeCommodityComponent,
    ButtonScreenComponent,
    AssignCommodityToUsageComponent,
    ArtHouseComponent,
    LexiconSearchComponent,
    SupplierInformationComponent,
    WorkqueuetableComponent,
    SampleappComponent,
    SectionPrefixManagementComponent,
    WorkBreakdownStructureComponent,
    UsageFeatureChangesComponent,
    SectionCopyComponent,
    CatalogSectionSetupComponent,
    UnassignedCommoditiesDetailsComponent,
    TemplateDataComponent,
    IllustrationStatusTableComponent,
    IllustrationStatusRejtableComponent,
    IllustrationStatusCoortableComponent,
    IllustrationStatusArttableComponent,
    IllustrationStatusAnalystableComponent,
    IllustrationStatusWitoutableComponent,
    IllustrationStatusOprnirpsComponent,
    IllusSearchResultComponent,
    VehicleworkloadreportComponent,
    IllusWqreportComponent,
    IllustratorWqComponent,
    IrpReviewComponent,
    OpenSectionAnalystcodeComponent,
    MismatchReportDetailComponent,
    AuditSectionDetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    BrowserAnimationsModule,
    InputTextModule,
    ScrollPanelModule,
    CheckboxModule,
    TabMenuModule,
    TableModule,
    DialogModule,
    TreeModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    ListboxModule,
    TabViewModule,
    ButtonModule,
    CardModule,
    HttpClientModule,
    MatListModule,
    ToastModule,
    InputTextareaModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    RadioButtonModule,
    ContextMenuModule,
    CalendarModule,
    KeyFilterModule
  ],
  providers: [
    DatePipe,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
