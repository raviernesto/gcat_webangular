import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsageInfoComponent } from './usage-info/usage-info.component';
import { LexiconCodeComponent } from './lexicon-code/lexicon-code.component'
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
import { UnassignedCommoditiesComponent } from './unassigned-commodities/unassigned-commodities.component';
import { IllustrationCreationComponent } from './illustration-creation/illustration-creation.component';
import { IllustrationstatusComponent } from './illustrationstatus/illustrationstatus.component';
import { ClosepublicationdateRaviComponent } from './closepublicationdate-ravi/closepublicationdate-ravi.component';
import { JobTimeChangeComponent } from './job-time-change/job-time-change.component';
import { PartWorkqueueComponent } from './part-workqueue/part-workqueue.component';
import { EngineeringBaseToVendorPartComponent } from './engineering-base-to-vendor-part/engineering-base-to-vendor-part.component';
import { ProductTypeClassificationComponent } from './product-type-classification/product-type-classification.component';
import { VechileLineMaintenanceComponent } from './vechile-line-maintenance/vechile-line-maintenance.component';
import { DevelopmentCommoditySetupComponent } from './development-commodity-setup/development-commodity-setup.component';
import { LexiconfiltermaintenanceComponent } from './lexiconfiltermaintenance/lexiconfiltermaintenance.component';
import { LexiconmanagementComponent } from './lexiconmanagement/lexiconmanagement.component';
import { NewUsageExistingPartsComponent } from './new-usage-existing-parts/new-usage-existing-parts.component';
import { CalibrationListSetupComponent } from './calibration-list-setup/calibration-list-setup.component';
import { PartInfoComponent } from './part-info/part-info.component';
import { InactiveRecoverComponent } from './inactive-recover/inactive-recover.component';
import { ButtonScreenComponent} from './button-screen/button-screen.component';
import {DialogBoxComponent} from './dialog-box/dialog-box.component';
import { AssignCommodityToUsageComponent} from './assign-commodity-to-usage/assign-commodity-to-usage.component';
import { ChangeCommodityComponent } from './change-commodity/change-commodity.component';
import { CommodityBaseDetailsComponent } from './commodity-base-details/commodity-base-details.component';
import { CommoditySetupComponent } from './commodity-setup/commodity-setup.component';
import { CommoditySuffixComponent } from './commodity-suffix/commodity-suffix.component';
import { RequestANewCommodityPropertyComponent } from './request-anew-commodity-property/request-anew-commodity-property.component';
import { SelectTemplateComponent } from './select-template/select-template.component';
import{ TemplateDataComponent} from './template-data/template-data.component'
//import { TemplateSetupComponent} from './template-setup/template-setup.component';
import { TemplateStatusComponent} from './template-status/template-status.component';
import { WbsManagementComponent} from './wbs-management/wbs-management.component';
import { ArtHouseComponent} from './art-house/art-house.component';
import { LexiconSearchComponent } from './lexicon-search/lexicon-search.component';
import { SupplierInformationComponent } from './supplier-information/supplier-information.component';
import { WorkBreakdownStructureComponent } from './work-breakdown-structure/work-breakdown-structure.component';
import { SectionPrefixManagementComponent } from './section-prefix-management/section-prefix-management.component';
import { UsageFeatureChangesComponent } from './usage-feature-changes/usage-feature-changes.component';
import { SectionCopyComponent } from './section-copy/section-copy.component';
import { CatalogSectionSetupComponent } from './catalog-section-setup/catalog-section-setup.component';
import { UnassignedCommoditiesDetailsComponent } from './unassigned-commodities-details/unassigned-commodities-details.component';
import { WorkqueuetableComponent } from './workqueuetable/workqueuetable.component';
import { IllustrationStatusTableComponent } from './illustration-status-table/illustration-status-table.component';
import { IllustrationStatusRejtableComponent } from './illustration-status-rejtable/illustration-status-rejtable.component';
import { IllustrationStatusArttableComponent } from './illustration-status-arttable/illustration-status-arttable.component';
import { IllustrationStatusCoortableComponent } from './illustration-status-coortable/illustration-status-coortable.component';
import { IllustrationStatusAnalystableComponent } from './illustration-status-analystable/illustration-status-analystable.component';
import { IllustrationStatusWitoutableComponent } from './illustration-status-witoutable/illustration-status-witoutable.component';
import { IllustrationStatusOprnirpsComponent } from './illustration-status-oprnirps/illustration-status-oprnirps.component';
import { IllusSearchResultComponent } from './illus-search-result/illus-search-result.component';
import { IllustratorWqComponent} from './illustrator-wq/illustrator-wq.component';
import { IrpReviewComponent } from './irp-review/irp-review.component';
import { IllusWqreportComponent } from './illus-wqreport/illus-wqreport.component';
import { VehicleworkloadreportComponent } from './vehicleworkloadreport/vehicleworkloadreport.component';
import { MismatchReportDetailComponent } from './mismatch-report-detail/mismatch-report-detail.component';
import { OpenSectionAnalystcodeComponent } from './open-section-analystcode/open-section-analystcode.component';
import { AuditSectionDetailsComponent } from './audit-section-details/audit-section-details.component';

const routes: Routes = [
  
  { path: 'usage', component: UsageInfoComponent},
  { path: 'wbs', component:WorkBreakdownStructureComponent },
  { path: 'illcreate', component: IllustrationCreationComponent},
  { path:'lexicon', component:LexiconCodeComponent},//Atchaya
  { path:'irp',component:IrpListComponent},//Atchaya-notintg
  {path:'commodity',component:CommodityMismatchComponent},//Jagan
  {path:"workqueue-report",component:WorkqueueComponent},//Abdur
  {path: 'mstatus', component: MStatusComponent},//Malathy
  {path: 'workreport',component:WorkqueueAssignmentReportComponent},//Abhishek
  // {path : 'usageinfo', component:UsageInformationComponent},//Abhishek--not requied
  {path : 'auditcons', component:AuditConsolidateReportComponent},//Keerthika
  {path : 'auditsec', component:AuditSectionViewComponent},//Hariharan
  {path : 'context', component:ContextComponent},//Efcia-notintg
  {path : 'educusage', component:EducationusageinformationComponent},//Keerthika
  // {path : 'illsearch', component:IllustrationSearchComponent},//Bhavatharani-not required
  {path : 'secreport', component:SectionsreportComponent},//Efcia
  {path : 'struct', component:StructuresearchComponent},//Hariharan
  {path : 'unassign', component:UnassignedCommoditiesComponent},//Bhavatharani
  { path: 'illustraionstatus', component: IllustrationstatusComponent },//RaviShankar
  { path: 'closePublic', component: ClosepublicationdateRaviComponent },//RaviShankar
  { path: 'devcommmodity', component: DevelopmentCommoditySetupComponent },//Keerthika
  { path: 'eng', component: EngineeringBaseToVendorPartComponent },//Abdur-notintg
  { path: 'illsearch', component: IllustrationSearchComponent },//RaviShankar
  { path: 'jobtime', component: JobTimeChangeComponent },//RaviShankar
  { path: 'part-work', component: PartWorkqueueComponent },//Divya
  { path: 'product', component: ProductTypeClassificationComponent },//RaviShankar
  { path: 'vechile', component: VechileLineMaintenanceComponent },//Malathy
  { path: 'lexi-filter', component: LexiconfiltermaintenanceComponent },//Ivlin
  { path: 'lexi-search', component: LexiconSearchComponent },
  { path: 'lexi-manage', component: LexiconmanagementComponent },//Ivlin-NOK-notintg
  { path: 'new-usage', component: NewUsageExistingPartsComponent },//Divya
  { path: 'calibrate', component: CalibrationListSetupComponent },//Atchaya-NOK
  { path: 'part-info', component: PartInfoComponent },//Venkat-NOK-notintg
  { path: 'inactive', component: InactiveRecoverComponent },//Venkat-butpg
  { path: 'assigntousage', component: AssignCommodityToUsageComponent },//Atchaya-notintg
  { path: 'dialog', component: DialogBoxComponent },//Atchaya
  {path: 'button', component: ButtonScreenComponent},//Malathy
  { path: 'changecommodity',component:ChangeCommodityComponent},//Efcia-butpg
  { path: 'commoditybasedetails',component:CommodityBaseDetailsComponent},//Efcia-butpg
  { path: 'commoditysetup',component:CommoditySetupComponent},//Efcia-butpg
  { path: 'commoditysuffix',component:CommoditySuffixComponent},//Efcia-butpg
  { path: 'requestcommodityproperty',component:RequestANewCommodityPropertyComponent},//Efcia-butpg
  {path:'select',component:SelectTemplateComponent},//Jagan-butpg
  {path:'temp-setup',component:TemplateDataComponent},//Jagan-butpg
  {path:'temp-status',component:TemplateStatusComponent},//Jagan-butpg
  {path:'wbs-manage',component:WbsManagementComponent},//Jagan-butpg
  {path :'art-house', component:ArtHouseComponent},//Bhavatharani-NOK
  {path : 'supplier-info',component:SupplierInformationComponent},
  {path: 'sectionprefix', component: SectionPrefixManagementComponent},//Malathy
  {path:'usageFeatureChanges',component:UsageFeatureChangesComponent},
  {path : 'sectioncopy', component:SectionCopyComponent},
  { path: 'wbs', component:WorkBreakdownStructureComponent },
  {path:'catalogsection', component : CatalogSectionSetupComponent},
  {path :'unassign-details',component:UnassignedCommoditiesDetailsComponent},
  {path :'linktable',component:WorkqueuetableComponent},
  {path:'illutable', component:IllustrationStatusTableComponent},
  {path:'illurejtable',component:IllustrationStatusRejtableComponent},
  {path:'illucoortable',component:IllustrationStatusCoortableComponent},
  {path:'illuartable',component:IllustrationStatusArttableComponent},
  {path:'illuanlystable',component:IllustrationStatusAnalystableComponent},
  {path:'illuwitoutable', component:IllustrationStatusWitoutableComponent},
  {path:'illuopenirptable', component:IllustrationStatusOprnirpsComponent},
  {path: 'illsearchres', component: IllusSearchResultComponent },
  {path:'illustratorwq' ,component:IllustratorWqComponent},
  {path:'irp-review',component:IrpReviewComponent},
  {path:'illuswq',component:IllusWqreportComponent},
  {path:'vehwrkload',component:VehicleworkloadreportComponent},
  {path :'analystcode',component:OpenSectionAnalystcodeComponent},
  {path:'mismatch',component:MismatchReportDetailComponent},
  {path:'auditdetails',component:AuditSectionDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
