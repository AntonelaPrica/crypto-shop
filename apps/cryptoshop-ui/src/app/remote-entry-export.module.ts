import { NgModule } from '@angular/core';
import { AuthModule } from './modules/auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule, AuthModule],
  providers: [],
  exports: [AuthModule],
})
export class RemoteEntryExportModule {}
